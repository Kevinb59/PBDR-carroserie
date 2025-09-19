// Admin JavaScript
class AdminPanel {
  constructor() {
    this.currentSection = 'dashboard'
    this.data = {
      services: [],
      pricing: [],
      gallery: [],
      reviews: [],
      settings: {}
    }

    this.init()
  }

  init() {
    this.setupNavigation()
    this.loadData()
    this.setupEventListeners()
  }

  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item')
    const sections = document.querySelectorAll('.content-section')
    const pageTitle = document.getElementById('page-title')

    navItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()

        const section = item.dataset.section
        this.switchSection(section)

        // Update active states
        navItems.forEach((nav) => nav.classList.remove('active'))
        item.classList.add('active')

        // Update page title
        const titles = {
          dashboard: 'Tableau de bord',
          services: 'Gestion des services',
          pricing: 'Gestion des tarifs',
          gallery: 'Gestion de la galerie',
          reviews: 'Gestion des avis',
          settings: 'Paramètres du site'
        }
        pageTitle.textContent = titles[section]
      })
    })
  }

  switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach((section) => {
      section.classList.remove('active')
    })

    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`)
    if (targetSection) {
      targetSection.classList.add('active')
    }

    this.currentSection = sectionName

    // Load section-specific data
    this.loadSectionData(sectionName)
  }

  loadData() {
    // Load data from localStorage or API
    const savedData = localStorage.getItem('carrosserie-admin-data')
    if (savedData) {
      this.data = { ...this.data, ...JSON.parse(savedData) }
    }

    // Load default data if empty
    if (this.data.services.length === 0) {
      this.loadDefaultData()
    }
  }

  loadDefaultData() {
    this.data = {
      services: [
        {
          id: 1,
          title: 'Débosselage sans peinture (DSP)',
          description:
            "Suppression des bosses sans repeindre, respect de la teinte d'origine.",
          tag: 'Grêle, coups de portières'
        },
        {
          id: 2,
          title: 'Nettoyage intérieur/extérieur',
          description:
            'Shampoing, extraction, désinfection, protection plastiques & cuirs.',
          tag: 'Formules Express à Premium'
        },
        {
          id: 3,
          title: 'Lustrage & correction',
          description:
            'Polissage 1 à 3 passes pour retirer micro-rayures et hologrammes.',
          tag: 'Brillance miroir'
        },
        {
          id: 4,
          title: "Rénovation d'optique",
          description:
            'Désoxydation + vernis/traitement anti-UV pour un éclairage optimal.',
          tag: 'CT OK ✔︎'
        }
      ],
      pricing: [
        {
          id: 1,
          title: 'Débosselage',
          price: 'à partir de 69€',
          features: [
            'Petites bosses (≤ 3 cm)',
            'Sans peinture',
            'Intervention rapide'
          ],
          featured: false
        },
        {
          id: 2,
          title: 'Lustrage (pack)',
          price: 'à partir de 149€',
          features: [
            '1 à 3 passes selon état',
            'Protection synthétique',
            'Option céramique'
          ],
          featured: true
        },
        {
          id: 3,
          title: "Rénovation d'optique",
          price: 'à partir de 59€/optique',
          features: [
            'Désoxydation complète',
            'Vernis/traitement anti-UV',
            'Contrôle technique OK'
          ],
          featured: false
        }
      ],
      reviews: [
        {
          id: 1,
          text: 'Travail impeccable sur une aile enfoncée, aucune trace. Je recommande à 100%.',
          author: 'Samir'
        },
        {
          id: 2,
          text: 'Optiques comme neufs, visibilité retrouvée de nuit, top !',
          author: 'Julie'
        },
        {
          id: 3,
          text: 'Lustrage superbe, carrosserie miroir. Accueil pro et délais tenus.',
          author: 'Marc'
        }
      ],
      settings: {
        siteTitle: 'PBDR',
        siteDescription:
          "Débosselage sans peinture, nettoyage intérieur/extérieur, lustrage et rénovation d'optique. Intervention rapide, qualité pro.",
        contactPhone: '06 12 34 56 78',
        contactEmail: 'contact@votrecarrosserie.fr',
        contactAddress: "12 rue de l'Atelier, 59000 Lille"
      }
    }

    this.saveData()
  }

  loadSectionData(sectionName) {
    switch (sectionName) {
      case 'services':
        this.renderServices()
        break
      case 'pricing':
        this.renderPricing()
        break
      case 'gallery':
        this.renderGallery()
        break
      case 'reviews':
        this.renderReviews()
        break
      case 'settings':
        this.renderSettings()
        break
    }
  }

  renderServices() {
    const container = document.getElementById('services-list')
    if (!container) return

    container.innerHTML = this.data.services
      .map(
        (service) => `
      <div class="list-item">
        <div class="list-item-content">
          <h4>${service.title}</h4>
          <p>${service.description}</p>
          <span class="pill">${service.tag}</span>
        </div>
        <div class="list-item-actions">
          <button class="btn btn-ghost btn-sm" onclick="admin.editService(${service.id})">Modifier</button>
          <button class="btn btn-danger btn-sm" onclick="admin.deleteService(${service.id})">Supprimer</button>
        </div>
      </div>
    `
      )
      .join('')
  }

  renderPricing() {
    const container = document.getElementById('pricing-list')
    if (!container) return

    container.innerHTML = this.data.pricing
      .map(
        (price) => `
      <div class="list-item">
        <div class="list-item-content">
          <h4>${price.title}</h4>
          <p>${price.price}</p>
          <ul>
            ${price.features.map((feature) => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        <div class="list-item-actions">
          <button class="btn btn-ghost btn-sm" onclick="admin.editPricing(${
            price.id
          })">Modifier</button>
          <button class="btn btn-danger btn-sm" onclick="admin.deletePricing(${
            price.id
          })">Supprimer</button>
        </div>
      </div>
    `
      )
      .join('')
  }

  renderGallery() {
    const container = document.getElementById('gallery-grid')
    if (!container) return

    container.innerHTML = this.data.gallery
      .map(
        (image) => `
      <div class="gallery-item">
        <img src="${image.url}" alt="${image.alt}" />
        <div class="gallery-item-overlay">
          <button class="btn btn-danger btn-sm" onclick="admin.deleteImage(${image.id})">Supprimer</button>
        </div>
      </div>
    `
      )
      .join('')
  }

  renderReviews() {
    const container = document.getElementById('reviews-list')
    if (!container) return

    container.innerHTML = this.data.reviews
      .map(
        (review) => `
      <div class="list-item">
        <div class="list-item-content">
          <p>"${review.text}"</p>
          <span class="pill">— ${review.author}</span>
        </div>
        <div class="list-item-actions">
          <button class="btn btn-ghost btn-sm" onclick="admin.editReview(${review.id})">Modifier</button>
          <button class="btn btn-danger btn-sm" onclick="admin.deleteReview(${review.id})">Supprimer</button>
        </div>
      </div>
    `
      )
      .join('')
  }

  renderSettings() {
    const settings = this.data.settings
    document.getElementById('site-title').value = settings.siteTitle
    document.getElementById('site-description').value = settings.siteDescription
    document.getElementById('contact-phone').value = settings.contactPhone
    document.getElementById('contact-email').value = settings.contactEmail
    document.getElementById('contact-address').value = settings.contactAddress
  }

  setupEventListeners() {
    // Save button
    document.getElementById('save-all').addEventListener('click', () => {
      this.saveAll()
    })

    // Add buttons
    document.getElementById('add-service').addEventListener('click', () => {
      this.addService()
    })

    document.getElementById('add-pricing').addEventListener('click', () => {
      this.addPricing()
    })

    document.getElementById('add-review').addEventListener('click', () => {
      this.addReview()
    })

    // Settings form
    const settingsInputs = document.querySelectorAll(
      '#settings-section input, #settings-section textarea'
    )
    settingsInputs.forEach((input) => {
      input.addEventListener('change', () => {
        this.updateSettings()
      })
    })
  }

  saveData() {
    localStorage.setItem('carrosserie-admin-data', JSON.stringify(this.data))
  }

  saveAll() {
    this.saveData()
    this.showNotification('Données sauvegardées avec succès !', 'success')
  }

  updateSettings() {
    this.data.settings = {
      siteTitle: document.getElementById('site-title').value,
      siteDescription: document.getElementById('site-description').value,
      contactPhone: document.getElementById('contact-phone').value,
      contactEmail: document.getElementById('contact-email').value,
      contactAddress: document.getElementById('contact-address').value
    }
    this.saveData()
  }

  // CRUD operations
  addService() {
    const title = prompt('Titre du service:')
    const description = prompt('Description:')
    const tag = prompt('Tag:')

    if (title && description && tag) {
      const newService = {
        id: Date.now(),
        title,
        description,
        tag
      }
      this.data.services.push(newService)
      this.saveData()
      this.renderServices()
    }
  }

  editService(id) {
    const service = this.data.services.find((s) => s.id === id)
    if (service) {
      const title = prompt('Titre du service:', service.title)
      const description = prompt('Description:', service.description)
      const tag = prompt('Tag:', service.tag)

      if (title && description && tag) {
        service.title = title
        service.description = description
        service.tag = tag
        this.saveData()
        this.renderServices()
      }
    }
  }

  deleteService(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      this.data.services = this.data.services.filter((s) => s.id !== id)
      this.saveData()
      this.renderServices()
    }
  }

  addPricing() {
    const title = prompt('Titre du tarif:')
    const price = prompt('Prix:')
    const features = prompt('Fonctionnalités (séparées par des virgules):')

    if (title && price && features) {
      const newPricing = {
        id: Date.now(),
        title,
        price,
        features: features.split(',').map((f) => f.trim()),
        featured: false
      }
      this.data.pricing.push(newPricing)
      this.saveData()
      this.renderPricing()
    }
  }

  editPricing(id) {
    const pricing = this.data.pricing.find((p) => p.id === id)
    if (pricing) {
      const title = prompt('Titre du tarif:', pricing.title)
      const price = prompt('Prix:', pricing.price)
      const features = prompt(
        'Fonctionnalités (séparées par des virgules):',
        pricing.features.join(', ')
      )

      if (title && price && features) {
        pricing.title = title
        pricing.price = price
        pricing.features = features.split(',').map((f) => f.trim())
        this.saveData()
        this.renderPricing()
      }
    }
  }

  deletePricing(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce tarif ?')) {
      this.data.pricing = this.data.pricing.filter((p) => p.id !== id)
      this.saveData()
      this.renderPricing()
    }
  }

  addReview() {
    const text = prompt("Texte de l'avis:")
    const author = prompt('Auteur:')

    if (text && author) {
      const newReview = {
        id: Date.now(),
        text,
        author
      }
      this.data.reviews.push(newReview)
      this.saveData()
      this.renderReviews()
    }
  }

  editReview(id) {
    const review = this.data.reviews.find((r) => r.id === id)
    if (review) {
      const text = prompt("Texte de l'avis:", review.text)
      const author = prompt('Auteur:', review.author)

      if (text && author) {
        review.text = text
        review.author = author
        this.saveData()
        this.renderReviews()
      }
    }
  }

  deleteReview(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      this.data.reviews = this.data.reviews.filter((r) => r.id !== id)
      this.saveData()
      this.renderReviews()
    }
  }

  deleteImage(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      this.data.gallery = this.data.gallery.filter((i) => i.id !== id)
      this.saveData()
      this.renderGallery()
    }
  }

  showNotification(message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 1000;
      background: ${type === 'success' ? '#22c55e' : '#4ea1ff'};
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }
}

// Initialize admin panel
const admin = new AdminPanel()
