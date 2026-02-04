const fs = require('fs');
const path = require('path');
const Replicate = require('replicate');

// --- Configuration ---
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const VEO_API_KEY = process.env.VEO_API_KEY; // Previously KIE_API_KEY
// Adjusted path since script is now in root
const BLOG_TOPICS_FILE = path.join(__dirname, 'data/blog-topics.json');

const LANGUAGES = [
    { code: 'en', dir: path.join(__dirname, 'app/blog') },
    { code: 'fr', dir: path.join(__dirname, 'app/fr/blog') },
    { code: 'es', dir: path.join(__dirname, 'app/es/blog') },
    { code: 'pt', dir: path.join(__dirname, 'app/pt/blog') },
    { code: 'de', dir: path.join(__dirname, 'app/de/blog') },
    { code: 'ko', dir: path.join(__dirname, 'app/ko/blog') },
    { code: 'ja', dir: path.join(__dirname, 'app/ja/blog') }
];

const replicate = new Replicate({
    auth: REPLICATE_API_TOKEN,

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    console.log('🚀 Starting Multilingual Daily Blog Generation (Strict SEO Mode)...');

    if (!REPLICATE_API_TOKEN || !VEO_API_KEY) {
        console.error('❌ Missing API Keys (REPLICATE_API_TOKEN or VEO_API_KEY)');
        process.exit(1);
    }

    if (!fs.existsSync(BLOG_TOPICS_FILE)) {
        console.error('❌ data/blog-topics.json not found');
        process.exit(1);
    }

    const topics = JSON.parse(fs.readFileSync(BLOG_TOPICS_FILE, 'utf8'));

    // Select up to 2 pending topics
    const pendingTopics = topics.filter(t => t.status === 'pending');

    if (pendingTopics.length === 0) {
        console.log('✅ No pending topics found.');
        return;
    }

    const limit = 2;
    const topicsToProcess = pendingTopics.slice(0, limit);

    for (const topic of topicsToProcess) {
        console.log(`\n📝 Processing Topic: ${topic.h1} (${topic.slug})`);

        const enPostPath = path.join(LANGUAGES[0].dir, topic.slug);
        if (fs.existsSync(enPostPath)) {
            console.log('  ⚠️ Post already exists in EN, skipping generation checks and marking complete.');
        } else {
            // 2. Generate Images (10 images per topic)
            const imageUrls = await generateBlogImages(topic.keyword, 10);

            // 3. Iterate Languages
            for (const lang of LANGUAGES) {
                console.log(`  🌐 Generating for Lang: ${lang.code.toUpperCase()}`);

                if (!fs.existsSync(lang.dir)) {
                    fs.mkdirSync(lang.dir, { recursive: true });
                }

                try {
                    const articleContent = await generateArticleContent(topic, lang.code);

                    const postDir = path.join(lang.dir, topic.slug);
                    if (!fs.existsSync(postDir)) {
                        fs.mkdirSync(postDir, { recursive: true });
                    }

                    const pageContent = createPageTsx(topic, articleContent, imageUrls, lang.code);
                    fs.writeFileSync(path.join(postDir, 'page.tsx'), pageContent);
                    console.log(`    ✅ Created ${lang.code}/blog/${topic.slug}/page.tsx`);

                    updateBlogIndex(lang.dir, topic, imageUrls[0], lang.code, articleContent.title_translated || topic.h1);

                    await sleep(3000);

                } catch (err) {
                    console.error(`    ❌ Failed generation for ${lang.code}:`, err.message);
                }
            }
        }

        // 4. Mark Complete
        const originalIndex = topics.findIndex(t => t.keyword === topic.keyword);
        if (originalIndex !== -1) {
            topics[originalIndex].status = 'completed';
            topics[originalIndex].completedDate = new Date().toISOString();
        }
    }

    fs.writeFileSync(BLOG_TOPICS_FILE, JSON.stringify(topics, null, 2));
    console.log('\n✅ Task Complete');
}

async function generateArticleContent(topic, langCode) {
    let retries = 3;
    while (retries > 0) {
        try {
            console.log(`    🤖 Asking Claude (${retries} attempts left)...`);
            const prompt = `
            You are an expert SEO Content Writer for "AdMaker AI". Write a high-ranking blog post.
            
            **Input Data**:
            - Keyword: "${topic.keyword}"
            - Target Language: "${langCode}"
            
            **Strict Content Requirements**:
            1. **Title H1**: Must be ~70 chars, start with "Best way", "How to", or "Top 5/10". Translated to ${langCode}.
            2. **Length**: ~2000-2500 words.
            3. **Quick Answer**: Start with a "Quick Answer" or "Summary" distinct block.
            4. **Internal Links**: Include ~10 internal links (e.g., to /pricing, /contact, /blog) **early** in the article. 
               - **IMPORTANT**: Mark them as [INTERNAL_LINK: anchor_text | url].
            5. **External Links**: Include ~5 high-authority external links near the **end** of the article.
            6. **FAQ**: Exactly 15 relevant questions/answers.
            7. **Tone**: Authenticity, "I tested this", data-backed numbers.
            8. **Structure**: 
               - Use <h2> and <h3>. 
               - Include EXACTLY 10 image placeholders: [IMAGE_PLACEHOLDER_1]...[IMAGE_PLACEHOLDER_10].
            
            **Output Format**:
            Return ONLY a valid JSON object:
            {
               "title_translated": "...", 
               "meta_description": "...",
               "quick_answer": "...",
               "content_html": "HTML string... (do not include <html> or <body> tags, just inner content)",
               "faq": [ { "question": "...", "answer": "..." } ... ]
            }
            `;

            const input = {
                prompt: prompt,
                max_tokens: 8192,
                system_prompt: "You are a JSON-only response bot. Never output markdown fencing like ```json."
            };

            const output = await replicate.run("anthropic/claude-4.5-sonnet:891395562725dcbe6af92af87997cd7d353683f2dc9f375fcca13824f15d7881", { input });
            let fullText = Array.isArray(output) ? output.join('') : output;

            fullText = fullText.replace(/```json/g, '').replace(/```/g, '').trim();
            const firstBrace = fullText.indexOf('{');
            const lastBrace = fullText.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                fullText = fullText.substring(firstBrace, lastBrace + 1);
            }

            return JSON.parse(fullText);
        } catch (e) {
            console.warn(`    ⚠️ JSON Parse/API Error: ${e.message}. Retrying...`);
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
            headers: { 'Authorization': `Bearer ${KIE_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'z-image', input: { prompt, aspect_ratio: '16:9' } })
        });
        const data = await res.json();
        if (data.code !== 200) return null;

        const taskId = data.data.taskId;
        for (let i = 0; i < 45; i++) {
            await sleep(2000);
            const check = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
                headers: { 'Authorization': `Bearer ${KIE_API_KEY}` }
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

    // Replace Image Placeholders
    images.forEach((img, idx) => {
        // Use standard img tag for simplicity within dangerouslySetInnerHTML
        const stdImgTag = `<img src="${img}" alt="${topic.keyword}" class="w-full rounded-xl my-8 hover:opacity-95 transition" />`;
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
import styles from './Article.module.css'; // Assuming this exists in the root or a standard import is possible. 
// Wait, if we are creating file in app/blog/[slug]/page.tsx, then relative path is ../Article.module.css? 
// No, previously it was import styles from './Article.module.css'; which means it was in SAME folder.
// Since we are creating a new folder, we won't have the CSS file there.
// We MUST either inject styles or assume global styles/tailwind.
// To fix "Missing CSS", I will use a path assuming it's in a shared location, OR just comment out styles import and rely on Tailwind.
// The user's code relies on Tailwind mostly now.
// I will REMOVE the css module import to prevent build errors and rely on Tailwind classes used in the JSX.
// import styles from './Article.module.css'; << REMOVED

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
                        dangerouslySetInnerHTML={{ __html: \`${htmlContent.replace(/`/g, '\\`')}\` }} 
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
    const linkPath = \`/\${lang === 'en' ? 'blog' : lang + '/blog'}/\${topic.slug}\`;
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
            `className = { styles.blogGrid } >\n${ newCard } `
        );
        fs.writeFileSync(listPath, content);
    }
}

main();
