require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Replicate = require('replicate');

// --- Configuration ---
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const VEO_API_KEY = process.env.VEO_API_KEY; // Previously KIE_API_KEY
// Adjusted path since script is now in root
const BLOG_TOPICS_FILE = path.join(__dirname, 'data/blog-topics.json');

const LANGUAGES = [
    { code: 'en', name: 'English', dir: path.join(__dirname, 'app/blog') },
    { code: 'fr', name: 'French', dir: path.join(__dirname, 'app/fr/blog') },
    { code: 'es', name: 'Spanish', dir: path.join(__dirname, 'app/es/blog') },
    { code: 'pt', name: 'Portuguese', dir: path.join(__dirname, 'app/pt/blog') },
    { code: 'de', name: 'German', dir: path.join(__dirname, 'app/de/blog') }
];

const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    console.log('🚀 Starting Multilingual Daily Blog Generation (Strict SEO Mode)...');
    console.log('CWD:', process.cwd());
    console.log('__dirname:', __dirname);
    console.log('BLOG_TOPICS_FILE:', BLOG_TOPICS_FILE);
    console.log('API Keys Present:', !!REPLICATE_API_TOKEN, !!VEO_API_KEY);

    if (!REPLICATE_API_TOKEN || !VEO_API_KEY) {
        console.error('❌ Missing API Keys (REPLICATE_API_TOKEN or VEO_API_KEY)');
        process.exit(1);
    }

    if (!fs.existsSync(BLOG_TOPICS_FILE)) {
        console.error('❌ data/blog-topics.json not found');
        process.exit(1);
    }

    let topics = JSON.parse(fs.readFileSync(BLOG_TOPICS_FILE, 'utf8'));
    console.log(`Loaded ${topics.length} topics.`);

    // Check for "completed" topics that might be missing languages (fix for previous partial runs)
    // We only check topics completed recently or just iterate all "completed" to be safe? 
    // For now, let's explicitly look for topics that are marked 'completed' but missing files in some languages.
    // However, to respect the "2 per day" limit, we should prioritize "pending" OR "fixing incomplete".

    // 1 topic per day * 7 languages = 7 generations per day
    // If we have incomplete topics, we should finish them first.

    const limit = 1; // 1 topic per day, translated into all 7 languages
    let processedCount = 0;

    // Filter for pending topics
    const pendingTopics = topics.filter(t => t.status === 'pending');

    // Also consider topics that are 'completed' but might be missing languages (optional validation step)
    // For this run, we will focus on PENDING topics as per standard flow, 
    // BUT the user likely reset the status or wants us to fix the specific ones.
    // We will stick to the 'pending' list for the main loop, but we will make the loop robust 
    // so if we manually reset a topic to 'pending', it works even if half the files exist.

    const topicsToProcess = pendingTopics.slice(0, limit);

    if (topicsToProcess.length === 0) {
        console.log('✅ No pending topics found.');
        return;
    }

    for (const topic of topicsToProcess) {
        console.log(`\n📝 Processing Topic: ${topic.h1} (${topic.slug})`);

        const generatedContent = {}; // { langCode: articleContent }
        let allLanguagesSuccessful = true;
        const completedTopics = topics.filter(t => t.status === 'completed');

        // ================================================================
        // STEP 1: Generate ENGLISH article FIRST (this is the base)
        // ================================================================
        console.log('  📝 PHASE 1: Generating ENGLISH base article...');

        const enLang = LANGUAGES.find(l => l.code === 'en');
        const cachedSlugs = topic.translatedSlugs || {};

        // Check if EN already exists
        if (cachedSlugs['en']) {
            const existingPath = path.join(enLang.dir, cachedSlugs['en'], 'page.tsx');
            if (fs.existsSync(existingPath)) {
                console.log(`    ✅ EN already exists: ${cachedSlugs['en']} - SKIPPING`);
                generatedContent['en'] = { _skipped: true, finalSlug: cachedSlugs['en'] };
            }
        }

        // Generate EN if not skipped
        if (!generatedContent['en']) {
            try {
                const enContent = await generateArticleContent(topic, enLang, completedTopics);
                const enSlug = enContent.slug_translated || topic.slug;

                // Cache the slug
                const topicIndex = topics.findIndex(t => t.keyword === topic.keyword);
                if (topicIndex !== -1) {
                    if (!topics[topicIndex].translatedSlugs) topics[topicIndex].translatedSlugs = {};
                    topics[topicIndex].translatedSlugs['en'] = enSlug;
                    fs.writeFileSync(BLOG_TOPICS_FILE, JSON.stringify(topics, null, 2));
                }

                generatedContent['en'] = { ...enContent, finalSlug: enSlug };
                console.log(`    ✅ EN base article generated (slug: ${enSlug})`);
            } catch (err) {
                console.error(`    ❌ EN generation FAILED:`, err.message);
                console.log('  ❌ Cannot proceed without EN base. Skipping topic.');
                allLanguagesSuccessful = false;
                continue; // Skip this topic entirely
            }
        }

        // ================================================================
        // STEP 2: TRANSLATE to other languages (not regenerate)
        // ================================================================
        console.log('\n  🌍 PHASE 2: Translating to other languages...');

        for (const lang of LANGUAGES) {
            if (lang.code === 'en') continue; // Already done

            console.log(`  🌐 Translating to: ${lang.code.toUpperCase()}`);

            if (!fs.existsSync(lang.dir)) {
                fs.mkdirSync(lang.dir, { recursive: true });
            }

            // Check if already exists
            if (cachedSlugs[lang.code]) {
                const existingPath = path.join(lang.dir, cachedSlugs[lang.code], 'page.tsx');
                if (fs.existsSync(existingPath)) {
                    console.log(`    ✅ Already exists: ${lang.code}/${cachedSlugs[lang.code]} - SKIPPING`);
                    generatedContent[lang.code] = { _skipped: true, finalSlug: cachedSlugs[lang.code] };
                    continue;
                }
            }

            try {
                // TRANSLATE the EN content (not regenerate from scratch)
                const translatedContent = await translateArticleContent(generatedContent['en'], lang, topic);
                const translatedSlug = translatedContent.slug_translated || topic.slug;

                // Cache the slug
                const topicIndex = topics.findIndex(t => t.keyword === topic.keyword);
                if (topicIndex !== -1) {
                    if (!topics[topicIndex].translatedSlugs) topics[topicIndex].translatedSlugs = {};
                    topics[topicIndex].translatedSlugs[lang.code] = translatedSlug;
                    fs.writeFileSync(BLOG_TOPICS_FILE, JSON.stringify(topics, null, 2));
                }

                generatedContent[lang.code] = { ...translatedContent, finalSlug: translatedSlug };
                console.log(`    ✅ Translated to ${lang.code} (slug: ${translatedSlug})`);

            } catch (err) {
                console.error(`    ❌ Translation FAILED for ${lang.code}:`, err.message);
                allLanguagesSuccessful = false;
            }
        }

        // ================================================================
        // STEP 3: Generate IMAGES (same for all languages)
        // ================================================================
        const hasAnyContent = Object.values(generatedContent).some(c => c && !c._skipped);
        if (!hasAnyContent) {
            console.log('  ⚠️ All content already exists. Skipping image generation.');
        } else {
            console.log('\n  🎨 PHASE 3: Generating images...');
        }
        const imageUrls = hasAnyContent ? await generateBlogImages(topic.keyword, 10) : [];

        // ================================================================
        // STEP 4: Write files
        // ================================================================
        console.log('\n  📁 PHASE 4: Writing files...');
        for (const lang of LANGUAGES) {
            const content = generatedContent[lang.code];
            if (!content) continue;
            if (content._skipped) continue;

            const postDir = path.join(lang.dir, content.finalSlug);

            if (fs.existsSync(path.join(postDir, 'page.tsx'))) {
                console.log(`    ⚠️ Already exists: ${lang.code}/${content.finalSlug}`);
            } else {
                if (!fs.existsSync(postDir)) {
                    fs.mkdirSync(postDir, { recursive: true });
                }

                const pageContent = createPageTsx(topic, content, imageUrls, lang.code);
                fs.writeFileSync(path.join(postDir, 'page.tsx'), pageContent);
                console.log(`    ✅ Created ${lang.code}/blog/${content.finalSlug}/page.tsx`);

                updateBlogIndex(lang.dir, { ...topic, slug: content.finalSlug }, imageUrls[0], lang.code, content.title_translated || topic.h1);
            }
        }

        // ================================================================
        // STEP 5: Mark Complete
        // ================================================================
        if (allLanguagesSuccessful) {
            const originalIndex = topics.findIndex(t => t.keyword === topic.keyword);
            if (originalIndex !== -1) {
                topics[originalIndex].status = 'completed';
                topics[originalIndex].completedDate = new Date().toISOString();
            }
            fs.writeFileSync(BLOG_TOPICS_FILE, JSON.stringify(topics, null, 2));
            console.log('  ✅ Topic marked as COMPLETED');
        } else {
            console.warn(`  ⚠️ Some languages failed. Topic remains pending.`);
        }
    }

    console.log('\n✅ Batch Process Complete');
}

