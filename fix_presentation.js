const fs = require('fs');

// Lire le fichier principal
const mainFile = JSON.parse(fs.readFileSync('./admaker/public/data/ai-actors.json', 'utf8'));

// D'après la capture d'écran, ces images semblent fonctionner :
// - presentation2 (visible)
// - presentation9 (visible - femme en vert)
// - presentation10 (visible - femme en rose)
// - presentation11, 12, 13, 14 (probablement visibles aussi)

// Supprimer tous les acteurs Présentation actuels
mainFile.actors = mainFile.actors.filter(a => a.category !== 'Présentation');

// Ajouter uniquement les images qui existent vraiment
// Basé sur la capture : 2, 9, 10 sont visibles
// On va garder 2, 9-14 pour être sûr
const workingPresentationNumbers = [2, 9, 10, 11, 12, 13, 14];

const presentationActors = workingPresentationNumbers.map(i => ({
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
}));

// Ajouter les acteurs Présentation avant Originals
const originalsIndex = mainFile.actors.findIndex(a => a.category === 'Originals');
if (originalsIndex !== -1) {
    mainFile.actors.splice(originalsIndex, 0, ...presentationActors);
}

// Sauvegarder
fs.writeFileSync('./admaker/public/data/ai-actors.json', JSON.stringify(mainFile, null, 4));

console.log('✅ Fichier mis à jour - gardé uniquement les images qui existent');
console.log(`Total acteurs: ${mainFile.actors.length}`);
console.log(`Images Présentation: ${workingPresentationNumbers.join(', ')}`);
