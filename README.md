

# 📌 Planifeo – Personal Expense Tracker

**Planifeo** est une application web full-stack innovante qui permet aux utilisateurs de :

* Suivre facilement leurs **revenus et dépenses**,
* Télécharger et gérer leurs **reçus**,
* Programmer des **paiements récurrents**,
* Recevoir des **alertes intelligentes** en cas de dépassement de budget,
* Visualiser leurs finances via un **dashboard interactif**.

Avec Planifeo, la gestion financière devient **simple, visuelle et proactive**.

---

## 📑 Table des matières

1. [Fonctionnalités](#fonctionnalités)
2. [Technologies utilisées](#technologies-utilisées)
3. [Installation et exécution](#installation-et-exécution)

   * [Backend](#backend)
   * [Frontend](#frontend)
4. [Configuration supplémentaire](#configuration-supplémentaire)
5. [Contributeurs et tâches](#contributeurs-et-tâches)

---

## 🚀 Fonctionnalités

* ✅ Suivi des **revenus** et **dépenses**
* 📎 Upload et gestion des **reçus**
* 🔄 Paiements **récurrents programmables**
* 🚨 Alertes de **dépassement de budget**
* 📊 Dashboard avec **graphiques et statistiques**

---

## 🛠️ Technologies utilisées

* **Frontend** : React, Vite, Tailwind CSS
* **Backend** : Node.js, Express, Prisma
* **Base de données** : PostgreSQL
* **Authentification** : JWT
* **Visualisation des données** : Recharts

---

## ⚙️ Installation et exécution

### 📌 Prérequis

* Node.js **v20+**
* PostgreSQL **v15+**
* npm ou yarn

---

### 🔧 Backend

1. **Cloner le dépôt et accéder au dossier backend** :

   ```bash
   git clone https://github.com/ChristianMDG/Personal-Expense-Tracker.git
   cd backend
   ```

2. **Créer un fichier `.env` à la racine du backend** :

   ```env
   # Configuration de la base de données PostgreSQL
   DATABASE_URL="postgresql://postgres:motdepasse@localhost:5432/nom_de_la_base"

   # Clé secrète JWT (à modifier en production)
   JWT_SECRET="votre_clé_ultra_sécurisée"

   # Port du serveur
   PORT=8080
   ```

3. **Installer les dépendances** :

   ```bash
   npm install
   ```

4. **Configurer la base de données** :

   * Créer une base PostgreSQL
   * Mettre à jour `DATABASE_URL` dans `.env`

5. **Exécuter les migrations Prisma** :

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Démarrer le serveur** :

   ```bash
   npm run dev
   ```

   ➝ Backend dispo sur [http://localhost:8080](http://localhost:8080)

---

### 🎨 Frontend

1. **Accéder au dossier frontend** :

   ```bash
   cd frontend
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   ```

3. **Lancer l’application** :

   ```bash
   npm run dev
   ```

   ➝ Frontend dispo sur [http://localhost:3001](http://localhost:3001)

---

## ⚡ Configuration supplémentaire

* Modifier `.env` selon votre environnement
* En production :

  * Générer une nouvelle clé sécurisée `JWT_SECRET`
  * Sécuriser la base PostgreSQL (mot de passe fort, SSL si hébergé)

---

## 👥 Contributeurs et tâches

### 🔐 Authentification – **Gael**

* [ ] Signup (`/signup`, `POST /api/auth/signup`)
* [ ] Login (`/login`, `POST /api/auth/login`)
* [ ] Auth Service (`/api/auth/*`)

---

### 💸 Dépenses (Expenses) – **Nomena**

* [ ] Liste des dépenses (`/expenses`, `GET /api/expenses`)
* [ ] Nouvelle dépense (`/expenses/new`, `POST /api/expenses`)
* [ ] Éditer dépense (`PUT /api/expenses/:id`)
* [ ] Supprimer dépense (`DELETE /api/expenses/:id`)

---

### 💰 Revenus (Incomes) – **Christian**

* [ ] Liste des revenus (`/incomes`, `GET /api/incomes`)
* [ ] Nouveau revenu (`/incomes/new`, `POST /api/incomes`)
* [ ] Éditer revenu (`PUT /api/incomes/:id`)
* [ ] Supprimer revenu (`DELETE /api/incomes/:id`)

---

### 🗂 Catégories – **Ny Miora**

* [ ] Liste (`/categories`, `GET /api/categories`)
* [ ] Nouvelle catégorie (`POST /api/categories`)
* [ ] Modifier (`PUT /api/categories/:id`)
* [ ] Supprimer (`DELETE /api/categories/:id`)

---

### 📊 Dashboard – **Christian**

* [ ] Vue globale (`/dashboard`, `/api/summary/*`)
* [ ] Cartes : Total Incomes / Total Expenses / Balance
* [ ] Graphiques (Pie & Bar charts)
* [ ] Dernières transactions + alertes

---

### 👤 Profil – **Valeria**

* [ ] Page Profile (`/profile`, `GET /api/user/profile`)
* [ ] Changer mot de passe

---

### 📁 Reçus – **A venir...**

* [ ] Upload reçu (`POST /api/expenses`)
* [ ] Voir / Télécharger (`/receipts/:idExpense`, `GET /api/receipts/:idExpense`)

---

