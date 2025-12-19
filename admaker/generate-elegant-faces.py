import os
import requests
import time
import json
from pathlib import Path

# Configuration
API_KEY = "c4f6b75bed7509d71118cc425052b88f"
BASE_URL = "https://api.kie.ai"
R2_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID")
R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY")

# Actors configuration
actors = [
    {
        "id": "elegant_001",
        "name": "Elegant Woman - Natural Light",
        "filename": "elegant-1.png",
        "gender": "WOMAN",
        "outfit": "tight ribbed cream knitwear",
        "location": "sunlit modern bedroom with white sheets"
    },
    {
        "id": "elegant_002",
        "name": "Elegant Man - Urban Style",
        "filename": "elegant-2.png",
        "gender": "MAN",
        "outfit": "fitted black turtleneck",
        "location": "dimly lit modern bathroom with marble tiles"
    },
    {
        "id": "elegant_003",
        "name": "Elegant Woman - Sophisticated",
        "filename": "elegant-3.png",
        "gender": "WOMAN",
        "outfit": "elegant off-shoulder beige sweater",
        "location": "bright minimalist apartment with natural light"
    }
]

def create_prompt(gender, outfit, location):
    return f"""A hyper-realistic RAW photo, handheld smartphone selfie of a stunning {gender}, looking directly into the lens with a confident and magnetic gaze.

Extreme Realism Details: 8k resolution, cinematic photorealism. Focus on hyper-detailed skin texture: visible pores, natural skin grain, subtle micro-blemishes, and fine facial hair. Zero digital smoothing. Natural perspiration and real skin reflectivity. Hair: messy, natural strands with flyaways.

UGC Aesthetic: Authentic 'unfiltered' social media look. Slight lens flare, subtle motion blur, and organic smartphone camera noise. Wide-angle 24mm lens distortion typical of a front-facing camera. Non-professional, candid framing.

Physique & Outfit: Strong focus on realistic body physics. Wearing {outfit}, showing high-fidelity fabric tension, realistic wrinkles, and shadows that define a fit silhouette.

Lighting & Environment: Shot in a {location}. Harsh overhead lighting or natural window light creating high-contrast highlights on the face and collarbones. Shallow depth of field with a messy, realistic background.

Technical Signature: No cinematic color grading, raw sensor output, high dynamic range, authentic shadows, 100% lifelike anatomy."""

def generate_actor(actor):
    prompt = create_prompt(actor["gender"], actor["outfit"], actor["location"])
    
    print(f"\n🎨 Generating: {actor['name']}")
    
    response = requests.post(
        f"{BASE_URL}/api/v1/nano-banana/create-task",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}"
        },
        json={
            "prompt": prompt,
            "aspect_ratio": "9:16",
            "resolution": "1K",
            "output_format": "png"
        }
    )
    
    data = response.json()
    
    if data.get("code") == 200 and data.get("data", {}).get("taskId"):
        task_id = data["data"]["taskId"]
        print(f"✅ Task created: {task_id}")
        return {**actor, "taskId": task_id}
    else:
        raise Exception(f"Failed to create task: {data.get('msg', 'Unknown error')}")

def check_status(task_id):
    response = requests.get(
        f"{BASE_URL}/api/v1/nano-banana/check-status",
        headers={"Authorization": f"Bearer {API_KEY}"},
        params={"taskId": task_id}
    )
    return response.json()

def wait_for_completion(task):
    print(f"⏳ Waiting for {task['name']}...")
    
    for _ in range(300):  # 5 minutes max
        status = check_status(task["taskId"])
        
        if status.get("data", {}).get("state") == "success":
            image_url = status["data"].get("imageUrl")
            if image_url:
                print(f"✅ {task['name']} completed!")
                return image_url
        elif status.get("data", {}).get("state") == "fail":
            raise Exception(f"Generation failed: {status['data'].get('failMsg')}")
        
        time.sleep(1)
    
    raise Exception("Timeout after 5 minutes")

def download_image(url, filename):
    print(f"📥 Downloading {filename}...")
    response = requests.get(url)
    
    # Save temporarily
    temp_path = Path(f"temp_{filename}")
    temp_path.write_bytes(response.content)
    
    print(f"✅ Downloaded: {temp_path}")
    return temp_path

def main():
    print("🍌 Starting Automated Elegant Faces Generation\n")
    print("=" * 60)
    
    try:
        # Step 1: Generate all tasks
        print("\n📤 Step 1: Creating generation tasks...\n")
        tasks = []
        for actor in actors:
            task = generate_actor(actor)
            tasks.append(task)
            time.sleep(2)  # 2s between requests
        
        # Step 2: Wait for completion
        print("\n⏳ Step 2: Waiting for generation (2-5 minutes)...\n")
        results = []
        for task in tasks:
            image_url = wait_for_completion(task)
            results.append({
                **task,
                "sourceUrl": image_url
            })
        
        # Step 3: Download images
        print("\n📥 Step 3: Downloading images...\n")
        for result in results:
            temp_path = download_image(result["sourceUrl"], result["filename"])
            result["localPath"] = str(temp_path)
        
        # Step 4: Summary
        print("\n" + "=" * 60)
        print("\n🎉 SUCCESS! Images generated and downloaded\n")
        print("📸 Generated Actors:")
        for i, result in enumerate(results, 1):
            print(f"\n{i}. {result['name']}")
            print(f"   ID: {result['id']}")
            print(f"   Source: {result['sourceUrl']}")
            print(f"   Local: {result['localPath']}")
        
        print("\n📝 Next steps:")
        print("1. Upload the temp_*.png files to R2 manually")
        print("2. Or run the R2 upload script")
        print("\n✅ Images are ready!")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        raise

if __name__ == "__main__":
    main()
