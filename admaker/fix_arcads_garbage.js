const fs = require('fs');
const path = require('path');

// Target specific files that are known to be broken, but scan all blog directories to be safe
const dirs = ['app/de/blog', 'app/fr/blog', 'app/es/blog', 'app/pt/blog', 'app/blog'];

function getFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(getFiles(file));
        else if (file.endsWith('page.tsx')) results.push(file);
    });
    return results;
}

const files = [];
dirs.forEach(d => files.push(...getFiles(path.join(__dirname, d))));

let fixedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let mod = false;

    // Fix Top Garbage: <div style={{ maxWidth: "1400px", margin: "0 auto" }}> }
    // Enforce matching the specific garbage pattern
    const topGarbageRegex = /<div style=\{\{ maxWidth: "1400px", margin: "0 auto" \}\}>\s*\}\s*/g;
    if (content.match(topGarbageRegex)) {
        content = content.replace(topGarbageRegex, '');
        mod = true;
    }

    // Fix function/variable start if it was touched by the brace
    // e.g. }useEffect -> useEffect
    // The previous regex removes the brace '}', so we just need to ensure no other '}' is lingering if the space was weird
    // Actually the regex above includes `\}\s*`, so it strips the closing brace.

    // Fix Bottom Garbage: ); </div> }
    // The valid ending is ); }
    // The garbage ending is ); </div> }
    // Or sometimes ); </div></div> }

    // We look for </div> appearing AFTER the return statement's );
    // and BEFORE the final } declaration of the component.

    // Strategy: Verify if the file ends with garbage
    // Matches: ); <spaces/newlines> </div> <spaces/newlines> } <EOF>
    const bottomGarbageRegex = /\);\s*<\/div>\s*\}$/;
    if (content.match(bottomGarbageRegex)) {
        content = content.replace(bottomGarbageRegex, ');\n}');
        mod = true;
    }

    // Also check for the double closing issue: </div></div>
    const doubleDivRegex = /<\/div><\/div>\s*\}\s*$/;
    // but be careful not to remove valid divs if they are inside the return.
    // The garbage one is usually strictly after ); 

    // Alternative approach: Find the last );
    const lastReturnIdx = content.lastIndexOf(');');
    if (lastReturnIdx !== -1) {
        const afterReturn = content.slice(lastReturnIdx + 2);
        // If afterReturn contains </div>, it's likely garbage because the component function shouldn't have JSX tags after return
        if (afterReturn.includes('</div>')) {
            // Replace everything after inclusive ); with );\n}
            content = content.slice(0, lastReturnIdx + 2) + '\n}';
            mod = true;
        }
    }

    if (mod) {
        fs.writeFileSync(file, content);
        console.log(`Fixed garbage in: ${file}`);
        fixedCount++;
    }
});

console.log(`Total files fixed: ${fixedCount}`);
