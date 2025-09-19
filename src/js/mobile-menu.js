// ==============================
// S E C T I O N: Gestion du menu mobile
// ==============================

/**
 * Initialise le menu mobile avec toutes ses interactions
 * Gère l'ouverture/fermeture, les événements tactiles et la synchronisation
 */
export function initMobileMenu() {
  // ========== S U B - S E C T I O N: Sélection des éléments ==========
  const mobileToggle = document.getElementById('mobile-menu-toggle')
  const mobileNav = document.getElementById('mobile-nav')
  const mobileOverlay = document.getElementById('mobile-nav-overlay')
  const mobileLinks = mobileNav.querySelectorAll('a')
  const desktopLinks = document.querySelectorAll('.nav a')

  // ========== S U B - S E C T I O N: Fonction de basculement ==========
  /**
   * Ouvre ou ferme le menu mobile
   * @param {boolean} open - true pour ouvrir, false pour fermer
   */
  function toggleMenu(open) {
    if (open) {
      // ---------- Sub-sub-section: Ouverture du menu ----------
      mobileToggle.classList.add('active')
      mobileNav.classList.add('active')
      mobileOverlay.classList.add('active')
      document.body.style.overflow = 'hidden' // Empêcher le scroll du body
    } else {
      // ---------- Sub-sub-section: Fermeture du menu ----------
      mobileToggle.classList.remove('active')
      mobileNav.classList.remove('active')
      mobileOverlay.classList.remove('active')
      document.body.style.overflow = '' // Restaurer le scroll du body
    }
  }

  // ========== S U B - S E C T I O N: Gestion des événements ==========

  // ---------- Sub-sub-section: Événements de basculement ----------
  // Toggle du menu mobile (icône hamburger)
  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('active')
    toggleMenu(!isOpen)
  })

  // Toggle du menu mobile (texte "Menu")
  const mobileMenuLabel = document.querySelector('.mobile-menu-label')
  if (mobileMenuLabel) {
    mobileMenuLabel.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('active')
      toggleMenu(!isOpen)
    })
  }

  // ---------- Sub-sub-section: Événements de fermeture ----------
  // Fermer le menu en cliquant sur l'overlay
  mobileOverlay.addEventListener('click', () => {
    toggleMenu(false)
  })

  // Fermer le menu au clic sur un lien
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false)
    })
  })

  // Fermer avec la touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      toggleMenu(false)
    }
  })

  // ========== S U B - S E C T I O N: Synchronisation des états actifs ==========

  /**
   * Synchronise les états actifs entre la navigation desktop et mobile
   * Utilise IntersectionObserver pour détecter la section visible
   */
  function updateActiveStates() {
    const sections = Array.from(document.querySelectorAll('section'))
    const allLinks = [...desktopLinks, ...mobileLinks]

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // ---------- Sub-sub-section: Mise à jour des états ----------
            // Retirer la classe active de tous les liens
            allLinks.forEach((link) => link.classList.remove('active'))

            // Ajouter la classe active au lien correspondant
            const id = entry.target.getAttribute('id')
            const activeLink = document.querySelector(`[href="#${id}"]`)
            if (activeLink) {
              activeLink.classList.add('active')
            }
          }
        })
      },
      { root: document.getElementById('main-content'), threshold: 0.55 }
    )

    sections.forEach((section) => io.observe(section))
  }

  // ========== S U B - S E C T I O N: Initialisation et gestion responsive ==========

  // Initialiser la synchronisation des états actifs
  updateActiveStates()

  // Gestion du redimensionnement de la fenêtre
  // Fermer le menu mobile si on passe en mode desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
      toggleMenu(false)
    }
  })
}
