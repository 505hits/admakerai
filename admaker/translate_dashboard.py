import re

# Read the dashboard file
with open('app/fr/tableau-de-bord/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Dictionary of translations
translations = {
    # Navigation tabs
    'Create Video': 'Créer une Vidéo',
    'Winning Ad Replicator': 'Réplicateur de Pub Gagnante',
    'Video History': 'Historique Vidéos',
    'My Actors': 'Mes Acteurs',
    'Upgrade Plan': 'Améliorer le Plan',
    
    # Credits
    'Video Credits': 'Crédits Vidéo',
    'AI Actor Credits': 'Crédits Acteur IA',
    'Replicator Credits': 'Crédits Réplicateur',
    
    # Buttons and actions
    'Generate Video': 'Générer la Vidéo',
    'Generate All Variations': 'Générer Toutes les Variations',
    'Generating...': 'Génération...',
    'Download': 'Télécharger',
    'Upload': 'Télécharger',
    'Cancel': 'Annuler',
    'Close': 'Fermer',
    'Save': 'Enregistrer',
    'Delete': 'Supprimer',
    'Edit': 'Modifier',
    'View': 'Voir',
    'Back': 'Retour',
    'Next': 'Suivant',
    'Previous': 'Précédent',
    'Continue': 'Continuer',
    'Confirm': 'Confirmer',
    
    # Form labels
    'Select AI Actor': 'Sélectionner un Acteur IA',
    'Choose an actor': 'Choisissez un acteur',
    'Search actors...': 'Rechercher des acteurs...',
    'Categories': 'Catégories',
    'All': 'Tous',
    'My Custom Actors': 'Mes Acteurs Personnalisés',
    'Script': 'Script',
    'Describe your video and script...': 'Décrivez votre vidéo et le script...',
    'Scene Description': 'Description de la Scène',
    'Describe the scene (optional)...': 'Décrivez la scène (optionnel)...',
    'Product Image': 'Image du Produit',
    'Upload Product': 'Télécharger Produit',
    'Virtual Try-On': 'Essayage Virtuel',
    'Upload Clothing': 'Télécharger Vêtement',
    'Video Settings': 'Paramètres Vidéo',
    'Format': 'Format',
    'Duration': 'Durée',
    'seconds': 'secondes',
    'Accent': 'Accent',
    
    # AI Script Enhancer
    'AI Script Enhancer': 'Améliorateur de Script IA',
    'Enhance': 'Améliorer',
    'Enhancing...': 'Amélioration...',
    
    # Variations
    'Variation': 'Variation',
    '+ Add Variation': '+ Ajouter une Variation',
    'Remove': 'Retirer',
    'Total Cost': 'Coût Total',
    'credits required': 'crédits requis',
    
    # Video History
    'Loading videos...': 'Chargement des vidéos...',
    'No videos yet': 'Aucune vidéo pour le moment',
    'Start creating your first AI videos': 'Commencez à créer vos premières vidéos IA',
    'Generated on': 'Généré le',
    
    # Actor Creation
    'Create Custom AI Actor': 'Créer un Acteur IA Personnalisé',
    'Person Image': 'Image de la Personne',
    'Required': 'Requis',
    'Object Image': 'Image de l\'Objet',
    'Optional': 'Optionnel',
    'Decor Image': 'Image du Décor',
    'Actor Name': 'Nom de l\'Acteur',
    'Enter actor name...': 'Entrez le nom de l\'acteur...',
    'Description': 'Description',
    'Describe the actor appearance and style...': 'Décrivez l\'apparence et le style de l\'acteur...',
    'Aspect Ratio': 'Ratio d\'Aspect',
    'Cost: 20 actor credits': 'Coût : 20 crédits acteur',
    'Create Actor': 'Créer l\'Acteur',
    'Creating...': 'Création...',
    'Create New Actor': 'Créer un Nouvel Acteur',
    'No custom actors yet': 'Aucun acteur personnalisé pour le moment',
    'Create your first custom AI actor': 'Créez votre premier acteur IA personnalisé',
    'View Image': 'Voir l\'Image',
    
    # Replicator
    'NEW': 'NOUVEAU',
    'Works best with influencers without products': 'Fonctionne mieux avec des influenceurs sans produits',
    'Estimated time: 10-15 minutes': 'Temps estimé : 10-15 minutes',
    'Available credits': 'Crédits disponibles',
    'Upload Video': 'Télécharger Vidéo',
    'Upload your video': 'Téléchargez votre vidéo',
    'Select New Actor': 'Sélectionner un Nouvel Acteur',
    'Replicate': 'Répliquer',
    'Replicating...': 'Réplication...',
    
    # Notifications and messages
    'Success': 'Succès',
    'Error': 'Erreur',
    'Video Generated Successfully!': 'Vidéo Générée avec Succès !',
    'Your video is being generated': 'Votre vidéo est en cours de génération',
    'It will appear in history in 1-3 minutes': 'Elle apparaîtra dans l\'historique dans 1-3 minutes',
    'Actor created successfully!': 'Acteur créé avec succès !',
    'Out of Credits': 'Plus de Crédits',
    'Buy More Credits': 'Acheter Plus de Crédits',
    
    # Errors
    'Please select an AI actor first': 'Veuillez sélectionner un acteur IA',
    'Please describe your video and script': 'Veuillez décrire votre vidéo et le script',
    'Insufficient credits': 'Crédits insuffisants',
    'You must be logged in to generate videos': 'Vous devez être connecté pour générer des vidéos',
    'Failed to start video generation': 'Échec du démarrage de la génération vidéo',
    'Failed to upload': 'Échec du téléchargement',
    'Please upload an image file': 'Veuillez télécharger un fichier image',
    'Image size must be less than 30MB': 'La taille de l\'image doit être inférieure à 30 Mo',
    'Please upload a person image': 'Veuillez télécharger une image de personne',
    'Please provide a description': 'Veuillez fournir une description',
    'Insufficient AI Actor credits (20 credits required)': 'Crédits Acteur IA insuffisants (20 crédits requis)',
    'Not authenticated': 'Non authentifié',
    'Failed to create actor': 'Échec de la création de l\'acteur',
    'Generation is taking longer than expected': 'La génération prend plus de temps que prévu',
    'The actor will appear in "My Actors" when ready': 'L\'acteur apparaîtra dans "Mes Acteurs" quand il sera prêt',
    'usually within 5-10 minutes': 'généralement dans les 5-10 minutes',
    'Generation failed': 'Échec de la génération',
    'Please configure at least one variation with an actor and script': 'Veuillez configurer au moins une variation avec un acteur et un script',
    'Failed to start batch generation': 'Échec du démarrage de la génération par lots',
    
    # Misc
    'Loading...': 'Chargement...',
    'No user found, cannot save video': 'Aucun utilisateur trouvé, impossible d\'enregistrer la vidéo',
}

# Apply translations
for english, french in translations.items():
    # Use word boundaries to avoid partial replacements
    # Escape special regex characters
    english_escaped = re.escape(english)
    content = re.sub(f'>{english_escaped}<', f'>{french}<', content)
    content = re.sub(f'"{english_escaped}"', f'"{french}"', content)
    content = re.sub(f"'{english_escaped}'", f"'{french}'", content)
    content = re.sub(f'`{english_escaped}`', f'`{french}`', content)

# Write back
with open('app/fr/tableau-de-bord/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Dashboard translation completed!")
