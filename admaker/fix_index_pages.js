const fs = require('fs');
const path = require('path');

const dirs = ['app/blog', 'app/fr/blog', 'app/es/blog', 'app/pt/blog', 'app/de/blog', 'app/ja/blog', 'app/ko/blog'];

for (const p of dirs) {
    const filePath = path.join(__dirname, p, 'page.tsx');
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Fix ai-actors
    content = content.replace(/(<Link href="\/[a-z]{2}?\/blog\/ai-actors"[\s\S]*?)(https:\/\/placehold\.co\/1200x630)([\s\S]*?)(alt="undefined")([\s\S]*?)<h2 className=\{styles\.cardTitle\}>undefined<\/h2>/g,
        `$1/blog-images/img-1770664916144-0.png$3alt="Best AI Actors for Video Ads"$5<h2 className={styles.cardTitle}>Best AI Actors for Video Ads</h2>`);

    // The previous regex might not match the EN version which uses href="/blog/ai-actors"
    content = content.replace(/(<Link href="\/blog\/ai-actors"[\s\S]*?)(https:\/\/placehold\.co\/1200x630)([\s\S]*?)(alt="undefined")([\s\S]*?)<h2 className=\{styles\.cardTitle\}>undefined<\/h2>/g,
        `$1/blog-images/img-1770664916144-0.png$3alt="Best AI Actors for Video Ads"$5<h2 className={styles.cardTitle}>Best AI Actors for Video Ads</h2>`);

    // Fix arcads-pricing
    content = content.replace(/(<Link href="(?:\/blog|\/[a-z]{2}\/blog)\/arcads-pricing"[\s\S]*?)(https:\/\/placehold\.co\/1200x630)/g,
        `$1/blog-images/img-1770638983079-0.png`);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
}

// Fix React import bug in best-mobile-apps-creating-ugc-videos-tiktok
const articlesWithImportReact = ['app/blog', 'app/fr/blog', 'app/es/blog', 'app/pt/blog', 'app/de/blog', 'app/ja/blog', 'app/ko/blog'];
for (const p of articlesWithImportReact) {
    const articlePath = path.join(__dirname, p, 'best-mobile-apps-creating-ugc-videos-tiktok', 'page.tsx');
    if (fs.existsSync(articlePath)) {
        let content = fs.readFileSync(articlePath, 'utf8');
        content = content.replace(/import\s+React.*?from\s+['"]react['"];?\r?\n/g, '');
        fs.writeFileSync(articlePath, content, 'utf8');
        console.log(`Fixed import React in ${articlePath}`);
    }
}
