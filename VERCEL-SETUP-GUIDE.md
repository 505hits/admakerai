# 🚀 Configuration Vercel - Guide Visuel

## ✅ Code déjà poussé sur GitHub

Tout le code est à jour sur GitHub. Il ne reste plus qu'à configurer Vercel.

---

## 📋 Étapes de Configuration Vercel

### 1️⃣ Connexion à Vercel

1. Allez sur **https://vercel.com/dashboard**
2. Connectez-vous si nécessaire
3. Vous devriez voir votre projet **AdMaker AI**

---

### 2️⃣ Accéder aux Settings

1. Cliquez sur votre projet **AdMaker AI**
2. En haut de la page, cliquez sur **"Settings"**

---

### 3️⃣ Configurer le Root Directory

1. Dans le menu latéral gauche, cliquez sur **"General"**
2. Scrollez jusqu'à la section **"Build & Development Settings"**
3. Trouvez la ligne **"Root Directory"**
4. Cliquez sur le bouton **"Edit"** à droite
5. Dans le menu déroulant, sélectionnez **`admaker`**
6. Cliquez sur **"Save"**

**Important** : Le Root Directory doit être `admaker` car c'est là que se trouve le projet Next.js.

---

### 4️⃣ Vérifier les Variables d'Environnement

1. Dans le menu latéral, cliquez sur **"Environment Variables"**
2. Vérifiez que ces 5 variables existent :

```
✅ NEXT_PUBLIC_VEO_API_KEY
✅ NEXT_PUBLIC_APP_URL
✅ NEXT_PUBLIC_SUPABASE_URL
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
✅ SUPABASE_SERVICE_ROLE_KEY
```

**Si `NEXT_PUBLIC_APP_URL` n'existe pas ou est incorrecte** :
- Cliquez sur **"Add New"**
- Key: `NEXT_PUBLIC_APP_URL`
- Value: `https://votre-app.vercel.app` (votre URL Vercel exacte)
- Environments: Production, Preview, Development
- Cliquez sur **"Save"**

---

### 5️⃣ Redéployer

1. Retournez à la page principale du projet (cliquez sur le nom du projet en haut)
2. Cliquez sur **"Deployments"** dans le menu du haut
3. Trouvez le dernier déploiement (celui qui a échoué)
4. Cliquez sur les **3 points** (⋯) à droite
5. Cliquez sur **"Redeploy"**
6. **Décochez** "Use existing Build Cache"
7. Cliquez sur **"Redeploy"**

---

### 6️⃣ Attendre le Build

- Le build devrait prendre **1-3 minutes**
- Vous verrez une icône orange qui tourne ⚙️
- Attendez qu'elle devienne verte ✅

**Si le build échoue** :
- Cliquez sur le déploiement
- Cliquez sur **"Building"** pour voir les logs
- Partagez-moi l'erreur

**Si le build réussit** :
- L'icône devient verte ✅
- Vous verrez l'URL de déploiement
- Notez cette URL (ex: `https://admakerai-xyz.vercel.app`)

---

## 🧪 Test Final

Une fois le déploiement réussi :

### 1. Testez l'Application
1. Cliquez sur **"Visit"** pour ouvrir l'app
2. Ou allez sur l'URL de déploiement
3. Vérifiez que la page d'accueil s'affiche

### 2. Testez la Génération de Vidéo
1. Allez sur `/dashboard`
2. Connectez-vous avec Supabase
3. Sélectionnez un acteur AI
4. Écrivez un script :
```
Script: Hi! I'm excited to show you this amazing product!

Scene: Professional presentation, modern office background
```
5. Cliquez sur **"Generate Video"**

### 3. Vérifiez le Comportement
✅ Message de succès
✅ Bascule vers "Video History"
✅ Pas d'erreur console

### 4. Attendez 1-3 Minutes
- La vidéo est en cours de génération chez Kie
- Le webhook sera appelé automatiquement
- La vidéo apparaîtra dans l'historique

### 5. Vérifiez les Logs Vercel
1. Retournez sur Vercel Dashboard
2. Deployments → Cliquez sur le déploiement actif
3. Cliquez sur **"Functions"**
4. Cherchez `/api/veo/webhook`
5. Vous devriez voir :
```
📹 Veo Callback POST received
🔍 Extracted taskId: xxx
💾 Saving Veo URL directly to Supabase...
✅ Veo URL saved to Supabase
```

---

## ✅ Checklist Finale

- [ ] Vercel Root Directory configuré à `admaker`
- [ ] Variables d'environnement vérifiées (5 variables)
- [ ] Redéploiement lancé
- [ ] Build réussi (icône verte ✅)
- [ ] Application accessible sur l'URL Vercel
- [ ] Génération de vidéo testée
- [ ] Webhook reçoit les callbacks
- [ ] Vidéo apparaît dans l'historique

---

## 🎉 Félicitations !

Si tous les tests passent, votre intégration Kie Veo 3 API est **opérationnelle en production** ! 🚀

**Prochaines étapes possibles** :
- Ajouter des notifications en temps réel (Supabase Realtime)
- Améliorer l'UX pendant la génération
- Ajouter des analytics
- Optimiser les coûts

**Bon déploiement ! 🎬**
