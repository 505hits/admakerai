// Script to generate images for the blog post using Kie AI Z-Image API
const KIE_API_KEY = process.env.KIE_API_KEY;

const imagePrompts = [
    {
        name: "hero-ai-platforms-dashboard.png",
        prompt: "Modern AI platform dashboard showing UGC video creation interface with multiple brand videos being generated, professional UI design, clean and minimal aesthetic, vibrant colors, 4K quality",
        aspect_ratio: "16:9"
    },
    {
        name: "decision-flowchart.png",
        prompt: "Professional infographic flowchart showing decision tree for choosing AI UGC platform, colorful boxes and arrows, business illustration style, modern design, clear and organized",
        aspect_ratio: "16:9"
    },
    {
        name: "platform-comparison-chart.png",
        prompt: "Side-by-side comparison chart of AI video platforms with feature checkmarks, pricing tiers, modern design, professional business infographic style, clean layout",
        aspect_ratio: "16:9"
    },
    {
        name: "ecommerce-unboxing-ugc.png",
        prompt: "Young woman filming product unboxing video with smartphone, natural lighting, authentic UGC style, casual home setting, excited expression, realistic photography",
        aspect_ratio: "4:3"
    },
    {
        name: "fitness-testimonial-video.png",
        prompt: "Fitness influencer recording testimonial video in modern gym, holding protein shake, authentic and energetic, natural lighting, UGC style content creation",
        aspect_ratio: "4:3"
    },
    {
        name: "ai-vs-real-ugc-comparison.png",
        prompt: "Split screen showing AI-generated vs real UGC video comparison, professional editing interface, side-by-side view, modern video production software",
        aspect_ratio: "16:9"
    },
    {
        name: "troubleshooting-solutions.png",
        prompt: "Problem-solving illustration with common UGC video issues and solutions, infographic style with icons and text, professional design, helpful and clear",
        aspect_ratio: "16:9"
    },
    {
        name: "legal-rights-management.png",
        prompt: "Legal document and rights management illustration, professional business style, contracts and checkmarks, modern legal tech aesthetic, clean and trustworthy",
        aspect_ratio: "16:9"
    },
    {
        name: "before-after-campaign.png",
        prompt: "Dramatic before and after comparison of traditional UGC campaign vs AI-generated UGC, timeline and cost savings visualization, business infographic style",
        aspect_ratio: "16:9"
    },
    {
        name: "getting-started-cta.png",
        prompt: "Person getting started with AI UGC creation on laptop, excited and motivated expression, modern workspace, inspiring atmosphere, natural lighting, professional photography",
        aspect_ratio: "16:9"
    }
];

async function generateImage(prompt, aspect_ratio, filename) {
    try {
        // Create task
        const createResponse = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${KIE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'z-image',
                input: {
                    prompt: prompt,
                    aspect_ratio: aspect_ratio
                }
            })
        });

        const createData = await createResponse.json();

        if (createData.code !== 200) {
            console.error(`Error creating task for ${filename}:`, createData);
            return null;
        }

        const taskId = createData.data.taskId;
        console.log(`Task created for ${filename}: ${taskId}`);

        // Poll for results
        let attempts = 0;
        const maxAttempts = 60; // 60 attempts * 2 seconds = 2 minutes max

        while (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds

            const statusResponse = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${KIE_API_KEY}`
                }
            });

            const statusData = await statusResponse.json();

            if (statusData.data.state === 'success') {
                const resultJson = JSON.parse(statusData.data.resultJson);
                const imageUrl = resultJson.resultUrls[0];
                console.log(`✓ Image generated for ${filename}: ${imageUrl}`);
                return imageUrl;
            } else if (statusData.data.state === 'fail') {
                console.error(`✗ Failed to generate ${filename}:`, statusData.data.failMsg);
                return null;
            }

            attempts++;
            console.log(`Waiting for ${filename}... (${attempts}/${maxAttempts})`);
        }

        console.error(`Timeout waiting for ${filename}`);
        return null;
    } catch (error) {
        console.error(`Error generating ${filename}:`, error);
        return null;
    }
}

async function generateAllImages() {
    console.log('Starting image generation...\n');
    const results = [];

    for (const imageConfig of imagePrompts) {
        console.log(`\nGenerating: ${imageConfig.name}`);
        const url = await generateImage(imageConfig.prompt, imageConfig.aspect_ratio, imageConfig.name);
        results.push({
            name: imageConfig.name,
            url: url,
            prompt: imageConfig.prompt
        });
    }

    console.log('\n\n=== GENERATION COMPLETE ===\n');
    console.log('Results:');
    results.forEach(result => {
        console.log(`${result.name}: ${result.url ? '✓' : '✗'}`);
    });

    // Save results to file
    const fs = require('fs');
    fs.writeFileSync(
        'public/blog-images/top-ai-ugc-platforms/image-urls.json',
        JSON.stringify(results, null, 2)
    );

    console.log('\nImage URLs saved to: public/blog-images/top-ai-ugc-platforms/image-urls.json');
}

generateAllImages();
