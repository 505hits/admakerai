const fs = require('fs');
const path = require('path');

const dirs = ['app/de/blog', 'app/fr/blog', 'app/es/blog', 'app/pt/blog', 'app/blog'];

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
dirs.forEach(d => files.push(...getFiles(path.join(__dirname, d))));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let mod = false;

    // Pattern: </div></>
    if (content.includes('</div></>')) {
        content = content.replace('</div></>', '</>');
        mod = true;
    }

    // Pattern: </div>\n</>
    if (content.match(/<\/div>\s*<\/>/)) {
        content = content.replace(/<\/div>\s*<\/>/, '\n</>');
        mod = true;
    }

    if (mod) {
        fs.writeFileSync(file, content);
        console.log(`Removed orphan div in: ${file}`);
    }
});
