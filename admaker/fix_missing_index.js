const fs = require('fs');
const path = require('path');

const BLOG_TOPICS_FILE = path.join(__dirname, 'data/blog-topics.json');
const LANGUAGES = [
    { code: 'en', name: 'English', dir: path.join(__dirname, 'app/blog') },
    { code: 'fr', name: 'French', dir: path.join(__dirname, 'app/fr/blog') },
    { code: 'es', name: 'Spanish', dir: path.join(__dirname, 'app/es/blog') },
    { code: 'pt', name: 'Portuguese', dir: path.join(__dirname, 'app/pt/blog') },
    { code: 'de', name: 'German', dir: path.join(__dirname, 'app/de/blog') }
];

function updateBlogIndexLocal(dir, slug, thumbnail, langCode, title, keyword, dateStr) {
    const listPath = path.join(dir, 'page.tsx');
    if (!fs.existsSync(listPath)) return false;

    let content = fs.readFileSync(listPath, 'utf8');
    const prefix = langCode === 'en' ? 'blog' : langCode + '/blog';
    const linkPath = '/' + prefix + '/' + slug;

    // Check if link already exists
    if (content.includes(linkPath)) {
        return false;
    }

    // Standard card injection
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
                                <p className={styles.cardExcerpt}>${keyword}</p>
                                <div className={styles.cardMeta}>
                                    <span>${dateStr}</span>
                                </div>
                            </div>
                        </Link>`;

    const gridRegex = /(className=\{styles\.blogGrid\}\s*>)/;
    if (gridRegex.test(content)) {
        content = content.replace(gridRegex, `$1\n${newCard}`);
        fs.writeFileSync(listPath, content);
        return true;
    }
    return false;
}

function processAll() {
    let topics = JSON.parse(fs.readFileSync(BLOG_TOPICS_FILE, 'utf8'));
    let completed = topics.filter(t => t.status === 'completed');
    let addedCount = 0;

    for (let topic of completed) {
        if (!topic.translatedSlugs) continue;
        const dateStr = topic.completedDate ? new Date(topic.completedDate).toLocaleDateString((langCode) => {
            switch (langCode) {
                case 'fr': return 'fr-FR';
                case 'es': return 'es-ES';
                case 'de': return 'de-DE';
                case 'pt': return 'pt-BR';
                default: return 'en-US';
            }
        }, { month: 'long', year: 'numeric' }) : 'February 2026';

        for (let lang of LANGUAGES) {
            const slug = topic.translatedSlugs[lang.code] || topic.translatedSlugs['en'];
            if (!slug) continue;

            const articlePagePath = path.join(lang.dir, slug, 'page.tsx');
            if (fs.existsSync(articlePagePath)) {
                // Check if it's already in the index first
                const indexContent = fs.readFileSync(path.join(lang.dir, 'page.tsx'), 'utf8');
                const linkPath = '/' + (lang.code === 'en' ? 'blog' : lang.code + '/blog') + '/' + slug;

                if (!indexContent.includes(linkPath)) {
                    // Extract info from the article page
                    const pageCode = fs.readFileSync(articlePagePath, 'utf8');
                    let titleMatch = pageCode.match(/<h1[^>]*>([^<]+)<\/h1>/);
                    let title = titleMatch ? titleMatch[1].trim() : (topic.translatedTitles?.[lang.code] || topic.h1 || topic.keyword);

                    let imageMatch = pageCode.match(/<Image[^>]*src=["']([^"']+)["']/);
                    let thumbnail = imageMatch ? imageMatch[1] : 'https://placehold.co/1200x630';

                    let langDateStr = topic.completedDate ? new Date(topic.completedDate).toLocaleDateString(
                        lang.code === 'en' ? 'en-US' : lang.code + '-' + lang.code.toUpperCase(),
                        { month: 'long', year: 'numeric' }) : 'February 2026';

                    const success = updateBlogIndexLocal(lang.dir, slug, thumbnail, lang.code, title, topic.keyword, langDateStr);
                    if (success) {
                        console.log(`✅ Fixed missing index for ${linkPath}`);
                        addedCount++;
                    }
                }
            }
        }
    }
    console.log(`Finished. Added ${addedCount} missing links.`);
}

processAll();
