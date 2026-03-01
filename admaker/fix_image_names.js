const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'public', 'blog-images');
let count = 0;
fs.readdirSync(dir).forEach(file => {
    if (file.includes(' ')) {
        const newName = file.replace(/\s+/g, '');
        fs.renameSync(path.join(dir, file), path.join(dir, newName));
        count++;
    }
});
console.log(`Renamed ${count} files.`);
