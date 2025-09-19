// ==============================
// S E C T I O N: Gestion du thème sombre/clair
// ==============================

/**
 * Initialise le basculeur de thème
 * Gère le stockage local, les préférences système et les transitions
 */
export function initThemeToggle() {
  // ========== S U B - S E C T I O N: Sélection des éléments ==========
  const themeToggle = document.getElementById('theme-toggle')
  const body = document.body

  // ========== S U B - S E C T I O N: Détection du thème initial ==========
  // ---------- Sub-sub-section: Préférences système et stockage ----------
  const savedTheme = localStorage.getItem('theme')
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
  const currentTheme = savedTheme || systemTheme

  // ---------- Sub-sub-section: Application du thème initial ----------
  applyTheme(currentTheme)

  // ========== S U B - S E C T I O N: Gestion des événements ==========
  // ---------- Sub-sub-section: Basculeur manuel ----------
  if (themeToggle) {
    themeToggle.addEventListener('change', (e) => {
      const newTheme = e.target.checked ? 'dark' : 'light'
      applyTheme(newTheme)
      localStorage.setItem('theme', newTheme) // Sauvegarder le choix
    })
  }

  // ---------- Sub-sub-section: Changements de préférence système ----------
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      // Ne changer que si aucun thème n'est explicitement sauvegardé
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        applyTheme(newTheme)
      }
    })
}

// ========== S U B - S E C T I O N: Application du thème ==========

/**
 * Applique le thème spécifié au document
 * @param {string} theme - 'dark' ou 'light'
 */
function applyTheme(theme) {
  const themeToggle = document.getElementById('theme-toggle')
  const body = document.body

  // ---------- Sub-sub-section: Application du thème sombre ----------
  if (theme === 'dark') {
    body.classList.add('dark-theme')
    body.classList.remove('light-theme')
    if (themeToggle) {
      themeToggle.checked = true // Activer le toggle
    }
  } else {
    // ---------- Sub-sub-section: Application du thème clair ----------
    body.classList.add('light-theme')
    body.classList.remove('dark-theme')
    if (themeToggle) {
      themeToggle.checked = false // Désactiver le toggle
    }
  }

  // ---------- Sub-sub-section: Mise à jour des attributs CSS ----------
  // Mettre à jour l'attribut data-theme pour les styles CSS
  body.setAttribute('data-theme', theme)
}

// ========== S U B - S E C T I O N: Basculement manuel ==========

/**
 * Bascule le thème manuellement (fonction utilitaire)
 * Alterne entre le thème sombre et clair
 */
export function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  applyTheme(newTheme)
  localStorage.setItem('theme', newTheme) // Sauvegarder le nouveau choix
}
