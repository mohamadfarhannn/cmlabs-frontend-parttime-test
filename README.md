# CMLabs Frontend Part-Time Test

> A recipe exploration app built with **Nuxt 4**, **Vue 3**, **TypeScript**, and **TailwindCSS** — powered by [TheMealDB API](https://www.themealdb.com/).

## 🚀 Live Demo

[View Live Demo](https://cmlabs-parttimetest-farhan.netlify.app/) 

## ✨ Features

- **Browse by Category** — Ingredients are grouped by type (Dressing, Seasoning, Vinegar, etc.)
- **Ingredient Explorer** — View all ingredients within a category with images and descriptions
- **Meal Discovery** — See meals you can make with a specific ingredient
- **Meal Detail** — Full recipe with instructions, YouTube tutorial embed, and ingredient list
- **Search** — Real-time search on every page (categories, ingredients, meals)
- **Responsive** — Fully responsive across desktop, tablet (iPad), and mobile
- **Atomic Design** — Component architecture following Atoms → Molecules → Organisms pattern

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Nuxt 4](https://nuxt.com/) | Framework (SSR + file-based routing) |
| [Vue 3](https://vuejs.org/) | UI library (Composition API) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [TailwindCSS](https://tailwindcss.com/) | Utility-first CSS |
| [TanStack Query](https://tanstack.com/query) | Data fetching & caching |
| [VueUse](https://vueuse.org/) | Composable utilities |
| [Nuxt Icon](https://nuxt.com/modules/icon) | Icon system (Lucide) |

## 📁 Project Structure

```
app/
├── assets/css/          # Global styles & design system
├── components/
│   ├── atoms/           # Base components (Button, Card, Badge, etc.)
│   ├── molecules/       # Composed components (SearchBar, PageHeader, etc.)
│   └── organism/        # Complex sections (Navbar, Grids, etc.)
├── composables/         # Shared state & logic (useIngredients)
├── layouts/             # App layout (Navbar + Footer)
├── pages/               # File-based routing
│   ├── index.vue        # Home — Category listing
│   ├── type/[type].vue  # Ingredients by category
│   ├── ingredient/[name].vue  # Meals by ingredient
│   └── meal/[id].vue    # Meal detail + recipe
├── plugins/             # Vue Query setup
├── types/               # TypeScript interfaces
└── utils/               # API service functions
```

## 📡 API Endpoints Used

| Endpoint | URL | Usage |
|---|---|---|
| List Ingredients | `themealdb.com/api/json/v1/1/list.php?i=list` | Home + Category pages |
| Filter by Ingredient | `themealdb.com/api/json/v1/1/filter.php?i={name}` | Meals by ingredient |
| Meal Detail | `themealdb.com/api/json/v1/1/lookup.php?i={id}` | Meal detail page |

## 🏃 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/mohamadfarhannn/cmlabs-frontend-parttime-test.git
cd cmlabs-frontend-parttime-test

# Use the correct Node version (if using nvm)
nvm use

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```

### Development

```bash
# Start the dev server (http://localhost:3000)
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## 📄 Pages Overview

### 1. Home — Category Listing (`/`)
Browse ingredient categories (Dressing, Seasoning, Root Vegetable, etc.) with a hero section and search.

### 2. Ingredients by Type (`/type/{type}`)
View all ingredients within a selected category. Each ingredient card shows an image and description.

### 3. Meals by Ingredient (`/ingredient/{name}`)
Discover meals you can make with a selected ingredient. Each meal card shows the meal image.

### 4. Meal Detail (`/meal/{id}`)
Full recipe page including:
- Hero meal image
- Category, area, and tag badges
- Step-by-step cooking instructions
- Ingredient & measure list with thumbnails
- Embedded YouTube tutorial video

---

Made with ❤️ for CMLabs Assessment
