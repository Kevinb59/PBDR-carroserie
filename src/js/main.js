// ==============================
// S E C T I O N: Point d'entrée principal
// ==============================

// ========== S U B - S E C T I O N: Imports des modules ==========
import { initNavigation } from './navigation.js'
import { initMobileMenu } from './mobile-menu.js'
import { initHorizontalScroll } from './scroll.js'
import { initContactForm } from './form.js'
import { initComparison } from './comparison.js'
import { initThemeToggle } from './theme.js'
import { updateFooterYear, loadContent } from './utils.js'

// ========== S U B - S E C T I O N: Initialisation de l'application ==========

/**
 * Initialisation de l'application au chargement du DOM
 * Configure toutes les fonctionnalités interactives du site
 */
document.addEventListener('DOMContentLoaded', () => {
  // ---------- Sub-sub-section: Initialisation des fonctionnalités ----------
  // Navigation et menu mobile
  initNavigation()
  initMobileMenu()

  // Interactions utilisateur
  initHorizontalScroll()
  initContactForm()
  initComparison()
  initThemeToggle()

  // Utilitaires
  updateFooterYear()

  // ---------- Sub-sub-section: Chargement du contenu dynamique ----------
  // Charger le contenu depuis l'API si disponible
  loadContent().then((content) => {
    if (content) {
      // Mettre à jour le contenu de la page avec les données de l'API
      updatePageContent(content)
    }
  })
})

// ========== S U B - S E C T I O N: Gestion du contenu dynamique ==========

/**
 * Met à jour le contenu de la page avec les données de l'API
 * @param {Object} content - Données du contenu à afficher
 */
function updatePageContent(content) {
  // ---------- Sub-sub-section: Mise à jour des sections ----------
  // Mettre à jour les services
  if (content.services) {
    updateServices(content.services)
  }

  // Mettre à jour les tarifs
  if (content.pricing) {
    updatePricing(content.pricing)
  }

  // Mettre à jour les avis
  if (content.reviews) {
    updateReviews(content.reviews)
  }
}

/**
 * Met à jour la section des services avec les nouvelles données
 * @param {Array} services - Liste des services à afficher
 */
function updateServices(services) {
  const servicesContainer = document.querySelector('.grid')
  if (!servicesContainer) return

  // Générer le HTML pour chaque service
  servicesContainer.innerHTML = services
    .map(
      (service) => `
    <article class="service">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <span class="pill">${service.tag}</span>
    </article>
  `
    )
    .join('')
}

/**
 * Met à jour la section des tarifs avec les nouvelles données
 * @param {Array} pricing - Liste des tarifs à afficher
 */
function updatePricing(pricing) {
  const pricingContainer = document.querySelector('.pricing')
  if (!pricingContainer) return

  // Générer le HTML pour chaque tarif
  pricingContainer.innerHTML = pricing
    .map(
      (price) => `
    <div class="price ${price.featured ? 'featured' : ''}">
      <h4>${price.title}</h4>
      <div class="num">${price.price}</div>
      <ul>
        ${price.features.map((feature) => `<li>${feature}</li>`).join('')}
      </ul>
    </div>
  `
    )
    .join('')
}

/**
 * Met à jour la section des avis avec les nouvelles données
 * @param {Array} reviews - Liste des avis à afficher
 */
function updateReviews(reviews) {
  const reviewsContainer = document.querySelector('.reviews')
  if (!reviewsContainer) return

  // Générer le HTML pour chaque avis
  reviewsContainer.innerHTML = reviews
    .map(
      (review) => `
    <div class="review">
      "${review.text}" — <b>${review.author}</b>
    </div>
  `
    )
    .join('')
}
