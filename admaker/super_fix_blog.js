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
    if (!fs.existsSync(dir)) return allFiles;
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

const files = [];
baseDirs.forEach(dir => files.push(...getAllPageFiles(path.join(__dirname, dir))));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // 1. Ensure essential imports exist
    const imports = [
        { name: 'SimilarArticles', path: "@/components/SimilarArticles" },
        { name: 'Image', path: "next/image" },
        { name: 'Navbar', path: "@/components/Navbar" },
        { name: 'BlogVideoSidebar', path: "@/components/BlogVideoSidebar" },
        { name: 'Head', path: "next/head" }
    ];

    imports.forEach(imp => {
        if (content.includes(`<${imp.name}`) && !content.includes(`import ${imp.name}`)) {
            // Find a good place to insert the import
            const importMatch = content.match(/import\s+.*?;/g);
            if (importMatch) {
                const lastImport = importMatch[importMatch.length - 1];
                content = content.replace(lastImport, `${lastImport}\nimport ${imp.name} from '${imp.path}';`);
                modified = true;
            } else {
                content = `import ${imp.name} from '${imp.path}';\n${content}`;
                modified = true;
            }
        }
    });

    // 2. Ensure 'locale' variable is defined if used
    if (content.includes('locale') && !content.includes('const locale =') && !content.includes('let locale =')) {
        // Detect locale from path
        let locale = 'en';
        if (file.includes('/fr/')) locale = 'fr';
        else if (file.includes('/es/')) locale = 'es';
        else if (file.includes('/pt/')) locale = 'pt';
        else if (file.includes('/de/')) locale = 'de';

        const componentStart = content.match(/export default function.*?\n\s*{/);
        if (componentStart) {
            content = content.replace(componentStart[0], `${componentStart[0]}\n    const locale = '${locale}';`);
            modified = true;
        }
    }

    // 3. Fix structural issues (main vs aside vs article)
    // If </main> exists but no <main>, remove it OR add it.
    // Let's ensure a consistent structure for articles.

    // Check balance of <main>
    const openMainCount = (content.match(/<main/g) || []).length;
    const closeMainCount = (content.match(/<\/main>/g) || []).length;

    if (closeMainCount > openMainCount) {
        // Find if we have <div className={styles.contentWrapper}>
        if (content.includes('className={styles.contentWrapper}>') && !content.includes('<main')) {
            content = content.replace('className={styles.contentWrapper}>', 'className={styles.contentWrapper}>\n                    <main className={styles.mainContent}>');
            modified = true;
        } else {
            // Just remove the extra </main>
            content = content.replace(/<\/main>/g, '');
            modified = true;
        }
    } else if (openMainCount > closeMainCount) {
        // Add closing tag
        content = content.replace('</article>', '</article>\n                    </main>');
        modified = true;
    }

    // 4. Cleanup redundant empty divs and fix tag order
    const closingSequence = /<\/article>\s*(<BlogVideoSidebar[^>]*\/>)?\s*<\/div>\s*<\/div>/g;
    // We want to make it robust
    if (content.match(closingSequence)) {
        // Check if main is opened and needs to be closed
        const hasMain = content.includes('<main');
        let replacement = '</article>\n';
        if (content.includes('BlogVideoSidebar')) {
            const sidebarMatch = content.match(/<BlogVideoSidebar[^>]*\/>/);
            if (sidebarMatch) replacement += `                        ${sidebarMatch[0]}\n`;
        }
        if (hasMain) replacement += '                    </main>\n';
        replacement += '                </div>\n            </div>';

        content = content.replace(closingSequence, replacement);
        modified = true;
    }

    // Remove any Duplicate SimilarArticles
    const similarArticlesMatches = content.match(/<SimilarArticles[^>]*\/>/g);
    if (similarArticlesMatches && similarArticlesMatches.length > 1) {
        // Keep only the last one for consistency
        const lastOne = similarArticlesMatches[similarArticlesMatches.length - 1];
        content = content.replace(/<SimilarArticles[^>]*\/>/g, '');
        // Append it before the end of the return statement
        const returnEnd = content.lastIndexOf('</>');
        if (returnEnd !== -1) {
            content = content.slice(0, returnEnd) + `\n            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>\n                ${lastOne}\n            </div>\n        ` + content.slice(returnEnd);
        } else {
            const returnEndDiv = content.lastIndexOf(');');
            if (returnEndDiv !== -1) {
                // Find the last closing brace
                const finalBrace = content.lastIndexOf('}', returnEndDiv);
                content = content.slice(0, finalBrace) + `\n            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>\n                ${lastOne}\n            </div>\n        ` + content.slice(finalBrace);
            }
        }
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`Fixed: ${file}`);
    }
});

console.log('Finished.');
