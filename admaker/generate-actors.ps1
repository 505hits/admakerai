# Script PowerShell pour générer les acteurs Elegant Faces
param(
    [string]$ApiKey = "c4f6b75bed7509d71118cc425052b88f"
)

$BASE_URL = "https://api.kie.ai"

# Configuration des acteurs
$actors = @(
    @{
        id = "elegant_001"
        name = "Elegant Woman - Natural Light"
        filename = "elegant-1.png"
        gender = "WOMAN"
        outfit = "tight ribbed cream knitwear"
        location = "sunlit modern bedroom with white sheets"
    },
    @{
        id = "elegant_002"
        name = "Elegant Man - Urban Style"
        filename = "elegant-2.png"
        gender = "MAN"
        outfit = "fitted black turtleneck"
        location = "dimly lit modern bathroom with marble tiles"
    },
    @{
        id = "elegant_003"
        name = "Elegant Woman - Sophisticated"
        filename = "elegant-3.png"
        gender = "WOMAN"
        outfit = "elegant off-shoulder beige sweater"
        location = "bright minimalist apartment with natural light"
    }
)

function Create-Prompt {
    param($gender, $outfit, $location)
    
    return @"
A hyper-realistic RAW photo, handheld smartphone selfie of a stunning $gender, looking directly into the lens with a confident and magnetic gaze.

Extreme Realism Details: 8k resolution, cinematic photorealism. Focus on hyper-detailed skin texture: visible pores, natural skin grain, subtle micro-blemishes, and fine facial hair. Zero digital smoothing. Natural perspiration and real skin reflectivity. Hair: messy, natural strands with flyaways.

UGC Aesthetic: Authentic 'unfiltered' social media look. Slight lens flare, subtle motion blur, and organic smartphone camera noise. Wide-angle 24mm lens distortion typical of a front-facing camera. Non-professional, candid framing.

Physique & Outfit: Strong focus on realistic body physics. Wearing $outfit, showing high-fidelity fabric tension, realistic wrinkles, and shadows that define a fit silhouette.

Lighting & Environment: Shot in a $location. Harsh overhead lighting or natural window light creating high-contrast highlights on the face and collarbones. Shallow depth of field with a messy, realistic background.

Technical Signature: No cinematic color grading, raw sensor output, high dynamic range, authentic shadows, 100% lifelike anatomy.
"@
}

Write-Host "🍌 Génération des acteurs Elegant Faces`n" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Gray

# Étape 1: Créer les tâches
Write-Host "`n📤 Étape 1: Création des tâches...`n" -ForegroundColor Yellow
$tasks = @()

foreach ($actor in $actors) {
    $prompt = Create-Prompt -gender $actor.gender -outfit $actor.outfit -location $actor.location
    
    Write-Host "  🎨 $($actor.name)" -ForegroundColor White
    
    $body = @{
        prompt = $prompt
        aspect_ratio = "9:16"
        resolution = "1K"
        output_format = "png"
    } | ConvertTo-Json -Depth 10
    
    try {
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/v1/nano-banana/create-task" `
            -Method Post `
            -Headers @{
                "Content-Type" = "application/json"
                "Authorization" = "Bearer $ApiKey"
            } `
            -Body $body
        
        if ($response.code -eq 200 -and $response.data.taskId) {
            Write-Host "     ✅ Task ID: $($response.data.taskId)" -ForegroundColor Green
            $tasks += @{
                actor = $actor
                taskId = $response.data.taskId
            }
        } else {
            Write-Host "     ❌ Erreur: $($response.msg)" -ForegroundColor Red
        }
    } catch {
        Write-Host "     ❌ Échec: $_" -ForegroundColor Red
    }
    
    Start-Sleep -Seconds 2
}

# Étape 2: Attendre la génération
Write-Host "`n⏳ Étape 2: Attente de la génération (2-5 minutes)...`n" -ForegroundColor Yellow

$results = @()
foreach ($task in $tasks) {
    Write-Host "  ⏳ $($task.actor.name)..." -ForegroundColor White
    
    $attempts = 0
    $maxAttempts = 300
    
    while ($attempts -lt $maxAttempts) {
        try {
            $status = Invoke-RestMethod -Uri "$BASE_URL/api/v1/nano-banana/check-status?taskId=$($task.taskId)" `
                -Method Get `
                -Headers @{
                    "Authorization" = "Bearer $ApiKey"
                }
            
            if ($status.data.state -eq "success" -and $status.data.imageUrl) {
                Write-Host "     ✅ Terminé!" -ForegroundColor Green
                Write-Host "     📸 URL: $($status.data.imageUrl)" -ForegroundColor Gray
                
                $results += @{
                    actor = $task.actor
                    imageUrl = $status.data.imageUrl
                }
                break
            } elseif ($status.data.state -eq "fail") {
                Write-Host "     ❌ Échec: $($status.data.failMsg)" -ForegroundColor Red
                break
            }
        } catch {
            # Continue polling
        }
        
        $attempts++
        Start-Sleep -Seconds 1
    }
}

# Étape 3: Télécharger les images
Write-Host "`n📥 Étape 3: Téléchargement des images...`n" -ForegroundColor Yellow

foreach ($result in $results) {
    Write-Host "  📥 $($result.actor.filename)..." -ForegroundColor White
    
    try {
        $imageData = Invoke-WebRequest -Uri $result.imageUrl -UseBasicParsing
        [System.IO.File]::WriteAllBytes($result.actor.filename, $imageData.Content)
        
        Write-Host "     ✅ Sauvegardé: $($result.actor.filename)" -ForegroundColor Green
    } catch {
        Write-Host "     ❌ Erreur: $_" -ForegroundColor Red
    }
}

# Résumé
Write-Host "`n$("=" * 60)" -ForegroundColor Gray
Write-Host "`n🎉 Génération terminée!`n" -ForegroundColor Green
Write-Host "📸 Images générées:" -ForegroundColor Cyan

foreach ($result in $results) {
    Write-Host "`n  • $($result.actor.name)" -ForegroundColor Yellow
    Write-Host "    Fichier: $($result.actor.filename)" -ForegroundColor White
    Write-Host "    URL: $($result.imageUrl)" -ForegroundColor Gray
}

Write-Host "`n✅ Images téléchargées avec succès!" -ForegroundColor Green
Write-Host "`n📝 Prochaine étape: Upload vers R2" -ForegroundColor Cyan
