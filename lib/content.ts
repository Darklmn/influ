/**
 * Opalo Logistique — contenu centralisé.
 * ⚠️ Modifiez ce fichier pour mettre à jour textes, prix, coordonnées.
 * (Tarifs à titre indicatif — remplacez-les par les tarifs réels de votre site.)
 */

export const company = {
  name: "Opalo Logistique",
  short: "Opalo",
  baseline: "La logistique qui fait avancer votre business.",
  description:
    "Transport, entreposage et logistique e-commerce sur mesure. Opalo Logistique connecte vos flux du premier au dernier kilomètre, avec une traçabilité totale en temps réel.",
  email: "contact@opalologistique.com",
  phone: "+212 5 22 00 00 00",
  phoneHref: "+212522000000",
  address: "Zone Logistique, Casablanca, Maroc",
  hours: "Lun – Sam · 8h00 – 19h00",
  website: "www.opalologistique.com",
  socials: {
    linkedin: "#",
    instagram: "#",
    facebook: "#",
  },
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Suivi", href: "#suivi" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
];

export const stats = [
  { value: "12+", label: "Années d'expérience" },
  { value: "48h", label: "Délai moyen national" },
  { value: "99,4%", label: "Livraisons à l'heure" },
  { value: "2 500+", label: "Clients accompagnés" },
];

export const trustedBy = [
  "Marjane",
  "Jumia",
  "OCP",
  "Maroc Telecom",
  "Label'Vie",
  "Cosumar",
  "Renault",
  "Décathlon",
];

export const services: {
  icon: string;
  title: string;
  desc: string;
  points: string[];
}[] = [
  {
    icon: "Truck",
    title: "Transport routier",
    desc: "Groupage et charges complètes partout au Maroc, avec une flotte moderne et géolocalisée.",
    points: ["Messagerie & express", "Flotte suivie GPS", "Assurance marchandises"],
  },
  {
    icon: "Ship",
    title: "Fret maritime",
    desc: "Import / export conteneurisé FCL & LCL avec dédouanement et gestion documentaire complète.",
    points: ["FCL / LCL", "Dédouanement inclus", "Consolidation portuaire"],
  },
  {
    icon: "Plane",
    title: "Fret aérien",
    desc: "Solutions express internationales pour vos envois urgents et à forte valeur.",
    points: ["Express 24/72h", "Suivi bout-en-bout", "Marchandises sensibles"],
  },
  {
    icon: "Warehouse",
    title: "Entreposage & stockage",
    desc: "Espaces sécurisés, gestion des stocks en temps réel et préparation de commandes.",
    points: ["15 000 m² sécurisés", "WMS temps réel", "Zone froide disponible"],
  },
  {
    icon: "PackageCheck",
    title: "Logistique e-commerce",
    desc: "Réception, stockage, picking, emballage et expédition : votre back-office logistique clé en main.",
    points: ["Fulfillment complet", "Gestion des retours", "Intégrations API"],
  },
  {
    icon: "MapPin",
    title: "Dernier kilomètre",
    desc: "Livraison rapide en centre-ville avec créneaux, preuve de livraison et paiement à la livraison.",
    points: ["Créneaux planifiés", "Preuve de livraison", "Cash on delivery"],
  },
];

export const features = [
  {
    icon: "Radar",
    title: "Traçabilité en temps réel",
    desc: "Suivez chaque colis à la minute, avec alertes automatiques et tableau de bord partagé.",
  },
  {
    icon: "ShieldCheck",
    title: "Marchandises assurées",
    desc: "Vos expéditions sont couvertes de bout en bout, avec gestion des litiges simplifiée.",
  },
  {
    icon: "Gauge",
    title: "Performance mesurée",
    desc: "KPIs de livraison, taux de service et reporting clair pour piloter votre supply chain.",
  },
  {
    icon: "Plug",
    title: "Intégrations natives",
    desc: "Connectez Shopify, WooCommerce ou votre ERP via API en quelques minutes.",
  },
  {
    icon: "Leaf",
    title: "Logistique responsable",
    desc: "Optimisation des tournées et flotte propre pour réduire votre empreinte carbone.",
  },
  {
    icon: "Headset",
    title: "Support dédié",
    desc: "Un interlocuteur unique et une équipe réactive 6j/7 pour vos opérations.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Prise en charge",
    desc: "Enlèvement planifié à l'adresse de votre choix, avec étiquetage et contrôle qualité.",
  },
  {
    n: "02",
    title: "Traitement & tri",
    desc: "Réception en entrepôt, scan et affectation automatique à la meilleure tournée.",
  },
  {
    n: "03",
    title: "Expédition suivie",
    desc: "Acheminement optimisé avec suivi GPS temps réel partagé avec vos clients.",
  },
  {
    n: "04",
    title: "Livraison & preuve",
    desc: "Remise au destinataire avec preuve de livraison numérique et notification instantanée.",
  },
];

