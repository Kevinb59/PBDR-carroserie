# Guide de déploiement - Site Carrosserie

## 🚀 Déploiement sur Vercel

### Méthode 1 : Via GitHub (Recommandée)

1. **Créer un repository GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-username/carrosserie-website.git
   git push -u origin main
   ```

2. **Connecter à Vercel**

   - Aller sur [vercel.com](https://vercel.com)
   - Se connecter avec GitHub
   - Cliquer sur "New Project"
   - Sélectionner votre repository
   - Vercel détectera automatiquement la configuration

3. **Configuration automatique**
   - Vercel utilisera le fichier `vercel.json` pour la configuration
   - Le site sera accessible à l'URL fournie par Vercel

### Méthode 2 : Via Vercel CLI

1. **Installer Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Déployer**

   ```bash
   vercel
   ```

3. **Suivre les instructions**
   - Choisir le projet
   - Confirmer les paramètres
   - Le déploiement se lance automatiquement

## 🔧 Configuration post-déploiement

### Variables d'environnement (optionnel)

Si vous utilisez des services externes, ajoutez ces variables dans Vercel :

```bash
# Pour l'envoi d'emails
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=noreply@votrecarrosserie.fr
EMAIL_TO=contact@votrecarrosserie.fr

# Pour une base de données
DATABASE_URL=your_database_url
```

### Domaine personnalisé

1. **Dans Vercel Dashboard**

   - Aller dans Settings > Domains
   - Ajouter votre domaine (ex: votrecarrosserie.fr)

2. **Configuration DNS**
   - Ajouter un enregistrement CNAME pointant vers `cname.vercel-dns.com`
   - Ou utiliser les serveurs de noms Vercel

## 📱 Configuration de l'admin

### Accès sécurisé (optionnel)

Pour sécuriser l'interface admin, ajoutez une authentification :

1. **Créer un fichier `api/auth.js`**

   ```javascript
   export default function handler(req, res) {
     // Logique d'authentification
   }
   ```

2. **Modifier `admin/admin.js`**
   ```javascript
   // Ajouter une vérification de session
   if (!isAuthenticated()) {
     window.location.href = '/login'
   }
   ```

### Sauvegarde des données

Par défaut, les données sont sauvegardées dans le localStorage du navigateur. Pour une persistance serveur :

1. **Intégrer une base de données**

   - Supabase (gratuit)
   - Firebase
   - MongoDB Atlas

2. **Modifier les API endpoints**
   - Remplacer localStorage par des appels API
   - Ajouter la logique CRUD serveur

## 🔄 Mises à jour

### Déploiement automatique

Avec GitHub + Vercel, chaque push sur la branche `main` déclenche un nouveau déploiement.

### Déploiement manuel

```bash
# Mettre à jour le code
git add .
git commit -m "Update content"
git push origin main

# Ou forcer un redéploiement
vercel --prod
```

## 📊 Monitoring

### Analytics

Ajoutez Google Analytics dans `index.html` :

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', 'GA_MEASUREMENT_ID')
</script>
```

### Monitoring des erreurs

Intégrez Sentry pour le monitoring :

```bash
npm install @sentry/nextjs
```

## 🛡️ Sécurité

### Headers de sécurité

Le fichier `vercel.json` inclut déjà des headers de sécurité de base.

### Protection contre le spam

Pour le formulaire de contact, ajoutez :

1. **reCAPTCHA**

   ```html
   <script src="https://www.google.com/recaptcha/api.js"></script>
   <div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
   ```

2. **Rate limiting**
   ```javascript
   // Dans api/contact.js
   const rateLimit = require('express-rate-limit')
   ```

## 📞 Support

En cas de problème :

1. **Vérifier les logs Vercel**

   - Dashboard Vercel > Functions > Logs

2. **Tester localement**

   ```bash
   npm run dev
   ```

3. **Vérifier la configuration**
   - `vercel.json` est correct
   - Les chemins des fichiers sont bons
   - Les variables d'environnement sont définies

---

**Le site est maintenant prêt pour la production ! 🎉**
