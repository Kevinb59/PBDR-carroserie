// ==============================
// S E C T I O N: Gestion du défilement horizontal
// ==============================

/**
 * Initialise le défilement horizontal pour les appareils desktop
 * Désactive le scroll horizontal sur mobile pour utiliser le scroll vertical
 */
export function initHorizontalScroll() {
  // ========== S U B - S E C T I O N: Sélection et vérification ==========
  const rail = document.getElementById('main-content')

  if (!rail) return

  // ========== S U B - S E C T I O N: Détection mobile/desktop ==========
  /**
   * Détecte si l'appareil est mobile
   * @returns {boolean} true si mobile, false si desktop
   */
  function isMobile() {
    return window.innerWidth <= 768 || 'ontouchstart' in window
  }

  // ========== S U B - S E C T I O N: Configuration mobile ==========
  // Si on est sur mobile, utiliser le scroll vertical normal
  if (isMobile()) {
    // ---------- Sub-sub-section: Désactivation du scroll horizontal ----------
    rail.style.overflowX = 'hidden'
    rail.style.overflowY = 'auto'
    rail.style.flexDirection = 'column'
    return
  }

  // ========== S U B - S E C T I O N: Configuration desktop ==========
  // ---------- Sub-sub-section: Gestion du scroll horizontal ----------
  // Convertir le scroll vertical en scroll horizontal
  rail.addEventListener(
    'wheel',
    (e) => {
      // Vérifier que le scroll vertical est plus important que l'horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault() // Empêcher le scroll vertical par défaut
        rail.scrollBy({ left: e.deltaY * 1.1, behavior: 'smooth' }) // Scroll horizontal fluide
      }
    },
    { passive: false } // Permettre preventDefault
  )

  // ========== S U B - S E C T I O N: Gestion responsive ==========
  // ---------- Sub-sub-section: Adaptation au redimensionnement ----------
  window.addEventListener('resize', () => {
    if (isMobile()) {
      // Mode mobile : scroll vertical
      rail.style.overflowX = 'hidden'
      rail.style.overflowY = 'auto'
      rail.style.flexDirection = 'column'
    } else {
      // Mode desktop : scroll horizontal
      rail.style.overflowX = 'auto'
      rail.style.overflowY = 'hidden'
      rail.style.flexDirection = 'row'
    }
  })
}
