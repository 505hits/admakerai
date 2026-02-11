const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'app/blog/arcads-vs-admaker/page.tsx');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to capture the html string inside dangerouslySetInnerHTML
    const regex = /(dangerouslySetInnerHTML={{ __html: ")([\s\S]*?)(" }})/;
    const match = content.match(regex);

    if (!match) {
        console.error('Could not find dangerouslySetInnerHTML content.');
        process.exit(1);
    }

    let htmlContent = match[2];
    let originalHtml = htmlContent;

    // Fix Double Links: <a href=\"...\"><a href=\"...\">Text</a></a>
    // We use (.*?) to match the URL non-greedily until the escaped quote \"
    // Pattern: <a href=\"URL1\"><a href=\"URL2\">TEXT</a></a>
    // We replace with <a href=\"URL1\">TEXT</a>

    // Note: escape backslashes for JS string: \\" matches \"
    const doubleLinkRegex = /<a href=\\"(.*?)\\"\s*><a href=\\"(.*?)\\"\s*>(.*?)<\/a><\/a>/g;

    htmlContent = htmlContent.replace(doubleLinkRegex, '<a href=\\"$1\\">$3</a>');

    if (htmlContent === originalHtml) {
        console.log('No double links found or no changes made.');
        // Maybe check for triply nested or other weirdness?
        // Let's also check for <Link> tags if any left
        htmlContent = htmlContent.replace(/<Link.*?>/g, '');
        htmlContent = htmlContent.replace(/<\/Link>/g, '');
    }

    if (htmlContent !== originalHtml) {
        const newFileContent = content.replace(match[0], `${match[1]}${htmlContent}${match[3]}`);
        fs.writeFileSync(filePath, newFileContent, 'utf8');
        console.log('Fixed double links.');
    } else {
        console.log('Content unchanged.');
    }

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
