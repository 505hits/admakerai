const fs = require('fs');
const path = require('path');

// Target the specific files identified with the error
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

        // Pattern: \n\s*</>\n\s*\);
        // We want to remove the </> line
        const regex = /\n\s*<\/>\s*\n\s*\);/g;

        if (content.match(regex)) {
            content = content.replace(regex, '\n    );');
            mod = true;
        }

        // Also check for just </> at the end of the return statement if regex didn't catch it
        // sometimes it's like: 
        //             
        // </>
        //     );

        if (content.includes('</>\n    );')) {
            content = content.replace('</>\n    );', '    );');
            mod = true;
        }

        if (mod) {
            fs.writeFileSync(file, content);
            console.log(`Fixed orphan fragment in: ${relPath}`);
        } else {
            console.log(`No orphan fragment found in: ${relPath}`);
        }
    } else {
        console.log(`File not found: ${relPath}`);
    }
});
