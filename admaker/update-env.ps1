# Script de mise a jour automatique de .env.local avec la nouvelle cle KIE
# Ce script garde toutes vos configurations existantes et met a jour uniquement les cles KIE/VEO

$envPath = ".env.local"
$newKieKey = "b682f8ab293fef036897ec4ebc817ea7"

Write-Host "Mise a jour de .env.local avec la nouvelle cle KIE..." -ForegroundColor Cyan
Write-Host ""

# Verifier si .env.local existe
if (Test-Path $envPath) {
    Write-Host "Fichier .env.local trouve" -ForegroundColor Green
    
    # Lire le contenu actuel
    $content = Get-Content $envPath -Raw
    
    # Sauvegarder une copie de backup
    $backupPath = ".env.local.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    Copy-Item $envPath $backupPath
    Write-Host "Backup cree: $backupPath" -ForegroundColor Yellow
    
    # Mettre a jour ou ajouter KIE_API_KEY
    if ($content -match "KIE_API_KEY=") {
        $content = $content -replace "KIE_API_KEY=.*", "KIE_API_KEY=$newKieKey"
        Write-Host "KIE_API_KEY mis a jour" -ForegroundColor Green
    } else {
        $content += "`nKIE_API_KEY=$newKieKey"
        Write-Host "KIE_API_KEY ajoute" -ForegroundColor Green
    }
    
    # Mettre a jour ou ajouter VEO_API_KEY
    if ($content -match "VEO_API_KEY=") {
        $content = $content -replace "VEO_API_KEY=.*", "VEO_API_KEY=$newKieKey"
        Write-Host "VEO_API_KEY mis a jour" -ForegroundColor Green
    } else {
        $content += "`nVEO_API_KEY=$newKieKey"
        Write-Host "VEO_API_KEY ajoute" -ForegroundColor Green
    }
    
    # Supprimer NEXT_PUBLIC_VEO_API_KEY si elle existe (faille de securite)
    if ($content -match "NEXT_PUBLIC_VEO_API_KEY=") {
        $content = $content -replace "NEXT_PUBLIC_VEO_API_KEY=.*`n?", ""
        Write-Host "NEXT_PUBLIC_VEO_API_KEY supprime (securite)" -ForegroundColor Red
    }
    
    # Sauvegarder le nouveau contenu
    $content | Set-Content $envPath -NoNewline
    
    Write-Host ""
    Write-Host ".env.local mis a jour avec succes!" -ForegroundColor Green
    
} else {
    Write-Host "Fichier .env.local n'existe pas encore" -ForegroundColor Yellow
    Write-Host "Creation d'un nouveau .env.local..." -ForegroundColor Cyan
    
    # Creer un nouveau fichier avec les valeurs par defaut
    $newContent = "# Supabase Configuration`nNEXT_PUBLIC_SUPABASE_URL=your_supabase_url`nNEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`nSUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key`n`n# Stripe Configuration`nSTRIPE_SECRET_KEY=your_stripe_secret_key`nSTRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret`n`n# Cloudflare R2`nR2_ACCESS_KEY_ID=your_r2_access_key_id`nR2_SECRET_ACCESS_KEY=your_r2_secret_access_key`n`n# API Keys`nREPLICATE_API_TOKEN=your_replicate_token`nKIE_API_KEY=$newKieKey`nVEO_API_KEY=$newKieKey`n`n# Webhook Secrets`nREPLICATE_WEBHOOK_SECRET=generate_random_secret`nKIE_WEBHOOK_SECRET=generate_random_secret`nNANO_BANANA_WEBHOOK_SECRET=generate_random_secret`nVEO_WEBHOOK_SECRET=generate_random_secret`n`n# Optional`nNEXT_PUBLIC_APP_URL=http://localhost:3000"
    
    $newContent | Set-Content $envPath -NoNewline
    Write-Host ".env.local cree!" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: Vous devez maintenant:" -ForegroundColor Yellow
    Write-Host "  1. Ouvrir .env.local dans votre editeur" -ForegroundColor White
    Write-Host "  2. Remplacer 'your_supabase_url' par votre vraie URL Supabase" -ForegroundColor White
    Write-Host "  3. Remplacer 'your_stripe_secret_key' par votre vraie cle Stripe" -ForegroundColor White
    Write-Host "  4. Etc. pour toutes les valeurs 'your_*'" -ForegroundColor White
    Write-Host ""
    Write-Host "Les cles KIE et VEO sont deja remplies!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Configuration terminee!" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines etapes:" -ForegroundColor Cyan
Write-Host "  1. Ouvrez .env.local et verifiez/completez les valeurs" -ForegroundColor White
Write-Host "  2. Redemarrez votre serveur: npm run dev" -ForegroundColor White
Write-Host "  3. Testez la generation de video" -ForegroundColor White
