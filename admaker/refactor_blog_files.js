const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    try {
        fs.readdirSync(dir).forEach(f => {
            let p = path.join(dir, f);
            if (fs.statSync(p).isDirectory()) walk(p, callback);
            else callback(p);
        });
    } catch (e) { }
}

let modifiedCount = 0;

walk(path.join(process.cwd(), 'app', 'blog'), processFile);
['fr', 'es', 'de', 'pt', 'ja', 'ko'].forEach(lang => {
    walk(path.join(process.cwd(), 'app', lang, 'blog'), processFile);
});

function processFile(file) {
    if (!file.endsWith('page.tsx')) return;
    if (file.includes(path.join('app', 'blog', 'page.tsx')) || file.match(/app\\[a-z]{2}\\blog\\page\.tsx/)) return;

    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes("'use client'") && !content.includes('"use client"')) {
        return;
    }

    content = content.replace(/['"]use client['"];?\r?\n*/, '');
    content = content.replace(/import\s*{\s*useState\s*,\s*useEffect\s*}\s*from\s*['"]react['"];?\r?\n*/, '');
    content = content.replace(/import\s*Head\s*from\s*['"]next\/head['"];?\r?\n*/, '');

    if (!content.includes('import StickyCta')) {
        content = content.replace(/import Image from ['"]next\/image['"];?\r?\n*/, "import Image from 'next/image';\nimport StickyCta from '@/components/StickyCta';\n");
    }

    content = content.replace(/function getLandingPageUrl[\s\S]*?\}[\r\n\s]+(?=export default)/, '');
    content = content.replace(/const landingPageUrl = [^\n]*\r?\n/, '');
    content = content.replace(/const \[showStickyCta, setShowStickyCta\] = [^\n]*\r?\n/, '');
    content = content.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);\r?\n*/, '');

    let titleMatch = content.match(/<title>(.*?)<\/title>/);
    let descMatch = content.match(/<meta name=["']description["'] content=["'](.*?)["'] \/>/);
    if (!descMatch) descMatch = content.match(/<meta name=["']description["'] content=\{(.*?)\} \/>/);

    let canonicalMatch = content.match(/<link rel=["']canonical["'] href=\{?`?([^`}'"]+)`?\}? \/>/);

    let alternates = {};
    const alternateRegex = /<link rel=["']alternate["'] hrefLang=["']([^"']+)["'] href=\{?`?([^`}'"]+)`?\}? \/>/g;
    let match;
    while ((match = alternateRegex.exec(content)) !== null) {
        alternates[match[1]] = match[2];
    }

    let titleText = titleMatch ? titleMatch[1].replace(/\{["']|["']\}/g, '').replace(/\| AdMaker AI/, '').trim() : '';
    let descText = descMatch ? descMatch[1].replace(/^["']|["']$/g, '').replace(/^`|`$/g, '').replace(/&apos;/g, "'").trim() : '';
    let canonicalText = canonicalMatch ? canonicalMatch[1] : '';

    let metadataStr = `export const metadata = {\n`;
    if (titleText) metadataStr += `    title: \`${titleText.replace(/`/g, '\\`')} | AdMaker AI\`,\n`;
    if (descText) metadataStr += `    description: \`${descText.replace(/`/g, '\\`')}\`,\n`;
    metadataStr += `    alternates: {\n`;
    if (canonicalText) metadataStr += `        canonical: \`${canonicalText}\`,\n`;
    if (Object.keys(alternates).length > 0) {
        metadataStr += `        languages: {\n`;
        for (let lang of Object.keys(alternates)) {
            let val = alternates[lang];
            metadataStr += `            '${lang}': '${val}',\n`;
        }
        metadataStr += `        }\n`;
    }
    metadataStr += `    }\n};\n`;

    let headMatch = content.match(/<Head>([\s\S]*?)<\/Head\s*>/i);
    if (headMatch) {
        let headContent = headMatch[1];
        // Match both <script ...></script> AND <script ... />
        let scriptMatch = headContent.match(/<script[\s\S]*?(?:<\/script>|\/>)/);
        let replacement = scriptMatch ? scriptMatch[0] : '';
        content = content.replace(/<Head>[\s\S]*?<\/Head\s*>/i, replacement);
    }

    content = content.replace(/(export default function)/, (m, p1) => `${metadataStr}\n${p1}`);

    content = content.replace(/{\/\* Sticky Mobile CTA \*\/}[\s\S]*?<\/a>/, `<StickyCta locale={locale} />`);
    content = content.replace(/href=\{landingPageUrl\}/g, `href="#"`);

    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
    console.log(`Refactored: ${file}`);
}

console.log(`Refactored ${modifiedCount} files.`);
