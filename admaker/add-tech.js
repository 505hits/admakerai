const fs = require('fs');

const base = 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/';

// Read existing actors
const data = JSON.parse(fs.readFileSync('public/data/ai-actors.json', 'utf8'));
const actors = data.actors;

// Add Tech 15-20 to Business category
for (let i = 15; i <= 20; i++) {
    // Check if already exists
    const exists = actors.some(a => a.id === `tech_${String(i).padStart(3, '0')}`);

    if (!exists) {
        actors.push({
            id: `tech_${String(i).padStart(3, '0')}`,
            name: `Tech Professional ${i}`,
            category: 'Business',
            imageUrl: `${base}tech${i}.png`,
            thumbnailUrl: `${base}tech${i}.png`,
            sceneDescription: 'Technology business setting',
            tags: ['business', 'tech', 'professional'],
            gender: 'neutral',
            ageRange: '28-40',
            style: 'Tech professional'
        });
        console.log(`Added tech${i}.png to Business category`);
    } else {
        console.log(`tech${i}.png already exists`);
    }
}

// Write updated file
data.actors = actors;
fs.writeFileSync('public/data/ai-actors.json', JSON.stringify(data, null, 4));

console.log(`\nTotal actors: ${actors.length}`);

// Count by category
const counts = {};
actors.forEach(a => {
    counts[a.category] = (counts[a.category] || 0) + 1;
});

console.log('\nActors by category:');
Object.keys(counts).sort().forEach(c => {
    console.log(`  ${c}: ${counts[c]}`);
});
