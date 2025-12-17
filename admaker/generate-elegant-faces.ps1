# PowerShell script to generate 3 Elegant Faces actors using Nano Banana API

# Load environment variables from .env.local
if (Test-Path ".env.local") {
    Get-Content ".env.local" | ForEach-Object {
        if ($_ -match "^([^=]+)=(.*)$") {
            [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
        }
    }
}

$API_KEY = $env:KIE_API_KEY
$BASE_URL = "https://api.kie.ai"

if (-not $API_KEY) {
    Write-Host "❌ KIE_API_KEY not found in environment variables" -ForegroundColor Red
    exit 1
}

# Master prompt template
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

# 3 actor configurations
$actors = @(
    @{
        name = "Elegant Woman - Natural Light"
        gender = "WOMAN"
        outfit = "tight ribbed cream knitwear"
        location = "sunlit modern bedroom with white sheets"
    },
    @{
        name = "Elegant Man - Urban Style"
        gender = "MAN"
        outfit = "fitted black turtleneck"
        location = "dimly lit modern bathroom with marble tiles"
    },
    @{
        name = "Elegant Woman - Sophisticated"
        gender = "WOMAN"
        outfit = "elegant off-shoulder beige sweater"
        location = "bright minimalist apartment with natural light"
    }
)

Write-Host "🍌 Starting Elegant Faces Actor Generation`n" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Gray

# Generate all 3 actors
$tasks = @()
for ($i = 0; $i -lt $actors.Count; $i++) {
    $actor = $actors[$i]
    $prompt = Create-Prompt -gender $actor.gender -outfit $actor.outfit -location $actor.location
    
    Write-Host "`n🎨 Generating Actor $($i + 1): $($actor.name)" -ForegroundColor Yellow
    
    $body = @{
        prompt = $prompt
        aspect_ratio = "9:16"
        resolution = "1K"
        output_format = "png"
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/v1/nano-banana/create-task" `
            -Method Post `
            -Headers @{
                "Content-Type" = "application/json"
                "Authorization" = "Bearer $API_KEY"
            } `
            -Body $body
        
        if ($response.code -eq 200 -and $response.data.taskId) {
            Write-Host "✅ Task created: $($response.data.taskId)" -ForegroundColor Green
            $tasks += @{
                name = $actor.name
                taskId = $response.data.taskId
                index = $i + 1
            }
        } else {
            Write-Host "❌ Error: $($response.msg)" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Request failed: $_" -ForegroundColor Red
    }
    
    # Wait 2 seconds between requests
    if ($i -lt $actors.Count - 1) {
        Start-Sleep -Seconds 2
    }
}

Write-Host "`n$("=" * 60)" -ForegroundColor Gray
Write-Host "`n✅ Generated $($tasks.Count) tasks successfully`n" -ForegroundColor Green
Write-Host "📋 Task IDs:" -ForegroundColor Cyan
foreach ($task in $tasks) {
    Write-Host "   $($task.index). $($task.name): $($task.taskId)" -ForegroundColor White
}

Write-Host "`n⏳ Waiting for generation to complete (this may take 2-5 minutes)...`n" -ForegroundColor Yellow

# Poll for completion
$results = @()
foreach ($task in $tasks) {
    $attempts = 0
    $maxAttempts = 300  # 5 minutes max
    
    while ($attempts -lt $maxAttempts) {
        try {
            $status = Invoke-RestMethod -Uri "$BASE_URL/api/v1/nano-banana/check-status?taskId=$($task.taskId)" `
                -Method Get `
                -Headers @{
                    "Authorization" = "Bearer $API_KEY"
                }
            
            if ($status.data.state -eq "success" -and $status.data.imageUrl) {
                Write-Host "✅ $($task.name) completed!" -ForegroundColor Green
                Write-Host "   URL: $($status.data.imageUrl)" -ForegroundColor Gray
                $results += @{
                    name = $task.name
                    taskId = $task.taskId
                    imageUrl = $status.data.imageUrl
                    index = $task.index
                }
                break
            } elseif ($status.data.state -eq "fail") {
                Write-Host "❌ $($task.name) failed: $($status.data.failMsg)" -ForegroundColor Red
                break
            }
        } catch {
            # Continue polling
        }
        
        $attempts++
        Start-Sleep -Seconds 1
    }
    
    if ($attempts -ge $maxAttempts) {
        Write-Host "⏱️ $($task.name) timed out after 5 minutes" -ForegroundColor Yellow
    }
}

Write-Host "`n$("=" * 60)" -ForegroundColor Gray
Write-Host "`n🎉 Generation Complete!`n" -ForegroundColor Green
Write-Host "📸 Generated Images:" -ForegroundColor Cyan
foreach ($result in $results) {
    Write-Host "`n$($result.index). $($result.name)" -ForegroundColor Yellow
    Write-Host "   Task ID: $($result.taskId)" -ForegroundColor Gray
    Write-Host "   Image URL: $($result.imageUrl)" -ForegroundColor White
}

Write-Host "`n💾 Save these URLs to add to ai-actors.json" -ForegroundColor Cyan
