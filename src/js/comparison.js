// ==============================
// S E C T I O N: Système de comparaison avant/après
// ==============================

/**
 * Initialise le système de comparaison interactif
 * Gère l'ouverture du modal, le slider et les interactions tactiles
 */
export function initComparison() {
  // ========== S U B - S E C T I O N: Sélection des éléments ==========
  const comparisonItems = document.querySelectorAll('.comparison-item')
  const modal = document.getElementById('comparison-modal')
  const closeBtn = document.getElementById('comparison-close')
  const beforeImg = document.getElementById('comparison-before')
  const afterImg = document.getElementById('comparison-after')
  const slider = document.getElementById('comparison-slider')
  const afterImgElement = document.querySelector('.comparison-after')

  // ========== S U B - S E C T I O N: Gestion d'ouverture du modal ==========
  // ---------- Sub-sub-section: Événements de clic sur les images ----------
  comparisonItems.forEach((item) => {
    item.addEventListener('click', () => {
      const beforeSrc = item.dataset.before
      const afterSrc = item.dataset.after

      // Charger les images dans le modal
      beforeImg.src = beforeSrc
      afterImg.src = afterSrc

      // Afficher le modal
      modal.classList.add('active')
      document.body.style.overflow = 'hidden' // Empêcher le scroll

      // Réinitialiser la position du slider au centre
      updateSliderPosition(50)
    })
  })

  // ========== S U B - S E C T I O N: Gestion de fermeture du modal ==========
  // ---------- Sub-sub-section: Bouton de fermeture ----------
  closeBtn.addEventListener('click', closeModal)

  // ---------- Sub-sub-section: Clic sur l'overlay ----------
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })

  // ---------- Sub-sub-section: Touche Escape ----------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal()
    }
  })

  // ========== S U B - S E C T I O N: Gestion du slider interactif ==========
  // ---------- Sub-sub-section: Variables d'état ----------
  let isDragging = false

  // ---------- Sub-sub-section: Événements de début de glissement ----------
  slider.addEventListener('mousedown', startDrag)
  slider.addEventListener('touchstart', startDrag)

  // ---------- Sub-sub-section: Événements de glissement ----------
  document.addEventListener('mousemove', drag)
  document.addEventListener('touchmove', drag)

  // ---------- Sub-sub-section: Événements de fin de glissement ----------
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchend', stopDrag)

  // ========== S U B - S E C T I O N: Interaction par clic ==========
  // ---------- Sub-sub-section: Clic sur le conteneur ----------
  const container = document.querySelector('.comparison-container')
  container.addEventListener('click', (e) => {
    if (
      e.target === container ||
      e.target.classList.contains('comparison-wrapper')
    ) {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = (x / rect.width) * 100
      updateSliderPosition(Math.max(0, Math.min(100, percentage)))
    }
  })

  // ========== S U B - S E C T I O N: Fonctions de gestion du slider ==========

  /**
   * Démarre le glissement du slider
   * @param {Event} e - Événement de début de glissement
   */
  function startDrag(e) {
    isDragging = true
    e.preventDefault()
  }

  /**
   * Gère le glissement du slider
   * @param {Event} e - Événement de glissement
   */
  function drag(e) {
    if (!isDragging) return

    e.preventDefault()
    const container = document.querySelector('.comparison-container')
    const rect = container.getBoundingClientRect()
    const clientX = e.clientX || (e.touches && e.touches[0].clientX)
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    updateSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  /**
   * Arrête le glissement du slider
   */
  function stopDrag() {
    isDragging = false
  }

  /**
   * Met à jour la position du slider et l'affichage des images
   * @param {number} percentage - Position en pourcentage (0-100)
   */
  function updateSliderPosition(percentage) {
    slider.style.left = percentage + '%'
    afterImgElement.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`
  }

  /**
   * Ferme le modal de comparaison
   */
  function closeModal() {
    modal.classList.remove('active')
    document.body.style.overflow = '' // Restaurer le scroll
  }
}
