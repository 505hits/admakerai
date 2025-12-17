const fs = require('fs');

// Lire le fichier principal
const mainFile = JSON.parse(fs.readFileSync('./admaker/public/data/ai-actors.json', 'utf8'));

// Créer les acteurs Présentation
const presentationActors = [];
for (let i = 1; i <= 14; i++) {
    presentationActors.push({
        "id": `presentation_${i.toString().padStart(3, '0')}`,
        "name": `Présentation ${i}`,
        "category": "Présentation",
        "imageUrl": `https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/presentation${i}.png`,
        "thumbnailUrl": `https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/presentation${i}.png`,
        "sceneDescription": "Professional presentation setting",
        "tags": ["presentation", "professional", "business"],
        "gender": "neutral",
        "ageRange": "25-40",
        "style": "Professional presenter"
    });
}

// Ajouter les acteurs Présentation avant Originals
const originalsIndex = mainFile.actors.findIndex(a => a.category === 'Originals');
if (originalsIndex !== -1) {
    mainFile.actors.splice(originalsIndex, 0, ...presentationActors);
}

// Ajouter la catégorie Présentation si elle n'existe pas
if (!mainFile.categories.includes('Présentation')) {
    const originalsIdx = mainFile.categories.indexOf('Originals');
    mainFile.categories.splice(originalsIdx, 0, 'Présentation');
}

// Sauvegarder
fs.writeFileSync('./admaker/public/data/ai-actors.json', JSON.stringify(mainFile, null, 4));

console.log('✅ Catégorie Présentation ajoutée avec succès!');
console.log(`Total acteurs: ${mainFile.actors.length}`);
console.log(`Catégories: ${mainFile.categories.join(', ')}`);
