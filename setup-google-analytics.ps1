# Script PowerShell pour configurer Google Analytics sur Vercel
# Ce script vous guide pour ajouter la variable d'environnement NEXT_PUBLIC_GA_ID

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configuration Google Analytics - Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "ID de Mesure Google Analytics: " -NoNewline -ForegroundColor Yellow
Write-Host "G-R78PBB28QT" -ForegroundColor Green
Write-Host ""

Write-Host "Étapes à suivre:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Ouvrez votre navigateur et allez sur:" -ForegroundColor White
Write-Host "   https://vercel.com/dashboard" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Sélectionnez votre projet 'admakerai'" -ForegroundColor White
Write-Host ""
Write-Host "3. Allez dans Settings → Environment Variables" -ForegroundColor White
Write-Host ""
Write-Host "4. Ajoutez une nouvelle variable:" -ForegroundColor White
Write-Host "   Name:  " -NoNewline -ForegroundColor Gray
Write-Host "NEXT_PUBLIC_GA_ID" -ForegroundColor Yellow
Write-Host "   Value: " -NoNewline -ForegroundColor Gray
Write-Host "G-R78PBB28QT" -ForegroundColor Green
Write-Host ""
Write-Host "5. Cochez les environnements:" -ForegroundColor White
Write-Host "   [X] Production" -ForegroundColor Green
Write-Host "   [X] Preview" -ForegroundColor Green
Write-Host "   [X] Development" -ForegroundColor Green
Write-Host ""
Write-Host "6. Cliquez sur 'Save'" -ForegroundColor White
Write-Host ""
Write-Host "7. Redéployez votre application:" -ForegroundColor White
Write-Host "   - Allez dans l'onglet 'Deployments'" -ForegroundColor Gray
Write-Host "   - Cliquez sur les 3 points (...) du dernier déploiement" -ForegroundColor Gray
Write-Host "   - Sélectionnez 'Redeploy'" -ForegroundColor Gray
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configuration Locale (Développement)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si le fichier .env.local existe
$envPath = "admaker\.env.local"
if (Test-Path $envPath) {
    Write-Host "✓ Fichier .env.local créé avec succès!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Contenu:" -ForegroundColor Gray
    Get-Content $envPath | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
} else {
    Write-Host "✗ Le fichier .env.local n'existe pas encore" -ForegroundColor Red
    Write-Host "  Création du fichier..." -ForegroundColor Yellow
    "NEXT_PUBLIC_GA_ID=G-R78PBB28QT" | Out-File -FilePath $envPath -Encoding utf8 -NoNewline
    Write-Host "✓ Fichier créé!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Prochaines Étapes" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Configurez la variable sur Vercel (voir ci-dessus)" -ForegroundColor White
Write-Host "2. Redéployez l'application" -ForegroundColor White
Write-Host "3. Vérifiez l'installation:" -ForegroundColor White
Write-Host "   - Ouvrez https://admakerai.app" -ForegroundColor Blue
Write-Host "   - Ouvrez les DevTools (F12)" -ForegroundColor Gray
Write-Host "   - Onglet Network → Recherchez 'gtag/js?id=G-R78PBB28QT'" -ForegroundColor Gray
Write-Host ""
Write-Host "Pour plus de détails, consultez:" -ForegroundColor White
Write-Host "  google-analytics-setup.md" -ForegroundColor Blue
Write-Host ""