async function generateArticleContent(topic, lang, completedTopics = []) {
    let retries = 3;
    while (retries > 0) {
        let output;
        let fullText;

        try {
            console.log(`    🤖 Asking Llama 3.1 405B (${retries} attempts left)...`);
            // ... prompt definition ... (we can leave prompt def inside or move it out, but output needs to be outside)
            // Wait, replace_file_content is better with small chunks. 
            // I'll just change the declaration line.

            // Select some related articles (random 3 from completed)
            const relatedLinks = completedTopics
                .filter(t => t.keyword !== topic.keyword) // Exclude self
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(t => `- Title: "${t.h1}", URL: https://admakerai.app/${lang.code === 'en' ? '' : lang.code + '/'}blog/${t.slug}`)
                .join('\n');

            const prompt = `
            You are an EXPERT SEO Content Writer for "AdMaker AI". Write a LONG, COMPREHENSIVE, DETAILED blog post.
            
            ⚠️⚠️⚠️ ABSOLUTE MINIMUM: 2000 WORDS ⚠️⚠️⚠️
            - If your article is under 2000 words, YOU HAVE FAILED YOUR TASK.
            - NEVER summarize. ALWAYS expand with examples, details, and explanations.
            - Each section MUST meet or EXCEED its minimum word count.
            - Paragraphs must be 4-6 sentences each, not 1-2.
            
            **Input Data**:
            - Keyword: "${topic.keyword}"
            - Target Language: ${lang.name} (code: ${lang.code})
            
            ⚠️ FACTUAL PRICING DATA FOR 2026 (USE EXACTLY THESE NUMBERS):
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            | Platform     | Price 2026      | Videos/mo     |
            |━━━━━━━━━━━━━|━━━━━━━━━━━━━━━━|━━━━━━━━━━━━━━|
            | AdMaker AI   | $29/month       | Unlimited     |
            | Arcads       | $110/month      | 10 videos     |
            | Arcads Pro   | $220/month      | 30 videos     |
            | Canva Pro    | $12.99/month    | Unlimited     |
            | CapCut       | Free            | Unlimited     |
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            
            ADDITIONAL FACTS:
            - Arcads founded: 2024, raised €14M Series A in late 2025
            - TikTok 2026 report: 75% of advertisers now use AI for video ads
            - Average Fiverr UGC creator: $150/video vs AI tools ~$3/video
            
            **MANDATORY SECTIONS** (MUST include ALL with MINIMUM word counts):
            
            1. **Introduction** (180+ words):
               - Hook with a provocative question or bold statistic
               - Explain the problem businesses face
               - Preview what the article covers
               - DO NOT just repeat the title
            
            2. **What is [Topic]?** (250+ words):
               - Detailed explanation of the concept
               - Historical context and 2026 relevance
               - Why it matters for businesses today
               - Include a specific example
            
            3. **Step-by-Step Guide: How to Make UGC Ads with AdMaker AI** (600+ words):
               - 5 detailed steps, EACH with 120+ words
               - Structure each step as:
                 * "Why it matters" (40 words)
                 * "How to do it" (50 words)  
                 * "Pro Tip" (30 words)
               - Include specific UI references
               - Place [IMAGE_PLACEHOLDER_X] after each step
            
            4. **Comparison Table + Analysis** (300+ words):
               - HTML table with columns: Platform, Price (2026), Videos/Credits, Render Speed, Best For
               - USE THE EXACT PRICES FROM THE TABLE ABOVE ($110 for Arcads, NOT $99)
               - After table: 150+ word analysis explaining pros/cons of each
               - Be factually honest: Arcads has premium avatar quality
            
            5. **Real Case Study** (350+ words):
               - Specific niche: "A Shopify organic skincare brand" or "A DTC fitness app"
               - Specific numbers: "CTR increased 47%", "CPA decreased 32%"
               - Before/After comparison with real metrics
               - Expert quote: "As [Name], [Title] at [Company], said: '...'" (50+ words)
               - Timeline: "Within 3 weeks of switching to AdMaker AI..."
            
            6. **2026 Trends & Future** (250+ words):
               - AI video ad market growth statistics
               - TikTok's January 2026 AI adoption report
               - What to expect in 2027
               - How businesses should prepare
            
            7. **Common Mistakes to Avoid** (200+ words):
               - List 5 specific mistakes with explanations (40+ words each)
               - Include how to avoid each mistake
            
            8. **When to Choose Arcads Instead** (180+ words) [E-E-A-T TRUST]:
               - Be HONEST: Arcads excels at hyper-realistic AI avatars
               - Their €14M funding means strong R&D
               - Recommend for: enterprise clients, premium quality needs
               - This honesty builds E-E-A-T credibility with Google
            
            9. **FAQ Section** (in JSON): 5 questions, EACH answer 60+ words
            
            10. **Conclusion + CTA** (180+ words): 
                - Summarize key points
                - Clear value proposition  
                - Strong call-to-action
            
            **TITLE REQUIREMENTS**:
            - MUST be 60-70 characters exactly
            - MUST start with: "Best", "Top 5", "Top 10", or "How to"
            - MUST NOT contain colon (:) or two-part structure
            - Include year 2026
            - GOOD: "Best Arcads Alternatives for Small Businesses 2026"
            - BAD: "Arcads Pricing 2026: Complete Guide"
            
            **OTHER REQUIREMENTS**:
            - Year: ALWAYS "2026". NEVER 2024 or 2025.
            - Use <h2> and <h3> for headers
            - Include EXACTLY 10 image placeholders: [IMAGE_PLACEHOLDER_1] through [IMAGE_PLACEHOLDER_10]
            - External links: Include 1-2 authority sources (TikTok Business, Meta Business)
            - Internal links: ${relatedLinks || "Link to /blog"}
            
            **OUTPUT FORMAT**:
            You must output TWO parts.
            
            PART 1: Metadata in valid JSON output (NO markdown, NO HTML content here):
            {
               "title_translated": "60-70 char title starting with Best/Top/How to",
               "meta_description": "155 chars max, compelling and keyword-rich",
               "quick_answer": "2-3 sentences directly answering the main question",
               "faq": [{"question":"...", "answer":"60+ words..."}]
            }
            
            PART 2: The HTML content, enclosed specifically between these delimiters:
            ---HTML_CONTENT_START---
            (Put the full 2000+ WORD HTML article here)
            ---HTML_CONTENT_END---
            `;

            // Llama 3.1 405B input structure
            const input = {
                system_prompt: "You are an expert SEO Content Writer. Return JSON metadata followed by HTML content in delimiters. NEVER be lazy. ALWAYS write at least 2000 words.",
                prompt: prompt,
                max_tokens: 8000, // Enough for 2000+ word articles
                min_tokens: 4000, // Force minimum length
                temperature: 0.7,
                top_p: 0.9
            };

            // Using Llama 3.1 405B Instruct
            console.log(`    📝 Generating with Llama 3.1 405B...`);
            output = await replicate.run("meta/meta-llama-3.1-405b-instruct", { input });

            // Llama returns an array of strings (iterator)
            fullText = Array.isArray(output) ? output.join('') : output;

            // === ROBUST HYBRID EXTRACTION ===

            // 1. Extract JSON Metadata
            let jsonMatch = fullText.match(/\{[\s\S]*?\}/);
            if (!jsonMatch) throw new Error('No JSON metadata found');

            let jsonPart = jsonMatch[0];
            // Fix strict JSON if needed
            jsonPart = jsonPart.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
            const metadata = JSON.parse(jsonPart);

            // 2. Extract HTML Content
            const contentStartMarker = '---HTML_CONTENT_START---';
            const contentEndMarker = '---HTML_CONTENT_END---';

            let startIndex = fullText.indexOf(contentStartMarker);
            let endIndex = fullText.indexOf(contentEndMarker);

            if (startIndex === -1) throw new Error('HTML content start marker not found');

            // If end marker missing (truncation), use end of text
            if (endIndex === -1) {
                console.warn('    ⚠️ Warning: HTML content end marker missing (truncation suspect). Using full text end.');
                endIndex = fullText.length;
            }

            let htmlContent = fullText.substring(startIndex + contentStartMarker.length, endIndex).trim();

            if (htmlContent.length < 1000) throw new Error('Generated HTML content seems too short');

            const enContent = {
                ...metadata,
                content_html: htmlContent
            };
            return enContent;
        } catch (e) {
            console.warn(`    ⚠️ JSON Parse/API Error: ${e.message}. Retrying...`);
            console.log('--- DEBUG: RAW OUTPUT START ---');
            console.log(output); // Check if output is string or object
            console.log('--- DEBUG: RAW OUTPUT END ---');
            fs.writeFileSync('failed_log.txt', fullText || 'No output');
            retries--;


            await sleep(3000);
        }
    }
    throw new Error('Max retries exceeded for content generation');
}

