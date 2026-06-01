# 🎨 Oumayma's Art Gallery

Une galerie d'art personnelle moderne et élégante, créée en React avec un design girly et artistique. Parfait pour intégrer dans un portfolio de développeuse.

## 🌸 Caractéristiques

- ✨ **Design girly & artistique** - Palette de rose, or et blanc cassé
- 🎨 **Responsive** - Mobile, tablette et desktop optimisés
- 🖼️ **Galerie interactive** - Filtres, recherche, lightbox
- 🎬 **Animations fluides** - Framer Motion pour des transitions élégantes
- 🔍 **SEO optimisé** - React Helmet pour les métadonnées
- 🌐 **Navigation fluide** - React Router avec transitions smooth
- 💾 **Données structurées** - Format JSON facile à customiser

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS 3** - Styling utilitaire
- **Framer Motion** - Animations
- **React Router v6** - Navigation
- **react-icons** - Icônes
- **react-helmet-async** - SEO/Meta tags

## 📋 Installation

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Setup

```bash
# 1. Cloner le projet
cd my-paintings

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur de développement
npm run dev

# 4. Ouvrir dans le navigateur
# http://localhost:5173
```

## 📖 Structure du Projet

```
my-paintings/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navbar avec menu mobile
│   │   ├── Hero.jsx            # Section héro avec titre
│   │   ├── Gallery.jsx         # Grille de peintures avec filtres
│   │   ├── PaintingCard.jsx    # Carte individuelle de peinture
│   │   ├── FilterBar.jsx       # Filtres par technique
│   │   ├── Lightbox.jsx        # Modal pour voir en plein écran
│   │   └── Footer.jsx          # Pied de page avec réseaux
│   ├── pages/
│   │   ├── Home.jsx            # Page d'accueil
│   │   ├── About.jsx           # Page à propos
│   │   └── PaintingDetail.jsx  # Page détail peinture
│   ├── data/
│   │   └── paintings.js        # Base de données des peintures
│   ├── App.jsx                 # Composant racine
│   ├── App.css                 # Styles globaux
│   ├── index.css               # Tailwind + custom CSS
│   └── main.jsx                # Point d'entrée
├── index.html                  # HTML template
├── package.json                # Dépendances
├── vite.config.js              # Config Vite
├── tailwind.config.js          # Config Tailwind
├── postcss.config.js           # Config PostCSS
└── .eslintrc.cjs               # Config ESLint
```

## 🎨 Personnalisation

### Ajouter des peintures

Édite `src/data/paintings.js` et ajoute des objets à l'array :

```javascript
{
  id: 7,
  title: "Titre du tableau",
  description: "Description courte",
  image: "URL de l'image",
  dimensions: "80 x 100 cm",
  technique: "huile",  // huile, acrylique, aquarelle, mixed media
  year: 2024,
  price: 1000,
  disponible: true,
  mood: "joyful",  // joyful, calm, dramatic
  featured: false
}
```

### Changer les couleurs

Modifie `tailwind.config.js` pour la palette rose/or :

```javascript
colors: {
  'rose-pale': '#FFF0F5',
  'rose-dark': '#DB7093',
  'gold': '#D4AF37',
  // ...
}
```

### Modifier les polices

La galerie utilise Google Fonts - édite `index.html` pour changer :
- Titres : `Playfair Display`
- Corps : `Poppins`

## 🚀 Déploiement sur Vercel

### Option 1 : Via Git (Recommandé)

1. **Push ton code sur GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ton-username/my-paintings.git
git push -u origin main
```

2. **Connecte à Vercel**
- Visite [vercel.com](https://vercel.com)
- Clique "New Project"
- Importe ton repo GitHub
- Vercel détecte Vite automatiquement
- Clique "Deploy"

### Option 2 : Vercel CLI

```bash
# Installe Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Options de Configuration Vercel

Crée un `vercel.json` à la racine :

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

## 📦 Build for Production

```bash
# Build optimisé
npm run build

# Préview production
npm run preview
```

La build se trouve dans `dist/` - prête pour deployment.

## 🌐 Intégration au Portfolio

Ajoute un lien vers cette galerie depuis ton portfolio principal :

```html
<a href="https://my-paintings-gallery.vercel.app">
  Voir ma galerie d'art
</a>
```

Ou intègre via un `<iframe>` :

```html
<iframe 
  src="https://my-paintings-gallery.vercel.app" 
  style="width:100%;height:600px;border:none;border-radius:1rem;"
></iframe>
```

## 🎬 Animations

Toutes les animations utilisent Framer Motion :
- Fade-in au scroll
- Stagger sur les cartes (une par une)
- Hover effects lisses
- Transitions de pages

Édite les `variants` dans chaque composant pour personnaliser.

## 📱 Responsive

- **Mobile** : 1 colonne de peintures
- **Tablette** : 2 colonnes
- **Desktop** : 3 colonnes

Breakpoints Tailwind :
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

## ⚡ Performance

- Lazy loading des images (À optimiser avec Intersection Observer)
- Code splitting automatique avec Vite
- CSS/JS minifiés
- Lighthouse score élevé

## 🔧 Troubleshooting

**Images ne s'affichent pas**
- Vérife les URLs dans `paintings.js`
- Les images Unsplash nécessitent Internet

**Styles Tailwind absents**
- Assure-toi que `npm install` a été exécuté
- Redémarre le serveur dev

**Animations saccadées**
- Réduis la complexité des animations
- Vérifie les performances (DevTools Performance tab)

## 📄 Licence

Libre d'utilisation pour ton portfolio personnel.

## 🤝 Support

Pour toute question ou bug, édite les fichiers directement ou contacte au besoin.

---

**Fabriqué avec 💗 et 🎨 par Oumayma**

**Portfolio Code**: [oumayma.dev](https://oumayma.dev)
