# Script PowerShell pour uploader les médias vers Cloudflare R2
# Usage: .\scripts\upload-r2.ps1

# Charger la configuration
$envPath = Join-Path $PSScriptRoot "..\admaker\.env.local"
if (-not (Test-Path $envPath)) {
    Write-Host "❌ Fichier .env.local introuvable: $envPath" -ForegroundColor Red
    exit 1
}

$envContent = Get-Content $envPath -Raw
$config = @{}
$envContent -split "`n" | ForEach-Object {
    if ($_ -match '^([^=:#]+)=(.*)$') {
        $config[$matches[1].Trim()] = $matches[2].Trim()
    }
}

$ACCOUNT_ID = $config['CLOUDFLARE_ACCOUNT_ID']
$ACCESS_KEY_ID = $config['CLOUDFLARE_ACCESS_KEY_ID']
$SECRET_ACCESS_KEY = $config['CLOUDFLARE_SECRET_ACCESS_KEY']
$BUCKET_NAME = $config['CLOUDFLARE_BUCKET_NAME']
$PUBLIC_URL = $config['CLOUDFLARE_PUBLIC_URL']

if (-not $ACCOUNT_ID -or -not $ACCESS_KEY_ID -or -not $SECRET_ACCESS_KEY) {
    Write-Host "❌ Credentials manquants dans .env.local" -ForegroundColor Red
    exit 1
}

$ENDPOINT = "https://$ACCOUNT_ID.r2.cloudflarestorage.com"

Write-Host "🚀 Début de la migration vers Cloudflare R2`n" -ForegroundColor Green
Write-Host "📁 Bucket: $BUCKET_NAME"
Write-Host "🌐 URL publique: $PUBLIC_URL`n"

# Fonction pour obtenir le type MIME
function Get-MimeType {
    param([string]$FilePath)
    
    $ext = [System.IO.Path]::GetExtension($FilePath).ToLower()
    $mimeTypes = @{
        '.jpg' = 'image/jpeg'
        '.jpeg' = 'image/jpeg'
        '.png' = 'image/png'
        '.gif' = 'image/gif'
        '.webp' = 'image/webp'
        '.svg' = 'image/svg+xml'
        '.mp4' = 'video/mp4'
        '.webm' = 'video/webm'
    }
    
    if ($mimeTypes.ContainsKey($ext)) {
        return $mimeTypes[$ext]
    }
    return 'application/octet-stream'
}

# Fonction pour créer la signature AWS v4
function New-AwsSignature {
    param(
        [string]$Method,
        [string]$Uri,
        [hashtable]$Headers,
        [byte[]]$Payload
    )
    
    $date = (Get-Date).ToUniversalTime()
    $amzDate = $date.ToString("yyyyMMddTHHmmssZ")
    $dateStamp = $date.ToString("yyyyMMdd")
    
    # Hash du payload
    $sha256 = [System.Security.Cryptography.SHA256]::Create()
    $payloadHash = [BitConverter]::ToString($sha256.ComputeHash($Payload)).Replace("-", "").ToLower()
    
    # Canonical headers
    $canonicalHeaders = ($Headers.GetEnumerator() | Sort-Object Name | ForEach-Object {
        "$($_.Key.ToLower()):$($_.Value)"
    }) -join "`n"
    $canonicalHeaders += "`n"
    
    $signedHeaders = ($Headers.Keys | Sort-Object | ForEach-Object { $_.ToLower() }) -join ";"
    
    # Canonical request
    $canonicalRequest = @(
        $Method
        $Uri
        ""
        $canonicalHeaders
        $signedHeaders
        $payloadHash
    ) -join "`n"
    
    $canonicalRequestHash = [BitConverter]::ToString($sha256.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($canonicalRequest))).Replace("-", "").ToLower()
    
    # String to sign
    $algorithm = "AWS4-HMAC-SHA256"
    $credentialScope = "$dateStamp/auto/s3/aws4_request"
    $stringToSign = @(
        $algorithm
        $amzDate
        $credentialScope
        $canonicalRequestHash
    ) -join "`n"
    
    # Signing key
    $hmac = [System.Security.Cryptography.HMACSHA256]::new([System.Text.Encoding]::UTF8.GetBytes("AWS4$SECRET_ACCESS_KEY"))
    $kDate = $hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($dateStamp))
    
    $hmac = [System.Security.Cryptography.HMACSHA256]::new($kDate)
    $kRegion = $hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes("auto"))
    
    $hmac = [System.Security.Cryptography.HMACSHA256]::new($kRegion)
    $kService = $hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes("s3"))
    
    $hmac = [System.Security.Cryptography.HMACSHA256]::new($kService)
    $kSigning = $hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes("aws4_request"))
    
    $hmac = [System.Security.Cryptography.HMACSHA256]::new($kSigning)
    $signature = [BitConverter]::ToString($hmac.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($stringToSign))).Replace("-", "").ToLower()
    
    return @{
        Authorization = "$algorithm Credential=$ACCESS_KEY_ID/$credentialScope, SignedHeaders=$signedHeaders, Signature=$signature"
        AmzDate = $amzDate
        PayloadHash = $payloadHash
    }
}

