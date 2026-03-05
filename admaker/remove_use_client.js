const fs = require('fs');
const path = require('path');

const baseDirs = ['app/blog', 'app/fr/blog', 'app/es/blog', 'app/pt/blog', 'app/de/blog'];

function getFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(getFiles(file));
        else if (file.endsWith('page.tsx')) results.push(file);
    });
    return results;
}

const files = [];
baseDirs.forEach(d => files.push(...getFiles(path.join(__dirname, d))));

let fixedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Check if file has metadata export
    const hasMetadata = content.includes('export const metadata');

    if (hasMetadata && (content.includes("'use client'") || content.includes('"use client"'))) {
        // Remove both variants with capturing any trailing punctuation/newlines
        content = content.replace(/['"]use client['"];?\s*/g, '');
        fs.writeFileSync(file, content);
        console.log(`Removed 'use client' from: ${file}`);
        fixedCount++;
    }
});

console.log(`Finished fixing ${fixedCount} files.`);
