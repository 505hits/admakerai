const fs = require('fs');
const path = require('path');

// Charger le fichier existant
const filePath = path.join(__dirname, 'data', 'ai-actors.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Corriger les noms Product Demo (productt au lieu de product)
data.actors = data.actors.map(actor => {
    if (actor.category === 'Product Demo') {
        // Remplacer product par productt
        actor.imageUrl = actor.imageUrl.replace('product', 'productt');
        actor.thumbnailUrl = actor.thumbnailUrl.replace('product', 'productt');
    }
    if (actor.category === 'Micro-Content') {
        // Remplacer micro par microt
        actor.imageUrl = actor.imageUrl.replace(/^micro/, 'microt');
        actor.thumbnailUrl = actor.thumbnailUrl.replace(/^micro/, 'microt');
    }
    return actor;
});

// Sauvegarder
fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');

console.log('✅ Noms de fichiers corrigés!');
console.log('Product Demo:', data.actors.filter(a => a.category === 'Product Demo')[0]?.imageUrl);
console.log('Micro-Content:', data.actors.filter(a => a.category === 'Micro-Content')[0]?.imageUrl);