/** Tarifs indicatifs — à remplacer par vos tarifs officiels. */
export const pricing = [
  {
    name: "Starter",
    tagline: "Idéal pour les envois ponctuels",
    price: "39",
    unit: "/ envoi",
    highlighted: false,
    features: [
      "Colis jusqu'à 30 kg",
      "Livraison nationale 48–72h",
      "Suivi en temps réel",
      "Assurance jusqu'à 5 000 DH",
      "Support par email",
    ],
    cta: "Commencer",
  },
  {
    name: "Business",
    tagline: "Pour les e-commerçants en croissance",
    price: "890",
    unit: "/ mois",
    highlighted: true,
    features: [
      "Jusqu'à 300 colis / mois",
      "Fulfillment e-commerce complet",
      "Gestion des retours incluse",
      "Créneaux de livraison premium",
      "Intégrations Shopify & Woo",
      "Chargé de compte dédié",
    ],
    cta: "Démarrer l'essai",
  },
  {
    name: "Enterprise",
    tagline: "Volumes & flux internationaux",
    price: "Sur devis",
    unit: "",
    highlighted: false,
    features: [
      "Volumes illimités",
      "Transport multimodal (mer / air / route)",
      "Entreposage dédié & WMS",
      "Dédouanement & documentation",
      "SLA & reporting personnalisés",
      "Support prioritaire 6j/7",
    ],
    cta: "Nous contacter",
  },
];

export const testimonials = [
  {
    quote:
      "Depuis que nous travaillons avec Opalo, notre taux de livraison à l'heure est passé de 88% à plus de 99%. Un vrai partenaire de croissance.",
    name: "Yassine El Amrani",
    role: "COO, Boutique e-commerce",
    rating: 5,
  },
  {
    quote:
      "La visibilité en temps réel a transformé notre service client. Nos clients savent exactement où sont leurs commandes.",
    name: "Salma Bennani",
    role: "Directrice Supply Chain",
    rating: 5,
  },
  {
    quote:
      "Réactivité exemplaire et tarifs transparents. Opalo gère notre entreposage et notre dernier kilomètre sans accroc.",
    name: "Karim Tazi",
    role: "Fondateur, Marque D2C",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "Quels sont vos délais de livraison ?",
    a: "En national, comptez 24 à 72h selon la destination et l'offre choisie. À l'international, les délais dépendent du mode (aérien express 24/72h, maritime 15–30 jours). Chaque envoi est suivi en temps réel.",
  },
  {
    q: "Proposez-vous le paiement à la livraison (COD) ?",
    a: "Oui. Le cash on delivery est disponible sur nos offres de livraison dernier kilomètre, avec reversement rapide et rapprochement automatisé.",
  },
  {
    q: "Puis-je intégrer Opalo à ma boutique en ligne ?",
    a: "Absolument. Nous proposons des intégrations natives Shopify et WooCommerce, ainsi qu'une API pour connecter votre ERP ou votre marketplace.",
  },
  {
    q: "Mes marchandises sont-elles assurées ?",
    a: "Toutes les expéditions sont couvertes de bout en bout. Des options d'assurance renforcée sont disponibles pour les marchandises à forte valeur.",
  },
  {
    q: "Gérez-vous les retours e-commerce ?",
    a: "Oui, la gestion des retours (reverse logistics) est incluse dans l'offre Business et Enterprise : réception, contrôle, remise en stock ou destruction.",
  },
  {
    q: "Comment obtenir un devis personnalisé ?",
    a: "Contactez-nous via le formulaire ou par téléphone. Nous établissons un devis sous 24h en fonction de vos volumes, destinations et niveaux de service.",
  },
];
