// ==============================
// S E C T I O N: Navigation et états actifs
// ==============================

/**
 * Initialise la navigation avec gestion des états actifs
 * Met à jour automatiquement l'état actif des liens selon la section visible
 */
export function initNavigation() {
  // ========== S U B - S E C T I O N: Sélection des éléments ==========
  const sections = Array.from(document.querySelectorAll('section'))
  const links = Array.from(document.querySelectorAll('.nav a'))

  // Fonction utilitaire pour trouver un lien par ID de section
  const byId = (id) => document.querySelector(`[href="#${id}"]`)

  // ========== S U B - S E C T I O N: Configuration de l'observateur ==========
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // ---------- Sub-sub-section: Mise à jour des états actifs ----------
          // Retirer la classe active de tous les liens
          links.forEach((a) => a.classList.remove('active'))

          // Ajouter la classe active au lien correspondant
          const id = entry.target.getAttribute('id')
          const link = byId(id)
          if (link) link.classList.add('active')

          // Mettre à jour l'URL dans l'historique
          history.replaceState(null, '', '#' + id)
        }
      })
    },
    { root: document.getElementById('main-content'), threshold: 0.55 }
  )

  // ========== S U B - S E C T I O N: Observation des sections ==========
  // Observer toutes les sections pour détecter les changements de visibilité
  sections.forEach((s) => io.observe(s))
}
