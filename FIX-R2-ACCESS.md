# 🔧 Fix Cloudflare R2 - Accès Public

## Problème

Les images ne se chargent pas car **l'accès public n'est peut-être pas activé correctement** sur le bucket R2.

---

## ✅ Solution : Vérifier et Activer l'Accès Public

### 1. Vérifier l'Accès Public

1. Allez sur https://dash.cloudflare.com
2. **R2** → **admakerai-media**
3. **Onglet "Settings"**
4. Cherchez la section **"Public Access"** ou **"R2.dev subdomain"**

### 2. Activer l'Accès Public

Si vous voyez **"Disabled"** ou **"Not enabled"** :

1. Cliquez sur **"Allow Access"** ou **"Enable"**
2. Confirmez l'activation
3. Une URL publique sera générée : `https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev`

### 3. Configurer CORS (Important !)

Pour que les images se chargent depuis votre site Next.js, il faut configurer CORS :

1. Dans **Settings** → Cherchez **"CORS Policy"**
2. Cliquez sur **"Edit CORS Policy"** ou **"Add CORS Policy"**
3. Ajoutez cette configuration :

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3600
  }
]
```

4. **Sauvegardez**

---

## 🧪 Test Rapide

Une fois l'accès public activé, testez cette URL dans votre navigateur :

```
https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/actors/beauty-actor-1.png
```

**Si l'image s'affiche** ✅ → Le problème est résolu !
**Si vous avez une erreur 403** ❌ → L'accès public n'est pas activé
**Si vous avez une erreur 404** ❌ → Le fichier n'est pas au bon endroit

---

## 🎯 Après le Fix

1. Rechargez votre dashboard : `http://localhost:3000/dashboard`
2. Les acteurs devraient maintenant s'afficher
3. Testez aussi la landing page pour les vidéos

---

## 📸 Capture d'Écran de la Configuration

Voici à quoi devrait ressembler la section "Public Access" dans les settings :

- **Public Access** : ✅ Enabled
- **R2.dev subdomain** : `https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev`
- **CORS Policy** : Configuré avec `AllowedOrigins: ["*"]`

**Faites ces vérifications et dites-moi ce que vous voyez !** 🔍
