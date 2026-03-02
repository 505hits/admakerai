const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(fullPath));
        } else if (file === 'page.tsx') {
            results.push(fullPath);
        }
    });
    return results;
}

const allPages = walkDir(path.join(__dirname, 'app'));
const blogPages = allPages.filter(p => p.includes(`${path.sep}blog${path.sep}`) && !p.endsWith(`app${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}fr${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}es${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}pt${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}de${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}ja${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}ko${path.sep}blog${path.sep}page.tsx`));

let fixedCount = 0;

for (const p of blogPages) {
    let content = fs.readFileSync(p, 'utf8');

    if (content.includes('<StickyCta') && !content.includes('import StickyCta')) {
        // Find the first line that is an import
        content = content.replace(/^(import .*?;?[\r\n]+)/m, `$1import StickyCta from '@/components/StickyCta';\n`);
        fs.writeFileSync(p, content, 'utf8');
        fixedCount++;
        console.log(`Added import to ${p}`);
    }
}

console.log(`Fixed ${fixedCount} files`);
