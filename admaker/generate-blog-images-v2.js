const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const KIE_API_KEY = process.env.KIE_API_KEY;

// Base prompt from user
const basePrompt = "Un plan moyen ultra-réaliste, style 'face caméra' (face cam), d'un individu charismatique (genre et âge non définis, d'apparence naturelle et soignée) agissant comme un influenceur ou un créateur de contenu. La personne regarde directement l'objectif en souriant ou en parlant de manière expressive, ses mains faisant des gestes naturels. Elle porte une tenue décontractée mais stylée, typique d'une vidéo sur les réseaux sociaux.";

// Image configurations with variations
const imageConfigs = [
    {
        name: "hero-ai-platforms-dashboard.png",
        prompt: `${basePrompt} Arrière-plan moderne avec des éléments de dashboard AI et interface de création vidéo visible.`,
        aspect_ratio: "16:9"
    },
    {
        name: "decision-flowchart.png",
        prompt: `${basePrompt} Arrière-plan avec des éléments graphiques de flowchart et diagrammes de décision professionnels.`,
        aspect_ratio: "16:9"
    },
    {
        name: "platform-comparison-chart.png",
        prompt: `${basePrompt} Arrière-plan avec des tableaux de comparaison et graphiques de performance visibles.`,
        aspect_ratio: "16:9"
    },
    {
        name: "ecommerce-unboxing-ugc.png",
        prompt: `${basePrompt} La personne tient un produit dans ses mains, style unboxing e-commerce naturel.`,
        aspect_ratio: "4:3"
    },
    {
        name: "fitness-testimonial-video.png",
        prompt: `${basePrompt} Tenue sportive décontractée, énergie positive, arrière-plan gym ou fitness moderne.`,
        aspect_ratio: "4:3"
    },
    {
        name: "ai-vs-real-ugc-comparison.png",
        prompt: `${basePrompt} Arrière-plan avec écran partagé montrant comparaison de vidéos, interface d'édition professionnelle.`,
        aspect_ratio: "16:9"
    },
    {
        name: "troubleshooting-solutions.png",
        prompt: `${basePrompt} Expression de résolution de problème, arrière-plan avec icônes de solutions et infographies.`,
        aspect_ratio: "16:9"
    },
    {
        name: "legal-rights-management.png",
        prompt: `${basePrompt} Style professionnel business, arrière-plan avec documents légaux et symboles de droits d'auteur.`,
        aspect_ratio: "16:9"
    },
    {
        name: "before-after-campaign.png",
        prompt: `${basePrompt} Expression enthousiaste, arrière-plan avec graphiques de croissance et comparaisons avant/après.`,
        aspect_ratio: "16:9"
    },
    {
        name: "getting-started-cta.png",
        prompt: `${basePrompt} Expression motivante et inspirante, workspace moderne avec laptop visible, énergie positive.`,
        aspect_ratio: "16:9"
    }
];

// Function to download image from URL
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(filepath);

        protocol.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(filepath);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete the file if error
            reject(err);
        });
    });
}

// Function to create task
async function createTask(prompt, aspect_ratio) {
    const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', {
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

    const data = await response.json();

    if (data.code !== 200) {
        throw new Error(`API Error: ${data.msg || 'Unknown error'}`);
    }

    return data.data.taskId;
}

// Function to poll task status
async function pollTaskStatus(taskId, maxAttempts = 60) {
    for (let i = 0; i < maxAttempts; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds

        const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
            headers: {
                'Authorization': `Bearer ${KIE_API_KEY}`
            }
        });

        const data = await response.json();

        if (data.code !== 200) {
            throw new Error(`API Error: ${data.msg || 'Unknown error'}`);
        }

        const state = data.data.state;

        if (state === 'success') {
            const resultJson = JSON.parse(data.data.resultJson);
            return resultJson.resultUrls[0];
        } else if (state === 'fail') {
            throw new Error(`Task failed: ${data.data.failMsg || 'Unknown error'}`);
        }

        // Still waiting
        if (i % 5 === 0) {
            console.log(`  Still processing... (${i * 2}s elapsed)`);
        }
    }

    throw new Error('Timeout waiting for image generation');
}

// Main function to generate all images
async function generateAllImages() {
    console.log('🎨 Starting image generation with Kie AI Z-Image API\n');
    console.log(`📝 Base prompt: ${basePrompt}\n`);

    const outputDir = path.join(__dirname, 'public', 'blog-images', 'top-ai-ugc-platforms');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const results = [];
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < imageConfigs.length; i++) {
        const config = imageConfigs[i];
        console.log(`\n[${i + 1}/${imageConfigs.length}] Generating: ${config.name}`);
        console.log(`  Aspect ratio: ${config.aspect_ratio}`);

        try {
            // Create task
            console.log('  Creating task...');
            const taskId = await createTask(config.prompt, config.aspect_ratio);
            console.log(`  Task ID: ${taskId}`);

            // Poll for result
            console.log('  Waiting for generation...');
            const imageUrl = await pollTaskStatus(taskId);
            console.log(`  ✓ Image generated: ${imageUrl}`);

            // Download image
            const filepath = path.join(outputDir, config.name);
            console.log('  Downloading image...');
            await downloadImage(imageUrl, filepath);
            console.log(`  ✓ Saved to: ${filepath}`);

            results.push({
                name: config.name,
                url: imageUrl,
                localPath: filepath,
                success: true
            });

            successCount++;

        } catch (error) {
            console.error(`  ✗ Error: ${error.message}`);
            results.push({
                name: config.name,
                error: error.message,
                success: false
            });
            failCount++;
        }
    }

    // Save results
    const resultsPath = path.join(outputDir, 'generation-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 GENERATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✓ Successful: ${successCount}/${imageConfigs.length}`);
    console.log(`✗ Failed: ${failCount}/${imageConfigs.length}`);
    console.log(`\n📁 Results saved to: ${resultsPath}`);
    console.log('='.repeat(60) + '\n');

    if (successCount > 0) {
        console.log('✅ Images ready to use in blog post!');
    }

    if (failCount > 0) {
        console.log('⚠️  Some images failed to generate. Check the results file for details.');
    }
}

// Run the generation
generateAllImages().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
});
