# 🔍 Vérification de la Vidéo dans Supabase

## Étapes de Vérification

1. **Supabase Dashboard** → **Table Editor** → **videos**
2. Cherchez la vidéo la plus récente (triez par `created_at` DESC)
3. Vérifiez les colonnes :
   - `video_url` : Doit contenir l'URL Kie (ex: `https://tempfile.aiquickdraw.com/r/...`)
   - `task_id` : Doit correspondre au taskId des logs
   - `user_id` : Votre UUID utilisateur
   - `status` : Doit être `completed`

## 🎯 URL Attendue

L'URL devrait ressembler à :
```
https://tempfile.aiquickdraw.com/r/[uuid]_watermarked.mp4
```

## 📋 Actions

1. **Copiez l'URL `video_url`** depuis Supabase
2. **Collez-la dans un nouvel onglet** pour vérifier qu'elle fonctionne
3. **Partagez-moi l'URL** pour que je puisse voir le format

## 🐛 Si l'URL est vide ou incorrecte

Cela signifie que le webhook n'a pas extrait correctement l'URL de Kie. Je devrai voir les logs complets du webhook pour débugger.

## 📊 Logs à Vérifier

Dans Vercel → Functions → `/api/veo/webhook` → Cherchez le log du callback à 16:45:09

Vous devriez voir :
```
📹 Received URL callback (extracted from text)
📺 Veo URL: https://...
🔍 Looking for metadata with taskId: xxx
✅ Video saved to Supabase successfully
```

Si vous ne voyez pas ces logs, partagez-moi le log complet du webhook.
