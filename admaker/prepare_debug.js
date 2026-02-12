const fs = require('fs');
const path = require('path');

const originalFile = path.join(__dirname, 'generate-daily-blog.js');
const debugFile = path.join(__dirname, 'generate-daily-blog-debug.js');

let content = fs.readFileSync(originalFile, 'utf8');

const injection = `
// --- DEBUG INJECTION START ---
const fs_debug = require('fs');
const path_debug = require('path');
const logFile_debug = path_debug.join(__dirname, 'debug_log.txt');
try { fs_debug.writeFileSync(logFile_debug, '', 'utf8'); } catch(e){}
function log_debug(msg) {
    const timestamp = new Date().toISOString();
    let str = msg;
    if (typeof msg !== 'string') {
        try { str = JSON.stringify(msg, null, 2); } catch(e) { str = String(msg); }
    }
    const line = \`[\${timestamp}] \${str}\\n\`;
    try { fs_debug.appendFileSync(logFile_debug, line, 'utf8'); } catch(e){}
    process.stdout.write(line);
}
console.log = log_debug;
console.error = log_debug;
console.warn = log_debug;
// --- DEBUG INJECTION END ---
`;

// Inject logging
if (content.includes("require('dotenv').config();")) {
    content = content.replace("require('dotenv').config();", "require('dotenv').config();\n" + injection);
} else {
    content = injection + content;
}

// Inject Filter
// Target: const pendingTopics = topics.filter(t => t.status === 'pending');
// Replacement: const pendingTopics = topics.filter(t => t.status === 'pending' && (t.keyword.includes('reviews of ugc') || t.keyword.includes('video makers with mobile support')));

const targetLine = "const pendingTopics = topics.filter(t => t.status === 'pending');";
const replacementLine = "const pendingTopics = topics.filter(t => t.status === 'pending' && (t.keyword.includes('reviews of ugc') || t.keyword.includes('video makers with mobile support')));";

if (content.includes(targetLine)) {
    content = content.replace(targetLine, replacementLine);
    console.log("Injected topic filter.");
} else {
    // Try relaxed matching (whitespace agnostic?)
    // Or just look for "t.status === 'pending'"
    if (content.includes("t.status === 'pending'")) {
        content = content.replace(
            "t.status === 'pending'",
            "t.status === 'pending' && (t.keyword.includes('reviews of ugc') || t.keyword.includes('video makers with mobile support'))"
        );
        console.log("Injected topic filter (relaxed match).");
    } else {
        console.log("WARNING: Could not find topic filtering logic to inject.");
    }
}

fs.writeFileSync(debugFile, content, 'utf8');
console.log('Created generate-daily-blog-debug.js with logging and filtering.');
