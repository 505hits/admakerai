# Script pour générer les entrées manquantes dans ai-actors.json

# Product Demo manquants : product2-9
product_demos = []
for i in range(2, 10):
    product_demos.append({
        "id": f"product_00{i}",
        "name": f"Product Demo {i}",
        "category": "Product Demo",
        "imageUrl": f"https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/product{i}.png",
        "thumbnailUrl": f"https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/product{i}.png",
        "sceneDescription": "Product demonstration setting",
        "tags": ["product", "demo", "commercial"],
        "gender": "neutral",
        "ageRange": "25-40",
        "style": "Product showcase"
    })

# Tech : tech15-20 (6 images)
tech_actors = []
for i in range(15, 21):
    tech_actors.append({
        "id": f"tech_{i:03d}",
        "name": f"Tech Professional {i}",
        "category": "Tech",
        "imageUrl": f"https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/tech{i}.png",
        "thumbnailUrl": f"https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/tech{i}.png",
        "sceneDescription": "Tech professional setting",
        "tags": ["tech", "technology", "professional"],
        "gender": "neutral",
        "ageRange": "25-40",
        "style": "Tech professional"
    })

# Vlog : vlog-actor-1-4 (4 images)
vlog_actors = []
for i in range(1, 5):
    vlog_actors.append({
        "id": f"vlog_{i:03d}",
        "name": f"Vlog Creator {i}",
        "category": "Vlog",
        "imageUrl": f"https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/vlog-actor-{i}.png",
        "thumbnailUrl": f"https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/vlog-actor-{i}.png",
        "sceneDescription": "Vlog content creation setting",
        "tags": ["vlog", "content", "creator"],
        "gender": "neutral",
        "ageRange": "20-35",
        "style": "Vlog creator"
    })

import json

# Combiner toutes les nouvelles entrées
all_new_actors = product_demos + tech_actors + vlog_actors

# Afficher le JSON
print(json.dumps(all_new_actors, indent=4))
print(f"\nTotal nouvelles entrées : {len(all_new_actors)}")
print(f"Product Demo : {len(product_demos)}")
print(f"Tech : {len(tech_actors)}")
print(f"Vlog : {len(vlog_actors)}")
