
# Planifeo

**Planifeo** est une application web full-stack innovante qui permet aux utilisateurs de suivre facilement leurs revenus et dépenses, de télécharger des reçus, de programmer des paiements récurrents avec des durées définies et de recevoir des alertes intelligentes lorsqu'ils dépassent leur budget mensuel. Avec Planifeo, la gestion financière devient simple, visuelle et proactive.

---

## Table des matières

1. [Fonctionnalités](#fonctionnalités)
2. [Technologies utilisées](#technologies-utilisées)
3. [Installation et exécution](#installation-et-exécution)

   * [Backend](#backend)
   * [Frontend](#frontend)
4. [Configuration](#configuration)
5. [Contribuer](#contribuer)
6. [Licence](#licence)

---

## Fonctionnalités

* Suivi des revenus et dépenses
* Upload et gestion des reçus
* Paiements récurrents programmables
* Alertes intelligentes pour dépassement de budget
* Dashboard interactif avec graphiques et statistiques

---

## Technologies utilisées

* **Frontend** : React, Vite, Tailwind CSS
* **Backend** : Node.js, Express, Prisma
* **Base de données** : PostgreSQL
* **Authentification** : JWT
* **Visualisation des données** : Recharts

---

## Installation et exécution

### Prérequis

* Node.js v20+
* PostgreSQL v15+
* npm ou yarn

---

### Backend

1. **Cloner le dépôt et se placer dans le backend** :

   ```bash
   git clone <url_du_repo>
   cd backend
   ```

2. **Créer un fichier `.env` à la racine du backend** et copier la configuration suivante :

   ```env
   # Configuration de la base de données PostgreSQL
   DATABASE_URL="postgresql://postgres:motdepasse@localhost:5432/nom_de_la_base"

   # Clé secrète pour JWT (à changer en production)
   JWT_SECRET="votre_clé_secrète_super_sécurisée_ici_changez_en_production"

   # Port du serveur Express
   PORT=8080
   ```

3. **Installer les dépendances** :

   ```bash
   npm install
   ```

4. **Configurer la base de données** :

   * Créer une base de données PostgreSQL
   * Mettre à jour la variable `DATABASE_URL` dans `.env`

5. **Exécuter les migrations Prisma** :

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Démarrer le serveur** :

   ```bash
   npm run dev
   ```

   Le backend sera accessible sur `http://localhost:8080`.

---

### Frontend

1. **Se placer dans le dossier frontend** :

   ```bash
   cd frontend
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   ```

3. **Démarrer l'application** :

   ```bash
   npm run dev
   ```

   Le frontend sera accessible sur `http://localhost:3001` (ou un port indiqué par Vite).

---

## Configuration supplémentaire

* Modifier le fichier `.env` pour adapter le backend à votre environnement.
* Pour le déploiement, assurez-vous de changer la clé `JWT_SECRET` et de sécuriser les informations de la base de données.

---

