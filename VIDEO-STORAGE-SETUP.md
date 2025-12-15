# Guide de Configuration pour le Stockage des Vidéos

Ce guide explique comment configurer le système de stockage automatique des vidéos générées.

## Vue d'ensemble

Le système utilise une approche **hybride** :
- **Cloudflare R2** : Stockage des fichiers vidéo (10GB gratuits)
- **Supabase** : Stockage des métadonnées (historique, recherche)

### Flux Automatique

```
1. User clique "Generate Video"
2. Veo API génère la vidéo
3. Callback reçu → Télécharge automatiquement depuis Veo
4. Upload automatiquement vers R2 (dossier videos/)
5. Sauvegarde métadonnées dans Supabase
6. Affiche la vidéo dans le dashboard
```

**Aucune action manuelle requise de l'utilisateur !**

## Étape 1 : Créer la Table Supabase

1. Allez sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Cliquez sur **SQL Editor** dans le menu latéral
4. Cliquez sur **New Query**
5. Copiez-collez le contenu du fichier `supabase/migrations/create_videos_table.sql`
6. Cliquez sur **Run** pour exécuter la migration

### Vérification

- Allez dans **Table Editor**
- Vous devriez voir une nouvelle table `videos`
- Vérifiez que les colonnes sont présentes : `id`, `user_id`, `task_id`, `video_url`, etc.

## Étape 2 : Configurer les Variables d'Environnement Vercel

Ajoutez ces variables dans **Vercel Dashboard > Settings > Environment Variables** :

### Variables Cloudflare R2 (pour l'upload)

| Variable | Valeur | Description |
|----------|--------|-------------|
| `CLOUDFLARE_ACCOUNT_ID` | Votre Account ID | Trouvé dans Cloudflare Dashboard |
| `CLOUDFLARE_ACCESS_KEY_ID` | Votre Access Key | Créé dans R2 > Manage R2 API Tokens |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | Votre Secret Key | Créé avec l'Access Key |
| `CLOUDFLARE_BUCKET_NAME` | `admakerai-media` | Nom de votre bucket |
| `CLOUDFLARE_PUBLIC_URL` | `https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev` | URL publique de votre bucket |

### Comment obtenir les credentials R2 ?

1. Allez sur [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Cliquez sur **R2** dans le menu latéral
3. Cliquez sur **Manage R2 API Tokens**
4. Cliquez sur **Create API Token**
5. Donnez les permissions **Object Read & Write**
6. Copiez l'**Access Key ID** et le **Secret Access Key**

## Étape 3 : Redéployer sur Vercel

Après avoir ajouté toutes les variables :

1. Allez dans **Deployments**
2. Cliquez sur **Redeploy** sur le dernier déploiement
3. Attendez que le déploiement se termine

## Test du Système

### 1. Générer une Vidéo

1. Ouvrez votre app déployée : `https://admakerai-fhzg5ud7f-505hits-projects.vercel.app/`
2. Connectez-vous
3. Accédez au **Dashboard**
4. Sélectionnez un **AI Actor**
5. Écrivez un script court
6. Cliquez sur **Generate Video**

### 2. Vérifier le Loading

Pendant la génération, vous devriez voir :
- ✅ "Sending request to Veo API..."
- ✅ "Video generation started! Processing..."
- ✅ "Generating video... Xs elapsed (est. Ys remaining)"
- ✅ Temps écoulé mis à jour toutes les secondes

### 3. Vérifier l'Affichage

Après 1-3 minutes :
- ✅ La vidéo apparaît automatiquement dans le player
- ✅ Boutons Download/Share disponibles
- ✅ Vidéo ajoutée à "Video History"

### 4. Vérifier le Stockage

**Dans Cloudflare R2** :
1. Allez sur Cloudflare Dashboard > R2
2. Ouvrez le bucket `admakerai-media`
3. Vous devriez voir un dossier `videos/`
4. À l'intérieur : `taskId.mp4` (ex: `abc123.mp4`)

**Dans Supabase** :
1. Allez sur Supabase Dashboard > Table Editor
2. Ouvrez la table `videos`
3. Vous devriez voir une nouvelle ligne avec :
   - `task_id` : ID de la tâche
   - `video_url` : URL R2 de la vidéo
   - `user_id` : ID de l'utilisateur
   - Métadonnées (acteur, script, durée, format)

### 5. Vérifier la Persistance

- ✅ Rafraîchir la page → Vidéo toujours dans l'historique
- ✅ Se déconnecter/reconnecter → Vidéo toujours là
- ✅ Ouvrir depuis un autre appareil → Vidéo accessible

## Logs de Débogage

### Vercel Logs

1. Allez dans **Vercel Dashboard > Functions**
2. Filtrez par `/api/veo/callback`
3. Cherchez ces logs :

```
📹 Veo Callback received: { code: 200, ... }
📥 Downloading video from Veo: https://...
✅ Video uploaded to R2: https://pub-...r2.dev/videos/taskId.mp4
✅ Video generation completed for task xxx
```

### Console Browser

Dans la console du navigateur, cherchez :
```
🚀 Veo API Request to /api/v1/veo/generate
📥 Veo API Response (200)
✅ Video generation started
📊 Video status: { status: 'completed', videoUrl: '...' }
🎉 Video ready: https://...
```

## Dépannage

### La vidéo ne s'affiche pas

**Vérifiez** :
1. Les logs Vercel pour voir si le callback a été reçu
2. Que les credentials R2 sont corrects
3. Que la table `videos` existe dans Supabase
4. Que l'utilisateur est bien connecté

### Erreur "Failed to upload video to storage"

**Solution** :
1. Vérifiez que `CLOUDFLARE_ACCESS_KEY_ID` et `CLOUDFLARE_SECRET_ACCESS_KEY` sont corrects
2. Vérifiez que le bucket `admakerai-media` existe
3. Vérifiez que les permissions R2 incluent **Object Read & Write**

### Vidéo pas dans l'historique

**Solution** :
1. Vérifiez que la table `videos` a été créée
2. Vérifiez les RLS policies dans Supabase
3. Vérifiez que l'utilisateur est authentifié

## Structure R2

Après quelques générations, votre bucket R2 ressemblera à :

```
admakerai-media/
├── videos/
│   ├── task_abc123.mp4
│   ├── task_def456.mp4
│   └── task_ghi789.mp4
├── logo.png
├── influ page auth 1.mp4
└── (autres fichiers existants)
```

## Avantages du Système

✅ **Stockage permanent** : Les vidéos ne sont jamais perdues  
✅ **10GB gratuits** : Beaucoup d'espace pour les vidéos  
✅ **CDN rapide** : Cloudflare CDN pour streaming ultra-rapide  
✅ **Multi-appareils** : Accès depuis n'importe où  
✅ **Automatique** : Aucune action manuelle requise  
✅ **Recherche** : Filtrage et tri via Supabase  
