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

        // Check if the file starts with a fragment <>\n or return (\n\s*<>
        // most of these files have return (\n\s*<>\n

        // We look for the end:
        //                 </div>
        //     );
        // }
        // And we want to insert </> before );

        const endRegex = /<\/div>\s*\n\s*\);\s*\n\s*}/;

        if (content.match(endRegex)) {
            // Replace the last occurrence of this pattern to be safe, though usually it's unique at end
            // Actually, we can just look for the last ); and check before it
            const lastReturn = content.lastIndexOf(');');
            if (lastReturn !== -1) {
                const beforeReturn = content.substring(0, lastReturn);
                // Check if it already has </>
                if (!beforeReturn.trim().endsWith('</>')) {
                    // It doesn't have </>. We need to insert it.
                    // We need to find where the last </div> ends
                    const lastDiv = beforeReturn.lastIndexOf('</div>');
                    if (lastDiv !== -1) {
                        const afterDiv = beforeReturn.substring(lastDiv + 6); // 6 is length of </div>
                        // if afterDiv is just whitespace, we are good to insert
                        if (!afterDiv.trim()) {
                            content = content.substring(0, lastReturn) + '\n            </>\n    ' + content.substring(lastReturn);
                            mod = true;
                        }
                    }
                }
            }
        }

        if (mod) {
            fs.writeFileSync(file, content);
            console.log(`Restored missing fragment in: ${relPath}`);
        } else {
            // Debug why it didn't match
            const lastReturn = content.lastIndexOf(');');
            if (lastReturn !== -1) {
                const before = content.substring(lastReturn - 20, lastReturn);
                console.log(`File ${relPath} ends with: ${JSON.stringify(before)}`);
            }
        }
    } else {
        console.log(`File not found: ${relPath}`);
    }
});
