const fs = require('fs');

const base = 'https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/';

// Read existing actors
const existing = JSON.parse(fs.readFileSync('public/data/ai-actors.json', 'utf8'));
const actors = existing.actors;

// Add missing Product Demo 2-9
for (let i = 2; i <= 9; i++) {
    actors.push({
        id: `product_${String(i).padStart(3, '0')}`,
        name: `Product Demo ${i}`,
        category: 'Product Demo',
        imageUrl: `${base}product${i}.png`,
        thumbnailUrl: `${base}product${i}.png`,
        sceneDescription: 'Product demonstration setting',
        tags: ['product', 'demo', 'commercial'],
        gender: 'neutral',
        ageRange: '25-40',
        style: 'Product showcase'
    });
}

// Add Sport 1-9
for (let i = 1; i <= 9; i++) {
    actors.push({
        id: `sport_${String(i).padStart(3, '0')}`,
        name: `Sport Creator ${i}`,
        category: 'Sport',
        imageUrl: `${base}sport-${i}.png`,
        thumbnailUrl: `${base}sport-${i}.png`,
        sceneDescription: 'Athletic and fitness setting',
        tags: ['sport', 'fitness', 'athletic'],
        gender: 'neutral',
        ageRange: '22-35',
        style: 'Sport content creator'
    });
}

// Add Vlog 1-4
const vlogs = [
    { id: 'vlog_001', name: 'Vlog Creator 1', img: 'vlog-actor-1.jpg' },
    { id: 'vlog_002', name: 'Vlog Creator 2', img: 'vlog-actor-2.png' },
    { id: 'vlog_003', name: 'Vlog Creator 3', img: 'vlog-actor-3.png' },
    { id: 'vlog_004', name: 'Vlog Creator 4', img: 'vlog-actor-4.png' },
];

vlogs.forEach(v => {
    actors.push({
        id: v.id,
        name: v.name,
        category: 'Vlog',
        imageUrl: base + v.img,
        thumbnailUrl: base + v.img,
        sceneDescription: 'Vlog content creation setting',
        tags: ['vlog', 'lifestyle', 'content'],
        gender: 'neutral',
        ageRange: '20-35',
        style: 'Vlog creator'
    });
});

// Add Subway to Originals
actors.push({
    id: 'original_005',
    name: 'Subway Scene',
    category: 'Originals',
    imageUrl: `${base}subway.png`,
    thumbnailUrl: `${base}subway.png`,
    sceneDescription: 'Urban subway setting background',
    tags: ['original', 'cinematic', 'urban'],
    gender: 'neutral',
    ageRange: 'any',
    style: 'Cinematic original'
});

// Update categories
const categories = ['Business', 'Casual', 'Beauty', 'Product Demo', 'Micro-Content', 'Sport', 'Vlog', 'Originals'];

// Write updated file
const data = {
    actors: actors,
    categories: categories,
    note: 'All image URLs point to Cloudflare R2 storage with the Actors/ prefix included.'
};

fs.writeFileSync('public/data/ai-actors.json', JSON.stringify(data, null, 4));
console.log(`Updated JSON with ${actors.length} total actors`);
console.log(`Categories: ${categories.join(', ')}`);
