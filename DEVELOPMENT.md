# Guide de développement - Site Carrosserie

## 🛠️ Structure du code

### Architecture modulaire

Le projet suit une architecture modulaire claire :

```
src/
├── css/           # Styles organisés par composant
├── js/            # JavaScript modulaire avec ES6 modules
└── components/    # Composants réutilisables (futur)
```

### CSS modulaire

Chaque fichier CSS a une responsabilité spécifique :

- `variables.css` : Variables CSS personnalisées
- `reset.css` : Reset et styles de base
- `navigation.css` : Barre de navigation
- `layout.css` : Structure générale
- `hero.css` : Section d'accueil
- `services.css` : Grille des services
- `gallery.css` : Galerie avant/après
- `pricing.css` : Section tarifs
- `contact.css` : Formulaire et contact
- `footer.css` : Pied de page
- `responsive.css` : Media queries

### JavaScript modulaire

Utilisation des modules ES6 :

- `main.js` : Point d'entrée et orchestration
- `navigation.js` : Gestion de la navigation
- `scroll.js` : Défilement horizontal
- `form.js` : Gestion du formulaire
- `utils.js` : Fonctions utilitaires

## 🎨 Personnalisation

### Modifier les couleurs

Éditez `src/css/variables.css` :

```css
:root {
  --brand: #4ea1ff; /* Couleur principale */
  --bg: #0f1115; /* Fond */
  --text: #e7ecf3; /* Texte */
  /* ... */
}
```

### Ajouter une nouvelle section

1. **Créer le CSS** dans un nouveau fichier `src/css/ma-section.css`
2. **L'importer** dans `src/css/main.css`
3. **Ajouter le HTML** dans `index.html`
4. **Créer le JavaScript** si nécessaire

### Modifier le contenu

#### Via l'interface admin

- Accéder à `/admin`
- Modifier directement dans l'interface
- Les changements sont sauvegardés en localStorage

#### Via les fichiers

- Modifier `api/content.js` pour les données par défaut
- Modifier directement le HTML dans `index.html`

## 🔧 Développement local

### Prérequis

```bash
# Node.js 18+
node --version

# Vercel CLI (optionnel)
npm i -g vercel
```

### Commandes utiles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Déploiement
vercel

# Vérifier la syntaxe
npm run lint  # Si configuré
```

### Structure des URLs

- `/` : Page principale
- `/admin` : Interface d'administration
- `/api/content` : API du contenu
- `/api/contact` : API du formulaire

## 📱 Interface d'administration

### Fonctionnalités

L'interface admin permet de gérer :

1. **Services** : CRUD complet
2. **Tarifs** : Gestion des prix
3. **Galerie** : Images avant/après
4. **Avis** : Témoignages clients
5. **Paramètres** : Infos de contact

### Architecture admin

```
admin/
├── index.html    # Interface utilisateur
├── admin.css     # Styles spécifiques
└── admin.js      # Logique JavaScript
```

### Persistance des données

Par défaut, les données sont sauvegardées dans `localStorage`. Pour une persistance serveur :

1. **Modifier `admin.js`** pour utiliser des appels API
2. **Créer des endpoints** dans `/api/` pour CRUD
3. **Intégrer une base de données** (Supabase, Firebase, etc.)

## 🚀 Optimisations

### Performance

- **Images** : Utilisez des formats modernes (WebP, AVIF)
- **CSS** : Minification en production
- **JS** : Bundling et minification
- **Fonts** : Preload des polices critiques

### SEO

- **Meta tags** : Optimisés dans `index.html`
- **Structure sémantique** : HTML5 approprié
- **Images** : Alt text descriptif
- **Performance** : Core Web Vitals

### Accessibilité

- **Navigation** : Raccourcis clavier
- **Contraste** : Respect des standards WCAG
- **Screen readers** : ARIA labels appropriés
- **Focus** : Gestion du focus visible

## 🧪 Tests

### Tests manuels

1. **Navigation** : Tous les liens fonctionnent
2. **Formulaire** : Validation et envoi
3. **Responsive** : Test sur différentes tailles
4. **Admin** : CRUD complet
5. **Performance** : Temps de chargement

### Tests automatisés (futur)

```bash
# Tests unitaires
npm test

# Tests E2E
npm run test:e2e

# Tests de performance
npm run test:perf
```

## 🔍 Debugging

### Outils de développement

1. **Console navigateur** : Erreurs JavaScript
2. **Network tab** : Requêtes API
3. **Lighthouse** : Performance et SEO
4. **Vercel logs** : Erreurs serveur

### Problèmes courants

1. **CSS non chargé** : Vérifier les chemins
2. **JS non fonctionnel** : Vérifier les modules ES6
3. **API non accessible** : Vérifier CORS
4. **Admin non sauvegardé** : Vérifier localStorage

## 📚 Ressources

### Documentation

- [Vercel Docs](https://vercel.com/docs)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

### Outils recommandés

- **VS Code** : Éditeur avec extensions
- **Chrome DevTools** : Debugging
- **Figma** : Design et prototypes
- **Lighthouse** : Audit de performance

---

**Bon développement ! 🚀**
