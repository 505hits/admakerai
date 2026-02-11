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

    let htmlContent = match[2]; // The inner string
    let originalHtml = htmlContent;

    // 1. Fix Double Links (Artifact from previous run)
    // Matches <a href="..."><a href="...">Text</a></a>
    htmlContent = htmlContent.replace(/<a href=\\"[^"]+\\"><a href=\\"([^"]+)\\">(.*?)<\/a><\/a>/g, '<a href=\\"$1\\">$2</a>');

    // Also fix weird Link tags like <Link ...><a ...></a></Link> if any
    htmlContent = htmlContent.replace(/<Link.*?>/g, '');
    htmlContent = htmlContent.replace(/<\/Link>/g, '');

    // 2. Inject Images (More robust regex)
    const images = {
        1: '/blog-images/img-1770639086459-7.png',
        2: '/blog-images/img-1770639060609-5.png',
        3: '/blog-images/img-1770680196621-6.png',
        4: '/blog-images/img-1770639346121-6.png',
        5: '/blog-images/img-1770639112288-9.png'
    };

    // Match the div wrapper and inner content loosely
    // We look for class=\"image-placeholder\" ... [IMAGE_PLACEHOLDER_X ... </div>
    const imgRegex = /<div class=\\"image-placeholder\\">[\s\S]*?\[IMAGE_PLACEHOLDER_(\d+):[\s\S]*?\][\s\S]*?<\/div>/g;

    htmlContent = htmlContent.replace(imgRegex, (match, p1) => {
        const imgPath = images[p1];
        if (imgPath) {
            // NOTE: We must escape quotes for the TSX string literal!
            return `<div class=\\"image-wrapper\\" style=\\"margin: 30px 0;\\"><img src=\\"${imgPath}\\" alt=\\"Blog Image ${p1}\\" style=\\"width:100%; height:auto; border-radius:12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);\\" /></div>`;
        }
        return match;
    });

    if (htmlContent === originalHtml) {
        console.log('No new changes made to HTML string.');
    } else {
        const newFileContent = content.replace(match[0], `${match[1]}${htmlContent}${match[3]}`);
        fs.writeFileSync(filePath, newFileContent, 'utf8');
        console.log('Successfully applied fixes.');
    }

} catch (err) {
    console.error('Error:', err);
    process.exit(1);
}
