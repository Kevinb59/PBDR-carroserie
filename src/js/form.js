// ==============================
// S E C T I O N: Gestion du formulaire de contact
// ==============================

/**
 * Initialise le formulaire de demande de devis
 * Gère la soumission, la validation et l'affichage des statuts
 */
export function initContactForm() {
  // ========== S U B - S E C T I O N: Sélection et vérification ==========
  const form = document.getElementById('devisForm')
  const status = document.getElementById('status')

  if (!form || !status) return

  // ========== S U B - S E C T I O N: Gestion de la soumission ==========
  form.addEventListener('submit', async (e) => {
    e.preventDefault() // Empêcher la soumission par défaut

    // ---------- Sub-sub-section: Préparation de l'envoi ----------
    status.textContent = 'Envoi en cours…'

    // Récupérer les données du formulaire
    const data = Object.fromEntries(new FormData(form))

    try {
      // ---------- Sub-sub-section: Envoi des données ----------
      // TODO: remplacer l'URL par votre endpoint (GAS GET/POST, Vercel, Make, etc.)
      // const res = await fetch('https://votre-endpoint.example/lead', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });

      // ---------- Sub-sub-section: Simulation d'envoi ----------
      // Simulation d'un délai d'envoi pour l'UX
      await new Promise((r) => setTimeout(r, 600))

      // ---------- Sub-sub-section: Succès ----------
      status.textContent = 'Merci ! Nous revenons vers vous rapidement.'
      form.reset() // Vider le formulaire
    } catch (err) {
      // ---------- Sub-sub-section: Gestion d'erreur ----------
      console.error("Erreur lors de l'envoi du formulaire:", err)
      status.textContent = 'Oups, une erreur est survenue. Réessayez.'
    }
  })
}