// ================================================================
// TRANSLATE article content from English to other languages
// ================================================================
async function translateArticleContent(enContent, lang, topic) {
    if (enContent._skipped) {
        throw new Error('Cannot translate: EN content was skipped (already exists)');
    }

    let retries = 3;
    while (retries > 0) {
        let output;
        let fullText;

        try {
            console.log(`    🤖 Translating with Llama 3.1 405B (${retries} attempts left)...`);

            const prompt = `
You are a professional translator. Translate the following blog article from English to ${lang.name}.

**TRANSLATION RULES**:
1. Translate ALL text to ${lang.name} including title, headings, paragraphs, FAQ questions and answers
2. Keep the exact same HTML structure (h1, h2, h3, p, table, etc.)
3. Keep all [IMAGE_PLACEHOLDER_X] placeholders exactly as they are
4. Keep all URLs and links exactly as they are
5. DO NOT shorten or summarize - translate the FULL content maintaining the same word count
6. The title MUST be 60-70 characters and MUST NOT contain a colon (:)
7. Each FAQ answer must be 60+ words in ${lang.name}

**IMPORTANT: PRICING DATA (DO NOT CHANGE THESE NUMBERS)**:
- AdMaker AI: $29/month
- Arcads: $110/month (Starter, 10 videos)
- Arcads Pro: $220/month (30 videos)
- Canva Pro: $12.99/month
- CapCut: Free

**ORIGINAL ENGLISH CONTENT**:
- Title: ${enContent.title_translated}
- Meta Description: ${enContent.meta_description}
- Quick Answer: ${enContent.quick_answer}

**HTML Content to translate**:
${enContent.content_html}

**FAQ to translate**:
${JSON.stringify(enContent.faq, null, 2)}

**OUTPUT FORMAT**:
You must output TWO parts.

PART 1: Metadata in valid JSON output (NO markdown, NO HTML content here):
{
   "title_translated": "Translated title (60-70 chars, no colons)",
   "meta_description": "Translated meta description (155 chars max)",
   "quick_answer": "Translated quick answer",
   "faq": [{"question":"Translated question", "answer":"Translated answer (60+ words)"}]
}

PART 2: The translated HTML content, enclosed specifically between these delimiters:
---HTML_CONTENT_START---
(Put the full translated HTML content here)
---HTML_CONTENT_END---
`;

            const input = {
                system_prompt: "You are a professional translator. Return JSON metadata followed by HTML content in delimiters.",
                prompt: prompt,
                max_tokens: 8000,
                temperature: 0.5,
                top_p: 0.9
            };

            output = await replicate.run('meta/meta-llama-3.1-405b-instruct', { input });
            fullText = Array.isArray(output) ? output.join('') : String(output);

            // 1. Extract JSON Metadata
            let jsonMatch = fullText.match(/\{[\s\S]*?\}/);
            if (!jsonMatch) throw new Error('No JSON metadata found');

            let jsonPart = jsonMatch[0];
            // Fix strict JSON if needed
            jsonPart = jsonPart.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
            const metadata = JSON.parse(jsonPart);

            // 2. Extract HTML Content
            const contentStartMarker = '---HTML_CONTENT_START---';
            const contentEndMarker = '---HTML_CONTENT_END---';

            let startIndex = fullText.indexOf(contentStartMarker);
            let endIndex = fullText.indexOf(contentEndMarker);

            if (startIndex === -1) throw new Error('HTML content start marker not found');

            // If end marker missing (truncation), use end of text
            if (endIndex === -1) {
                console.warn('    ⚠️ Warning: HTML content end marker missing (truncation suspect). Using full text end.');
                endIndex = fullText.length;
            }

            let htmlContent = fullText.substring(startIndex + contentStartMarker.length, endIndex).trim();

            if (htmlContent.length < 500) throw new Error('Translated HTML content seems too short');

            return {
                ...metadata,
                content_html: htmlContent
            };

        } catch (e) {
            console.warn(`    ⚠️ Translation Error: ${e.message}. Retrying...`);
            retries--;
            await sleep(3000);
        }
    }
    throw new Error('Max retries exceeded for translation');
}

