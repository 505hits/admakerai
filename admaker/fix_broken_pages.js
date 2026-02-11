const fs = require('fs');
const path = require('path');

const baseDirs = [
    'app/blog',
    'app/fr/blog',
    'app/es/blog',
    'app/pt/blog',
    'app/de/blog'
];

function getAllPageFiles(dir, allFiles = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getAllPageFiles(name, allFiles);
        } else if (file === 'page.tsx') {
            allFiles.push(name);
        }
    });
    return allFiles;
}

let fixedCount = 0;

baseDirs.forEach(baseDir => {
    const fullBaseDir = path.join(__dirname, baseDir);
    if (!fs.existsSync(fullBaseDir)) return;

    const files = getAllPageFiles(fullBaseDir);
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // 1. Fix missing </main> tag
        const brokenJsx = /<BlogVideoSidebar locale={locale} \/>\s*<\/div>\s*<\/div>/g;
        const fixedJsx = '<BlogVideoSidebar locale={locale} />\n                    </main>\n                </div>\n            </div>';

        if (content.match(brokenJsx)) {
            content = content.replace(brokenJsx, fixedJsx);
            modified = true;
            console.log(`Fixed JSX in: ${file}`);
        }

        // 2. Fix undefined slugs
        // Extract slug from file path: e.g. app/blog/slug/page.tsx or app/fr/blog/slug/page.tsx
        const pathParts = file.split(path.sep);
        const slug = pathParts[pathParts.length - 2];

        if (content.includes('currentSlug="undefined"') || content.includes('/blog/undefined')) {
            content = content.replace(/currentSlug="undefined"/g, `currentSlug="${slug}"`);
            content = content.replace(/\/blog\/undefined/g, `/blog/${slug}`);
            modified = true;
            console.log(`Fixed slug in: ${file}`);
        }

        if (modified) {
            fs.writeFileSync(file, content);
            fixedCount++;
        }
    });
});

console.log(`\nSuccessfully fixed ${fixedCount} files.`);
