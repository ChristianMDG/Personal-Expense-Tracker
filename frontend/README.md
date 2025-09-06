# React + Vite

npm install axios react-router-dom recharts




## Instructions d'installation et d'exécution

### Backend

# Configuration de la base de données PostgreSQL
DATABASE_URL="postgresql://postgres:092MLBOA*@localhost:5432/expense_tracker"

# Clé secrète pour JWT (à changer en production)
JWT_SECRET="votre_clé_secrète_super_sécurisée_ici_changez_en_production"

# Port du serveur Express
PORT=8080


1. **Installer les dépendances** :
   ```bash
   cd backend
   npm install
   ```

2. **Configurer la base de données** :
   - Créer une base de données PostgreSQL
   - Mettre à jour le fichier `.env` avec les informations de connexion

3. **Exécuter les migrations Prisma** :
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Démarrer le serveur** :
   ```bash
   npm run dev
   ```

### Frontend

1. **Installer les dépendances** :
   ```bash
   cd frontend
   npm install
   ```

2. **Démarrer l'application** :
   ```bash
   npm run dev
   ```
