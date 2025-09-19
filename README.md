# Site Web Carrosserie - PBDR

Site web professionnel pour une carrosserie spécialisée dans le débosselage sans peinture et le detailing automobile.

## 🚀 Fonctionnalités

- **Design moderne** avec navigation horizontale
- **Responsive** - Compatible mobile et desktop
- **Interface d'administration** pour gérer le contenu
- **Formulaire de contact** avec traitement des devis
- **Galerie avant/après** pour montrer les réalisations
- **Système de tarifs** dynamique
- **Avis clients** modulables

## 📁 Structure du projet

```
├── src/
│   ├── css/           # Styles CSS modulaires
│   │   ├── main.css   # Point d'entrée principal
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── navigation.css
│   │   ├── layout.css
│   │   ├── hero.css
│   │   ├── services.css
│   │   ├── gallery.css
│   │   ├── pricing.css
│   │   ├── contact.css
│   │   ├── footer.css
│   │   └── responsive.css
│   └── js/            # JavaScript modulaire
│       ├── main.js    # Point d'entrée principal
│       ├── navigation.js
│       ├── scroll.js
│       ├── form.js
│       └── utils.js
├── admin/             # Interface d'administration
│   ├── index.html
│   ├── admin.css
│   └── admin.js
├── api/               # Endpoints API
│   ├── content.js     # Gestion du contenu
│   └── contact.js     # Traitement des devis
├── public/            # Assets statiques
│   └── images/
├── index.html         # Page principale
├── package.json       # Configuration npm
├── vercel.json        # Configuration Vercel
└── README.md
```

## 🛠️ Installation et déploiement

### Prérequis

- Node.js 18+
- Compte Vercel

### Installation locale

```bash
# Cloner le projet
git clone <votre-repo>
cd carrosserie-website

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev
```

### Déploiement sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Ou connecter directement depuis GitHub
# Le déploiement se fera automatiquement à chaque push
```

## 🎨 Personnalisation

### Couleurs et thème

Modifiez les variables CSS dans `src/css/variables.css` :

```css
:root {
  --bg: #0f1115; /* Fond principal */
  --panel: #141826; /* Blocs */
  --brand: #4ea1ff; /* Couleur d'accent */
  --text: #e7ecf3; /* Texte principal */
  /* ... */
}
```

### Contenu

1. **Via l'interface admin** : Accédez à `/admin` pour modifier le contenu
2. **Via les fichiers** : Modifiez directement les données dans `api/content.js`

### Images

Placez vos images dans `public/images/` et mettez à jour les références dans le HTML.

## 📱 Interface d'administration

Accédez à `/admin` pour gérer :

- **Services** : Ajouter, modifier, supprimer les prestations
- **Tarifs** : Gérer les prix et forfaits
- **Galerie** : Uploader des images avant/après
- **Avis** : Modérer les témoignages clients
- **Paramètres** : Informations de contact, titre du site

### Fonctionnalités admin

- ✅ Interface intuitive
- ✅ Sauvegarde automatique (localStorage)
- ✅ Gestion CRUD complète
- ✅ Responsive design
- ✅ Notifications en temps réel

## 🔧 Configuration avancée

### Intégration email

Pour traiter les demandes de devis, configurez dans `api/contact.js` :

- SendGrid
- Nodemailer
- Google Apps Script
- Autre service SMTP

### Base de données

Pour une persistance des données, intégrez :

- Supabase
- Firebase
- MongoDB
- PostgreSQL

### Analytics

Ajoutez vos outils d'analyse :

- Google Analytics
- Plausible
- Fathom

## 📞 Support

Pour toute question ou personnalisation :

- Email : contact@votrecarrosserie.fr
- Documentation : Consultez les commentaires dans le code

## 📄 Licence

MIT License - Libre d'utilisation et de modification.

---

**Développé avec ❤️ pour PBDR**
