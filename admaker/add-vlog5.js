const fs = require('fs');

const base = 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/';

// Read existing actors
let data;
try {
    data = JSON.parse(fs.readFileSync('public/data/ai-actors.json', 'utf8'));
} catch (e) {
    console.error('Error reading JSON:', e.message);
    process.exit(1);
}

const actors = data.actors;

// Check if vlog-actor-5 already exists
const hasVlog5 = actors.some(a => a.imageUrl && a.imageUrl.includes('vlog-actor-5'));

if (!hasVlog5) {
    // Add vlog-actor-5
    actors.push({
        id: 'vlog_005',
        name: 'Vlog Creator 5',
        category: 'Vlog',
        imageUrl: `${base}vlog-actor-5.jpg`,
        thumbnailUrl: `${base}vlog-actor-5.jpg`,
        sceneDescription: 'Vlog content creation setting',
        tags: ['vlog', 'lifestyle', 'content'],
        gender: 'neutral',
        ageRange: '20-35',
        style: 'Vlog creator'
    });
    console.log('Added vlog-actor-5.jpg');
} else {
    console.log('vlog-actor-5.jpg already exists');
}

// Write updated file
data.actors = actors;
fs.writeFileSync('public/data/ai-actors.json', JSON.stringify(data, null, 4));

console.log(`Total actors: ${actors.length}`);
console.log(`Categories: ${data.categories.join(', ')}`);

// Count by category
const counts = {};
actors.forEach(a => {
    counts[a.category] = (counts[a.category] || 0) + 1;
});

console.log('\nActors by category:');
Object.keys(counts).sort().forEach(c => {
    console.log(`  ${c}: ${counts[c]}`);
});
