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
    .then((response) => {
      // ---------- Sub-sub-section: Vérification de la réponse ----------
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return response.json()
    })
    .catch((error) => {
      // ---------- Sub-sub-section: Gestion d'erreur ----------
      console.warn(
        'API non disponible, utilisation des données par défaut:',
        error.message
      )
      // Retourner des données par défaut au lieu de null
      return getDefaultContent()
    })
}

/**
 * Retourne le contenu par défaut quand l'API n'est pas disponible
 * @returns {Object} Données par défaut du site
 */
function getDefaultContent() {
  // ========== S U B - S E C T I O N: Données par défaut ==========
  return {
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
    settings: {
      siteTitle: 'PBDR',
      siteDescription:
        "Débosselage sans peinture, nettoyage intérieur/extérieur, lustrage et rénovation d'optique. Intervention rapide, qualité pro.",
      contactPhone: '06 12 34 56 78',
      contactEmail: 'contact@votrecarrosserie.fr',
      contactAddress: "12 rue de l'Atelier, 59000 Lille"
    }
  }
}
