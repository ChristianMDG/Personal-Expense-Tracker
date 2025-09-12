

# 🚀 Issues – Personal Expense Tracker
---

## 🔐 Authentification
## 👤 **Gael – Authentification & Sécurité**
### **Issue: Page Signup**

* **Route Frontend**: `/signup`
* **Route API**: `POST /api/auth/signup`
* **But**: Permettre à un utilisateur de créer un compte avec email + mot de passe.
* **Étapes**:

  1. Créer une page React `Signup.jsx` avec formulaire (email, password).
  2. À la soumission → appel à `POST /api/auth/signup` via axios.
  3. Si succès → afficher un message ou rediriger vers `/login`.
  4. Si erreur (email déjà utilisé, champ vide) → afficher un message d’erreur.
* **Critères de validation**:

  * Le compte s’enregistre bien en base.
  * Les erreurs sont visibles pour l’utilisateur.

---

### **Issue: Page Login**

* **Route Frontend**: `/login`
* **Route API**: `POST /api/auth/login`
* **But**: Permettre à un utilisateur de se connecter et de recevoir un token JWT.
* **Étapes**:

  1. Créer une page `Login.jsx` avec formulaire (email, password).
  2. À la soumission → appel à `POST /api/auth/login`.
  3. Sauvegarder le `token` dans `localStorage` et dans un **AuthContext**.
  4. Rediriger l’utilisateur connecté vers `/dashboard`.
* **Critères de validation**:

  * Connexion réussie → accès au dashboard.
  * Mauvais identifiants → erreur affichée.

---

### **Issue: Auth Service**

* **API Routes**: `/api/auth/signup`, `/api/auth/login`, `/api/auth/me`
* **But**: Centraliser toutes les fonctions d’authentification dans `services/auth.service.js`.
* **Étapes**:

  1. Créer des fonctions `signup()`, `login()`, `getProfile()`.
  2. Utiliser axios avec un header `Authorization: Bearer token`.
  3. Stocker et lire le token via un **AuthContext**.
* **Critères de validation**:

  * AuthContext disponible dans toutes les pages.
  * Déconnexion possible (supprimer token du storage).

---

## 💸 Expenses
## 👤 **Nomena – Dépenses (Expenses) + Reçus**

### **Issue: Liste des dépenses**

* **Route Frontend**: `/expenses`
* **Route API**: `GET /api/expenses`
* **But**: Afficher toutes les dépenses sous forme de tableau filtrable.
* **Étapes**:

  1. Créer page `Expenses.jsx`.
  2. Appeler l’API pour récupérer les dépenses.
  3. Afficher dans un tableau (colonnes: montant, date, catégorie, type).
  4. Ajouter filtres (par date, type, catégorie).
* **Critères de validation**:

  * Tableau visible avec au moins 1 dépense.
  * Filtres fonctionnent correctement.

---

### **Issue: Nouvelle dépense**

* **Route Frontend**: `/expenses/new`
* **Route API**: `POST /api/expenses`
* **But**: Créer une dépense (avec ou sans reçu).
* **Étapes**:

  1. Créer page `ExpenseForm.jsx`.
  2. Formulaire : montant, date, catégorie, description, type (`one-time` ou `recurring`), startDate/endDate si récurrent, et upload fichier (receipt).
  3. Soumettre en `multipart/form-data`.
  4. Afficher message succès et rediriger vers `/expenses`.
* **Critères de validation**:

  * Dépense enregistrée en base.
  * Le fichier reçu est uploadé si fourni.

---

### **Issue: Éditer dépense**

* **Route Frontend**: `/expenses/:id/edit`
* **Route API**: `PUT /api/expenses/:id`
* **But**: Modifier une dépense existante.
* **Étapes**:

  1. Pré-remplir le formulaire avec données actuelles.
  2. Permettre modification (montant, catégorie, fichier).
  3. Sauvegarder en base.
* **Critères de validation**:

  * Modifications visibles dans la liste.

---

### **Issue: Supprimer dépense**

* **Route API**: `DELETE /api/expenses/:id`
* **But**: Supprimer une dépense.
* **Étapes**:

  1. Ajouter bouton "Supprimer" dans la liste des dépenses.
  2. Confirmation avant suppression.
  3. Envoyer requête DELETE et mettre à jour la liste.
* **Critères de validation**:

  * La dépense disparaît bien de la liste.

---

## 💰 Incomes
## 👤 **Christian**

– Revenus (Incomes) + Catégories**
### **Issue: Liste des revenus**

* **Route Frontend**: `/incomes`
* **Route API**: `GET /api/incomes`
* **But**: Voir tous les revenus.
* **Étapes**:

  1. Créer page `Incomes.jsx`.
  2. Tableau affichant montant, source, date.
