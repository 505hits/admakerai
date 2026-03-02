const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(fullPath));
        } else if (file === 'page.tsx') {
            results.push(fullPath);
        }
    });
    return results;
}

const allPages = walkDir(path.join(__dirname, 'app'));
const blogPages = allPages.filter(p => p.includes(`${path.sep}blog${path.sep}`) && !p.endsWith(`app${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}fr${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}es${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}pt${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}de${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}ja${path.sep}blog${path.sep}page.tsx`) && !p.includes(`${path.sep}ko${path.sep}blog${path.sep}page.tsx`));

let fixedCount = 0;

for (const p of blogPages) {
    let content = fs.readFileSync(p, 'utf8');

    if (content.includes('showStickyCta')) {
        // Find if it has import StickyCta
        if (!content.includes('import StickyCta')) {
            content = content.replace(/(import .*?\n)/, `$1import StickyCta from '@/components/StickyCta';\n`);
        }

        // Remove the <a> tag block containing showStickyCta
        content = content.replace(/<a[^>]*showStickyCta[^>]*>[\s\S]*?<\/a>/g, '<StickyCta locale={locale} />');

        // Also remove if using Link tag sometimes
        content = content.replace(/<Link[^>]*showStickyCta[^>]*>[\s\S]*?<\/Link>/g, '<StickyCta locale={locale} />');

        // Note: sometimes it's two <a> tags or similar, wait let's just make sure.
        // Some of them might just be:
        // <a href={landingPageUrl} className={\`\${styles.stickyCta} \${showStickyCta ? styles.stickyCtaVisible : ''}\`}>
        //     <div className={styles.ctaContent}> ... </div>
        // </a>

        // Sometimes the Regex fails if there's nested tags, but here we don't have nested <a>. So /<a[^>]*showStickyCta[^>]*>[\s\S]*?<\/a>/g is safe. 

        // Ensure locale is defined if missing
        if (!content.includes('const locale =') && content.includes('<StickyCta locale={locale} />')) {
            let lang = 'en';
            if (p.includes(`${path.sep}fr${path.sep}`)) lang = 'fr';
            else if (p.includes(`${path.sep}es${path.sep}`)) lang = 'es';
            else if (p.includes(`${path.sep}pt${path.sep}`)) lang = 'pt';
            else if (p.includes(`${path.sep}de${path.sep}`)) lang = 'de';
            else if (p.includes(`${path.sep}ja${path.sep}`)) lang = 'ja';
            else if (p.includes(`${path.sep}ko${path.sep}`)) lang = 'ko';

            content = content.replace(/export default function \w+\(\) \{/, `export default function BlogPost() {\n    const locale = '${lang}';`);
        }

        // Just to be safe: remove any remaining references to showStickyCta, e.g if there was a stray variable (shouldn't be)
        if (content.includes('showStickyCta')) {
            content = content.replace(/const \[showStickyCta.*?;\n?/g, '');
        }

        fs.writeFileSync(p, content, 'utf8');
        fixedCount++;
        console.log(`Fixed ${p}`);
    }
}

console.log(`Fixed ${fixedCount} files`);