# Fonction pour uploader un fichier
function Upload-FileToR2 {
    param(
        [string]$LocalPath,
        [string]$RemotePath
    )
    
    try {
        $fileBytes = [System.IO.File]::ReadAllBytes($LocalPath)
        $mimeType = Get-MimeType -FilePath $LocalPath
        
        $uri = "/$BUCKET_NAME/$RemotePath"
        $url = "$ENDPOINT$uri"
        
        $headers = @{
            'Host' = "$ACCOUNT_ID.r2.cloudflarestorage.com"
            'Content-Type' = $mimeType
            'Cache-Control' = 'public, max-age=31536000'
        }
        
        $sig = New-AwsSignature -Method 'PUT' -Uri $uri -Headers $headers -Payload $fileBytes
        
        $headers['Authorization'] = $sig.Authorization
        $headers['X-Amz-Date'] = $sig.AmzDate
        $headers['X-Amz-Content-Sha256'] = $sig.PayloadHash
        
        $response = Invoke-WebRequest -Uri $url -Method PUT -Headers $headers -Body $fileBytes -UseBasicParsing
        
        if ($response.StatusCode -eq 200) {
            $publicUrl = "$PUBLIC_URL/$RemotePath"
            Write-Host "✅ $RemotePath" -ForegroundColor Green
            return @{ Success = $true; Url = $publicUrl; Path = $RemotePath }
        } else {
            Write-Host "❌ $RemotePath - Status: $($response.StatusCode)" -ForegroundColor Red
            return @{ Success = $false; Path = $RemotePath }
        }
    } catch {
        Write-Host "❌ $RemotePath - Erreur: $($_.Exception.Message)" -ForegroundColor Red
        return @{ Success = $false; Path = $RemotePath; Error = $_.Exception.Message }
    }
}

# Scanner les fichiers
$publicDir = Join-Path $PSScriptRoot "..\admaker\public"
Write-Host "📊 Scan des fichiers médias..."

$files = Get-ChildItem -Path $publicDir -Recurse -File | Where-Object {
    $_.Extension -match '\.(jpg|jpeg|png|gif|webp|svg|mp4|webm)$' -and
    $_.FullName -notmatch '\\data\\'
}

Write-Host "✅ $($files.Count) fichiers trouvés`n" -ForegroundColor Green

# Upload des fichiers
Write-Host "⬆️  Upload en cours...`n" -ForegroundColor Cyan

$results = @()
$successCount = 0
$errorCount = 0

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($publicDir.Length + 1).Replace('\', '/')
    $result = Upload-FileToR2 -LocalPath $file.FullName -RemotePath $relativePath
    $results += $result
    
    if ($result.Success) {
        $successCount++
    } else {
        $errorCount++
    }
}

# Générer le fichier de mapping
Write-Host "`n📝 Génération du fichier de mapping..." -ForegroundColor Cyan

$mapping = @{}
foreach ($result in $results) {
    if ($result.Success) {
        $mapping["/$($result.Path)"] = $result.Url
    }
}

$mappingPath = Join-Path $PSScriptRoot "..\admaker\lib\media-urls.json"
$mappingDir = Split-Path $mappingPath -Parent
if (-not (Test-Path $mappingDir)) {
    New-Item -ItemType Directory -Path $mappingDir -Force | Out-Null
}

$mapping | ConvertTo-Json -Depth 10 | Set-Content $mappingPath -Encoding UTF8
Write-Host "✅ Mapping sauvegardé: $mappingPath`n" -ForegroundColor Green

# Résumé
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 RÉSUMÉ DE LA MIGRATION" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Succès: $successCount fichiers" -ForegroundColor Green
Write-Host "❌ Erreurs: $errorCount fichiers" -ForegroundColor Red
Write-Host "📦 Total: $($files.Count) fichiers" -ForegroundColor White
Write-Host "═══════════════════════════════════════`n" -ForegroundColor Cyan

if ($errorCount -gt 0) {
    Write-Host "⚠️  Certains fichiers n'ont pas pu être uploadés." -ForegroundColor Yellow
} else {
    Write-Host "🎉 Migration terminée avec succès !" -ForegroundColor Green
    Write-Host "`n📋 Prochaines étapes:" -ForegroundColor Cyan
    Write-Host "  1. Vérifiez quelques URLs dans votre navigateur"
    Write-Host "  2. Le code sera mis à jour automatiquement pour utiliser les URLs Cloudflare"
}
