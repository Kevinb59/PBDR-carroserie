// ==============================
// S E C T I O N: API de gestion du contenu dynamique
// ==============================

/**
 * Endpoint API pour récupérer le contenu dynamique du site
 * Fournit les données pour les services, tarifs, avis et paramètres
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

  // ========== S U B - S E C T I O N: Traitement des requêtes GET ==========
  if (req.method === 'GET') {
    // ---------- Sub-sub-section: Données par défaut du site ----------
    const defaultContent = {
      // ---------- Sub-sub-section: Services proposés ----------
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
      // ---------- Sub-sub-section: Tarifs des prestations ----------
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
      // ---------- Sub-sub-section: Avis clients ----------
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
      // ---------- Sub-sub-section: Paramètres du site ----------
      settings: {
        siteTitle: 'PBDR',
        siteDescription:
          "Débosselage sans peinture, nettoyage intérieur/extérieur, lustrage et rénovation d'optique. Intervention rapide, qualité pro.",
        contactPhone: '06 12 34 56 78',
        contactEmail: 'contact@votrecarrosserie.fr',
        contactAddress: "12 rue de l'Atelier, 59000 Lille"
      }
    }

    // ---------- Sub-sub-section: Retour des données ----------
    res.status(200).json(defaultContent)
  } else {
    // ---------- Sub-sub-section: Méthode non autorisée ----------
    res.status(405).json({ error: 'Method not allowed' })
  }
}
