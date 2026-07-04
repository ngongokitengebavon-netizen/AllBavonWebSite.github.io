# 📘 Guide de configuration : Firebase + Formspree pour AllBavon

Ce guide vous explique **pas à pas** comment configurer **Firebase** et **Formspree** pour que votre site AllBavon fonctionne en ligne avec des comptes utilisateurs, un forum, un espace de cours et l'envoi automatique d'emails.

---

# PARTIE 1 : Configurer Formspree (envoi automatique des emails)

## Étape 1.1 — Créer un compte Formspree

1. Ouvrez votre navigateur et allez sur : **https://formspree.io**
2. Cliquez sur le bouton **Sign Up** (S'inscrire) ou **Get Started** en haut à droite.
3. Vous pouvez créer un compte avec :
   - Votre adresse Google
   - Votre adresse GitHub
   - Ou un email + mot de passe
4. Une fois connecté, vous arrivez sur votre tableau de bord Formspree.

## Étape 1.2 — Créer un formulaire

1. Dans le tableau de bord, cliquez sur le bouton **New Form** ou **+ New Project**.
2. Choisissez **New Form**.
3. Donnez un nom à votre formulaire, par exemple : `AllBavon - Demandes d'accès`.
4. Cliquez sur **Create Form**.

## Étape 1.3 — Récupérer l'URL du formulaire

1. Votre formulaire est maintenant créé.
2. Vous voyez une URL comme ceci :
   ```
   https://formspree.io/f/xnqkvnpe
   ```
   (Les lettres et chiffres après `/f/` sont uniques à votre formulaire.)
3. **Copiez cette URL** (clic droit → Copier).

## Étape 1.4 — Coller l'URL dans votre site

1. Ouvrez le fichier `firebase-config.js` de votre site (dans le workspace).
2. Trouvez cette ligne :
   ```javascript
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/VOTRE_FORM_ID_ICI";
   ```
3. Remplacez `VOTRE_FORM_ID_ICI` par votre vraie URL :
   ```javascript
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnqkvnpe";
   ```
4. **Enregistrez le fichier.**

## Étape 1.5 — Tester Formspree

1. Ouvrez votre site (`index.html`) dans un navigateur.
2. Cliquez sur **Demander un accès**.
3. Remplissez le formulaire avec un faux email (par exemple : `test@example.com`).
4. Cliquez sur **Envoyer la demande**.
5. Vérifiez votre boîte mail de l'admin (`ngongokitengebavon@gmail.com`) — vous devriez recevoir la demande.

> 💡 Si vous ne recevez rien, vérifiez dans vos spams/courriers indésirables.

---

# PARTIE 2 : Configurer Firebase (comptes en ligne + base de données + stockage)

## Étape 2.1 — Créer un compte Google et Firebase

1. Allez sur : **https://console.firebase.google.com**
2. Connectez-vous avec votre compte Google (ou créez-en un si nécessaire).
3. Acceptez les conditions de Firebase si c'est la première fois.

## Étape 2.2 — Créer un projet Firebase

1. Cliquez sur le bouton **Ajouter un projet** (ou **Create a project**).
2. Étape 1 : Nom du projet
   - Tapez : `allbavon-web`
   - Cliquez sur **Continuer**.
3. Étape 2 : Google Analytics
   - Cochez **Non** pour désactiver Google Analytics (sauf si vous voulez l'utiliser).
   - Cliquez sur **Continuer**.
4. Étape 3 : Cliquez sur **Créer le projet**.
5. Attendez quelques secondes que Firebase prépare le projet.

## Étape 2.3 — Créer une application Web

1. Sur la page d'accueil du projet, vous voyez des icônes : iOS, Android, Web.
2. Cliquez sur l'icône **Web** (`</>`).
3. Étape 1 : Enregistrer l'application
   - **Nom de l'application** : `allbavon-site-web`
   - Cochez **Configurez aussi Firebase Hosting pour cette application** seulement si vous voulez héberger sur Firebase (sinon, laissez décoché).
   - Cliquez sur **Enregistrer l'application**.
4. Étape 2 : Une fenêtre s'affiche avec un code JavaScript.
5. **Copiez ce code** (il contient votre configuration).

Le code ressemble à ceci :
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz...",
  authDomain: "allbavon-web.firebaseapp.com",
  projectId: "allbavon-web",
  storageBucket: "allbavon-web.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

## Étape 2.4 — Coller la configuration dans votre site

1. Ouvrez le fichier `firebase-config.js`.
2. Remplacez les fausses valeurs par votre vraie configuration.
3. Par exemple :
   ```javascript
   const firebaseConfig = {
       apiKey: "AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz...",
       authDomain: "allbavon-web.firebaseapp.com",
       projectId: "allbavon-web",
       storageBucket: "allbavon-web.appspot.com",
       messagingSenderId: "123456789012",
       appId: "1:123456789012:web:abcdef123456789"
   };
   ```
4. **Enregistrez le fichier.**

## Étape 2.5 — Activer Authentication (connexion par email)

1. Dans le menu de gauche de Firebase, cliquez sur **Authentication**.
2. Cliquez sur **Commencer** (ou **Get started**).
3. Vous voyez une liste de méthodes de connexion.
4. Cliquez sur **Email/Mot de passe**.
5. Activez le premier interrupteur : **Activer**.
6. Laissez **Link email (passwordless)** désactivé pour l'instant.
7. Cliquez sur **Enregistrer**.

## Étape 2.6 — Activer Cloud Firestore (base de données)

1. Dans le menu de gauche, cliquez sur **Firestore Database**.
2. Cliquez sur **Créer une base de données**.
3. Choisissez le mode :
   - **Mode test** : permet à tout le monde de lire/écrire pendant 30 jours (pratique pour tester).
   - **Mode production** : plus sécurisé, mais nécessite des règles avancées.
   - Pour commencer, choisissez **Mode test**.
4. Choisissez une région proche de vous :
   - Si vous êtes en RDC ou Afrique : choisissez `europe-west` ou `europe-west1`.
5. Cliquez sur **Activer**.
6. Attendez que la base de données soit prête (quelques secondes).

## Étape 2.7 — Configurer Supabase Storage (fichiers de cours)

> **Note :** Le stockage de fichiers se fait sur **Supabase**, pas sur Firebase Storage, car Firebase Storage demande souvent un plan payant.

1. Allez sur **https://supabase.com** et connectez-vous.
2. Créez un projet `allbavon-storage`.
3. Dans le menu de gauche, cliquez sur **Storage**.
4. Cliquez sur **New bucket**.
5. Nommez le bucket : `courses`.
6. Cochez **Public bucket**.
7. Cliquez sur **Save**.
8. Allez dans **Policies** du bucket `courses`.
9. Créez une politique avec **SELECT, INSERT, UPDATE, DELETE** pour **anon** et **authenticated**, avec la définition `true`.
10. Récupérez votre **Project URL** et votre **anon public key** dans **Project Settings > API**.
11. Collez-les dans le fichier `firebase-config.js`.

## Étape 2.8 — Vérifier les règles de sécurité

### Firestore Database
1. Allez dans **Firestore Database** > **Règles** (onglet en haut).
2. Vérifiez que les règles ressemblent à ceci (mode test) :
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```
   Cela signifie : seuls les utilisateurs connectés peuvent lire et écrire.
3. Cliquez sur **Publier**.

> ⚠️ Les règles Firestore sont simples pour commencer. Quand votre site sera en production avec beaucoup d'utilisateurs, il faudra les renforcer.

> **Note :** Les règles de **Storage** se trouvent dans **Supabase** (bucket `courses` > Policies), pas dans Firebase.

---

# PARTIE 3 : Tester Firebase sur votre site

## Étape 3.1 — Ouvrir le site localement

1. Ouvrez le fichier `index.html` dans votre navigateur (Chrome de préférence).
2. Appuyez sur **F12** pour ouvrir les outils de développement.
3. Cliquez sur l'onglet **Console**.
4. Vous ne devriez voir aucune erreur rouge liée à Firebase.

## Étape 3.2 — Créer un compte utilisateur

1. Sur la page d'accueil, entrez le code utilisateur : **26061960**.
2. Remplissez le formulaire de création de compte avec :
   - Nom : `Test User`
   - Email : `test@example.com`
   - Mot de passe : `123456` (minimum 6 caractères)
   - Faculté : `Médecine`
3. Cliquez sur **Créer mon compte**.
4. Vérifiez dans Firebase :
   - Allez dans **Authentication** > **Users**.
   - Vous devriez voir l'utilisateur `test@example.com`.

## Étape 3.3 — Tester le forum

1. Une fois connecté, allez dans la section **Forum**.
2. Cliquez sur **Nouveau sujet**.
3. Créez un sujet de test.
4. Vérifiez dans Firebase :
   - Allez dans **Firestore Database**.
   - Vous devriez voir une collection `topics` avec votre sujet.

## Étape 3.4 — Tester l'espace cours

1. Allez dans la section **Cours**.
2. Cliquez sur **Télécharger un cours**.
3. Remplissez le titre, la description, la matière.
4. Sélectionnez un petit fichier PDF ou Word.
5. Cliquez sur **Publier le cours**.
6. Vérifiez dans Firebase et Supabase :
   - **Firestore Database** : collection `courses`.
   - **Supabase Storage** : bucket `courses` avec votre fichier.

## Étape 3.5 — Tester l'interface admin

1. Déconnectez-vous.
2. Entrez le code admin : **ba167144**.
3. Vous devez arriver sur le tableau de bord admin.
4. Vérifiez que vous voyez :
   - 1 utilisateur inscrit
   - 1 sujet de forum
   - 1 cours partagé

---

# PARTIE 4 : Mettre le site en ligne

## Étape 4.1 — Netlify (recommandé)

1. Allez sur : **https://www.netlify.com**
2. Créez un compte gratuit (avec Google, GitHub ou email).
3. Sur votre tableau de bord Netlify, faites glisser-déposer le dossier contenant vos fichiers (`index.html`, `styles.css`, `script.js`, `firebase-config.js`, `assets/`).
4. Netlify va déployer votre site automatiquement.
5. Vous obtiendrez une URL comme :
   ```
   https://allbavon-123456.netlify.app
   ```
6. Cliquez sur l'URL pour tester votre site en ligne.

## Étape 4.2 — Vérifier la configuration en ligne

1. Ouvrez votre site en ligne.
2. Testez la création de compte.
3. Testez le forum et les cours.
4. Vérifiez que Firebase reçoit bien les données.

> ⚠️ Si vous voyez une erreur de Firebase en ligne, vérifiez que vous avez bien configuré `firebase-config.js` avant de téléverser sur Netlify.

---

# PARTIE 5 : Résolution des problèmes courants

## Problème : "Firebase non configuré"

**Solution :** Vérifiez que vous avez bien remplacé toutes les valeurs `VOTRE_..._ICI` dans `firebase-config.js` par vos vraies clés.

## Problème : Les emails ne partent pas

**Solution :** Vérifiez l'URL Formspree dans `firebase-config.js`. Assurez-vous qu'il n'y a pas d'espaces avant ou après l'URL.

## Problème : "Permission denied" dans la console

**Solution :** Vérifiez les règles de sécurité Firestore et Storage. Assurez-vous qu'elles permettent `read, write` aux utilisateurs authentifiés.

## Problème : Les fichiers de cours ne se téléchargent pas

**Solution :** Vérifiez que :
- Le bucket `courses` est bien créé dans Supabase.
- Le bucket est **Public**.
- La policy autorise **INSERT** pour **anon** et **authenticated**.
- Les clés Supabase dans `firebase-config.js` sont correctes.

---

# ✅ Récapitulatif des fichiers à modifier

1. `firebase-config.js`
   - Remplacer `VOTRE_API_KEY_ICI` par votre vraie clé Firebase
   - Remplacer `VOTRE_AUTH_DOMAIN_ICI` par votre authDomain
   - Remplacer `VOTRE_PROJECT_ID_ICI` par votre projectId
   - Remplacer `VOTRE_STORAGE_BUCKET_ICI` par votre storageBucket
   - Remplacer `VOTRE_MESSAGING_SENDER_ID_ICI` par votre messagingSenderId
   - Remplacer `VOTRE_APP_ID_ICI` par votre appId
   - Remplacer `https://formspree.io/f/VOTRE_FORM_ID_ICI` par votre vraie URL Formspree

2. `index.html` — ne pas modifier (déjà prêt)
3. `styles.css` — ne pas modifier
4. `script.js` — ne pas modifier

---

## 🎉 Félicitations !

Une fois ces étapes terminées, votre site AllBavon sera entièrement fonctionnel en ligne avec :
- Comptes utilisateurs Firebase
- Forum en ligne
- Partage de cours
- Envoi automatique d'emails avec Formspree
- Tableau de bord administrateur

Si vous bloquez à une étape, envoyez-moi le message d'erreur exact et je vous aiderai. 🚀
