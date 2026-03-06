const fs = require('fs');

const files = [
    'app/blog/page.tsx',
    'app/fr/blog/page.tsx',
    'app/es/blog/page.tsx',
    'app/pt/blog/page.tsx',
    'app/de/blog/page.tsx',
    'generate-daily-blog.js'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Fix spaces applied incorrectly: < Link href = "..." className = { styles.blogCard } >
        content = content.replace(/<\s+Link\s+href\s*=\s*/g, '<Link href=');
        content = content.replace(/className\s*=\s*\{\s*styles\.blogCard\s*\}\s*>/g, 'className={styles.blogCard}>');
        content = content.replace(/<\s*\/Link\s*>\s*/g, '</Link>\n');
        fs.writeFileSync(file, content);
        console.log('Fixed ' + file);
    }
}