* **Critères de validation**:

  * Tous les revenus s’affichent.

---

### **Issue: Nouveau revenu**

* **Route Frontend**: `/incomes/new`
* **Route API**: `POST /api/incomes`
* **But**: Ajouter un revenu.
* **Étapes**:

  1. Formulaire montant, date, source, description.
  2. Envoi vers l’API.
* **Critères de validation**:

  * Revenu ajouté et visible dans `/incomes`.

---

### **Issue: Éditer revenu**

* **Route API**: `PUT /api/incomes/:id`
* **But**: Modifier un revenu.
* **Étapes**:

  1. Charger les données dans formulaire.
  2. Modifier et envoyer.
* **Critères de validation**:

  * Données mises à jour en base.

---

### **Issue: Supprimer revenu**

* **Route API**: `DELETE /api/incomes/:id`
* **But**: Supprimer un revenu.
* **Étapes**:

  1. Bouton "Supprimer" dans liste revenus.
  2. Confirmation → suppression.
* **Critères de validation**:

  * Revenu supprimé de la liste.

---

## 🗂 Categories
## 👤 **Ny miora**
### **Issue: Liste des catégories**

* **Route Frontend**: `/categories`
* **Route API**: `GET /api/categories`
* **But**: Gérer les catégories de dépenses/revenus.
* **Étapes**:

  1. Créer page `Categories.jsx`.
  2. Tableau avec toutes les catégories.
  3. Boutons Ajouter / Modifier / Supprimer.
* **Critères de validation**:

  * Catégories visibles et modifiables.

---

### **Issue: Nouvelle catégorie**

* **Route API**: `POST /api/categories`
* **But**: Ajouter une catégorie personnalisée.
* **Étapes**:

  1. Formulaire avec champ "Nom".
  2. Envoi vers API.
* **Critères de validation**:

  * Catégorie ajoutée et visible dans la liste.

---

### **Issue: Renommer catégorie**

* **Route API**: `PUT /api/categories/:id`
* **But**: Modifier une catégorie.
* **Étapes**:

  1. Bouton "Modifier" dans la liste.
  2. Changer nom et sauvegarder.
* **Critères de validation**:

  * Nouveau nom affiché.

---

### **Issue: Supprimer catégorie**

* **Route API**: `DELETE /api/categories/:id`
* **But**: Supprimer une catégorie si non utilisée.
* **Étapes**:

  1. Bouton "Supprimer".
  2. Vérifier qu’elle n’est pas liée à une dépense.
* **Critères de validation**:

  * Catégorie supprimée si possible.

---

## 📊 Dashboard
## 👤 **Christian – Dashboard & Profil**
### **Issue: Page Dashboard**

* **Route Frontend**: `/dashboard`
* **API Routes**: `/api/summary/monthly`, `/api/summary/alerts`
* **But**: Vue globale du mois courant.
* **Étapes**:

  1. Afficher 3 cartes : Total Incomes, Total Expenses, Balance.
  2. Pie chart par catégories.
  3. Bar chart dépenses par mois.
  4. Liste dernières dépenses/revenus.
  5. Message alerte si dépenses > revenus.
* **Critères de validation**:

  * Données s’actualisent selon le mois sélectionné.

---

## 👤 Profile
## 👤 **Valeria – Profile**
### **Issue: Page Profile**

* **Route Frontend**: `/profile`
* **Route API**: `GET /api/user/profile`
* **But**: Afficher infos utilisateur.
* **Étapes**:

  1. Créer page avec email, date création.
  2. Ajouter bouton "Changer mot de passe".
* **Critères de validation**:

  * Infos correctes affichées.

---


## 📁 Receipts 
## 👤 **Nomena**
### **Issue: Upload reçus**

* **Route API**: `POST /api/expenses` (multipart/form-data)
* **But**: Joindre un reçu à une dépense.
* **Étapes**:

  1. Dans le formulaire de dépense, ajouter input "fichier".
  2. Envoyer le fichier avec axios (`FormData`).
  3. Vérifier format et taille max 5MB.
* **Critères de validation**:

  * Reçu stocké et lié à la dépense.

---

### **Issue: Voir/Télécharger reçu**

* **Route Frontend**: `/receipts/:idExpense`
* **Route API**: `GET /api/receipts/:idExpense`
* **But**: Permettre à l’utilisateur de consulter ses reçus.
* **Étapes**:

  1. Créer bouton "Voir reçu" dans la liste des dépenses.
  2. Rediriger vers une page où le reçu est affiché/téléchargeable.
* **Critères de validation**:

  * L’utilisateur peut voir ou télécharger son reçu.

---

