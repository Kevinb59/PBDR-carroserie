// ==============================
// S E C T I O N: Utilitaires généraux
// ==============================

/**
 * Met à jour l'année dans le pied de page
 * Utilisé pour maintenir l'année de copyright à jour automatiquement
 */
export function updateFooterYear() {
  // ========== S U B - S E C T I O N: Mise à jour de l'année ==========
  const yearElement = document.getElementById('year')
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
}

/**
 * Charge le contenu dynamique depuis l'API
 * @returns {Promise<Object|null>} Données du contenu ou null en cas d'erreur
 */
export function loadContent() {
  // ========== S U B - S E C T I O N: Chargement des données ==========
  // ---------- Sub-sub-section: Requête API ----------
  return fetch('/api/content')
    .then((response) => response.json())
    .catch((error) => {
      // ---------- Sub-sub-section: Gestion d'erreur ----------
      console.error('Erreur lors du chargement du contenu:', error)
      return null // Retourner null en cas d'erreur pour éviter les crashes
    })
}
