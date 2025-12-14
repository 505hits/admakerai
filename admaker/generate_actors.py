import json

# Base URL
base_url = "https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/Actors/"

actors = []

# Business actors (existing)
business_actors = [
    ("actor_001", "Professional Man - Office", "business-actor-1.png", "Modern office setting with city skyline view, professional business attire, podcast microphone setup", "male", "30-40"),
    ("actor_001b", "Professional Woman - Podcast", "business-actor-2.jpg", "Warm podcast studio with wooden panels, professional setup with microphone", "female", "28-38"),
    ("actor_001c", "Business Podcaster", "business-actor-3.jpg", "Modern podcast studio with warm lighting and professional microphone setup", "male", "25-35"),
    ("actor_001d", "Executive Professional", "business-actor-4.png", "Executive office with modern lighting, professional business suit and tie", "male", "30-40"),
    ("actor_001e", "Business Professional - Office", "business-actor-5.png", "Modern office with city skyline, professional business attire, podcast setup", "male", "28-38"),
    ("actor_001f", "Business Woman - Podcast Studio", "business-actor-6.jpg", "Modern podcast studio with professional lighting, orange sweater and microphone setup", "female", "25-35"),
    ("actor_001g", "Business Man - Executive Office", "business-actor-7.png", "Executive office with Dubai skyline view, professional business attire with microphone", "male", "28-38"),
    ("actor_001h", "Business Man - Podcast Host", "business-actor-8.jpg", "Professional podcast studio with modern lighting, casual business attire", "male", "30-40"),
    ("actor_001i", "Business Woman - Studio Interview", "business-actor-9.jpg", "Professional studio with modern lighting, business casual attire with microphone", "female", "25-35"),
    ("actor_001j", "Business Man - Casual Podcast", "business-actor-10.jpg", "Warm podcast studio with natural lighting, casual hoodie style with microphone", "male", "28-38"),
    ("actor_001k", "Business Woman - Professional Podcast", "business-actor-11.jpg", "Professional podcast studio with modern lighting, beige sweater and microphone", "female", "25-35"),
    ("actor_001l", "Business Man - Dubai Office", "business-actor-12.png", "Modern office with Dubai skyline and Burj Khalifa view, casual business shirt", "male", "30-40"),
]

for id, name, img, desc, gender, age in business_actors:
    actors.append({
        "id": id,
        "name": name,
        "category": "Business",
        "imageUrl": base_url + img,
        "thumbnailUrl": base_url + img,
        "sceneDescription": desc,
        "tags": ["business", "professional"],
        "gender": gender,
        "ageRange": age,
        "style": "Business professional"
    })

# Business 10-13
for i in range(10, 14):
    actors.append({
        "id": f"business_{i:03d}",
        "name": f"Business Professional {i}",
        "category": "Business",
        "imageUrl": f"{base_url}business{i}.png",
        "thumbnailUrl": f"{base_url}business{i}.png",
        "sceneDescription": "Professional business setting",
        "tags": ["business", "professional"],
        "gender": "neutral",
        "ageRange": "25-40",
        "style": "Business professional"
    })

# Tech 15-20 (Business category)
for i in range(15, 21):
    actors.append({
        "id": f"tech_{i:03d}",
        "name": f"Tech Professional {i}",
        "category": "Business",
        "imageUrl": f"{base_url}tech{i}.png",
        "thumbnailUrl": f"{base_url}tech{i}.png",
        "sceneDescription": "Technology business setting",
        "tags": ["business", "tech", "professional"],
        "gender": "neutral",
        "ageRange": "28-40",
        "style": "Tech professional"
    })

# Casual actors
casual_actors = [
    ("actor_002", "Casual Woman - Street Style", "casual-actor-1.png", "Outdoor urban setting with denim jacket, casual street style with microphone", "female", "25-35"),
    ("actor_002b", "Casual Woman - Modern Apartment", "casual-actor-2.png", "Modern apartment with city view, casual white top and jeans", "female", "22-30"),
    ("actor_002c", "Casual Woman - Outdoor Interview", "casual-actor-3.png", "European street setting with warm sweater, casual outdoor interview style", "female", "25-35"),
    ("actor_002d", "Casual Woman - Urban Vibe", "casual-actor-4.png", "Urban street with bokeh lights, casual tank top and denim jacket", "female", "22-30"),
    ("actor_002e", "Casual Woman - Cozy Home", "casual-actor-5.jpg", "Cozy home office with plants, casual sweater and jeans with coffee cup", "female", "28-38"),
]

for id, name, img, desc, gender, age in casual_actors:
    actors.append({
        "id": id,
        "name": name,
        "category": "Casual",
        "imageUrl": base_url + img,
        "thumbnailUrl": base_url + img,
        "sceneDescription": desc,
        "tags": ["casual", "lifestyle"],
        "gender": gender,
        "ageRange": age,
        "style": "Casual lifestyle"
    })

