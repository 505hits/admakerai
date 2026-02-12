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

    // 1. Detect locale from path
    let locale = 'en';
    if (file.includes(path.sep + 'fr' + path.sep)) locale = 'fr';
    else if (file.includes(path.sep + 'es' + path.sep)) locale = 'es';
    else if (file.includes(path.sep + 'pt' + path.sep)) locale = 'pt';
    else if (file.includes(path.sep + 'de' + path.sep)) locale = 'de';

    // 2. Fix broken SimilarArticles injection from previous run
    // If <SimilarArticles exists after ); and before }
    const matchWrongInjection = content.match(/\);\s*([\s\S]*?<SimilarArticles[\s\S]*?\/>[\s\S]*?)\n}/);
    if (matchWrongInjection) {
        const injectedContent = matchWrongInjection[1];
        // Move it back inside the Fragment
        const returnEndIdx = content.lastIndexOf('</>');
        if (returnEndIdx !== -1) {
            content = content.replace(injectedContent, '');
            // Re-find indices because content changed
            const newReturnEndIdx = content.lastIndexOf('</>');
            content = content.slice(0, newReturnEndIdx) + injectedContent + '\n        ' + content.slice(newReturnEndIdx);
            modified = true;
        }
    }

    // 3. Fix potential space in closing div: </div >
    if (content.includes('</div >')) {
        content = content.replace(/<\/div >/g, '</div>');
        modified = true;
    }

    // 4. Ensure imports for added components
    const imports = [
        { name: 'SimilarArticles', path: "@/components/SimilarArticles" },
        { name: 'BlogVideoSidebar', path: "@/components/BlogVideoSidebar" }
    ];

    imports.forEach(imp => {
        if (content.includes(`<${imp.name}`) && !content.includes(`import ${imp.name}`)) {
            const importMatch = content.match(/import\s+.*?;/g);
            if (importMatch) {
                const lastImport = importMatch[importMatch.length - 1];
                content = content.replace(lastImport, `${lastImport}\nimport ${imp.name} from '${imp.path}';`);
            } else {
                content = `import ${imp.name} from '${imp.path}';\n${content}`;
            }
            modified = true;
        }
    });

    // 5. Fix double styles.mainContent in some files
    if (content.includes('<main className={styles.mainContent}>\n                    <div className={styles.mainContent}>')) {
        content = content.replace('<main className={styles.mainContent}>\n                    <div className={styles.mainContent}>', '<main className={styles.mainContent}>');
        // We probably have an extra </div> now.
        // It will be fixed by the tag balancer if needed, but let's be proactive.
        modified = true;
    }

    // 6. Fix dangerouslySetInnerHTML HTML boilerplates (specifically in top-ai-tools-ugc-video-content)
    if (content.includes('<!DOCTYPE html>')) {
        content = content.replace(/<!DOCTYPE html>[\s\S]*?<main>([\s\S]*?)<\/main>[\s\S]*?<\/html>/, '$1');
        modified = true;
    }

    // 7. Last-ditch tag balance for main/article/div
    const tagsToBalance = ['main', 'article', 'section'];
    tagsToBalance.forEach(tag => {
        const openCount = (content.match(new RegExp(`<${tag}`, 'g')) || []).length;
        const closeCount = (content.match(new RegExp(`</${tag}>`, 'g')) || []).length;
        if (openCount > closeCount) {
            // Find a place to add closing
            const stopIdx = content.lastIndexOf('</>');
            if (stopIdx !== -1) {
                content = content.slice(0, stopIdx) + `</${tag}>\n                    ` + content.slice(stopIdx);
                modified = true;
            }
        }
    });

    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`Fixed: ${file}`);
    }
});

console.log('Finished.');
