# 🔧 Fix : Images des Acteurs

## Problème Identifié

Les images des acteurs ne s'affichent pas car elles ont été uploadées à la **racine du bucket** au lieu du dossier `actors/`.

**URLs attendues** : `https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/actors/business-actor-1.png`
**URLs actuelles** : `https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/business-actor-1.png`

---

## ✅ Solution : Créer le Dossier `actors/` sur R2

### Option 1 : Via l'Interface Web Cloudflare (Recommandé)

1. **Allez sur** https://dash.cloudflare.com
2. **R2** → **admakerai-media**
3. **Cliquez sur "Add directory"** (ou "Create folder")
4. **Nom du dossier** : `actors`
5. **Créez le dossier**

6. **Sélectionnez toutes les images d'acteurs** à la racine :
   - `business-actor-1.png`
   - `business-actor-2.jpg`
   - ... (toutes les images `*-actor-*.png/jpg`)
   
7. **Déplacez-les** dans le dossier `actors/` :
   - Sélectionnez les fichiers
   - Cliquez sur "Move" ou glissez-déposez dans le dossier `actors/`

### Option 2 : Re-upload avec la Structure Correcte

Si l'option 1 ne fonctionne pas :

1. **Supprimez** les images d'acteurs à la racine
2. **Sur votre ordinateur**, ouvrez : `c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\public\actors\`
3. **Dans Cloudflare R2**, cliquez sur **"Upload"**
4. **Important** : Avant d'uploader, créez un dossier `actors/` dans R2
5. **Entrez dans le dossier** `actors/`
6. **Uploadez tous les fichiers** depuis votre dossier local `actors/`

---

## 🎯 Vérification

Une fois les fichiers déplacés/uploadés, testez une URL :

```
https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/actors/business-actor-1.png
```

Si l'image s'affiche dans votre navigateur, c'est bon ! ✅

Rechargez ensuite votre dashboard et les acteurs devraient s'afficher.

---

## 📹 Vidéos de la Landing Page

Les vidéos sont **correctement configurées** avec Cloudflare URLs. Si elles ne se chargent pas :

1. Vérifiez dans la console du navigateur (F12) s'il y a des erreurs 404
2. Testez une URL de vidéo directement :
   ```
   https://pub-02bf1ac6244444b5810b067310ef4874.r2.dev/video  beauté.mp4
   ```

Si la vidéo ne se charge pas, c'est qu'elle n'a pas été uploadée. Dans ce cas, uploadez-la depuis :
```
c:\Users\apoll\OneDrive\Bureau\admakerai\admaker\public\video  beauté.mp4
```

---

## 🚀 Après le Fix

Une fois les images d'acteurs dans le bon dossier :

1. ✅ Rechargez le dashboard
2. ✅ Les 41 acteurs devraient s'afficher
3. ✅ Testez la sélection d'un acteur
4. ✅ Vérifiez que tout fonctionne

**Dites-moi une fois que c'est fait !** 🎉
