const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = path.join(__dirname, 'data', 'ai-actors.json');
const actorsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Get list of existing image files
const actorsDir = path.join(__dirname, 'public', 'actors');
const existingFiles = fs.readdirSync(actorsDir);

console.log('Existing files:', existingFiles);

// Filter actors to keep only those with existing images
const validActors = actorsData.actors.filter(actor => {
    const imagePath = actor.imageUrl.replace('/actors/', '');
    const thumbnailPath = actor.thumbnailUrl.replace('/actors/', '');

    const imageExists = existingFiles.includes(imagePath);
    const thumbnailExists = existingFiles.includes(thumbnailPath);

    if (!imageExists || !thumbnailExists) {
        console.log(`Removing actor: ${actor.name} (${actor.id}) - Image: ${imageExists}, Thumbnail: ${thumbnailExists}`);
        return false;
    }

    return true;
});

console.log(`\nOriginal actors: ${actorsData.actors.length}`);
console.log(`Valid actors: ${validActors.length}`);
console.log(`Removed: ${actorsData.actors.length - validActors.length}`);

// Update the JSON
actorsData.actors = validActors;

// Write back to file
fs.writeFileSync(jsonPath, JSON.stringify(actorsData, null, 4));

console.log('\nDone! Updated ai-actors.json');
