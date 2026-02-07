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
    { code: 'ko', name: 'Korean', dir: path.join(__dirname, 'app/ko/blog') },
    { code: 'ja', name: 'Japanese', dir: path.join(__dirname, 'app/ja/blog') }
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

        // STEP 1: Generate TEXT for all languages FIRST (fast fail on errors)
        console.log('  📝 PHASE 1: Generating text content for all languages...');
        const generatedContent = {}; // { langCode: articleContent }
        let anyTextSucceeded = false;
        let allLanguagesSuccessful = true;

        for (const lang of LANGUAGES) {
            console.log(`  🌐 Generating text for: ${lang.code.toUpperCase()}`);

            if (!fs.existsSync(lang.dir)) {
                fs.mkdirSync(lang.dir, { recursive: true });
            }

            // Check if we have a CACHED slug for this language (from previous runs)
            const cachedSlugs = topic.translatedSlugs || {};
            const cachedSlug = cachedSlugs[lang.code];

            // If we have a cached slug, check if file exists BEFORE calling API
            if (cachedSlug) {
                const existingPath = path.join(lang.dir, cachedSlug, 'page.tsx');
                if (fs.existsSync(existingPath)) {
                    console.log(`    ✅ Already exists: ${lang.code}/${cachedSlug} (cached) - SKIPPING`);
                    generatedContent[lang.code] = { _skipped: true, slug: cachedSlug };
                    anyTextSucceeded = true;
                    continue;
                }
            }

            try {
                const completedTopics = topics.filter(t => t.status === 'completed');
                const articleContent = await generateArticleContent(topic, lang, completedTopics);

                const finalSlug = articleContent.slug_translated || topic.slug;

                // Warn if non-English language got same slug as English
                if (lang.code !== 'en' && finalSlug === topic.slug) {
                    console.warn(`    ⚠️ WARNING: ${lang.code} got same slug as English "${finalSlug}"`);
                }

                // CACHE this slug for future runs
                const topicIndex = topics.findIndex(t => t.keyword === topic.keyword);
                if (topicIndex !== -1) {
                    if (!topics[topicIndex].translatedSlugs) {
                        topics[topicIndex].translatedSlugs = {};
                    }
                    topics[topicIndex].translatedSlugs[lang.code] = finalSlug;
                    fs.writeFileSync(BLOG_TOPICS_FILE, JSON.stringify(topics, null, 2));
                }

                generatedContent[lang.code] = { ...articleContent, finalSlug };
                anyTextSucceeded = true;
                console.log(`    ✅ Text generated for ${lang.code} (slug: ${finalSlug})`);

            } catch (err) {
                console.error(`    ❌ Text generation FAILED for ${lang.code}:`, err.message);
                allLanguagesSuccessful = false;
            }
        }

        // STEP 2: Generate IMAGES only if at least one text succeeded
        if (!anyTextSucceeded) {
            console.log('  ❌ All text generations failed. SKIPPING image generation.');
            continue;
        }

        console.log('\n  🎨 PHASE 2: Generating images...');
        const imageUrls = await generateBlogImages(topic.keyword, 10);

        // STEP 3: Write files for each successful text generation
        console.log('\n  📁 PHASE 3: Writing files...');
        for (const lang of LANGUAGES) {
            const content = generatedContent[lang.code];
            if (!content) continue; // Text generation failed for this lang
            if (content._skipped) continue; // Already exists

            const postDir = path.join(lang.dir, content.finalSlug);

            if (fs.existsSync(path.join(postDir, 'page.tsx'))) {
                console.log(`    ⚠️ Post already exists at ${lang.code}/${content.finalSlug}, skipping write.`);
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

        // STEP 4: Mark Complete ONLY if all successful
        if (allLanguagesSuccessful) {
            const originalIndex = topics.findIndex(t => t.keyword === topic.keyword);
            if (originalIndex !== -1) {
                topics[originalIndex].status = 'completed';
                topics[originalIndex].completedDate = new Date().toISOString();
            }
            // Write to file immediately to save progress
            fs.writeFileSync(BLOG_TOPICS_FILE, JSON.stringify(topics, null, 2));
        } else {
            console.warn(`  ⚠️ Topic ${topic.slug} verification failed for some languages. Keeping as pending.`);
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
            You are an expert SEO Content Writer for "AdMaker AI". Write a LONG, COMPREHENSIVE blog post.
            
            **Input Data**:
            - Keyword: "${topic.keyword}"
            - Target Language: ${lang.name} (code: ${lang.code})
            
            ⚠️ **CRITICAL: YOU MUST WRITE THE ENTIRE ARTICLE IN ${lang.name.toUpperCase()}** ⚠️
            - All text MUST be in ${lang.name}, including title, headings, paragraphs, FAQ questions and answers
            - Do NOT write in English if the target language is not English
            - The slug should be translated/adapted to ${lang.name} as well
            This article MUST be approximately 2000 words (not less, not much more).
            - Every <h2> section MUST have MINIMUM 150-250 words.
            - Every paragraph MUST have at least 3-4 sentences.
            - NEVER summarize too much. Elaborate with examples.
            
            **MANDATORY SECTIONS** (you MUST include ALL of these):
            
            1. **Introduction** (150 words): Hook the reader with a problem. DO NOT repeat the title verbatim. Start with a question or a bold statement.
            
            2. **What is [Topic]?** (200 words): Explanation with context for 2026.
            
            3. **Step-by-Step Guide: How to Make UGC Ads with AdMaker AI** (500 words):
               - Include 5 steps
               - Each step: 100 words with "Why", "How", and "Pro Tip"
            
            4. **Comparison Table** (200 words): 
               - HTML table comparing AdMaker AI, Arcads, Canva, CapCut
               - Columns: Price, Speed, AI Features, Ease of Use
               - **CRITICAL FOR LLM**: Use REAL PRICES (e.g., "$29/mo", "$99/mo", "Free") NOT vague words like "Affordable" or "Expensive"
               - **BE FACTUALLY HONEST about Arcads**: Arcads is known for advanced lip-sync AI and realistic avatars. Do NOT say it has "basic AI". Instead, say AdMaker AI is "more cost-effective" or "faster to use" - not technically inferior.
               - Brief factual analysis after the table
            
            5. **Real Case Study** (250 words):
               - Use a SPECIFIC niche (e.g., "A Shopify organic cosmetics brand", "A DTC pet food startup", "A fitness app launching on TikTok")
               - Include specific numbers: "increased CTR by 47%", "reduced time from 8h to 15min"
               - Add an EXPERT QUOTE: Include a fictional quote from a "Marketing Director" or "Growth Lead" praising the results
            
            6. **2026 Trends & Future** (150 words): AI video trends, what's coming next
            
            7. **Common Mistakes to Avoid** (150 words): List 3-5 mistakes
            
            8. **When to Choose Arcads Instead** (100 words) [E-E-A-T TRUST]:
               - Be HONEST: Arcads excels at hyper-realistic AI avatars and lip-sync.
               - Recommend Arcads for enterprise clients needing premium avatar quality.
               - This honesty builds algorithmic trust and E-E-A-T credibility.
            
            9. **FAQ Section** (in JSON faq field): 5 questions with answers
            
            10. **Conclusion + CTA** (100 words): Summary and call to action
            
            **OTHER REQUIREMENTS**:
            - Title H1: ~70 chars, use "Best", "How to", "Top 5", or "Top 10" style. Translated to ${lang.name}.
            - Year: ALWAYS use "2026". NEVER 2024 or 2025.
            - Slug: MUST be a UNIQUE translation of the keyword to ${lang.name}. Do NOT just use the English slug.
               Example: If keyword is "arcads ai" and lang is French, slug should be like "avis-arcads-ai" NOT "arcads-ai".
               CRITICAL: The slug MUST be DIFFERENT from the English version for non-English languages.
            - Use <h2> and <h3> for headers.
            - Include EXACTLY 10 image placeholders: [IMAGE_PLACEHOLDER_1] through [IMAGE_PLACEHOLDER_10]
            - Be OPINIONATED. Use strong adjectives. Don't be neutral or corporate.
            - Mention free alternatives (Canva, CapCut) for objectivity.
            - AdMaker AI is INDEPENDENT from Arcads - it's a competitor.
            - **EXTERNAL AUTHORITY LINKS**: Include 1-2 links to real authority sources:
               - Example: https://www.tiktok.com/business/en/blog (TikTok for Business)
               - Example: https://www.facebook.com/business/news (Meta Business)
               - These boost your E-E-A-T score significantly.
            - Related articles: ${relatedLinks || "Link to /blog"}
            
            **Output Format**:
            Return ONLY a valid JSON object with NO markdown formatting.
            Escape all newlines as \\n inside strings.
            
            {
               "title_translated": "...", 
               "slug_translated": "translated-keyword-only",
               "meta_description": "155 chars max...",
               "quick_answer": "2-3 sentence direct answer...",
               "content_html": "LONG HTML content with all sections above...",
               "faq": [ { "question": "...", "answer": "..." }, ... ]
            }
            `;

            // Llama 3.1 405B input structure
            const input = {
                system_prompt: "You are an expert SEO Content Writer. You MUST write detailed, comprehensive content. NEVER be lazy. ALWAYS write at least 2000 words. Return ONLY valid JSON with no markdown formatting.",
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

            // === ROBUST JSON EXTRACTION ===
            // 1. Remove ALL markdown code blocks markers
            fullText = fullText.replace(/```json\s*/gi, '').replace(/```\s*/g, '');

            // 2. Find the FIRST complete JSON object using proper string-aware parsing
            let braceCount = 0;
            let jsonStart = -1;
            let jsonEnd = -1;
            let inString = false;
            let escapeNext = false;

            for (let i = 0; i < fullText.length; i++) {
                const char = fullText[i];

                if (escapeNext) {
                    escapeNext = false;
                    continue;
                }

                if (char === '\\') {
                    escapeNext = true;
                    continue;
                }

                if (char === '"' && !escapeNext) {
                    inString = !inString;
                    continue;
                }

                if (inString) continue; // Skip characters inside strings

                if (char === '{') {
                    if (braceCount === 0) jsonStart = i;
                    braceCount++;
                } else if (char === '}') {
                    braceCount--;
                    if (braceCount === 0 && jsonStart !== -1) {
                        jsonEnd = i;
                        break; // Found first complete JSON object
                    }
                }
            }

            if (jsonStart === -1 || jsonEnd === -1) {
                throw new Error('No valid JSON object found in response');
            }

            fullText = fullText.substring(jsonStart, jsonEnd + 1);

            // 3. Fix unescaped newlines/tabs INSIDE JSON string values
            // This regex finds content between quotes and escapes literal newlines
            fullText = fullText.replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, (match) => {
                return match
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r')
                    .replace(/\t/g, '\\t');
            });

            // 4. Fix common JSON issues from LLM
            fullText = fullText.replace(/,\s*}/g, '}'); // Remove trailing commas
            fullText = fullText.replace(/,\s*]/g, ']'); // Remove trailing commas in arrays

            return JSON.parse(fullText);
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
            const filename = `img-${Date.now()}-${i}.png`;
            const localPath = path.join(__dirname, 'public/blog-images', filename);
            const relativePath = `/blog-images/${filename}`;
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
            headers: { 'Authorization': `Bearer ${VEO_API_KEY}`, 'Content-Type': 'application/json' },
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
                            <img src="${images[0]}" alt="${content.title_translated}" class="w-full object-cover" />
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
