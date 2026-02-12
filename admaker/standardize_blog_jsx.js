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

    // Remove rogue </main> if no <main> exists
    const openMain = (content.match(/<main/g) || []).length;
    const closeMain = (content.match(/<\/main>/g) || []).length;
    if (closeMain > openMain) {
        content = content.replace(/<\/main>/g, '');
        mod = true;
    } else if (openMain > closeMain) {
        // Add before </div> closing the contentWrapper
        content = content.replace('</article>', '</article>\n                    </main>');
        mod = true;
    }

    // Repeat for article
    const openArt = (content.match(/<article/g) || []).length;
    const closeArt = (content.match(/<\/article>/g) || []).length;
    if (closeArt > openArt) {
        content = content.replace(/<\/article>/g, '');
        mod = true;
    }

    // Fix div balance
    const openDiv = (content.match(/<div/g) || []).length;
    const closeDiv = (content.match(/<\/div>/g) || []).length;
    if (closeDiv > openDiv) {
        // Remove extra closing divs from the very end of the return statement
        const extra = closeDiv - openDiv;
        for (let i = 0; i < extra; i++) {
            const lastIdx = content.lastIndexOf('</div>');
            if (lastIdx !== -1) {
                content = content.slice(0, lastIdx) + content.slice(lastIdx + 6);
                mod = true;
            }
        }
    } else if (openDiv > closeDiv) {
        // Add before Fragment end
        const extra = openDiv - closeDiv;
        const lastFragClose = content.lastIndexOf('</>');
        if (lastFragClose !== -1) {
            content = content.slice(0, lastFragClose) + '</div>'.repeat(extra) + content.slice(lastFragClose);
            mod = true;
        }
    }

    // Fix SimilarArticles injection outside Fragment (previous bug)
    if (content.match(/\);\s*([\s\S]*?<SimilarArticles[\s\S]*?\/>[\s\S]*?)\n}/)) {
        const match = content.match(/\);\s*([\s\S]*?<SimilarArticles[\s\S]*?\/>[\s\S]*?)\n}/);
        const injected = match[1];
        content = content.replace(injected, '');
        const lastFragClose = content.lastIndexOf('</>');
        content = content.slice(0, lastFragClose) + '\n            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>\n                ' + injected.trim() + '\n            </div>\n        ' + content.slice(lastFragClose);
        mod = true;
    }

    if (mod) {
        fs.writeFileSync(file, content);
        console.log(`Standardized: ${file}`);
    }
});
