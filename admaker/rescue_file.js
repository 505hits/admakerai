const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'app/blog/arcads-vs-admaker/page.tsx');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Greedy match to capture the whole block even if it contains unescaped quotes
    // capture group 1: start
    // capture group 2: content (greedy)
    // capture group 3: end
    const regex = /(dangerouslySetInnerHTML={{ __html: ")(.*)(" }})/s;
    const match = content.match(regex);

    if (!match) {
        console.error('Could not find dangerouslySetInnerHTML content with greedy regex.');
        // Fallback: try capturing everything between start marker and last occurance of " }}
        // Finding indices manually might be utilized if regex fails.
        const startMarker = 'dangerouslySetInnerHTML={{ __html: "';
        const endMarker = '" }}';
        const startIdx = content.indexOf(startMarker);
        const endIdx = content.lastIndexOf(endMarker);

        if (startIdx !== -1 && endIdx !== -1) {
            console.log('Found block via manual indices.');
            const prefix = content.substring(startIdx, startIdx + startMarker.length);
            const rawHtml = content.substring(startIdx + startMarker.length, endIdx);
            const suffix = content.substring(endIdx);

            processContent(prefix, rawHtml, suffix, content, startIdx, endIdx + endMarker.length);
            return;
        } else {
            console.error('Manual index search failed too.');
            process.exit(1);
        }
    } else {
        processContent(match[1], match[2], match[3], content, match.index, match.index + match[0].length);
    }

    function processContent(prefix, rawHtml, suffix, fullContent, replaceStart, replaceEnd) {
        let fixedHtml = rawHtml;

        // 1. Escape unescaped double quotes
        // We use negative lookbehind (?<!\\) to find " that is NOT preceded by \
        fixedHtml = fixedHtml.replace(/(?<!\\)"/g, '\\"');

        console.log('Escaped quotes.');

        // 2. Fix double links
        // Pattern: <a href=\"...\"> <a href=\"...\"> ... </a> </a>
        // Note: spaces might be present
        const doubleLinkRegex = /<a href=\\"(.*?)\\"\s*><a href=\\"(.*?)\\"\s*>(.*?)<\/a><\/a>/g;
        fixedHtml = fixedHtml.replace(doubleLinkRegex, '<a href=\\"$1\\">$3</a>');

        console.log('Fixed double links.');

        // 3. Clean up any leftover <Link> tags
        fixedHtml = fixedHtml.replace(/<Link.*?>/g, '');
        fixedHtml = fixedHtml.replace(/<\/Link>/g, '');

        // 4. Verify no unescaped quotes remain (sanity check)
        if (fixedHtml.match(/(?<!\\)"/)) {
            console.warn('Warning: Unescaped quotes still exist!');
        }

        // Write back
        const newContent = fullContent.substring(0, replaceStart) + prefix + fixedHtml + suffix + fullContent.substring(replaceEnd);
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log('Successfully rescued file.');
    }

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
