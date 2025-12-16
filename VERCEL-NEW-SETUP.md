# ✅ Code Poussé sur GitHub !

Le code est maintenant sur : https://github.com/505hits/admakerai

---

## 🚀 Prochaine Étape : Créer le Projet Vercel

### 1. Allez sur Vercel

https://vercel.com/new

### 2. Importez le Repo

1. Cliquez sur **"Import Git Repository"**
2. Cherchez **"505hits/admakerai"**
3. Cliquez sur **"Import"**

### 3. ⚠️ CONFIGURATION CRITIQUE (AVANT de déployer!)

#### Root Directory

1. Cherchez **"Root Directory"**
2. Cliquez sur **"Edit"**
3. Sélectionnez **`admaker`** dans la liste déroulante
4. ✅ Vérifiez que c'est bien `admaker`

#### Framework Preset

- Devrait être **Next.js** (auto-détecté)
- Si ce n'est pas le cas, sélectionnez **Next.js**

#### Build & Output

- **Build Command** : Laissez vide
- **Output Directory** : Laissez vide
- **Install Command** : Laissez vide

### 4. Variables d'Environnement

Cliquez sur **"Environment Variables"** et ajoutez ces 5 variables :

#### Variable 1 : NEXT_PUBLIC_VEO_API_KEY
- **Key** : `NEXT_PUBLIC_VEO_API_KEY`
- **Value** : Votre clé API Kie (de https://kie.ai/api-key)
- **Environments** : Production ✅ Preview ✅ Development ✅

#### Variable 2 : NEXT_PUBLIC_APP_URL
- **Key** : `NEXT_PUBLIC_APP_URL`
- **Value** : `https://admakerai.vercel.app` (ou votre URL Vercel)
- **Environments** : Production ✅

> ⚠️ Note : Vous devrez peut-être mettre à jour cette valeur après le premier déploiement si l'URL est différente

#### Variable 3 : NEXT_PUBLIC_SUPABASE_URL
- **Key** : `NEXT_PUBLIC_SUPABASE_URL`
- **Value** : Votre URL Supabase (ex: `https://xxxxx.supabase.co`)
- **Environments** : Production ✅ Preview ✅ Development ✅

#### Variable 4 : NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Key** : `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value** : Votre clé anon Supabase
- **Environments** : Production ✅ Preview ✅ Development ✅

#### Variable 5 : SUPABASE_SERVICE_ROLE_KEY
- **Key** : `SUPABASE_SERVICE_ROLE_KEY`
- **Value** : Votre clé service role Supabase
- **Environments** : Production ✅ Preview ✅ Development ✅

### 5. Déployer !

Une fois que :
- ✅ Root Directory = `admaker`
- ✅ Les 5 variables sont ajoutées

Cliquez sur **"Deploy"** !

---

## ⏳ Attendre le Build

Le build va prendre **1-3 minutes**.

Vous verrez :
- ⚙️ Icône orange qui tourne = En cours
- ✅ Icône verte = Succès !
- ❌ Icône rouge = Erreur

---

## ✅ Si le Build Réussit

1. **Notez l'URL de déploiement** (ex: `https://admakerai-xyz.vercel.app`)
2. **Cliquez sur "Visit"** pour ouvrir l'app
3. **Vérifiez** que la page d'accueil s'affiche

### Mettre à Jour NEXT_PUBLIC_APP_URL (si nécessaire)

Si l'URL Vercel est différente de celle que vous avez mise :

1. **Settings** → **Environment Variables**
2. Trouvez **NEXT_PUBLIC_APP_URL**
3. **⋯** → **Edit**
4. Mettez l'URL exacte (ex: `https://admakerai-xyz.vercel.app`)
5. **Save**
6. **Deployments** → Dernier → **⋯** → **Redeploy**

---

## 🧪 Tester la Génération de Vidéo

1. Allez sur `https://votre-app.vercel.app/dashboard`
2. Connectez-vous
3. Générez une vidéo
4. Attendez 1-3 minutes
5. Vérifiez qu'elle apparaît dans "Video History"

---

## 🎉 Félicitations !

Votre nouvelle installation est prête ! 🚀
