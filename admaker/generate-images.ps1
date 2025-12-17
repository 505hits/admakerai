# Script pour générer les images des acteurs Elegant Faces
# Usage: .\generate-images.ps1 -ApiKey "votre-cle-api"

param(
    [Parameter(Mandatory=$true)]
    [string]$ApiKey
)

$BASE_URL = "https://api.kie.ai"

# Fonction pour créer le prompt
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

# Configuration des 3 acteurs
$actors = @(
    @{
        filename = "elegant-1.png"
        name = "Elegant Woman - Natural Light"
        gender = "WOMAN"
        outfit = "tight ribbed cream knitwear"
        location = "sunlit modern bedroom with white sheets"
    },
    @{
        filename = "elegant-2.png"
        name = "Elegant Man - Urban Style"
        gender = "MAN"
        outfit = "fitted black turtleneck"
        location = "dimly lit modern bathroom with marble tiles"
    },
    @{
        filename = "elegant-3.png"
        name = "Elegant Woman - Sophisticated"
        gender = "WOMAN"
        outfit = "elegant off-shoulder beige sweater"
        location = "bright minimalist apartment with natural light"
    }
)

Write-Host "🍌 Génération des acteurs Elegant Faces`n" -ForegroundColor Cyan
Write-Host ("=" * 70) -ForegroundColor Gray

# Étape 1: Créer les tâches
Write-Host "`n📤 Étape 1: Création des tâches de génération...`n" -ForegroundColor Yellow
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
                name = $actor.name
                filename = $actor.filename
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
    Write-Host "  ⏳ $($task.name)..." -ForegroundColor White
    
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
                    name = $task.name
                    filename = $task.filename
                    taskId = $task.taskId
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
    
    if ($attempts -ge $maxAttempts) {
        Write-Host "     ⏱️ Timeout après 5 minutes" -ForegroundColor Yellow
    }
}

# Étape 3: Télécharger et uploader vers R2
Write-Host "`n📥 Étape 3: Téléchargement et upload vers R2...`n" -ForegroundColor Yellow

foreach ($result in $results) {
    Write-Host "  📥 $($result.name)..." -ForegroundColor White
    
    try {
        # Télécharger l'image
        $imageData = Invoke-WebRequest -Uri $result.imageUrl -UseBasicParsing
        $tempFile = [System.IO.Path]::GetTempFileName()
        [System.IO.File]::WriteAllBytes($tempFile, $imageData.Content)
        
        Write-Host "     ✅ Image téléchargée" -ForegroundColor Green
        Write-Host "     💾 Fichier temporaire: $tempFile" -ForegroundColor Gray
        Write-Host "     📤 À uploader vers R2 comme: Actors/$($result.filename)" -ForegroundColor Cyan
        
    } catch {
        Write-Host "     ❌ Erreur de téléchargement: $_" -ForegroundColor Red
    }
}

# Résumé
Write-Host "`n$("=" * 70)" -ForegroundColor Gray
Write-Host "`n🎉 Génération terminée!`n" -ForegroundColor Green
Write-Host "📋 Résumé:" -ForegroundColor Cyan

foreach ($result in $results) {
    Write-Host "`n  • $($result.name)" -ForegroundColor Yellow
    Write-Host "    Fichier: $($result.filename)" -ForegroundColor White
    Write-Host "    URL source: $($result.imageUrl)" -ForegroundColor Gray
}

Write-Host "`n📝 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "  1. Uploadez les images téléchargées vers R2 dans le dossier 'Actors/'" -ForegroundColor White
Write-Host "  2. Les URLs dans ai-actors.json sont déjà configurées" -ForegroundColor White
Write-Host "  3. Commit et push pour déployer" -ForegroundColor White
