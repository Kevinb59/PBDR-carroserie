// ==============================
// S E C T I O N: API de traitement des demandes de devis
// ==============================

/**
 * Endpoint API pour traiter les demandes de devis
 * Gère la réception, validation et traitement des formulaires de contact
 * @param {Object} req - Objet de requête HTTP
 * @param {Object} res - Objet de réponse HTTP
 */
export default function handler(req, res) {
  // ========== S U B - S E C T I O N: Configuration CORS ==========
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // ---------- Sub-sub-section: Gestion des requêtes OPTIONS ----------
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // ========== S U B - S E C T I O N: Traitement des requêtes POST ==========
  if (req.method === 'POST') {
    try {
      // ---------- Sub-sub-section: Extraction des données ----------
      const { nom, email, tel, prestation, message, photo1, photo2 } = req.body

      // ---------- Sub-sub-section: Validation des données ----------
      if (!nom || !email) {
        return res.status(400).json({
          error: 'Nom et email sont requis'
        })
      }

      // ---------- Sub-sub-section: Construction de l'objet devis ----------
      const devisData = {
        id: Date.now(),
        nom,
        email,
        tel: tel || '',
        prestation,
        message: message || '',
        photos: [photo1, photo2].filter(Boolean),
        date: new Date().toISOString(),
        status: 'nouveau'
      }

      // ---------- Sub-sub-section: Traitement des données ----------
      // Ici vous pouvez :
      // 1. Sauvegarder en base de données
      // 2. Envoyer un email de notification
      // 3. Intégrer avec un CRM
      // 4. Envoyer vers Google Sheets via Google Apps Script

      console.log('Nouveau devis reçu:', devisData)

      // Simulation d'envoi d'email (à remplacer par votre service)
      // await sendEmailNotification(devisData);

      // ---------- Sub-sub-section: Réponse de succès ----------
      res.status(200).json({
        success: true,
        message: 'Demande de devis envoyée avec succès',
        devisId: devisData.id
      })
    } catch (error) {
      // ---------- Sub-sub-section: Gestion d'erreur ----------
      console.error('Erreur lors du traitement du devis:', error)
      res.status(500).json({
        error: 'Erreur interne du serveur'
      })
    }
  } else {
    // ---------- Sub-sub-section: Méthode non autorisée ----------
    res.status(405).json({ error: 'Method not allowed' })
  }
}

// ========== S U B - S E C T I O N: Fonction utilitaire d'email ==========

/**
 * Fonction pour envoyer une notification email
 * Exemple d'intégration avec des services d'email comme SendGrid ou Nodemailer
 * @param {Object} devisData - Données du devis à envoyer
 */
async function sendEmailNotification(devisData) {
  // ---------- Sub-sub-section: Configuration du service email ----------
  // Exemple d'intégration avec SendGrid, Nodemailer, ou autre service
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // ---------- Sub-sub-section: Construction du message ----------
  const msg = {
    to: 'contact@votrecarrosserie.fr',
    from: 'noreply@votrecarrosserie.fr',
    subject: `Nouveau devis - ${devisData.prestation}`,
    html: `
      <h2>Nouveau devis reçu</h2>
      <p><strong>Nom:</strong> ${devisData.nom}</p>
      <p><strong>Email:</strong> ${devisData.email}</p>
      <p><strong>Téléphone:</strong> ${devisData.tel}</p>
      <p><strong>Prestation:</strong> ${devisData.prestation}</p>
      <p><strong>Message:</strong> ${devisData.message}</p>
      ${
        devisData.photos.length > 0
          ? `<p><strong>Photos:</strong> ${devisData.photos.join(', ')}</p>`
          : ''
      }
    `
  }

  // ---------- Sub-sub-section: Envoi de l'email ----------
  // await sgMail.send(msg);
}
