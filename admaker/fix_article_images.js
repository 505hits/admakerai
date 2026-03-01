const fs = require('fs');
const path = require('path');

const fixPage = (articleSlug) => {
    const filePath = path.join(__dirname, 'app/blog', articleSlug, 'page.tsx');
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove any spaces around the dashes or slashes for the image paths
    // e.g., "/ blog - images / img - 1770664916144 -0.png "
    // becomes "/blog-images/img-1770664916144-0.png"

    // First, let's fix the Hero Image and JSON-LD image references if they have spaces
    content = content.replace(/\/ blog - images \/ img - (\d+) -(\d+)\.png /g, '/blog-images/img-$1-$2.png');

    // Some generated URLs might just have spaces stripped entirely, let's make sure it's valid
    // Let's find any occurrences of `src="https://example.com/image...` which means the original images weren't put back in

    // Actually, looking at the previous rewrite script, I used the wrong variable for the html content regex replacement.
    // Let's write a targeted replace for the specific URLs that are known to be in the original raw HTML.

    if (articleSlug === 'ai-actors') {
        content = content.replace(/src="https:\/\/placehold.co\/1200x630"/g, 'src="/blog-images/img-1770664916144-0.png"');
        content = content.replace(/"image":"https:\/\/placehold.co\/1200x630"/g, '"image":"/blog-images/img-1770664916144-0.png"');

        let htmlBodyMatch = content.match(/dangerouslySetInnerHTML=\{\{\s*__html:\s*(["'`])([\s\S]*?)\1\s*\}\}/);
        if (htmlBodyMatch) {
            let htmlBody = htmlBodyMatch[2];
            // Fix placeholder images in the HTML body
            htmlBody = htmlBody.replace(/<img src=\\"https:\/\/example.com\/image1.jpg\\" alt=\\"Image 1\\">/g, '<img src="/blog-images/img-1770664933419-1.png" alt="AI Actors Example 1" class="w-full rounded-xl my-8 hover:opacity-95 transition">');
            htmlBody = htmlBody.replace(/<img src=\\"https:\/\/example.com\/image2.jpg\\" alt=\\"Image 2\\">/g, '<img src="/blog-images/img-1770664946419-2.png" alt="AI Actors Example 2" class="w-full rounded-xl my-8 hover:opacity-95 transition">');
            htmlBody = htmlBody.replace(/<img src=\\"https:\/\/example.com\/image3.jpg\\" alt=\\"Image 3\\">/g, '<img src="/blog-images/img-1770664963679-3.png" alt="AI Actors Example 3" class="w-full rounded-xl my-8 hover:opacity-95 transition">');
            htmlBody = htmlBody.replace(/<img src=\\"https:\/\/example.com\/image6.jpg\\" alt=\\"Image 6\\">/g, '<img src="/blog-images/img-1770664976781-4.png" alt="AI Actors Example 4" class="w-full rounded-xl my-8 hover:opacity-95 transition">');
            htmlBody = htmlBody.replace(/<img src=\\"https:\/\/example.com\/image7.jpg\\" alt=\\"Image 7\\">/g, '<img src="/blog-images/img-1770664989901-5.png" alt="AI Actors Example 5" class="w-full rounded-xl my-8 hover:opacity-95 transition">');
            htmlBody = htmlBody.replace(/<img src=\\"https:\/\/example.com\/image8.jpg\\" alt=\\"Image 8\\">/g, '<img src="/blog-images/img-1770665016040-7.png" alt="AI Actors Example 6" class="w-full rounded-xl my-8 hover:opacity-95 transition">');
            htmlBody = htmlBody.replace(/<img src=\\"https:\/\/example.com\/image9.jpg\\" alt=\\"Image 9\\">/g, '<img src="/blog-images/img-1770665033260-8.png" alt="AI Actors Example 7" class="w-full rounded-xl my-8 hover:opacity-95 transition">');
            htmlBody = htmlBody.replace(/<img src=\\"https:\/\/example.com\/image10.jpg\\" alt=\\"Image 10\\">/g, '<img src="/blog-images/img-1770665046215-9.png" alt="AI Actors Example 8" class="w-full rounded-xl my-8 hover:opacity-95 transition">');

            content = content.replace(htmlBodyMatch[2], htmlBody);
        }
    }

    if (articleSlug === 'arcads-pricing') {
        content = content.replace(/src="https:\/\/placehold.co\/1200x630"/g, 'src="/blog-images/img-1770638983079-0.png"');
        content = content.replace(/"image":"https:\/\/placehold.co\/1200x630"/g, '"image":"/blog-images/img-1770638983079-0.png"');
    }

    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed images for ${articleSlug}`);
};

fixPage('ai-actors');
fixPage('arcads-pricing');
