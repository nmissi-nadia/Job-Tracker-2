# 🚀 Job Tracker Premium - SaaS Edition

Une plateforme moderne et élégante pour centraliser et suivre vos candidatures professionnelles avec style et efficacité.

![Project Preview](https://img.shields.io/badge/UI/UX-Premium-emerald)
![Tech Stack](https://img.shields.io/badge/Stack-Fullstack-slate)
![Docker](https://img.shields.io/badge/Deployment-Docker-blue)

## ✨ Fonctionnalités Clés

- **Tableau de Bord Analytics** : Visualisez votre progression avec des graphiques interactifs et des indicateurs de performance clés (KPI).
- **Gestion des Offres** : Enregistrez toutes les opportunités qui vous intéressent avec gestion des compétences requises.
- **Flux "Apply" Intégré** : Passez d'une offre à une candidature en un seul clic.
- **Tableau Kanban Professionnel** : Suivez vos candidatures à travers 4 étapes clés : *En attente*, *Entretien*, *Offre* et *Refusé*.
- **Design de Haute Précision** : Interface inspirée des meilleurs SaaS (Glassmorphism, animations fluides, palette Slate & Emerald).
- **Authentification Sécurisée** : Espace personnel protégé par JWT.

## 🛠️ Stack Technique

- **Frontend** : React.js, Material UI (MUI), Framer Motion, Chart.js.
- **Backend** : Node.js, Express.
- **Base de Données** : PostgreSQL avec Sequelize (ORM).
- **Infrastructure** : Docker & Docker Compose.

## 🚀 Installation Rapide

Assurez-vous d'avoir **Docker** et **Docker Compose** installés sur votre machine.

1. **Cloner le repository** :
   ```bash
   git clone https://github.com/votre-username/Job-Tracker-2.git
   cd Job-Tracker-2
   ```

2. **Lancer l'application** :
   ```bash
   docker-compose up --build -d
   ```

3. **Accéder à l'application** :
   - Frontend : `http://localhost:3000`
   - Backend API : `http://localhost:5000`

## 📦 Structure du Projet

```text
├── backend/            # API Node.js/Express
│   ├── models/         # Modèles Sequelize (Postgres)
│   ├── routes/         # Endpoints API
│   └── server.js       # Point d'entrée
├── frontend/           # Application React
│   ├── src/
│   │   ├── components/ # Composants UI & Layout
│   │   ├── pages/      # Pages de l'application
│   │   └── theme.js    # Design System Premium
└── docker-compose.yml  # Orchestration des services
```

---
*Développé avec ❤️ pour simplifier votre recherche d'emploi.*
