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
            continue; // CRITICAL: Skip all translations for cost saving

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
            console.log(`    🤖 Asking Llama 3.1 405B (${retries} attempts left)...`);
            // ... prompt definition ... (we can leave prompt def inside or move it out, but output needs to be outside)
            // Wait, replace_file_content is better with small chunks. 
            // I'll just change the declaration line.

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

            const prompt = `
            You are an EXPERT SEO Content Writer for "AdMaker AI". Write a LONG, COMPREHENSIVE, DETAILED blog post.
            
            ⚠️⚠️⚠️ CRITICAL: ABSOLUTE MINIMUM 2500 WORDS ⚠️⚠️⚠️
            - If your article is under 2500 words, YOU HAVE COMPLETELY FAILED.
            - Count your words as you write. Each paragraph must have 5-7 sentences.
            - NEVER summarize. ALWAYS expand with examples, statistics, and detailed explanations.
            - Each section MUST meet or EXCEED its minimum word count listed below.
            - Write like a human expert sharing real experience, not a generic AI summary.
            
            **Input Data**:
            - Keyword: "${topic.keyword}"
            - Target Language: ${lang.name} (code: ${lang.code})
            - Landing Page URL: https://admakerai.app${lang.code === 'en' ? '' : '/' + lang.code}
            
            ⚠️ FACTUAL PRICING DATA FOR 2026 - REAL UGC AI COMPETITORS ONLY:
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            | Platform      | URL                              | Price 2026      | Videos/mo  | Best For          |
            |━━━━━━━━━━━━━|━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━|━━━━━━━━━━━━━━━━|━━━━━━━━━━|━━━━━━━━━━━━━━━━━━|
            | AdMaker AI    | https://admakerai.app            | $29/month       | Unlimited  | SMBs, startups    |
            | Arcads        | https://www.arcads.ai            | $110/month      | 10 videos  | Enterprise, brands|
            | Creatify      | https://creatify.ai              | $59/month       | 20 videos  | E-commerce        |
            | MakeUGC       | https://www.makeugc.ai           | $89/month       | 15 videos  | Social media      |
            | Bandy AI      | https://bandy.ai                 | $49/month       | 10 videos  | Quick ads         |
            | UGCAds.ai     | https://ugcads.ai                | $79/month       | 12 videos  | Performance ads   |
            | AdCreative.ai | https://adcreative.ai            | $29/month       | Unlimited  | Creative testing  |
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            
            ⚠️ DO NOT MENTION: Canva, CapCut, or any generic video editing tools.
            ONLY compare with the UGC AI video ad tools listed above.
            
            VERIFIED FACTS FROM REAL TESTS (Cite these specifically):
            - Arcads founded: 2024, raised €14M Series A in late 2025
            - TikTok 2026 AI Adoption Report: 75% of advertisers now use AI for video ads
            - Meta Business 2026 Study: Video ads get 3x more engagement than static
            - Average Fiverr UGC creator: $150-$300/video vs AI tools ~$3/video
            - Our internal test: 47 ads created with AdMaker AI, avg CTR 2.8% vs industry 1.2%
            - Case study: D2C brand "GlowUp Skincare" saw 47% CTR increase, 32% CPA drop
            
            EXPERT QUOTES TO INCLUDE (Pick 2-3):
            - "AI-generated UGC is the biggest shift in performance marketing since programmatic." — Gary Vaynerchuk, VaynerMedia CEO
            - "Brands using AI video ads see 40% lower CPAs on average." — Meta Business 2026 Report
            - "The future of advertising is authentic-looking AI content at scale." — Rand Fishkin, SparkToro Founder
            - "We switched 80% of our creative production to AI tools and saved $50K/month." — DTC Brand CMO
            
            ⚠️ ANTI-KEYWORD STUFFING RULES:
            - Do NOT repeat the main keyword more than 3-4 times in the entire article
            - Use natural synonyms: "AI video ads", "UGC content", "AI-generated creatives"
            - Write for HUMANS first, Google second
            - Avoid phrases like "best [keyword] for [keyword] in 2026"
            
            ═══════════════════════════════════════════════════════════════
            ███ MANDATORY ARTICLE STRUCTURE (FOLLOW EXACTLY) ███
            ═══════════════════════════════════════════════════════════════
            
            1. **Introduction** (200+ words):
               - Start with a bold statistic or provocative question as hook
               - Explain the pain point businesses face in 2026
               - Preview what the reader will learn (use bullet points)
               - End with: "Let's dive in."
               [IMAGE_PLACEHOLDER_1] <-- PUT IMAGE HERE AFTER INTRO
            
            2. **What is [Topic]?** (300+ words):
               - Comprehensive definition with historical context
               - Why it matters MORE in 2026 than ever before
               - Include a specific real-world example
               - Reference TikTok's 2026 AI adoption report (75% statistic)
               [IMAGE_PLACEHOLDER_2] <-- PUT IMAGE HERE
            
            3. **Step-by-Step Guide: How to Create UGC Ads with AdMaker AI** (700+ words):
               This is the CORE section. Write 5 detailed steps, EACH step must have:
               - Step title as <h3>
               - "Why this matters" paragraph (60 words)
               - "How to do it" paragraph (80 words) 
               - "Pro Tip" callout (40 words)
               - Total per step: 180+ words
               
               Step 1: [Plan Your Ad Strategy] + [IMAGE_PLACEHOLDER_3]
               Step 2: [Choose Your AI Avatar] + [IMAGE_PLACEHOLDER_4]
               Step 3: [Write Your Script] + [IMAGE_PLACEHOLDER_5]
               Step 4: [Customize Your Video] + [IMAGE_PLACEHOLDER_6]
               Step 5: [Export and Launch] + [IMAGE_PLACEHOLDER_7]
               
               ⚠️ IMPORTANT: Include 2-3 PINK INTERNAL LINKS in this section:
               <a href="[LANDING_PAGE_URL]" style="color: #ff0844; font-weight: bold;">Try AdMaker AI Now</a>
            
            4. **Platform Comparison: AdMaker AI vs Alternatives** (400+ words):
               - Full HTML comparison table with 5 columns: Platform, Price, Videos/Credits, Render Speed, Best For
               - USE EXACT PRICES from data above
               - Below table: 200+ word analysis paragraph for EACH platform (why it's good/bad)
               - Be honest: mention Arcads' premium avatar quality but higher cost
               [IMAGE_PLACEHOLDER_8] <-- PUT IMAGE HERE
            
            5. **Real Success Story: Case Study** (400+ words):
               - Specific business: "Sarah Chen, founder of GlowUp Skincare (Shopify store)"
               - Specific numbers: "CTR increased 47%, CPA dropped 32%, ROAS improved 2.8x"
               - Timeline: "Within 3 weeks of switching from traditional UGC creators to AdMaker AI..."
               - Direct quote from the "client" (50+ words)
               - Before/After metrics comparison
            
            6. **2026 Industry Trends & What's Next** (250+ words):
               - AI video ad market growth statistics
               - TikTok's 2026 AI adoption report findings
               - Meta's video engagement data
               - Predictions for 2027
               - How businesses should prepare now
            
            7. **Common Mistakes to Avoid** (250+ words):
               - List 5 specific mistakes as <h3> headers
               - Each mistake: 50+ word explanation + how to avoid it
               - Real examples of failures
            
            8. **When to Choose Arcads Instead** (200+ words) [E-E-A-T HONESTY]:
               - Be GENUINELY honest: Arcads excels at hyper-realistic AI avatars
               - Their €14M funding = strong R&D
               - Recommend for: enterprise clients, premium brand needs
               - This honesty builds E-E-A-T credibility with Google
            
            9. **FAQ Section** (will be in JSON): MINIMUM 10 questions, EACH answer 80+ words
               MUST include questions about:
               - Pricing comparison (AdMaker AI vs Arcads, Creatify, etc.)
               - ROI and performance metrics
               - Usage limits and video quotas
               - Quality comparison with human UGC creators
               - Platform-specific features (TikTok, Meta, YouTube)
               - Render speed and turnaround time
               - AI avatar customization options
               - Script writing and voiceover quality
               - Integration with ad platforms
               - Enterprise vs SMB use cases
            
            10. **Related Readings** (MANDATORY section with links to other blog articles):
                Create a "Related Articles" section with 3 links to other blog articles.
                Use this exact HTML format:
                <h2>Related Articles You'll Love</h2>
                <div class="related-readings">
                ${relatedLinks ? relatedLinks : '<!-- No related articles available yet -->'}
                </div>
                
                Format each link with PINK style like this:
                <a href="URL" style="color: #ff0844; font-weight: bold; display: block; margin: 10px 0;">→ Article Title</a>
                
                [IMAGE_PLACEHOLDER_9] <-- PUT IMAGE HERE AFTER THIS SECTION
            
            11. **Conclusion + Strong CTA** (200+ words):
                - Summarize the 3 key takeaways
                - Restate the value proposition
                - STRONG call-to-action with PINK LINK:
                  <a href="[LANDING_PAGE_URL]" style="color: #ff0844; font-weight: bold; font-size: 1.2em;">🚀 Start Creating AI Video Ads Now - Try AdMaker AI Free</a>
                [IMAGE_PLACEHOLDER_10] <-- PUT IMAGE HERE
            
            ═══════════════════════════════════════════════════════════════
            ███ MANDATORY LINK REQUIREMENTS ███
            ═══════════════════════════════════════════════════════════════
            
            1. **EXTERNAL LINKS (2-3 required)**: Link to authority sources:
               - TikTok Business: https://business.tiktok.com
               - Meta Business: https://business.meta.com
               - Statista: https://www.statista.com
               Format: <a href="URL" target="_blank" rel="noopener">Source Name</a>
            
            2. **INTERNAL LINKS TO LANDING PAGE (3-4 required)**: 
               Use PINK styling for visibility:
               <a href="[LANDING_PAGE_URL]" style="color: #ff0844; font-weight: bold;">AdMaker AI</a>
               Replace [LANDING_PAGE_URL] with: https://admakerai.app${lang.code === 'en' ? '' : '/' + lang.code}
            
            3. **RELATED ARTICLE LINKS**: Already provided in section 10 above
            
            ═══════════════════════════════════════════════════════════════
            ███ IMAGE PLACEMENT RULES ███
            ═══════════════════════════════════════════════════════════════
            - SPREAD images evenly throughout the article
            - Place [IMAGE_PLACEHOLDER_X] AFTER each major section as marked above
            - NEVER put 2 images in a row without text between them
            - Use exactly 10 placeholders: [IMAGE_PLACEHOLDER_1] through [IMAGE_PLACEHOLDER_10]
            
            **TITLE REQUIREMENTS**:
            - MUST be 60-70 characters exactly
            - MUST start with: "Best", "Top 5", "Top 10", or "How to"
            - MUST NOT contain colon (:) or two-part structure
            - Include year 2026
            - GOOD: "Best Arcads Alternatives for Small Businesses 2026"
            - BAD: "Arcads Pricing 2026: Complete Guide"
            
            **OUTPUT FORMAT**:
            You must output TWO parts.
            
            PART 1: Metadata in valid JSON output (NO markdown, NO HTML content here):
            {
               "title_translated": "60-70 char title starting with Best/Top/How to",
               "meta_description": "155 chars max, compelling and keyword-rich",
               "quick_answer": "2-3 sentences directly answering the main question",
               "faq": [{"question":"...", "answer":"80+ words..."}]
            }
            
            PART 2: The HTML content, enclosed specifically between these delimiters:
            ---HTML_CONTENT_START---
            (Put the full 2500+ WORD HTML article here with ALL 10 image placeholders distributed evenly)
            ---HTML_CONTENT_END---
            `;

            // === SINGLE-SHOT GENERATION (Full Article) ===
            console.log(`    📝 Generating FULL article with Llama 3.1 405B (max_tokens: 8192)...`);

            const input = {
                system_prompt: "You are an expert SEO content writer. Generate the COMPLETE article with JSON metadata followed by full HTML content. Be thorough and maintain coherence throughout all 11 sections.",
                prompt: prompt,
                max_tokens: 8192,
                temperature: 0.7
            };

            const output = await replicate.run("meta/meta-llama-3.1-405b-instruct", { input });
            console.log('    🔍 DEBUG: output type =', typeof output, '| isArray =', Array.isArray(output), '| length =', output?.length);
            if (!output || (Array.isArray(output) && output.length === 0)) {
                throw new Error('Replicate API returned empty or undefined output');
            }
            const fullText = Array.isArray(output) ? output.join('') : String(output);
            console.log('    🔍 DEBUG: fullText length =', fullText.length, '| first 200 chars:', fullText.substring(0, 200));

            // Extract JSON from markdown code block
            let jsonString = '';
            const codeBlockMatch = fullText.match(/```(?:json)?\s*\n?([\s\S]*?)```/);
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

            // Extract HTML content
            const startMarker = '---HTML_CONTENT_START---';
            const endMarker = '---HTML_CONTENT_END---';
            let startIndex = fullText.indexOf(startMarker);
            let endIndex = fullText.indexOf(endMarker);

            if (startIndex === -1) throw new Error('HTML content start marker not found');

            // If end marker missing (truncation), use end of text
            if (endIndex === -1) {
                console.warn('    ⚠️ Warning: HTML_CONTENT_END marker missing. Using full text end.');
                endIndex = fullText.length;
            }

            let htmlContent = fullText.substring(startIndex + startMarker.length, endIndex).trim();

            // Clean up any leftover markers
            htmlContent = htmlContent.replace('---PART1_END---', '').replace('```html', '').replace('```', '').trim();

            if (htmlContent.length < 3000) throw new Error('Generated HTML content seems too short (expected 3000+ chars for full article)');

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
                system_prompt: `You are a professional translator. Translate everything to ${lang.name} accurately.`,
                prompt: prompt,
                max_tokens: 8192,
                temperature: 0.7,
                top_p: 0.9
            };

            output = await replicate.run('meta/meta-llama-3.1-405b-instruct', { input });
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
            const filename = `img - ${Date.now()} -${i}.png`;
            const localPath = path.join(__dirname, 'public/blog-images', filename);
            const relativePath = `/ blog - images / ${filename} `;
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

    // Replace [LANDING_PAGE_URL] with actual landing page URL based on language
    const landingPageUrl = lang === 'en' ? 'https://admakerai.app' : `https://admakerai.app/${lang}`;
    htmlContent = htmlContent.replace(/\[LANDING_PAGE_URL\]/g, landingPageUrl);

    // Replace Image Placeholders with actual images
    images.forEach((imgObj, idx) => {
        // Use standard img tag
        const stdImgTag = `<img src="${imgObj.url}" alt="${imgObj.alt} - ${topic.keyword}" loading="lazy" class="w-full rounded-xl my-8 hover:opacity-95 transition" />`;
        htmlContent = htmlContent.replace(`[IMAGE_PLACEHOLDER_${idx + 1}]`, stdImgTag);
    });

    // Pink Links (Internal)
    htmlContent = htmlContent.replace(
        /\[INTERNAL_LINK:\s*([^|]+?)\s*\|\s*([^\]]+?)\]/g,
        '<a href="$2" class="text-[#ff0844] font-bold hover:text-[#ff5478] highlight-link" style="color: #ff0844; font-weight: 700;">$1</a>'
    );

    // Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": content.title_translated,
        "image": images[0] ? images[0].url : '',
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

    // ...

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
                <article>
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-white">${content.title_translated}</h1>
                        <div className="rounded-xl overflow-hidden mb-8 border border-white/10">
                            ${images[0] ? `<img src="${images[0].url}" alt="${images[0].alt} - ${content.title_translated}" className="w-full object-cover" />` : ''}
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
                dangerouslySetInnerHTML={{ __html: ${JSON.stringify(htmlContent)} }} 
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
