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

    // Detect locale from path
    let locale = 'en';
    if (file.includes(path.sep + 'fr' + path.sep)) locale = 'fr';
    else if (file.includes(path.sep + 'es' + path.sep)) locale = 'es';
    else if (file.includes(path.sep + 'pt' + path.sep)) locale = 'pt';
    else if (file.includes(path.sep + 'de' + path.sep)) locale = 'de';

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
        const componentStart = content.match(/export default function.*?\n?\s*\{/);
        if (componentStart) {
            content = content.replace(componentStart[0], `${componentStart[0]}\n    const locale = '${locale}';`);
            modified = true;
        }
    }

    // 3. Fix structural issues (loose closing tags)
    // Check balance of <main>
    const openMainCount = (content.match(/<main/g) || []).length;
    const closeMainCount = (content.match(/<\/main>/g) || []).length;

    if (closeMainCount > openMainCount) {
        content = content.replace(/<\/main>/g, '');
        modified = true;
    }

    // Check balance of <div>
    const openDivCount = (content.match(/<div/g) || []).length;
    const closeDivCount = (content.match(/<\/div>/g) || []).length;

    if (closeDivCount > openDivCount) {
        // Remove extra closing divs at the very end of the return statement
        const extra = closeDivCount - openDivCount;
        for (let i = 0; i < extra; i++) {
            const lastDiv = content.lastIndexOf('</div>');
            if (lastDiv !== -1) {
                content = content.slice(0, lastDiv) + content.slice(lastDiv + 6);
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
