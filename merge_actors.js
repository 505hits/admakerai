const fs = require('fs');

// Lire le fichier principal
const mainFile = JSON.parse(fs.readFileSync('./admaker/public/data/ai-actors.json', 'utf8'));

// Lire les acteurs manquants
const missingActors = JSON.parse(fs.readFileSync('./missing_actors.json', 'utf8'));

// Trouver l'index où insérer les Product Demo (après product_001)
const product1Index = mainFile.actors.findIndex(a => a.id === 'product_001');

// Extraire les différentes catégories
const productDemos = missingActors.filter(a => a.category === 'Product Demo');
const techActors = missingActors.filter(a => a.category === 'Tech');
const vlogActors = missingActors.filter(a => a.category === 'Vlog');

// Insérer Product Demo après product_001
if (product1Index !== -1) {
    mainFile.actors.splice(product1Index + 1, 0, ...productDemos);
}

// Ajouter Tech et Vlog à la fin avant Originals
const originalsIndex = mainFile.actors.findIndex(a => a.category === 'Originals');
if (originalsIndex !== -1) {
    mainFile.actors.splice(originalsIndex, 0, ...techActors, ...vlogActors);
}

// Ajouter les catégories Tech et Vlog si elles n'existent pas
if (!mainFile.categories.includes('Tech')) {
    // Insérer Tech avant Originals
    const originalsIdx = mainFile.categories.indexOf('Originals');
    mainFile.categories.splice(originalsIdx, 0, 'Tech', 'Vlog');
}

// Sauvegarder
fs.writeFileSync('./admaker/public/data/ai-actors.json', JSON.stringify(mainFile, null, 4));

console.log('✅ Fichier mis à jour avec succès!');
console.log(`Total acteurs: ${mainFile.actors.length}`);
console.log(`Catégories: ${mainFile.categories.join(', ')}`);
