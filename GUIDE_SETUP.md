# Guide de déploiement — Questionnaire Audit Genre METE

## Ce que vous obtenez

Un formulaire web hébergé **gratuitement** qui enregistre chaque réponse automatiquement dans une feuille **Google Sheets** en temps réel. Zéro abonnement, zéro serveur à gérer.

---

## Étape 1 — Créer la feuille Google Sheets

1. Allez sur [sheets.google.com](https://sheets.google.com)
2. Créez une nouvelle feuille → nommez-la **"Audit Genre METE"**
3. Laissez-la ouverte, vous en aurez besoin à l'étape 2.

---

## Étape 2 — Créer le script Google Apps Script

1. Dans votre feuille Google Sheets, cliquez sur **Extensions → Apps Script**
2. Supprimez le code par défaut dans l'éditeur
3. Ouvrez le fichier `apps_script.gs` (fourni avec ce guide)
4. Copiez **tout le contenu** et collez-le dans l'éditeur Apps Script
5. Cliquez sur **Enregistrer** (icône disquette ou Ctrl+S)
6. Nommez le projet : `Audit Genre METE`

---

## Étape 3 — Déployer le script comme Web App

1. Cliquez sur **Déployer → Nouveau déploiement**
2. Cliquez sur l'icône ⚙️ à côté de "Type" → sélectionnez **Application Web**
3. Remplissez :
   - **Description** : `Questionnaire Audit Genre`
   - **Exécuter en tant que** : `Moi` (votre compte Google)
   - **Qui a accès** : `Tout le monde` ← IMPORTANT
4. Cliquez sur **Déployer**
5. Autorisez l'accès quand Google le demande (cliquez "Autoriser")
6. **Copiez l'URL** qui apparaît — elle ressemble à :
   `https://script.google.com/macros/s/AKfycb.../exec`

> ⚠️ Gardez cette URL confidentielle — elle permet d'écrire dans votre feuille.

---

## Étape 4 — Héberger le formulaire HTML gratuitement

### Option A — GitHub Pages (recommandée, 0 €)

1. Créez un compte sur [github.com](https://github.com) si vous n'en avez pas
2. Cliquez sur **"New repository"**
   - Nom : `audit-genre-mete`
   - Visibilité : **Public**
   - Cochez "Add a README file"
3. Dans le repo, cliquez **"Add file → Upload files"**
4. Glissez-déposez le fichier `index.html`
5. Cliquez **"Commit changes"**
6. Allez dans **Settings → Pages**
   - Source : **Deploy from a branch**
   - Branch : **main** → dossier **/ (root)**
7. Cliquez **Save**
8. Votre URL sera : `https://votre-username.github.io/audit-genre-mete/`

### Option B — Netlify Drop (encore plus simple) test

1. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Glissez-déposez le fichier `index.html`
3. Votre site est en ligne en 30 secondes avec une URL du type `https://xxx.netlify.app`

---

## Étape 5 — Connecter le formulaire à Google Sheets

1. Ouvrez votre formulaire en ligne
2. Une fenêtre de configuration apparaît automatiquement au premier lancement
3. Collez l'URL de votre Apps Script (étape 3)
4. Cliquez **"Connecter et démarrer"**

L'URL est mémorisée dans le navigateur. Les prochains répondants sur le même appareil n'auront plus besoin de la configurer.

> 💡 **Pour un déploiement en organisation** : modifiez directement la ligne `let SCRIPT_URL = '...'` dans le fichier `index.html` avant de le mettre en ligne.

---

## Structure de la feuille Google Sheets

La feuille **"Réponses"** est créée automatiquement au premier envoi avec ces colonnes :

| Colonnes | Contenu |
|----------|---------|
| A | Date et heure |
| B–G | Informations du répondant (sexe, âge, statut, service, zone, ancienneté) |
| H–AK | Points obtenus par question (Q1 à Q30) |
| AL–BO | Libellé de la réponse choisie (Q1 à Q30) |
| BP | Score Total (/ 90) |
| BQ | Niveau de sensibilité |
| BR | Score Maximum (90) |

---

## Grille d'interprétation des scores

| Score | Niveau |
|-------|--------|
| 0 – 30 pts | Faible sensibilité genre |
| 31 – 60 pts | Sensibilité modérée |
| 61 – 80 pts | Bonne sensibilité |
| 81 – 90 pts | Très bonne sensibilité |

---

## Mettre à jour le script sans perdre les données

Si vous devez modifier le script Apps Script :
1. Allez dans Apps Script → Déployer → **Gérer les déploiements**
2. Cliquez sur l'icône ✏️ → modifiez la version → **Déployer**
3. L'URL reste la même, les données sont conservées.

---

## Support

En cas de problème :
- **Erreur CORS** : vérifiez que "Qui a accès" est bien réglé sur "Tout le monde"
- **Données non reçues** : vérifiez l'URL dans la configuration du formulaire
- **Feuille vide** : le script crée la feuille "Réponses" au premier envoi uniquement
