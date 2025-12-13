# 🔧 Fix Vercel Build Error - ScriptEditor Module Not Found

## ❌ Erreur
```
Type error: Cannot find module '@/components/dashboard/ScriptEditor'
```

## ✅ Solution

Le problème vient de la configuration du **Root Directory** dans Vercel. Voici comment le corriger :

### Étape 1 : Aller dans les Paramètres Vercel

1. Allez sur **https://vercel.com**
2. Sélectionnez votre projet **admakerai**
3. Cliquez sur **Settings** (en haut)

### Étape 2 : Configurer le Root Directory

1. Dans le menu de gauche, cliquez sur **General**
2. Scrollez jusqu'à **Build & Development Settings**
3. Trouvez **Root Directory**
4. Cliquez sur **Edit**
5. Entrez : `admaker`
6. Cliquez sur **Save**

### Étape 3 : Vérifier les Autres Paramètres

Assurez-vous que ces paramètres sont corrects :

- **Framework Preset** : `Next.js`
- **Build Command** : `npm run build` (ou laissez vide pour utiliser la valeur par défaut)
- **Output Directory** : `.next` (ou laissez vide)
- **Install Command** : `npm install` (ou laissez vide)

### Étape 4 : Redéployer

1. Allez dans **Deployments**
2. Cliquez sur les **3 points** du dernier déploiement
3. Cliquez sur **Redeploy**
4. Attendez que le build se termine

---

## 🎯 Pourquoi Cette Erreur ?

Le projet Next.js est dans le dossier `admaker/`, pas à la racine du repo. Sans configurer le **Root Directory**, Vercel essaie de build depuis la racine et ne trouve pas les modules.

En configurant `admaker` comme Root Directory, Vercel :
- Exécute `npm install` dans `admaker/`
- Résout correctement les alias `@/` définis dans `tsconfig.json`
- Trouve tous les composants dans `components/dashboard/`

---

## ✅ Vérification

Une fois le build réussi, vérifiez que :
- ✅ La landing page s'affiche correctement
- ✅ Le dashboard fonctionne
- ✅ Les images d'acteurs se chargent depuis Cloudflare R2
- ✅ Le modal "Create Actor" s'ouvre correctement

---

## 📝 Note

Si vous avez déjà un `vercel.json` à la racine, supprimez-le car il peut entrer en conflit avec les paramètres de l'interface Vercel.
