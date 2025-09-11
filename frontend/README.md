# React + Vite


## Instructions d'installation et d'exécution

### Backend
1. **Creer un fichier .env et copier** :

# Configuration de la base de données PostgreSQL
DATABASE_URL="postgresql://postgres:mdp*@localhost:5432/db_name"

# Clé secrète pour JWT (à changer en production)
JWT_SECRET="votre_clé_secrète_super_sécurisée_ici_changez_en_production"

# Port du serveur Express
PORT=8080


2. **Installer les dépendances** :
   ```bash
   cd backend
   npm install
   ```

3. **Configurer la base de données** :
   - Créer une base de données PostgreSQL
   - Mettre à jour le fichier `.env` avec les informations de connexion

4. **Exécuter les migrations Prisma** :
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Démarrer le serveur** :
   ```bash
   npm run dev
   ```

### Frontend

1. **Installer les dépendances** :
   ```bash
   cd frontend
   npm install
   ```
