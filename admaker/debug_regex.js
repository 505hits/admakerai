const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'app/blog/arcads-vs-admaker/page.tsx');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('File length:', content.length);

    // Try to find the block
    const blockRegex = /dangerouslySetInnerHTML={{ __html: "([\s\S]*?)" }}/;
    const match = content.match(blockRegex);

    if (!match) {
        console.log('Block regex failed to match.');
        // Print snippet around line 78
        const lines = content.split('\n');
        console.log('Line 78:', lines[77].substring(0, 100));
    } else {
        console.log('Block found. Content length:', match[1].length);
        const inner = match[1];

        // Check for double link substring
        const snippet = '<a href=\\"/blog/ai-ugc\\"><a href=\\"/blog/ai-ugc\\">';
        const index = inner.indexOf(snippet);
        console.log('Direct substring search index:', index);

        if (index !== -1) {
            console.log('Found substring at:', index);
            console.log('Context:', inner.substring(index, index + 100));
        }

        // Check for Link tag
        const linkIndex = inner.indexOf('<Link');
        console.log('Link tag index:', linkIndex);

        // Try to fix
        let fixed = inner;
        // Naive string replace for specific known double links from my observation
        const knownDoubles = [
            '<a href=\\"/blog/ai-ugc\\"><a href=\\"/blog/ai-ugc\\">User-Generated Content (UGC) creators</a></a>',
            // Add others if I recall them? No, let's stick to regex if possible or specific replaces.
        ];

        // Regex replacement attempt
        // We want to remove the outer wrapper or inner wrapper.
        // Pattern: <a href=\"...\"><a href=\"...\">...</a></a>
        // Note escaped quotes in the string are \" 
        // So in regex we match literal backslash then quote: \\" 

        const r1 = /<a href=\\"[^"]+\\"><a href=\\"[^"]+\\">/g;
        const m1 = inner.match(r1);
        console.log('Regex match count for double link start:', m1 ? m1.length : 0);

        if (m1) {
            // Apply fix: replace <a href=\"...\"><a href=\"...\"> with <a href=\"...\">
            // This leaves </a></a> at the end. We need to handle that.
            // Better: replace <a href=\"...\"><a href=\"(.*?)\">(.*?)<\/a><\/a> with <a href=\"$1\">$2</a>
            // Regex: /<a href=\\"[^"]+\\"><a href=\\"([^"]+)\\">(.*?)<\/a><\/a>/g

            fixed = fixed.replace(
                /<a href=\\"[^"]+\\"><a href=\\"([^"]+)\\">(.*?)<\/a><\/a>/g,
                '<a href=\\"$1\\">$2</a>'
            );
        }

        // Fix Link tags: <Link href="..."><a ...>...</a></Link>
        // The href in Link probably has spaces: <Link href=" / blog ...">
        // Regex: /<Link.*?>(.*?)<\/Link>/g -> replace with $1

        const r2 = /<Link.*?>(.*?)<\/Link>/g;
        // But wait, the Link tag might be escaped? No, it was added via string manipulation or standard edit?
        // Step 2541 shows: <Link href=" / blog ..."><a ...>...</a></Link>
        // Use loose regex
        fixed = fixed.replace(/<Link[\s\S]*?>/g, '');
        fixed = fixed.replace(/<\/Link>/g, '');

        if (fixed !== inner) {
            console.log('Writing fixed content...');
            const newContent = content.replace(match[0], `dangerouslySetInnerHTML={{ __html: "${fixed}" }}`);
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Success.');
        } else {
            console.log('No changes computed.');
        }

    }

} catch (err) {
    console.error(err);
}
