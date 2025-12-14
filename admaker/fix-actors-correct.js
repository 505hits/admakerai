const fs = require('fs');
const path = require('path');

// Charger le fichier existant
const filePath = path.join(__dirname, 'data', 'ai-actors.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Corriger les noms - ENLEVER le t supplémentaire que j'avais ajouté par erreur
data.actors = data.actors.map(actor => {
    if (actor.category === 'Product Demo') {
        // Remplacer productt par product (enlever le t en trop)
        actor.imageUrl = actor.imageUrl.replace('productt', 'product');
        actor.thumbnailUrl = actor.thumbnailUrl.replace('productt', 'product');
    }
    if (actor.category === 'Micro-Content') {
        // Remplacer microt par micro (enlever le t en trop)
        actor.imageUrl = actor.imageUrl.replace(/^microt/, 'micro');
        actor.thumbnailUrl = actor.thumbnailUrl.replace(/^microt/, 'micro');
    }
    return actor;
});

// Sauvegarder
fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');

console.log('✅ Noms de fichiers corrigés (sans le t)!');
console.log('Product Demo exemple:', data.actors.filter(a => a.category === 'Product Demo')[0]?.imageUrl);
console.log('Micro-Content exemple:', data.actors.filter(a => a.category === 'Micro-Content')[0]?.imageUrl);
console.log('Tech exemple:', data.actors.filter(a => a.id.startsWith('tech_'))[0]?.imageUrl);
