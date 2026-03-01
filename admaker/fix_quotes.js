const fs = require('fs');
const path = require('path');

const escapeQuotes = (articleSlug) => {
    const filePath = path.join(__dirname, 'app/blog', articleSlug, 'page.tsx');
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Specifically fix the injected image tags by escaping the double quotes
    content = content.replace(/<img src="\/blog-images\//g, '<img src=\\"/blog-images/');
    content = content.replace(/\.png" alt="/g, '.png\\" alt=\\"');
    content = content.replace(/" class="w-full rounded-xl my-8 hover:opacity-95 transition">/g, '\\" class=\\"w-full rounded-xl my-8 hover:opacity-95 transition\\">');

    content = content.replace(/<a href="https:\/\/admakerai\.app" class="pink-link">/g, '<a href=\\"https://admakerai.app\\" class=\\"pink-link\\">');

    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed quotes for ${articleSlug}`);
};
escapeQuotes('ai-actors');
escapeQuotes('arcads-pricing');
