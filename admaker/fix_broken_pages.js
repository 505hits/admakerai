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

        // 1. Ensure <main> wrapper exists
        // Match <div className={styles.contentWrapper}> and see if <main> follows
        if (content.includes('className={styles.contentWrapper}>') && !content.includes('<main className={styles.mainContent}>')) {
            content = content.replace('className={styles.contentWrapper}>', 'className={styles.contentWrapper}>\n                    <main className={styles.mainContent}>');
            modified = true;
        }

        // 2. Fix the end of the file
        // Re-construct the end of the JSX to be consistent
        // We want:
        //             </article>
        //             <BlogVideoSidebar locale={locale} />
        //         </main>
        //     </div>
        // </div>
        // <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        //     <SimilarArticles ... />
        // </div>

        // Extract slug from file path
        const pathParts = file.split(path.sep);
        const slug = pathParts[pathParts.length - 2] === 'blog' ? 'index' : pathParts[pathParts.length - 2];
        if (slug === 'index') return; // Skip index pages for now as structure is different

        // Robust replacement for the ending
        // Find </article> and everything until <SimilarArticles or </body> or whatever
        const endPattern = /<\/article>[\s\S]*?(<BlogVideoSidebar[^>]*\/>)[\s\S]*?<\/div>[\s\S]*?<\/div>/;
        if (content.match(endPattern)) {
            const sidebar = content.match(endPattern)[1];
            const replacement = `</article>\n                        ${sidebar}\n                    </main>\n                </div>\n            </div>\n\n            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>\n                <SimilarArticles currentSlug="${slug}" locale={locale} />\n            </div>`;

            // Remove any existing SimilarArticles calls that might be duplicates
            content = content.replace(/<SimilarArticles[^>]*\/>/g, '');

            // Re-apply the ending
            content = content.replace(endPattern, replacement);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(file, content);
            fixedCount++;
            console.log(`Fixed: ${file}`);
        }
    });
});

console.log(`\nSuccessfully fixed ${fixedCount} files.`);
