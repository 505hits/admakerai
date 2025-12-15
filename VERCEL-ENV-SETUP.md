# Configuration des Variables d'Environnement Vercel

Ce guide explique comment configurer les variables d'environnement nécessaires pour faire fonctionner l'API de génération de vidéos sur Vercel.

## Variables Requises

### 1. NEXT_PUBLIC_VEO_API_KEY
**Valeur** : `c4f6b75bed7509d71118cc425052b88f`  
**Description** : Clé API pour KIE.AI (Veo 3.1) permettant la génération de vidéos avec des acteurs IA.

### 2. NEXT_PUBLIC_APP_URL
**Valeur** : L'URL de votre application Vercel (ex: `https://admakerai.vercel.app`)  
**Description** : URL publique de votre application, utilisée par l'API Veo pour envoyer des callbacks quand les vidéos sont prêtes.

### 3. NEXT_PUBLIC_SUPABASE_URL
**Valeur** : Votre URL Supabase  
**Description** : URL de votre projet Supabase pour l'authentification.

### 4. NEXT_PUBLIC_SUPABASE_ANON_KEY
**Valeur** : Votre clé anonyme Supabase  
**Description** : Clé publique Supabase pour l'authentification côté client.

## Instructions de Configuration

### Étape 1 : Accéder aux Paramètres Vercel

1. Connectez-vous à [Vercel](https://vercel.com)
2. Sélectionnez votre projet `admakerai`
3. Cliquez sur l'onglet **Settings** dans le menu supérieur
4. Dans le menu latéral, cliquez sur **Environment Variables**

### Étape 2 : Ajouter les Variables

Pour chaque variable listée ci-dessus :

1. Cliquez sur **Add New**
2. Dans le champ **Key**, entrez le nom de la variable (ex: `NEXT_PUBLIC_VEO_API_KEY`)
3. Dans le champ **Value**, entrez la valeur correspondante
4. Sélectionnez les environnements où la variable doit être disponible :
   - ✅ **Production** (obligatoire)
   - ✅ **Preview** (recommandé pour tester)
   - ✅ **Development** (optionnel)
5. Cliquez sur **Save**

### Étape 3 : Redéployer l'Application

Après avoir ajouté toutes les variables :

1. Retournez à l'onglet **Deployments**
2. Cliquez sur le bouton **Redeploy** sur le dernier déploiement
3. Confirmez le redéploiement

**Ou** poussez un nouveau commit vers GitHub pour déclencher un déploiement automatique.

## Vérification

### Vérifier que les Variables sont Configurées

1. Allez dans **Settings > Environment Variables**
2. Vérifiez que les 4 variables sont listées
3. Assurez-vous qu'elles sont activées pour l'environnement **Production**

### Tester la Génération de Vidéo

1. Ouvrez votre application déployée (ex: `https://admakerai.vercel.app`)
2. Connectez-vous avec votre compte
3. Accédez au **Dashboard**
4. Sélectionnez un **AI Actor**
5. Écrivez un script court (ex: "Hello, this is a test video")
6. Ajoutez une description de scène (ex: "Modern office with natural lighting")
7. Cliquez sur **Generate Video**
8. Attendez 1-3 minutes - vous devriez voir :
   - Le statut de génération avec le temps écoulé
   - La vidéo apparaître dans le player une fois terminée
   - La vidéo ajoutée à votre historique

### Vérifier les Logs de Callback

1. Dans Vercel, allez dans l'onglet **Logs** ou **Functions**
2. Filtrez par `/api/veo/callback`
3. Vous devriez voir des logs comme :
   ```
   📹 Veo Callback received: { code: 200, data: { taskId: "...", ... } }
   ✅ Video generation completed for task xxx
   📺 Video URL: https://...
   ```

## Dépannage

### Les Callbacks ne Fonctionnent Pas

**Symptôme** : La génération timeout après 5 minutes avec le message "Localhost limitation"

**Solution** :
1. Vérifiez que `NEXT_PUBLIC_APP_URL` est correctement configurée avec votre URL Vercel
2. Assurez-vous d'avoir redéployé après avoir ajouté les variables
3. Vérifiez les logs Vercel pour voir si des callbacks sont reçus

### Erreur "Invalid API key"

**Symptôme** : Message d'erreur lors de la génération

**Solution** :
1. Vérifiez que `NEXT_PUBLIC_VEO_API_KEY` est correctement configurée
2. Assurez-vous que la clé API est valide sur [kie.ai](https://kie.ai)
3. Redéployez l'application

### Erreur "Insufficient credits"

**Symptôme** : Message indiquant un manque de crédits

**Solution** :
1. Connectez-vous à votre compte [KIE.AI](https://kie.ai)
2. Vérifiez votre solde de crédits
3. Rechargez si nécessaire

## Ressources

- [Documentation Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Documentation KIE.AI](https://kie.ai/docs)
- [Dashboard KIE.AI](https://kie.ai/dashboard) - Pour vérifier vos crédits et l'historique de génération
