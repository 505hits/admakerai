const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let modifiedCount = 0;

walkDir(path.join(__dirname, 'app', 'blog'), function (filePath) {
    if (filePath.endsWith('page.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // Replace "img - 12345 -6.png" with "img-12345-6.png"
        // Also "img - 12345-6.png" or "img-12345 -6.png" etc.
        let changed = content.replace(/img\s*-\s*(\d+)\s*-\s*(\d+)\.png/g, 'img-$1-$2.png');

        if (changed !== original) {
            fs.writeFileSync(filePath, changed, 'utf8');
            modifiedCount++;
            console.log('Modified:', filePath);
        }
    }
});

console.log(`Modified ${modifiedCount} files.`);
