const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'admaker', 'app', 'blog', 'best-ugc-video-creation-service-for-real-estate-marketing', 'page.tsx');

let content = fs.readFileSync(filePath, 'utf8');

// Replace "{landingPageUrl}" with {landingPageUrl} (JSX syntax)
content = content.replace(/"\{landingPageUrl\}"/g, '{landingPageUrl}');

fs.writeFileSync(filePath, content, 'utf8');

console.log('Replacement completed successfully!');
