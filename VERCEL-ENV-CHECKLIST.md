# ✅ Étape 2 : Vérification des Variables d'Environnement Vercel

## Variables Requises

Vous devez avoir ces 5 variables configurées dans Vercel :

### 1. NEXT_PUBLIC_VEO_API_KEY
- **Description** : Votre clé API Kie pour générer des vidéos
- **Où l'obtenir** : https://kie.ai/api-key
- **Format** : `kie_xxxxxxxxxxxxxxxxxxxxx`
- **Environnements** : Production, Preview, Development

### 2. NEXT_PUBLIC_APP_URL
- **Description** : L'URL de votre application (pour les callbacks Kie)
- **Valeur** : `https://votre-app.vercel.app` (sans trailing slash)
- **Important** : Doit être l'URL EXACTE de production
- **Environnements** : Production uniquement

### 3. NEXT_PUBLIC_SUPABASE_URL
- **Description** : URL de votre projet Supabase
- **Format** : `https://xxxxxxxxxxxxx.supabase.co`
- **Où l'obtenir** : Supabase → Settings → API
- **Environnements** : Production, Preview, Development

### 4. NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Description** : Clé publique Supabase (anon/public)
- **Format** : Long token JWT
- **Où l'obtenir** : Supabase → Settings → API → Project API keys → `anon` `public`
- **Environnements** : Production, Preview, Development

### 5. SUPABASE_SERVICE_ROLE_KEY
- **Description** : Clé secrète Supabase (pour le webhook)
- **Format** : Long token JWT
- **Où l'obtenir** : Supabase → Settings → API → Project API keys → `service_role` (⚠️ Secret!)
- **Environnements** : Production, Preview, Development
- **⚠️ IMPORTANT** : Cette clé contourne les Row Level Security policies

---

## Comment Vérifier dans Vercel

1. Allez sur https://vercel.com
2. Sélectionnez votre projet **AdMaker AI**
3. Cliquez sur **Settings** (en haut)
4. Cliquez sur **Environment Variables** (dans le menu latéral)
5. Vérifiez que les 5 variables existent

---

## Si une Variable Manque

1. Cliquez sur **"Add New"**
2. **Key** : Nom de la variable (ex: `NEXT_PUBLIC_VEO_API_KEY`)
3. **Value** : La valeur de la variable
4. **Environments** : Cochez les environnements appropriés
   - Production ✅
   - Preview ✅ (recommandé)
   - Development ✅ (recommandé)
5. Cliquez sur **"Save"**

---

## Checklist de Vérification

- [ ] `NEXT_PUBLIC_VEO_API_KEY` existe et est valide
- [ ] `NEXT_PUBLIC_APP_URL` existe et correspond à votre URL Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_URL` existe
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` existe
- [ ] `SUPABASE_SERVICE_ROLE_KEY` existe

---

## ⚠️ Points d'Attention

### NEXT_PUBLIC_APP_URL
- **Correct** : `https://admakerai.vercel.app`
- **Incorrect** : `https://admakerai.vercel.app/` (trailing slash)
- **Incorrect** : `http://localhost:3000` (en production)

### SUPABASE_SERVICE_ROLE_KEY
- Cette clé donne un accès complet à votre base de données
- Ne la partagez JAMAIS publiquement
- Elle est nécessaire pour que le webhook puisse écrire dans la table `videos`

---

## Après Vérification

Une fois toutes les variables vérifiées et configurées, vous êtes prêt pour le déploiement ! 🚀
