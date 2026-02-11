const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'app/blog/arcads-vs-admaker/page.tsx');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // The content is likely in a single line, inside dangerouslySetInnerHTML={{ __html: "..." }}
    // We need to carefully remove the DOCTYPE through <body> and the closing tags.
    // Since it's a string literal, we need to match the escaped characters.

    // Regex to match from beginning of string to start of actual content (after <body>)
    // Note: The file seems to use \\n for newlines within the string.

    // Pattern to remove header: " <!DOCTYPE html>...<body[^>]*>(\\n)*"
    // We'll use a seemingly wide regex but constrained to the start of the html string.

    // First, let's try to identify the start of the HTML string.
    const startMarker = 'dangerouslySetInnerHTML={{ __html: "';
    const endMarker = '" }}';

    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) {
        console.error('Could not find dangerouslySetInnerHTML start');
        process.exit(1);
    }

    // Find key landmarks to strip
    const bodyStartTagRegex = /<body[^>]*>(\\n)*/;
    const styleEndTagRegex = /<\/style>(\\n)*<\/head>(\\n)*<body[^>]*>(\\n)*/;

    // We want to remove everything from `<!DOCTYPE` up to `<body>\n\n`
    // And also `</body>\n</html>` at the end.

    // Let's replace the string content directly.
    // We will use replace with a callback to ensure we only touch the HTML string.

    const newContent = content.replace(/dangerouslySetInnerHTML={{ __html: "(.*?)" }}/s, (match, htmlString) => {
        // Unescape the string to process it? No, keeping it as raw string logic is safer if we just use string replacement.
        // Actually, simpler approach: just replace the known garbage prefixes.

        let cleaned = htmlString;

        // Remove Header
        // Identifying the split point: <div class=\\"intro-box\\">
        // Everything before that is garbage.
        const introBoxIndex = cleaned.indexOf('<div class=\\"intro-box\\">');

        if (introBoxIndex !== -1) {
            console.log('Found intro-box, removing header preamble...');
            cleaned = cleaned.substring(introBoxIndex);
        } else {
            console.warn('Could not find intro-box, trying alternative...');
        }

        // Remove Footer
        // Remove </body> and </html>
        cleaned = cleaned.replace(/\\n<\/body>\\n<\/html>/g, '');
        cleaned = cleaned.replace(/<\/body>\\n<\/html>/g, '');
        cleaned = cleaned.replace(/<\/body><\/html>/g, '');

        return `dangerouslySetInnerHTML={{ __html: "${cleaned}" }}`;
    });

    if (content === newContent) {
        console.log('No changes made.');
    } else {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Successfully cleaned HTML content.');
    }

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