async function generateBlogImages(keyword, count) {
    console.log('    🎨 Generating Images...');
    const images = [];
    const prompts = [
        "Person using app on phone happy", "Data chart analysis screen",
        "Team meeting whiteboard strategy", "Video recording setup smartphone",
        "Dashboard metrics rising green", "Influencer selfie style smiling",
        "E-commerce unboxing moment", "Creative editing software view",
        "Business person presenting results", "Viral video success graph"
    ];

    for (let i = 0; i < count; i++) {
        const p = `${prompts[i % prompts.length]}, ${keyword}, realistic, 8k, cinematic lighting, soft focus background`;
        const url = await generateSingleImage(p);

        if (url) {
            const filename = `img - ${Date.now()} -${i}.png`;
            const localPath = path.join(__dirname, 'public/blog-images', filename);
            const relativePath = `/ blog - images / ${filename} `;
            if (!fs.existsSync(path.dirname(localPath))) fs.mkdirSync(path.dirname(localPath), { recursive: true });
            try {
                await downloadImage(url, localPath);
                images.push(relativePath);
            } catch (e) {
                images.push('https://placehold.co/800x450?text=Image+Error');
            }
        } else {
            images.push('https://placehold.co/800x450?text=Gen+Failed');
        }
    }
    return images;
}

