const fs = require('fs');
const path = require('path');

const baseDirs = [
    'app/blog',
    'app/fr/blog',
    'app/es/blog',
    'app/pt/blog',
    'app/de/blog'
];

function getAllPageFiles(dir, allFiles = []) {
    if (!fs.existsSync(dir)) return allFiles;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getAllPageFiles(name, allFiles);
        } else if (file === 'page.tsx') {
            allFiles.push(name);
        }
    });
    return allFiles;
}

const files = [];
baseDirs.forEach(dir => files.push(...getAllPageFiles(path.join(__dirname, dir))));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Find the return statement content
    const returnMatch = content.match(/return \(\s*<>([\s\S]*?)<>\s*\);/);
    if (!returnMatch) {
        // Try without <>
        const returnMatchNoFrag = content.match(/return \(\s*([\s\S]*?)\s*\);/);
        if (!returnMatchNoFrag) {
            console.log(`Could not find return block in: ${file}`);
            return;
        }
        processJsx(file, content, returnMatchNoFrag[1], false);
    } else {
        processJsx(file, content, returnMatch[1], true);
    }
});

function processJsx(file, fullContent, jsx, hasFragment) {
    const tags = [];
    // Simple regex to find JSX tags (avoiding strings and comments)
    // This is hard to do perfectly with regex but we can target our specific structure
    const tagRegex = /<(\/?)(div|main|article|section|aside|header|Navbar|BlogVideoSidebar|SimilarArticles|Head|Image|a|h1|h2|h3|h4|ul|li|ol|p|span|script|meta|link|title|ol|table|tr|th|td|strong|em|br)(\s+[^>]*)?(\/?)>/g;

    let match;
    let balance = 0;
    const openTags = [];

    while ((match = tagRegex.exec(jsx)) !== null) {
        const isClosing = match[1] === '/';
        const tagName = match[2];
        const isSelfClosing = match[4] === '/' || ['br', 'img', 'meta', 'link', 'Navbar', 'BlogVideoSidebar', 'SimilarArticles', 'Image'].includes(tagName);

        if (isSelfClosing && !isClosing) {
            // ignore self-closing
        } else if (isClosing) {
            balance--;
            if (openTags.length > 0) {
                const last = openTags.pop();
                if (last !== tagName) {
                    // console.log(`Mismatched tag in ${file}: expected </${last}>, found </${tagName}> at ${match.index}`);
                }
            }
        } else {
            balance++;
            openTags.push(tagName);
        }
    }

    if (balance !== 0) {
        console.log(`Unbalanced tags in ${file}: balance=${balance}, open=[${openTags.join(',')}]`);

        // HEURISTIC FIX
        // If balance > 0, we need to add closings.
        // If balance < 0, we have too many closings.

        if (balance < 0) {
            // Likely extra </div> at the end
            let newJsx = jsx;
            for (let i = 0; i < Math.abs(balance); i++) {
                const lastDiv = newJsx.lastIndexOf('</div>');
                if (lastDiv !== -1) {
                    newJsx = newJsx.slice(0, lastDiv) + newJsx.slice(lastDiv + 6);
                }
            }
            const newContent = fullContent.replace(jsx, newJsx);
            fs.writeFileSync(file, newContent);
            console.log(`  -> Fixed by removing ${Math.abs(balance)} tags in ${file}`);
        } else if (balance > 0) {
            // Missing closings, likely </main> or </div>
            let newJsx = jsx;
            // Find where to inject them - usually before the end of the return
            let injectPoint = newJsx.lastIndexOf('</a>');
            if (injectPoint === -1) injectPoint = newJsx.length;
            else injectPoint += 4;

            let closingStr = '';
            while (openTags.length > 0) {
                closingStr += `\n</${openTags.pop()}>`;
            }
            newJsx = newJsx.slice(0, injectPoint) + closingStr + newJsx.slice(injectPoint);
            const newContent = fullContent.replace(jsx, newJsx);
            fs.writeFileSync(file, newContent);
            console.log(`  -> Fixed by adding ${balance} tags in ${file}`);
        }
    }
}
