# Guide d'Upload avec Wrangler CLI

## ✅ Ce que nous avons accompli

- ✅ Compte Cloudflare créé
- ✅ Bucket R2 `admakerai-media` créé
- ✅ Accès public activé
- ✅ Credentials obtenus et configurés dans `.env.local`

## 🚀 Prochaine étape : Upload avec Wrangler

### Option 1 : Installer Wrangler (Recommandé)

```powershell
# Installer Wrangler globalement
npm install -g wrangler

# Se connecter à Cloudflare
wrangler login

# Uploader tous les fichiers du dossier public vers R2
wrangler r2 object put admakerai-media --file=admaker/public --recursive
```

### Option 2 : Upload Manuel via Interface Web (Plus Simple)

Si Wrangler pose problème, vous pouvez uploader manuellement :

1. **Allez sur** : https://dash.cloudflare.com
2. **Cliquez sur** R2 → `admakerai-media`
3. **Cliquez sur** "Upload"
4. **Glissez-déposez** tous les fichiers de `c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\public\`

> [!NOTE]
> L'upload manuel prendra 5-10 minutes pour 75 fichiers, mais c'est la méthode la plus fiable.

### Option 3 : Script PowerShell Simple

Je peux créer un script PowerShell qui utilise `curl` pour uploader les fichiers un par un. C'est plus lent mais garanti de fonctionner.

---

## 📋 Quelle option préférez-vous ?

1. **Wrangler CLI** (rapide, nécessite installation)
2. **Upload manuel** (simple, garanti de fonctionner)
3. **Script PowerShell** (automatisé, pas de dépendances)

**Dites-moi quelle option vous préférez et je vous guide !** 🚀
