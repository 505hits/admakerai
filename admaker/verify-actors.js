const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = path.join(__dirname, 'data', 'ai-actors.json');
const actorsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Get list of existing image files
const actorsDir = path.join(__dirname, 'public', 'actors');
const existingFiles = fs.readdirSync(actorsDir);

console.log('=== EXISTING FILES ===');
console.log(existingFiles.join('\n'));
console.log('\n=== ACTORS IN JSON ===');
console.log(`Total: ${actorsData.actors.length}`);

actorsData.actors.forEach(actor => {
    const imagePath = actor.imageUrl.replace('/actors/', '');
    const exists = existingFiles.includes(imagePath);
    console.log(`${exists ? '✓' : '✗'} ${actor.id} - ${actor.name} - ${imagePath}`);
});
