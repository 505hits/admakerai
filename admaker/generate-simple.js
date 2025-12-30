// Simplified script - just generates and downloads images
const fs = require('fs');

// SECURITY: Never hardcode API keys!
const API_KEY = process.env.KIE_API_KEY;
const BASE_URL = 'https://api.kie.ai';

if (!API_KEY) {
    console.error('❌ KIE_API_KEY environment variable not set!');
    console.error('Please set it in your .env.local file');
    process.exit(1);
}

const actors = [
    {
        id: 'elegant_001',
        name: 'Elegant Woman - Natural Light',
        filename: 'elegant-1.png',
        gender: 'WOMAN',
        outfit: 'tight ribbed cream knitwear',
        location: 'sunlit modern bedroom with white sheets'
    },
    {
        id: 'elegant_002',
        name: 'Elegant Man - Urban Style',
        filename: 'elegant-2.png',
        gender: 'MAN',
        outfit: 'fitted black turtleneck',
        location: 'dimly lit modern bathroom with marble tiles'
    },
    {
        id: 'elegant_003',
        name: 'Elegant Woman - Sophisticated',
        filename: 'elegant-3.png',
        gender: 'WOMAN',
        outfit: 'elegant off-shoulder beige sweater',
        location: 'bright minimalist apartment with natural light'
    }
];

const createPrompt = (gender, outfit, location) => {
    return `A hyper-realistic RAW photo, handheld smartphone selfie of a stunning ${gender}, looking directly into the lens with a confident and magnetic gaze.

Extreme Realism Details: 8k resolution, cinematic photorealism. Focus on hyper-detailed skin texture: visible pores, natural skin grain, subtle micro-blemishes, and fine facial hair. Zero digital smoothing. Natural perspiration and real skin reflectivity. Hair: messy, natural strands with flyaways.

UGC Aesthetic: Authentic 'unfiltered' social media look. Slight lens flare, subtle motion blur, and organic smartphone camera noise. Wide-angle 24mm lens distortion typical of a front-facing camera. Non-professional, candid framing.

Physique & Outfit: Strong focus on realistic body physics. Wearing ${outfit}, showing high-fidelity fabric tension, realistic wrinkles, and shadows that define a fit silhouette.

Lighting & Environment: Shot in a ${location}. Harsh overhead lighting or natural window light creating high-contrast highlights on the face and collarbones. Shallow depth of field with a messy, realistic background.

Technical Signature: No cinematic color grading, raw sensor output, high dynamic range, authentic shadows, 100% lifelike anatomy.`;
};

async function generateActor(actor) {
    const prompt = createPrompt(actor.gender, actor.outfit, actor.location);

    console.log(`\n🎨 Generating: ${actor.name}`);

    const response = await fetch(`${BASE_URL}/api/v1/nano-banana/create-task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            prompt: prompt,
            aspect_ratio: '9:16',
            resolution: '1K',
            output_format: 'png'
        })
    });

    const data = await response.json();

    if (data.code === 200 && data.data && data.data.taskId) {
        console.log(`✅ Task created: ${data.data.taskId}`);
        return { ...actor, taskId: data.data.taskId };
    } else {
        throw new Error(data.msg || 'Failed to create task');
    }
}

async function checkTaskStatus(taskId) {
    const response = await fetch(`${BASE_URL}/api/v1/nano-banana/check-status?taskId=${taskId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    return await response.json();
}

async function waitForCompletion(task) {
    console.log(`⏳ Waiting for ${task.name}...`);

    for (let i = 0; i < 300; i++) {
        const status = await checkTaskStatus(task.taskId);

        if (status.data && status.data.state === 'success' && status.data.imageUrl) {
            console.log(`✅ ${task.name} completed!`);
            return status.data.imageUrl;
        } else if (status.data && status.data.state === 'fail') {
            throw new Error(`Generation failed: ${status.data.failMsg}`);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    throw new Error('Timeout after 5 minutes');
}

async function downloadImage(imageUrl, filename) {
    console.log(`📥 Downloading ${filename}...`);

    const response = await fetch(imageUrl);
    const buffer = Buffer.from(await response.arrayBuffer());

    fs.writeFileSync(filename, buffer);
    console.log(`✅ Saved: ${filename}`);

    return filename;
}

async function main() {
    console.log('🍌 Starting Elegant Faces Generation\n');
    console.log('='.repeat(60));

    try {
        // Step 1: Generate tasks
        console.log('\n📤 Step 1: Creating generation tasks...\n');
        const tasks = [];
        for (const actor of actors) {
            const task = await generateActor(actor);
            tasks.push(task);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // Step 2: Wait for completion
        console.log('\n⏳ Step 2: Waiting for generation (2-5 minutes)...\n');
        const results = [];
        for (const task of tasks) {
            const imageUrl = await waitForCompletion(task);
            results.push({ ...task, imageUrl });
        }

        // Step 3: Download images
        console.log('\n📥 Step 3: Downloading images...\n');
        for (const result of results) {
            await downloadImage(result.imageUrl, result.filename);
        }

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('\n🎉 SUCCESS!\n');
        console.log('📸 Generated images:');
        results.forEach((r, i) => {
            console.log(`\n${i + 1}. ${r.name}`);
            console.log(`   File: ${r.filename}`);
            console.log(`   URL: ${r.imageUrl}`);
        });

        console.log('\n✅ Images downloaded successfully!');
        console.log('\n📝 Next: Upload to R2 using upload-r2.ps1 script');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
