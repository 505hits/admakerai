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
    { code: 'de', name: 'German', dir: path.join(__dirname, 'app/de/blog') },
    { code: 'ja', name: 'Japanese', dir: path.join(__dirname, 'app/ja/blog') },
    { code: 'ko', name: 'Korean', dir: path.join(__dirname, 'app/ko/blog') }
];

const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function slugify(text) {
    return text.toString().toLowerCase().trim()
        .replace(/[^\w\s-]/g, '') // Remove non-word chars
        .replace(/[\s_-]+/g, '-') // Replace spaces with -
        .replace(/^-+|-+$/g, ''); // Trim -
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

    const limit = 1; // Process only 1 pending topic per run (User Request)
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
        console.log(`\n📝 Processing Topic: ${topic.h1 || topic.keyword}`);

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
                // FORCE SLUG FROM KEYWORD (Strict SEO Mode)
                const enSlug = slugify(topic.keyword);
                const enContent = await generateArticleContent(topic, enLang, completedTopics);
                // const enSlug = enContent.slug_translated || topic.slug; // ORIGINAL logic replaced

                // Cache the slug
                const topicIndex = topics.findIndex(t => t.keyword === topic.keyword);
                if (topicIndex !== -1) {
                    if (!topics[topicIndex].translatedSlugs) topics[topicIndex].translatedSlugs = {};
                    topics[topicIndex].translatedSlugs['en'] = enSlug;

                    // NEW: Save Title and Primary Image for Similar Articles
                    if (!topics[topicIndex].translatedTitles) topics[topicIndex].translatedTitles = {};
                    topics[topicIndex].translatedTitles['en'] = enContent.title_translated || topic.h1;

                    if (enContent.images && enContent.images.length > 0) {
                        topics[topicIndex].primaryImage = enContent.images[0].url;
                    }

                    fs.writeFileSync(BLOG_TOPICS_FILE, JSON.stringify(topics, null, 2));
                }

                // Pass images to content object for consistent usage
                generatedContent['en'] = { ...enContent, finalSlug: enSlug, images: enContent.images };
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
            // continue; // REMOVED: Enable translations for all languages

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
                const translatedSlug = slugify(translatedContent.slug_translated || topic.keyword);

                // Cache the slug
                // Cache the slug AND Title
                const topicIndex = topics.findIndex(t => t.keyword === topic.keyword);
                if (topicIndex !== -1) {
                    if (!topics[topicIndex].translatedSlugs) topics[topicIndex].translatedSlugs = {};
                    topics[topicIndex].translatedSlugs[lang.code] = translatedSlug;

                    if (!topics[topicIndex].translatedTitles) topics[topicIndex].translatedTitles = {};
                    topics[topicIndex].translatedTitles[lang.code] = translatedContent.title_translated;

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

                // Pass imageUrls to createPageTsx to ensuring images are available
                const relatedArticles = getRelatedArticles(topics, topic.keyword, lang.code);
                // Attach the images to content if not already there (for EN it's there, for others it might not be)
                const contentWithImages = { ...content, images: imageUrls };

                const pageContent = createPageTsx(topic, contentWithImages, imageUrls, lang.code, relatedArticles);
                fs.writeFileSync(path.join(postDir, 'page.tsx'), pageContent);
                console.log(`    ✅ Created ${lang.code}/blog/${content.finalSlug}/page.tsx`);

                updateBlogIndex(lang.dir, { ...topic, slug: content.finalSlug }, imageUrls[0] ? imageUrls[0].url : '', lang.code, content.title_translated || topic.h1);
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
            console.log(`    🤖 Asking Claude 4.5 Sonnet (${retries} attempts left)...`);

            // Select some related articles (random 3 from completed) - output as HTML links
            const relatedLinks = completedTopics
                .filter(t => t.keyword !== topic.keyword) // Exclude self
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(t => {
                    const url = `https://admakerai.app/${lang.code === 'en' ? '' : lang.code + '/'}blog/${t.slug}`;
                    return `<a href="${url}" style="color: #ff0844; font-weight: bold; display: block; margin: 10px 0;">→ ${t.h1 || t.keyword}</a>`;
                })
                .join('\n');

            const domain = "admakerai.app";
            const prompt = `
            You are an EXPERT SEGMENT ANALYST & TECH JOURNALIST (Neutral Tone). 
            Write a LONG, COMPREHENSIVE, DETAILED blog post about Video Marketing & AI Tools.
            
            ⚠️⚠️⚠️ CRITICAL: ABSOLUTE MINIMUM 2500 WORDS ⚠️⚠️⚠️
            
            ⚠️ TITLE RULES (STRICT):
            1. MUST start with: "Best", "Top", "How to", "The Ultimate Guide to", "7 Best Ways", or similar.
            2. Length: STRICTLY between 60-70 characters.
            3. NO COLONS (:) in the middle. Use a single flowing sentence.

            ⚠️ CONTENT GUIDELINES (2026 STANDARDS):
            1. **Stats & Data**: use REALISTIC percentages (e.g., "boosts CTR by 30%", "saves 40% production time"). 
            2. **Entities**: Mention specific tools/entities: HeyGen, Runway, Sora, Midjourney, Stable Diffusion where relevant.
            3. **Images**: For each image placeholder, provide a DETAILED ALT TEXT describing the scene (e.g., "AdMaker AI dashboard showing video editing timeline").
            
            - If your article is under 2500 words, YOU HAVE COMPLETELY FAILED.
            - Count your words as you write. Each paragraph must have 5-7 sentences.
            - NEVER summarize. ALWAYS expand with examples, nuanced analysis, and detailed explanations.
            - Write like a human expert (e.g., TechCrunch, Verge style), NOT a generic AI summary.
            - BE OBJECTIVE: Discuss pros AND cons of every tool, including AdMaker AI.
            
            **Input Data**:
            - Keyword: "${topic.keyword}"
            - Target Language: ${lang.name} (code: ${lang.code})
            - Landing Page URL: https://${domain}${lang.code === 'en' ? '' : '/' + lang.code}
            
            ⚠️ REAL COMPETITOR DATA (2025/2026 Context):
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            | Platform      | Price           | Key Strength      | Best For          |
            |━━━━━━━━━━━━━|━━━━━━━━━━━━━━━━|━━━━━━━━━━━━━━━━━━|━━━━━━━━━━━━━━━━━━|
            | AdMaker AI    | $39/mo (Unltd) | Unlimited Video   | SMBs, Dropshippers|
            | Arcads        | ~$110/mo       | Premium Avatars   | High-End Brands   |
            | Creatify      | ~$59/mo        | URL-to-Video      | E-commerce Lists  |
            | MakeUGC       | ~$89/mo        | Agency Focus      | Agencies          |
            | Bandy AI      | ~$49/mo        | Quick Templates   | Social Media Mgrs |
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            
            ⚠️ GUIDELINES FOR ACCURACY & TRUST (2026 STANDARDS):
            1. **MANDATORY LABELS**: You MUST mention that since late 2025, TikTok and Meta require the "AI-generated" label. Failure to use it results in shadowbans. Be FIRM on this.
            2. **COPYRIGHT REALITY**: 
               - 100% AI generation = Public Domain (No copyright).
               - Human-structured/edited AI video (like AdMaker) = Copyrightable. 
               - Explain this nuance clearly so brands feel safe but informed.
            3. **HONEST COMPARISON**: 
               - Acknowledge that **Arcads** has excellent, high-budget realistic avatars but is expensive ($110+).
               - Position **AdMaker AI** correctly at **$39/mo** (NOT $29) as the "Value Champion" for unlimited testing.
            4. **EXPERTISE HUMAINE**:
               - Use phrases like: "Our internal tests on 50 campaigns show...", "We observed a 20% CTR increase when...", "In our experience...".
            
            ⚠️ ANTI-KEYWORD STUFFING:
            - Use natural synonyms: "synthetic media", "automated video production", "AI creators".
            - Do NOT repeat the main keyword robotically.
            - **CRITICAL: The article MUST be at least 2500-3000 words long. Detail is key.**
            
            ═══════════════════════════════════════════════════════════════
            ███ MANDATORY ARTICLE STRUCTURE (FOLLOW EXACTLY) ███
            ═══════════════════════════════════════════════════════════════
            
            1. **Introduction** (300+ words):
               - Hook: The explosion of short-form video demand.
               - Problem: The high cost of human UGC creators ($150+ per video).
               - Solution: The rise of AI alternatives.
               - Thesis: Why choosing the right tool matters for ROI.
               [IMAGE_PLACEHOLDER_1]
            
            2. **What is [Topic]?** (400+ words):
               - Definition and evolution from 2023 to 2026.
               - Why "Quantity" of creatives is now as important as "Quality" (Ad fatigue).
               - Real-world application example.
               [IMAGE_PLACEHOLDER_2]
            
            3. **Step-by-Step Guide: Creating High-Converting UGC Ads** (800+ words):
               - Focus on "Strategy" first, "Tool" second.
               - Step 1: Researching Hooks (The first 3 seconds).
               - Step 2: Selecting the right Avatar Persona for your niche.
               - Step 3: Writing natural scripts (avoiding "salesy" language).
               - Step 4: Generating the video (Using tools like AdMaker AI).
               - Step 5: Testing and iterating (The "Winner" strategy).
               
               *Includes 2-3 PINK INTERNAL LINKS to: <a href="[LANDING_PAGE_URL]" style="color: #ff0844; font-weight: bold;">Try AdMaker AI for Free</a>*
               [IMAGE_PLACEHOLDER_3] [IMAGE_PLACEHOLDER_4] [IMAGE_PLACEHOLDER_5] (Distribute these inside this section)
            
            4. **In-Depth Comparison: AdMaker AI vs. The Rest** (600+ words):
               - **Arcads Analysis**: Praise their quality, critique the $100+ entry price.
               - **Creatify Analysis**: Praise the URL extraction, critique the credit limits.
               - **AdMaker AI Analysis**: Highlight the "Unlimited" feature at **$39/mo**. "Why pay per video when you need to test 20 variations?"
               - Create a detailed HTML comparison table.
               [IMAGE_PLACEHOLDER_6]
            
            5. **The ROI of AI Video Ads** (400+ words):
               - Compare Cost Per Acquisition (CPA) of Human vs AI.
               - Speed to market: Launching trends in hours, not weeks.
               - Scalability: Producing typically 10x more creatives for the same budget.
               [IMAGE_PLACEHOLDER_7]
            
            6. **2026 Industry Trends** (300+ words):
               - Hyper-personalization.
               - Interactive video ads.
               - The blurring line between real and AI creators.
               - **Mention Meta Business 2026 Report** on video engagement.
               [IMAGE_PLACEHOLDER_8]
            
            7. **When NOT to use AI** (Honesty Section) (250+ words):
               - Be transparent: For highly emotional, personal founder stories, real human video is still best.
               - AI is for *Scale* and *Performance*, Human is for *Deep Connection*.
               - This nuance builds trust with the reader.
            
            8. **FAQ Section** (will be in JSON):
               - 10+ Questions covering Pricing ($39), Copyright (Public Domain vs Edited), Labels (TikTok rules), and capabilities.
            
            9. **Related Readings** (MANDATORY):
               - Link to 3 other relevant articles using the HTML format provided previously.
               [IMAGE_PLACEHOLDER_9]
            
            10. **Conclusion** (250+ words):
                - Final verdict.
                - Encouragement to start testing.
                - Strong CTA.
                [IMAGE_PLACEHOLDER_10]
            `;

            // === SINGLE-SHOT GENERATION (Full Article) ===
            console.log(`    📝 Generating FULL article with Claude 4.5 Sonnet (max_tokens: 8192)...`);

            const input = {
                system_prompt: "You are an expert SEO content writer. Generate the COMPLETE article with JSON metadata followed by full HTML content. \n\nIMPORTANT: You MUST wrap the HTML content in `[[[HTML_CONTENT_START]]]` and `[[[HTML_CONTENT_END]]]` markers. \n\nCRITICAL: Ensure the content is VERY LONG, DETAILED, and includes ALL [IMAGE_PLACEHOLDER_X] markers exactly as requested in the HTML. Do not skip any section.\n\nREQUIRED JSON STRUCTURE:\n{\n  \"title_translated\": \"Title of the article\",\n  \"meta_description\": \"SEO Description (150 chars)\",\n  \"quick_answer\": \"A direct, concise answer to the main topic (50-80 words).\",\n  \"faq\": [{ \"question\": \"Question?\", \"answer\": \"Answer.\" }]\n}\n\nExample Output:\n```json\n{\n  \"title_translated\": \"...\",\n  \"meta_description\": \"...\",\n  \"quick_answer\": \"...\",\n  \"faq\": [...]\n}\n```\n\n[[[HTML_CONTENT_START]]]\n<!DOCTYPE html>\n...\n[[[HTML_CONTENT_END]]]",
                prompt: prompt,
                max_tokens: 8192,
                temperature: 0.7
            };

            const response = await replicate.run("anthropic/claude-4.5-sonnet", { input });
            console.log('    🔍 DEBUG: output type =', typeof response, '| isArray =', Array.isArray(response), '| length =', response?.length);
            if (!response || (Array.isArray(response) && response.length === 0)) {
                throw new Error('Replicate API returned empty or undefined output');
            }
            const fullText = Array.isArray(response) ? response.join('') : String(response);
            console.log('    🔍 DEBUG: fullText length =', fullText.length, '| first 200 chars:', fullText.substring(0, 200));

            // Extract JSON from markdown code block or loose JSON
            let jsonString = '';
            const codeBlockMatch = fullText.match(/```(?:json)?\s*\n?({[\s\S]*?})\n?```/);
            if (codeBlockMatch) {
                jsonString = codeBlockMatch[1].trim();
            } else {
                // Fallback: find balanced braces
                const firstBrace = fullText.indexOf('{');
                if (firstBrace === -1) throw new Error('No JSON found');
                let depth = 0;
                let endBrace = -1;
                for (let i = firstBrace; i < fullText.length; i++) {
                    if (fullText[i] === '{') depth++;
                    if (fullText[i] === '}') depth--;
                    if (depth === 0) { endBrace = i; break; }
                }
                if (endBrace === -1) throw new Error('Unbalanced JSON braces');
                jsonString = fullText.substring(firstBrace, endBrace + 1);
            }
            console.log('    🔍 DEBUG: jsonString length =', jsonString.length);

            // Clean and parse JSON
            jsonString = jsonString.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
            const metadata = JSON.parse(jsonString);

            // Validate Title Length
            if (metadata.title_translated && metadata.title_translated.length > 75) {
                console.warn(`    ⚠️ Title too long (${metadata.title_translated.length} chars). Truncating...`);
                metadata.title_translated = metadata.title_translated.substring(0, 70).replace(/\s+\S*$/, '');
            }

            // Extract HTML content with ROBUST markers
            // Try explicit markers first, then fallback to markdown block
            const markers = [
                ['[[[HTML_CONTENT_START]]]', '[[[HTML_CONTENT_END]]]'],
                ['---HTML_CONTENT_START---', '---HTML_CONTENT_END---'],
                ['<!DOCTYPE html>', '</html>']
            ];

            let htmlContent = '';
            for (const [start, end] of markers) {
                let sIdx = fullText.indexOf(start);
                let eIdx = fullText.indexOf(end);

                if (sIdx !== -1) {
                    if (eIdx === -1) eIdx = fullText.length; // Handle truncation
                    // Adjust start index if it's a marker (length added) vs doc start (no length added)
                    const offset = start.startsWith('<') ? 0 : start.length;

                    // If using doctype/html tag, we include them. If using markers, we exclude them.
                    htmlContent = fullText.substring(sIdx + offset, eIdx + (end.startsWith('<') ? end.length : 0)).trim();
                    break;
                }
            }

            if (!htmlContent) {
                // Last ditch effort: content strictly after the JSON block
                const jsonEndIndex = fullText.indexOf(jsonString) + jsonString.length;
                const potentialHtml = fullText.substring(jsonEndIndex).trim();
                // Check if it looks like HTML
                if (potentialHtml.includes('<h1') || potentialHtml.includes('<body')) {
                    htmlContent = potentialHtml;
                    console.log('    ⚠️ Fallback: Using content after JSON as HTML.');
                } else {
                    throw new Error('HTML content markers not found and fallback failed');
                }
            }

            // Clean up any leftover (markdown) markers
            htmlContent = htmlContent.replace(/```html/g, '').replace(/```/g, '').replace(/\[\[\[.*?\]\]\]/g, '').trim();

            if (htmlContent.length < 2000) throw new Error(`Generated HTML too short (${htmlContent.length} chars). Expected 2000+.`);

            console.log('    ✅ Full article generated successfully! HTML length:', htmlContent.length);

            const enContent = {
                ...metadata,
                content_html: htmlContent
            };
            return enContent;
        } catch (e) {
            console.warn(`    ⚠️ JSON Parse/API Error: ${e.message}. Retrying...`);
            console.log('--- DEBUG: RAW OUTPUT START ---');
            console.log('Error details:', e);
            console.log('--- DEBUG: RAW OUTPUT END ---');
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
            console.log(`    🤖 Translating with Claude 4.5 Sonnet (${retries} attempts left)...`);

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
                system_prompt: `You are a professional translator. Translate everything to ${lang.name} accurately.`,
                prompt: prompt,
                max_tokens: 8192,
                temperature: 0.7,
                top_p: 0.9
            };

            output = await replicate.run('anthropic/claude-4.5-sonnet', { input });
            fullText = Array.isArray(output) ? output.join('') : String(output);

            // 1. Extract JSON Metadata from code block or balanced braces
            let jsonString = '';
            const codeBlockMatch = fullText.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
            if (codeBlockMatch) {
                jsonString = codeBlockMatch[1].trim();
            } else {
                // Fallback: find balanced braces
                const firstBrace = fullText.indexOf('{');
                if (firstBrace === -1) throw new Error('No JSON found in translation');
                let depth = 0;
                let endBrace = -1;
                for (let i = firstBrace; i < fullText.length; i++) {
                    if (fullText[i] === '{') depth++;
                    if (fullText[i] === '}') depth--;
                    if (depth === 0) { endBrace = i; break; }
                }
                if (endBrace === -1) throw new Error('Unbalanced JSON braces in translation');
                jsonString = fullText.substring(firstBrace, endBrace + 1);
            }
            console.log('    🔍 DEBUG: Translation jsonString length =', jsonString.length);

            // Clean and parse
            jsonString = jsonString.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
            const metadata = JSON.parse(jsonString);

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
        "Young woman influencer talking to camera in modern apartment, natural lighting, casual outfit, authentic UGC style",
        "Male tech reviewer holding smartphone, professional home office background, enthusiastic expression, no text",
        "Real estate agent woman smiling in front of luxury house, professional attire, sunny day, confident pose",
        "Lifestyle vlogger filming selfie video with ring light, cozy bedroom setup, warm tones, genuine smile",
        "Female fitness influencer in workout clothes, gym background, motivational pose, energetic expression",
        "Young entrepreneur man working on laptop in coffee shop, casual creative style, focused expression",
        "Beauty influencer applying makeup in vanity mirror, soft lighting, elegant setup, tutorial style",
        "Food blogger presenting dish in restaurant, appetizing presentation, warm ambiance, excited face",
        "Travel vlogger with backpack in scenic location, adventure style, candid moment, outdoor lighting",
        "Digital marketer woman at desktop computer, modern office, confident professional look, clean background"
    ];

    for (let i = 0; i < count; i++) {
        const p = `${prompts[i % prompts.length]}, realistic, 8k, cinematic lighting, soft focus background, no text, no writing, no letters, no words`;
        const url = await generateSingleImage(p);

        if (url) {
            const filename = `img-${Date.now()}-${i}.png`;
            const localPath = path.join(__dirname, 'public/blog-images', filename);
            const relativePath = `/blog-images/${filename}`;
            if (!fs.existsSync(path.dirname(localPath))) fs.mkdirSync(path.dirname(localPath), { recursive: true });
            try {
                await downloadImage(url, localPath);
                images.push({ url: relativePath, alt: prompts[i % prompts.length] });
            } catch (e) {
                images.push({ url: 'https://placehold.co/800x450?text=Image+Error', alt: 'Image generation error placeholder' });
            }
        } else {
            images.push({ url: 'https://placehold.co/800x450?text=Gen+Failed', alt: 'Image generation failed placeholder' });
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

function createPageTsx(topic, content, images, lang, relatedArticles = []) {
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

    // Replace [LANDING_PAGE_URL] with actual landing page URL based on language
    const landingPageUrl = lang === 'en' ? 'https://admakerai.app' : `https://admakerai.app/${lang}`;
    htmlContent = htmlContent.replace(/\[LANDING_PAGE_URL\]/g, landingPageUrl);

    // Clean up HTML content (remove DOCTYPE, html, body, style tags)
    htmlContent = htmlContent
        .replace(/<!DOCTYPE[^>]*>/i, '')
        .replace(/<html[^>]*>/i, '')
        .replace(/<\/html>/i, '')
        .replace(/<head>[\s\S]*?<\/head>/i, '') // Remove head and everything in it (styles, titles)
        .replace(/<body[^>]*>/i, '')
        .replace(/<\/body>/i, '')
        .replace(/<style[\s\S]*?<\/style>/ig, ''); // Just in case style is outside head

    // Replace Image Placeholders with actual images
    images.forEach((imgObj, idx) => {
        // Use standard img tag with robust regex
        // Use standard img tag with robust regex
        const stdImgTag = `<img src="${imgObj.url}" alt="${imgObj.alt} - ${topic.keyword}" loading="lazy" class="w-full rounded-xl my-8 hover:opacity-95 transition" />`;
        // Replace [IMAGE_PLACEHOLDER_1], [IMAGE_PLACEHOLDER_1: Description], etc.
        // Regex matches [IMAGE_PLACEHOLDER_X] or [IMAGE_PLACEHOLDER_X: ...]
        const regex = new RegExp(`\\[IMAGE_PLACEHOLDER_${idx + 1}(?:\\s*:[^\\]]*)?\\]`, 'gi');
        htmlContent = htmlContent.replace(regex, stdImgTag);
    });

    // Pink Links (Internal) - Removed highlight-link class as requested
    htmlContent = htmlContent.replace(
        /\[INTERNAL_LINK:\s*([^|]+?)\s*\|\s*([^\]]+?)\]/g,
        '<a href="$2">$1</a>'
    );

    // Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": content.title_translated,
        "image": images[0] ? images[0].url : '',
        "author": {
            "@type": "Person",
            "name": "Alex",
            "jobTitle": "Head of Video Strategy",
            "url": "https://admakerai.app/blog"
        },
        "publisher": {
            "@type": "Organization",
            "name": "AdMaker AI",
            "logo": {
                "@type": "ImageObject",
                "url": "https://admakerai.app/logo.png"
            }
        },
        "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": content.faq ? content.faq.map(f => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": { "@type": "Answer", "text": f.answer }
            })) : []
        }
    };

    // ...

    // Verify content completeness
    if (!content.title_translated) content.title_translated = topic.keyword;
    if (!content.quick_answer) content.quick_answer = content.meta_description || "Summary not available.";

    return `
'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import BlogVideoSidebar from '@/components/BlogVideoSidebar';
import SimilarArticles from '@/components/SimilarArticles';
import styles from '@/app/blog/compare-pricing-ugc-video-production-tools/Article.module.css';
import Image from 'next/image';

function getLandingPageUrl(locale = 'en') {
    if (locale === 'en') return '/';
    return \`/\${locale}\`;
}

export default function BlogPost() {
    const locale = '${lang}';
    const landingPageUrl = getLandingPageUrl(locale);
    const [showStickyCta, setShowStickyCta] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyCta(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const jsonLd = ${JSON.stringify(jsonLd)};

    return (
        <>
            <Head>
                <title>${content.title_translated} | AdMaker AI</title>
                <meta name="description" content="${content.meta_description}" />
                <link rel="canonical" href="https://admakerai.app/blog/${topic.slug}" />
                <link rel="alternate" hrefLang="en" href="https://admakerai.app/blog/${topic.slug}" />
                <link rel="alternate" hrefLang="fr" href="https://admakerai.app/fr/blog/${topic.slug}" />
                <link rel="alternate" hrefLang="es" href="https://admakerai.app/es/blog/${topic.slug}" />
                <link rel="alternate" hrefLang="pt" href="https://admakerai.app/pt/blog/${topic.slug}" />
                <link rel="alternate" hrefLang="de" href="https://admakerai.app/de/blog/${topic.slug}" />
                <link rel="alternate" hrefLang="x-default" href="https://admakerai.app/blog/${topic.slug}" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Head>
            
            <Navbar lang="${lang}" />
            
            <div className={styles.pageContainer}>
                <div className={styles.contentWrapper}>
                    <main className={styles.mainContent}>
                        <article className={styles.articleContent}>
                            <header className={styles.articleHeader}>
                                <h1 className={styles.mainTitle}>
                                    ${content.title_translated}
                                </h1>
                                <div className={styles.heroImage}>
                                    <Image
                                        src="${images[0] ? images[0].url : 'https://placehold.co/1200x630'}"
                                        alt="${images[0] ? images[0].alt : content.title_translated}"
                                        width={1280}
                                        height={720}
                                        priority
                                        className="w-full h-auto object-cover rounded-xl"
                                    />
                                </div>
                            </header>

                            <section className={styles.section}>
                                <h2>Quick Answer</h2>
                                <p>${content.quick_answer}</p>
                            </section>

                            <div 
                                className={styles.articleBody}
                                dangerouslySetInnerHTML={{ __html: ${JSON.stringify(htmlContent)} }} 
                            />

                            {/* FAQ Section */}
                            <section id="faq" className={styles.section}>
                                <h2>FAQ</h2>
                                ${content.faq ? content.faq.map(f => `
                                <div className="mb-6">
                                    <h3 className="font-bold text-xl mb-2">${f.question}</h3>
                                    <p>${f.answer}</p>
                                </div>
                                `).join('') : ''}
                            </section>
                        </article>
                        
                        <BlogVideoSidebar locale={locale} />
                    </div>
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <SimilarArticles currentSlug="${topic.slug}" locale={locale} matches={${JSON.stringify(relatedArticles)}} />
            </div>

            {/* Sticky Mobile CTA */}
            <a
                href={landingPageUrl}
                className={\`\${styles.stickyCta} \${showStickyCta ? styles.stickyCtaVisible : ''}\`}
                aria-label="Create your AI Ads now"
            >
                Create your AI Ads now <span className={styles.emojiPointer}>👉</span>
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

    // Check if link already exists to avoid duplicates
    if (content.includes(linkPath)) {
        console.log(`    ⚠️ Blog index entry already exists for ${linkPath}`);
        return;
    }

    // Standard card injection with correct clean JSX
    const newCard = `
                        <Link href="${linkPath}" className={styles.blogCard}>
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
                                <div className={styles.cardMeta}>
                                    <span>${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </Link>`;

    // Robust regex replacement to find the opening tag of the grid
    // Matches: className={styles.blogGrid}, allowing for newlines and spaces
    // CAPTURING GROUP added so $1 works in replace
    const gridRegex = /(className=\{styles\.blogGrid\}\s*>)/;

    if (gridRegex.test(content)) {
        content = content.replace(gridRegex, `$1\n${newCard}`);
        fs.writeFileSync(listPath, content);
        console.log(`    ✅ Updated blog index at ${listPath}`);
    } else {
        console.warn(`    ⚠️ Could not find blogGrid in ${listPath}`);
    }
}

function getRelatedArticles(allTopics, currentKeyword, langCode) {
    // Helper to get random related articles from completed topics
    const candidates = allTopics.filter(t => t.status === 'completed' && t.keyword !== currentKeyword);
    if (candidates.length === 0) return [];

    // Shuffle and pick 3
    const shuffled = candidates.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    return selected.map(t => {
        // Determine slug
        let slugCandidate = t.translatedSlugs?.[langCode] || t.translatedSlugs?.['en'];
        // Fallback slug generation if not cached
        if (!slugCandidate) {
            slugCandidate = t.keyword.toString().toLowerCase().trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }

        // Ensure path logic matches standard
        const prefix = langCode === 'en' ? '/blog' : `/${langCode}/blog`;

        // Get Translated Title if available, else EN h1/keyword
        const title = t.translatedTitles?.[langCode] || t.translatedTitles?.['en'] || t.h1 || t.keyword;

        // Get Real Image if available
        const image = t.primaryImage || "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop";

        return {
            slug: `${prefix}/${slugCandidate}`,
            title: title, // Updated to use real title
            image: image, // Updated to use real image
            category: "Guide",
            date: new Date(t.completedDate || Date.now()).toLocaleDateString(langCode, { month: 'long', year: 'numeric' })
        };
    });
}

main();
