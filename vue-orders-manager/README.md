# Orders Frontend

Interface Vue 3 pour une application de gestion de commandes.

Le projet contient une interface de gestion de commandes : liste des commandes, creation, modification locale, suppression locale, edition des items et calcul des totaux. La liste et la creation utilisent l'API configuree par `VITE_API_URL`.

## Stack

- Vue 3
- Vite
- Pinia
- Bootstrap 5
- Axios

## Fonctionnalites

- Affichage des commandes avec nombre d'items et total.
- Statistiques globales des commandes.
- Creation et modification d'une commande.
- Ajout, edition et retrait des items d'une commande.
- Validation minimale du formulaire.

## Configuration

Copier `.env.example` vers `.env` si besoin, puis adapter l'URL de l'API :

```bash
VITE_API_URL=http://127.0.0.1:4000/api
```

## Prerequis

- Node.js 20 ou une version compatible avec Vite.
- npm.

## Installation locale

```bash
npm install
```

## Lancement en developpement

```bash
npm run dev
```

Le serveur Vite ecoute sur `0.0.0.0`, ce qui permet aussi d'y acceder depuis un conteneur ou depuis le reseau local selon l'environnement.

## Build de production

```bash
npm run build
```

## Preview du build

```bash
npm run preview
```

## Structure du projet

```text
.
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── components
│   │   ├── AppNavbar.vue
│   │   ├── OrderFormView.vue
│   │   ├── OrderItemsEditor.vue
│   │   ├── OrderListView.vue
│   │   ├── OrderStats.vue
│   │   └── OrdersTable.vue
│   ├── stores
│   │   └── orders.js
│   ├── style.css
│   └── utils
│       └── currency.js
└── vite.config.js
```
