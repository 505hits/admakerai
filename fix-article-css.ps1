$articleCssFiles = @(
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\blog\best-ugc-video-creation-service-for-real-estate-marketing\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\blog\compare-pricing-ugc-video-production-tools\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\de\blog\beste-ki-plattformen-ugc-markenvideos\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\de\blog\bester-ugc-video-erstellungsservice-immobilienmarketing\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\es\blog\mejor-servicio-creacion-video-ugc-marketing-inmobiliario\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\es\blog\mejores-plataformas-ia-crear-videos-ugc-marca\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\fr\blog\comparer-prix-outils-production-video-ugc\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\fr\blog\meilleur-service-creation-video-ugc-marketing-immobilier\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\fr\blog\meilleures-plateformes-ia-creation-videos-ugc-marque\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\ja\blog\best-ugc-video-creation-service-real-estate-marketing\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\ja\blog\brand-ugc-video-ai-platforms\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\ko\blog\best-ugc-video-creation-service-real-estate-marketing\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\ko\blog\brand-ugc-video-ai-platforms\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\pt\blog\melhor-servicio-criacao-video-ugc-marketing-imobiliario\Article.module.css",
    "c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\app\pt\blog\melhores-plataformas-ia-criar-videos-ugc-marca\Article.module.css"
)

foreach ($file in $articleCssFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Fix 1: Add overflow-x and width to .pageContainer
        $content = $content -replace '(\.pageContainer \{[^}]*padding: 100px 20px 60px;)', '$1`r`n    overflow-x: hidden;`r`n    width: 100%;'
        
        # Fix 2: Add word-wrap and overflow-x to .articleContent
        $content = $content -replace '(\.articleContent \{[^}]*overflow-wrap: break-word;)', '$1`r`n    word-wrap: break-word;`r`n    overflow-x: hidden;'
        
        # Fix 3: Add width to .heroImage
        $content = $content -replace '(\.heroImage \{[^}]*max-width: 500px;)', '$1`r`n    width: 100%;'
        
        # Fix 4: Add max-width to .heroImage img
        $content = $content -replace '(\.heroImage img \{[^}]*display: block;)', '$1`r`n    max-width: 100%;'
        
        # Fix 5: Add width to .imageWrapper
        $content = $content -replace '(\.imageWrapper \{[^}]*max-width: 500px;)', '$1`r`n    width: 100%;'
        
        # Fix 6: Add max-width to .imageWrapper img
        $content = $content -replace '(\.imageWrapper img \{[^}]*display: block;)', '$1`r`n    max-width: 100%;'
        
        # Fix 7: Add overflow-x to @media (max-width: 768px) .articleContent
        $content = $content -replace '(@media \(max-width: 768px\)[^}]*\.articleContent \{[^}]*padding: 24px;)', '$1`r`n        overflow-x: hidden;'
        
        # Fix 8: Add table wrapper and image fixes to @media (max-width: 768px)
        $content = $content -replace '(@media \(max-width: 768px\)[^}]*\.section li \{[^}]*font-size: 16px;[^}]*\})', '$1`r`n`r`n    .tableWrapper {`r`n        margin-left: -24px;`r`n        margin-right: -24px;`r`n        border-radius: 0;`r`n        width: calc(100% + 48px);`r`n    }`r`n`r`n    .heroImage,`r`n    .imageWrapper {`r`n        max-width: 100%;`r`n    }'
        
        # Fix 9: Add overflow-x to @media (max-width: 480px) .articleContent
        $content = $content -replace '(@media \(max-width: 480px\)[^}]*\.articleContent \{[^}]*padding: 20px;)', '$1`r`n        overflow-x: hidden;'
        
        # Fix 10: Add table wrapper to @media (max-width: 480px)
        $content = $content -replace '(@media \(max-width: 480px\)[^}]*\.mainTitle \{[^}]*font-size: 28px;[^}]*\})', '$1`r`n`r`n    .tableWrapper {`r`n        margin-left: -20px;`r`n        margin-right: -20px;`r`n        width: calc(100% + 40px);`r`n    }'
        
        Set-Content $file -Value $content -NoNewline
        Write-Host "Fixed: $file"
    } else {
        Write-Host "Not found: $file"
    }
}

Write-Host "`nAll Article.module.css files have been updated!"
