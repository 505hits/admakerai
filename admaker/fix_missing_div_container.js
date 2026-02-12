const fs = require('fs');
const path = require('path');

const targetFiles = [
    'app/blog/page.tsx',
    'app/blog/reviews-of-ugc-video-makers-with-mobile-support/page.tsx',
    'app/de/blog/page.tsx',
    'app/es/blog/page.tsx',
    'app/fr/blog/page.tsx',
    'app/pt/blog/page.tsx'
];

targetFiles.forEach(relPath => {
    const file = path.join(__dirname, relPath);
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let mod = false;

        // Pattern: ending with </> ); }
        // We want to insert </div> before </>

        // Regex to capture the newline and indentation before </>
        // grouping 1: (\n\s*)
        // grouping 2: (</>\s*\n\s*\);)
        const regex = /(\n\s*)(<\/>\s*\n\s*\);)/;

        if (content.match(regex)) {
            // We check if it already has the div?
            // Since I know exactly which files are broken and how, I will just apply it.
            // But to be safe against double run, I check if the line before is </div> with same indentation?
            // It's hard to check indentation easily with simple regex lookbehind.

            // I'll trust my analysis that these specific files remain broken.
            // I will replace.
            content = content.replace(regex, '$1            </div>$1$2');
            mod = true;
        }

        if (mod) {
            fs.writeFileSync(file, content);
            console.log(`Inserted missing container div in: ${relPath}`);
        } else {
            console.log(`Pattern not found in: ${relPath}`);
        }
    } else {
        console.log(`File not found: ${relPath}`);
    }
});
