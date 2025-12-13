# 🚀 Déploiement sur Vercel

## ✅ Repo GitHub Configuré

Le projet est maintenant connecté au nouveau repo :
```
https://github.com/505hits/admakerai.git
```

Dernier commit : **feat: Cloudflare R2 migration + Dashboard improvements**

---

## 📋 Étapes de Déploiement Vercel

### 1. Connecter le Repo à Vercel

1. Allez sur **https://vercel.com**
2. Cliquez sur **"Add New Project"**
3. Sélectionnez **"Import Git Repository"**
4. Choisissez **505hits/admakerai**
5. Cliquez sur **"Import"**

### 2. Configuration du Projet

**Framework Preset** : Next.js  
**Root Directory** : `admaker`  
**Build Command** : `npm run build`  
**Output Directory** : `.next`

### 3. Variables d'Environnement

Ajoutez ces variables dans **Settings → Environment Variables** :

```env
# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID=votre_account_id
CLOUDFLARE_ACCESS_KEY_ID=votre_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=votre_secret_key
CLOUDFLARE_BUCKET_NAME=admakerai-media
CLOUDFLARE_PUBLIC_URL=https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev
NEXT_PUBLIC_CLOUDFLARE_URL=https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev

# Autres variables (si nécessaire)
# Ajoutez vos autres variables d'environnement ici
```

### 4. Déployer

1. Cliquez sur **"Deploy"**
2. Attendez la fin du build (~2-3 minutes)
3. Votre site sera disponible sur `https://admakerai.vercel.app` (ou votre domaine personnalisé)

---

## 🔍 Vérifications Post-Déploiement

Une fois déployé, vérifiez :

- ✅ Logo et images de la landing page
- ✅ Vidéos du slider
- ✅ Images d'acteurs dans le dashboard
- ✅ Catégorie "Originals" (5 acteurs)
- ✅ Catégorie "Casual" (10 acteurs)
- ✅ Modal "Create Actor" avec 3 uploads

---

## 🎯 Prochaines Étapes

1. **Uploader les images manquantes sur R2** :
   - 5 images Originals (voir `UPLOAD-ORIGINALS.md`)
   - 5 images Casual (voir `UPLOAD-CASUAL.md`)

2. **Configurer un domaine personnalisé** (optionnel) :
   - Vercel → Settings → Domains
   - Ajouter votre domaine

3. **Activer les Analytics** (optionnel) :
   - Vercel → Analytics
   - Suivre les performances

---

## 📊 Résumé des Changements

✅ **Migration Cloudflare R2** : 75+ fichiers médias  
✅ **Catégorie Originals** : 5 acteurs premium  
✅ **Catégorie Casual** : 10 acteurs (5 nouveaux)  
✅ **Dashboard optimisé** : Grille 2 lignes max  
✅ **Modal Create Actor** : 3 uploads d'images  
✅ **Design compact** : Meilleure UX mobile/desktop  

Tout est prêt pour le déploiement ! 🎉
