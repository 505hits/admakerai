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

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let mod = false;

    // 1. Temporarily extract dangerouslySetInnerHTML content
    const htmlMap = [];
    const sanitizedContent = content.replace(/dangerouslySetInnerHTML=\{\{\s*__html:\s*([\s\S]*?)\s*\}\}/g, (match, p1) => {
        const id = `__HTML_CONTENT_${htmlMap.length}__`;
        htmlMap.push(p1);
        return `dangerouslySetInnerHTML={{ __html: "${id}" }}`;
    });

    // 2. Work on sanitized content
    let workContent = sanitizedContent;

    const tags = ['main', 'article', 'section', 'div'];
    tags.forEach(tag => {
        const openReg = new RegExp(`<${tag}[\\s>]`, 'g');
        const closeReg = new RegExp(`</${tag}>`, 'g');
        let openCount = (workContent.match(openReg) || []).length;
        let closeCount = (workContent.match(closeReg) || []).length;

        if (closeCount > openCount) {
            // Remove rogue closing tags from bottom
            for (let i = 0; i < (closeCount - openCount); i++) {
                const lastIdx = workContent.lastIndexOf(`</${tag}>`);
                if (lastIdx !== -1) {
                    workContent = workContent.slice(0, lastIdx) + workContent.slice(lastIdx + tag.length + 3);
                    mod = true;
                }
            }
        } else if (openCount > closeCount) {
            // Add missing closing tags before the final fragment or end
            const extra = openCount - closeCount;
            const fragIdx = workContent.lastIndexOf('</>');
            if (fragIdx !== -1) {
                workContent = workContent.slice(0, fragIdx) + `</${tag}>`.repeat(extra) + workContent.slice(fragIdx);
                mod = true;
            }
        }
    });

    // 3. Restore HTML content
    let finalContent = workContent;
    htmlMap.forEach((html, i) => {
        finalContent = finalContent.replace(`"__HTML_CONTENT_${i}__"`, html);
    });

    if (mod) {
        fs.writeFileSync(file, finalContent);
        console.log(`Surgically fixed: ${file}`);
    }
});
