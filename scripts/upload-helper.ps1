# Upload PowerShell Script - Alternative Simple

# Configuration depuis .env.local
$envPath = "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\.env.local"
$envContent = Get-Content $envPath
$config = @{}
foreach ($line in $envContent) {
    if ($line -match '^([^=]+)=(.+)$') {
        $config[$matches[1]] = $matches[2]
    }
}

$ACCOUNT_ID = $config['CLOUDFLARE_ACCOUNT_ID']
$ACCESS_KEY = $config['CLOUDFLARE_ACCESS_KEY_ID']
$SECRET_KEY = $config['CLOUDFLARE_SECRET_ACCESS_KEY']
$BUCKET = $config['CLOUDFLARE_BUCKET_NAME']
$PUBLIC_URL = $config['CLOUDFLARE_PUBLIC_URL']

Write-Host "🚀 Upload vers Cloudflare R2" -ForegroundColor Green
Write-Host "Bucket: $BUCKET"
Write-Host "URL publique: $PUBLIC_URL"
Write-Host ""

# Scanner les fichiers
$publicDir = "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\public"
$files = Get-ChildItem -Path $publicDir -Recurse -File | Where-Object {
    $_.Extension -match '\.(jpg|jpeg|png|gif|webp|svg|mp4|webm)$' -and
    $_.FullName -notmatch '\\data\\'
}

Write-Host "📊 $($files.Count) fichiers trouvés"
Write-Host ""

# Note: Ce script nécessite AWS CLI ou une implémentation complète de la signature AWS v4
# Pour simplifier, je recommande l'upload manuel via l'interface web Cloudflare

Write-Host "⚠️  Pour uploader les fichiers, utilisez l'une de ces méthodes:" -ForegroundColor Yellow
Write-Host ""
Write-Host "MÉTHODE 1 (Recommandée) - Upload Manuel:"
Write-Host "1. Allez sur https://dash.cloudflare.com"
Write-Host "2. R2 → admakerai-media → Upload"
Write-Host "3. Glissez-déposez les fichiers de: $publicDir"
Write-Host ""
Write-Host "MÉTHODE 2 - Wrangler CLI:"
Write-Host "npm install -g wrangler"
Write-Host "wrangler login"
Write-Host "wrangler r2 object put $BUCKET --file=$publicDir --recursive"