# Casual 10-14
for i in range(10, 15):
    actors.append({
        "id": f"casual_{i:03d}",
        "name": f"Casual Creator {i}",
        "category": "Casual",
        "imageUrl": f"{base_url}casual{i}.png",
        "thumbnailUrl": f"{base_url}casual{i}.png",
        "sceneDescription": "Casual lifestyle setting",
        "tags": ["casual", "lifestyle"],
        "gender": "neutral",
        "ageRange": "20-35",
        "style": "Casual creator"
    })

# Beauty actors 1-10
for i in range(1, 11):
    actors.append({
        "id": f"actor_003{chr(96+i) if i > 1 else ''}",
        "name": f"Beauty Creator {i}",
        "category": "Beauty",
        "imageUrl": f"{base_url}beauty-actor-{i}.png",
        "thumbnailUrl": f"{base_url}beauty-actor-{i}.png",
        "sceneDescription": "Professional beauty studio setting",
        "tags": ["beauty", "makeup", "skincare"],
        "gender": "neutral",
        "ageRange": "22-35",
        "style": "Beauty professional"
    })

# Product Demo 1-14
for i in range(1, 15):
    actors.append({
        "id": f"product_{i:03d}",
        "name": f"Product Demo {i}",
        "category": "Product Demo",
        "imageUrl": f"{base_url}product{i}.png",
        "thumbnailUrl": f"{base_url}product{i}.png",
        "sceneDescription": "Product demonstration setting",
        "tags": ["product", "demo", "commercial"],
        "gender": "neutral",
        "ageRange": "25-40",
        "style": "Product showcase"
    })

# Micro-Content 1-19
for i in range(1, 20):
    actors.append({
        "id": f"micro_{i:03d}",
        "name": f"Micro Content {i}",
        "category": "Micro-Content",
        "imageUrl": f"{base_url}micro{i}.png",
        "thumbnailUrl": f"{base_url}micro{i}.png",
        "sceneDescription": "Short-form content setting",
        "tags": ["micro", "short-form", "social"],
        "gender": "neutral",
        "ageRange": "20-35",
        "style": "Social media creator"
    })

# Sport 1-9
for i in range(1, 10):
    actors.append({
        "id": f"sport_{i:03d}",
        "name": f"Sport Creator {i}",
        "category": "Sport",
        "imageUrl": f"{base_url}sport-{i}.png",
        "thumbnailUrl": f"{base_url}sport-{i}.png",
        "sceneDescription": "Athletic and fitness setting",
        "tags": ["sport", "fitness", "athletic"],
        "gender": "neutral",
        "ageRange": "22-35",
        "style": "Sport content creator"
    })

# Vlog actors
vlog_actors = [
    ("vlog_001", "Vlog Creator 1", "vlog-actor-1.jpg"),
    ("vlog_002", "Vlog Creator 2", "vlog-actor-2.png"),
    ("vlog_003", "Vlog Creator 3", "vlog-actor-3.png"),
    ("vlog_004", "Vlog Creator 4", "vlog-actor-4.png"),
]

for id, name, img in vlog_actors:
    actors.append({
        "id": id,
        "name": name,
        "category": "Vlog",
        "imageUrl": base_url + img,
        "thumbnailUrl": base_url + img,
        "sceneDescription": "Vlog content creation setting",
        "tags": ["vlog", "lifestyle", "content"],
        "gender": "neutral",
        "ageRange": "20-35",
        "style": "Vlog creator"
    })

# Originals
originals = [
    ("original_001", "Fire Scene", "fire.png", "Dramatic fire scene background"),
    ("original_002", "Moon Scene", "moon.png", "Mystical moon scene background"),
    ("original_003", "Mountain Scene", "mountain.png", "Epic mountain landscape background"),
    ("original_004", "Building Scene", "building.png", "Urban building architecture background"),
    ("original_005", "Subway Scene", "subway.png", "Urban subway setting background"),
]

for id, name, img, desc in originals:
    actors.append({
        "id": id,
        "name": name,
        "category": "Originals",
        "imageUrl": base_url + img,
        "thumbnailUrl": base_url + img,
        "sceneDescription": desc,
        "tags": ["original", "cinematic"],
        "gender": "neutral",
        "ageRange": "any",
        "style": "Cinematic original"
    })

# Create final JSON
data = {
    "actors": actors,
    "categories": ["Business", "Casual", "Beauty", "Product Demo", "Micro-Content", "Sport", "Vlog", "Originals"],
    "note": "All image URLs point to Cloudflare R2 storage with the Actors/ prefix included."
}

# Write to file
with open("ai-actors-complete.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Generated JSON with {len(actors)} actors")
print(f"Categories: {', '.join(data['categories'])}")