async function generateSingleImage(prompt) {
    try {
        const res = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${VEO_API_KEY} `, 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'z-image', input: { prompt, aspect_ratio: '16:9' } })
        });
        const data = await res.json();
        if (data.code !== 200) return null;

        const taskId = data.data.taskId;
        for (let i = 0; i < 45; i++) {
            await sleep(2000);
            const check = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
                headers: { 'Authorization': `Bearer ${VEO_API_KEY}` }
            });
            const d = await check.json();
            if (d.data.state === 'success') return JSON.parse(d.data.resultJson).resultUrls[0];
            if (d.data.state === 'fail') return null;
        }
    } catch (e) { }
    return null;
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const https = url.startsWith('https') ? require('https') : require('http');
        const file = fs.createWriteStream(filepath);
        https.get(url, (res) => {
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', (e) => { fs.unlink(filepath, () => { }); reject(e); });
    });
}

function createPageTsx(topic, content, images, lang) {
    let htmlContent = content.content_html;

    // ========== SEO SANITIZATION ==========

    // 1. Remove duplicate H1 tags (template already has H1 in header)
    htmlContent = htmlContent.replace(/<h1[^>]*>.*?<\/h1>/gi, '');

    // 2. Remove any leftover image placeholders that weren't replaced
    htmlContent = htmlContent.replace(/\[IMAGE_PLACEHOLDER_\d+\]/g, '');

    // 3. Remove empty paragraphs and whitespace-only tags
    htmlContent = htmlContent.replace(/<p>\s*<\/p>/gi, '');
    htmlContent = htmlContent.replace(/<div>\s*<\/div>/gi, '');

    // 4. Fix potential unclosed tags (basic cleanup)
    htmlContent = htmlContent.replace(/<br>/gi, '<br/>');
    htmlContent = htmlContent.replace(/<hr>/gi, '<hr/>');

    // 5. Remove markdown artifacts that might slip through
    htmlContent = htmlContent.replace(/```[a-z]*\n?/gi, '');
    htmlContent = htmlContent.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    htmlContent = htmlContent.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // 6. Clean up excessive newlines
    htmlContent = htmlContent.replace(/\n{3,}/g, '\n\n');

    // 7. Ensure all links have rel="noopener" for external links
    htmlContent = htmlContent.replace(
        /<a\s+href="(https?:\/\/(?!admakerai\.app)[^"]+)"([^>]*)>/gi,
        '<a href="$1" rel="noopener noreferrer" target="_blank"$2>'
    );

    // ========== END SEO SANITIZATION ==========

    // Replace Image Placeholders with actual images
    images.forEach((img, idx) => {
        // Use standard img tag for simplicity within dangerouslySetInnerHTML
        const stdImgTag = `<img src="${img}" alt="${topic.keyword} - illustration ${idx + 1}" loading="lazy" class="w-full rounded-xl my-8 hover:opacity-95 transition" />`;
        htmlContent = htmlContent.replace(`[IMAGE_PLACEHOLDER_${idx + 1}]`, stdImgTag);
    });

    // Pink Links (Internal)
    htmlContent = htmlContent.replace(
        /\[INTERNAL_LINK:\s*([^|]+?)\s*\|\s*([^\]]+?)\]/g,
        '<a href="$2" class="text-[#ff0844] font-bold hover:text-[#ff5478] highlight-link" style="color: #ff0844; font-weight: 700;">$1</a>'
    );

    // External Links (basic detection if Claude outputs them as standard a tags, we can style them via prose class, but if we need specific styling we assume they are already a tags)

    const landingPageUrl = lang === 'en' ? '/' : `/${lang}`;

    // Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": content.title_translated,
        "image": images[0],
        "author": { "@type": "Organization", "name": "AdMaker AI" },
        "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": content.faq ? content.faq.map(f => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": { "@type": "Answer", "text": f.answer }
            })) : []
        }
    };

    return `
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import BlogVideoSidebar from '@/components/BlogVideoSidebar';

export default function BlogPost() {
    const [showStickyCta, setShowStickyCta] = useState(false);
    useEffect(() => {
        const handleScroll = () => setShowStickyCta(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const jsonLd = ${JSON.stringify(jsonLd)};

    return (
      <>
        <Head>
          <title>${content.title_translated} | AdMaker AI</title>
          <meta name="description" content="${content.meta_description}" />
          <link rel="alternate" hrefLang="en" href="https://admaker-ai.com/blog/${topic.slug}" />
          <link rel="alternate" hrefLang="fr" href="https://admaker-ai.com/fr/blog/${topic.slug}" />
          <link rel="alternate" hrefLang="es" href="https://admaker-ai.com/es/blog/${topic.slug}" />
          <link rel="alternate" hrefLang="pt" href="https://admaker-ai.com/pt/blog/${topic.slug}" />
          <link rel="alternate" hrefLang="de" href="https://admaker-ai.com/de/blog/${topic.slug}" />
          <link rel="alternate" hrefLang="x-default" href="https://admaker-ai.com/blog/${topic.slug}" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </Head>
        
        <Navbar lang="${lang}" />
        
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-[100px] px-4 overflow-x-hidden font-sans">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
                
                {/* Left: Article */}
                <article className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 break-words">
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-white">${content.title_translated}</h1>
                        <div className="rounded-xl overflow-hidden mb-8 border border-white/10">
                            <img src="${images[0]}" alt="${content.title_translated}" className="w-full object-cover" />
                        </div>
                    </header>

                    {/* Quick Answer */}
                    <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 p-8 rounded-2xl mb-12 shadow-lg">
                         <h3 className="text-[#ff0844] font-bold text-lg mb-4 uppercase tracking-wider flex items-center">
                            <span className="mr-2">⚡</span> Quick Answer
                         </h3>
                         <p className="text-blue-100 leading-relaxed text-lg font-medium">${content.quick_answer}</p>
                    </div>

                    <div 
                        className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-[#ff0844] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
                    />

                    {/* FAQ */}
                    <section className="mt-16 pt-10 border-t border-white/10">
                        <h2 className="text-3xl font-bold mb-8 flex items-center"><span className="mr-3">❓</span> FAQ</h2>
                        <div className="space-y-6">
                            ${content.faq ? content.faq.map(f => `
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">${f.question}</h3>
                                <p className="text-gray-400 leading-relaxed">${f.answer}</p>
                            </div>
                            `).join('') : ''}
                        </div>
                    </section>
                </article>

                {/* Right: Sticky Sidebar */}
                <aside className="hidden lg:block sticky top-[120px]">
                    <BlogVideoSidebar lang="${lang}" />
                </aside>

            </div>
        </div>
        
        {/* Mobile Sticky CTA */}
        <a href="${landingPageUrl}" className={\`fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff0844] to-[#ff5478] text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(255,8,68,0.4)] z-50 transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 \${showStickyCta ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-10'}\`}>
            Create your AI Ads now 👆
        </a>

      </>
    );
}
`;
}

function updateBlogIndex(dir, topic, thumbnail, lang, title) {
    const listPath = path.join(dir, 'page.tsx');
    if (!fs.existsSync(listPath)) return;

    let content = fs.readFileSync(listPath, 'utf8');
    const prefix = lang === 'en' ? 'blog' : lang + '/blog';
    const linkPath = '/' + prefix + '/' + topic.slug;
    if (content.includes(linkPath)) return;

    // Standard card injection
    // Match styles.blogCard usage
    // We assume the index page has 'styles' imported.
    const newCard = `
        < Link href = "${linkPath}" className = { styles.blogCard } >
                            <div className={styles.cardImage}>
                                <Image
                                    src="${thumbnail}"
                                    alt="${title}"
                                    width={400}
                                    height={250}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.category}>AdMaker AI</span>
                                <h2 className={styles.cardTitle}>${title}</h2>
                                <p className={styles.cardExcerpt}>${topic.keyword}</p>
                            </div>
                        </Link >
        `;

    if (content.includes('className={styles.blogGrid}')) {
        content = content.replace(
            'className={styles.blogGrid}>',
            `className = { styles.blogGrid } >\n${newCard} `
        );
        fs.writeFileSync(listPath, content);
    }
}

main();
