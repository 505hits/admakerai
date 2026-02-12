const fs = require('fs');
// Handle UTF-16 LE BOM if present, but usually fs.readFileSync with 'utf16le' works if we know it.
// Start by trying utf16le.
try {
    const content = fs.readFileSync('generation_log.txt', 'utf16le');
    console.log(content);
} catch (e) {
    console.error(e);
}
