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
    let content = fs.readFileSync(file, 'utf8').trim();
    let modified = false;

    // 1. Restore missing closing brace if file ends with );
    if (content.endsWith(');')) {
        content = content + '\n}';
        modified = true;
    }

    // 2. Fix dangerouslySetInnerHTML with full HTML boilerplates
    if (content.includes('<!DOCTYPE html>')) {
        // Try to extract content inside <body> or <main>
        const bodyMatch = content.match(/<body>([\s\S]*?)<\/body>/i) || content.match(/<main>([\s\S]*?)<\/main>/i);
        if (bodyMatch) {
            let extracted = bodyMatch[1].trim();
            // Remove header/footer if they are generic boilerplates
            extracted = extracted.replace(/<header>[\s\S]*?<\/header>/i, '');
            extracted = extracted.replace(/<footer>[\s\S]*?<\/footer>/i, '');
            // Escape double quotes if they aren't escaped? Actually dangerouslySetInnerHTML needs raw HTML string.
            // But we need to make sure we don't break the enclosing JS string.
            content = content.replace(/dangerouslySetInnerHTML=\{\{\s*__html:\s*"(<!DOCTYPE html>[\s\S]*?)"\s*\}\}/, (match, p1) => {
                return `dangerouslySetInnerHTML={{ __html: \`${extracted.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\` }}`;
            });
            modified = true;
        }
    }

    // 3. Fix double mainContent div
    if (content.includes('<main className={styles.mainContent}>\n                    <div className={styles.mainContent}>')) {
        content = content.replace('<main className={styles.mainContent}>\n                    <div className={styles.mainContent}>', '<main className={styles.mainContent}>');
        modified = true;
    }

    // 4. Ensure locale and imports
    if (content.includes('locale') && !content.includes('const locale =') && !content.includes('let locale =')) {
        let locale = 'en';
        if (file.includes(path.sep + 'fr' + path.sep)) locale = 'fr';
        else if (file.includes(path.sep + 'es' + path.sep)) locale = 'es';
        else if (file.includes(path.sep + 'pt' + path.sep)) locale = 'pt';
        else if (file.includes(path.sep + 'de' + path.sep)) locale = 'de';

        content = content.replace(/(export default function.*?\n?\s*\{)/, `$1\n    const locale = '${locale}';`);
        modified = true;
    }

    const imports = [
        { name: 'SimilarArticles', path: "@/components/SimilarArticles" },
        { name: 'BlogVideoSidebar', path: "@/components/BlogVideoSidebar" }
    ];
    imports.forEach(imp => {
        if (content.includes(`<${imp.name}`) && !content.includes(`import ${imp.name}`)) {
            content = `import ${imp.name} from '${imp.path}';\n${content}`;
            modified = true;
        }
    });

    // 5. Final check for tag balance
    const openDivs = (content.match(/<div/g) || []).length;
    const closeDivs = (content.match(/<\/div>/g) || []).length;
    if (closeDivs > openDivs) {
        // Remove extra closing divs from the end of the JSX
        for (let i = 0; i < (closeDivs - openDivs); i++) {
            const lastIdx = content.lastIndexOf('</div>');
            if (lastIdx !== -1) {
                content = content.slice(0, lastIdx) + content.slice(lastIdx + 6);
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`Fixed: ${file}`);
    }
});

console.log('Finished.');
