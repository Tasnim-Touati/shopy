const products = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 1200,
    stock: 5,
    image: "/assets/laptop.jpg",
    description:
      "Un ordinateur portable haute performance parfait pour le travail et le divertissement. Équipé d'un processeur puissant et d'un écran haute résolution pour une expérience utilisateur exceptionnelle.",
    features: [
      "Processeur Intel Core i7 dernière génération",
      "16 Go de RAM DDR4",
      "SSD 512 Go ultra-rapide",
      'Écran 15.6" Full HD',
      "Batterie longue durée (10h d'autonomie)",
    ],
  },
  {
    id: 2,
    name: "Casque Audio",
    price: 150,
    stock: 3,
    image: "/assets/headphones.jpg",
    description:
      "Casque audio sans fil avec réduction de bruit active. Profitez d'un son cristallin et d'un confort optimal pour vos longues sessions d'écoute.",
    features: [
      "Réduction de bruit active (ANC)",
      "Bluetooth 5.0",
      "Autonomie de 30 heures",
      "Coussinets en mousse à mémoire de forme",
      "Microphone intégré pour les appels",
    ],
  },
  {
    id: 3,
    name: "Souris Gaming",
    price: 80,
    stock: 102,
    image: "/assets/mouse.jpg",
    description:
      "Souris gaming ergonomique avec capteur optique haute précision. Idéale pour les joueurs exigeants recherchant performance et confort.",
    features: [
      "Capteur optique 16000 DPI",
      "8 boutons programmables",
      "Éclairage RGB personnalisable",
      "Design ergonomique",
      "Poids ajustable",
    ],
  },
  {
    id: 4,
    name: "Clavier Mécanique",
    price: 110,
    stock: 523,
    image: "/assets/keyboard.jpg",
    description:
      "Clavier mécanique avec switches Cherry MX et rétroéclairage RGB. Parfait pour le gaming et la frappe intensive avec une durabilité exceptionnelle.",
    features: [
      "Switches Cherry MX Red",
      "Rétroéclairage RGB par touche",
      "Repose-poignets amovible",
      "Construction en aluminium",
      "Anti-ghosting complet",
    ],
  },
  {
    id: 5,
    name: "Écran 27 pouces",
    price: 300,
    stock: 400,
    image: "/assets/monitor.jpg",
    description:
      "Moniteur 27 pouces QHD avec taux de rafraîchissement de 144Hz. Offre des couleurs éclatantes et une fluidité parfaite pour le gaming et le design.",
    features: [
      "Résolution 2560x1440 (QHD)",
      "Taux de rafraîchissement 144Hz",
      "Temps de réponse 1ms",
      "Panel IPS avec 99% sRGB",
      "Support VESA inclus",
    ],
  },
  {
    id: 6,
    name: "Webcam HD",
    price: 90,
    stock: 0,
    image: "/assets/webcam.jpg",
    description:
      "Webcam Full HD 1080p avec mise au point automatique et microphone intégré. Idéale pour les visioconférences professionnelles et le streaming.",
    features: [
      "Résolution Full HD 1080p",
      "Autofocus intelligent",
      "Microphone stéréo anti-bruit",
      "Compatible Windows et Mac",
      "Clip universel pour tout écran",
    ],
  },
  {
    id: 7,
    name: "Disque Dur Externe 1To",
    price: 95,
    stock: 600,
    image: "/assets/external-hdd.jpg",
    description:
      "Disque dur externe portable offrant une grande capacité de stockage pour sauvegarder vos fichiers importants en toute sécurité.",
    features: [
      "Capacité 1 To",
      "USB 3.0 haute vitesse",
      "Compatible Windows, Mac et Linux",
      "Design compact et léger",
      "Plug & Play sans installation",
    ],
  },
  {
    id: 8,
    name: "Tablette Graphique",
    price: 180,
    stock: 133,
    image: "/assets/graphic-tablet.jpg",
    description:
      "Tablette graphique idéale pour les designers et illustrateurs, offrant une précision exceptionnelle et une expérience naturelle de dessin.",
    features: [
      "8192 niveaux de pression",
      "Stylet sans batterie",
      "Surface active large",
      "Compatible Photoshop, Illustrator, etc.",
      "Connexion USB",
    ],
  },
  {
    id: 9,
    name: "Enceinte Bluetooth",
    price: 130,
    stock: 140,
    image: "/assets/speaker.jpg",
    description:
      "Enceinte Bluetooth portable avec un son puissant et des basses profondes, parfaite pour une utilisation intérieure et extérieure.",
    features: [
      "Bluetooth 5.2",
      "Autonomie jusqu'à 20 heures",
      "Résistante à l’eau (IPX7)",
      "Basses renforcées",
      "Micro intégré pour appels",
    ],
  },
  {
    id: 10,
    name: "Station d’Accueil USB-C",
    price: 160,
    stock: 150,
    image: "/assets/docking-station.jpg",
    description:
      "Station d’accueil USB-C multifonction permettant de connecter facilement plusieurs périphériques à votre ordinateur portable.",
    features: [
      "Ports HDMI, USB, Ethernet",
      "Charge rapide Power Delivery",
      "Compatible Windows et Mac",
      "Support écran double",
      "Design élégant en aluminium",
    ],
  },
  {
    id: 11,
    name: "Casque Gaming RGB",
    price: 140,
    stock: 100,
    image: "/assets/gaming-headset.jpg",
    description:
      "Casque gaming immersif avec son surround et éclairage RGB pour une expérience de jeu intense et confortable.",
    features: [
      "Son surround 7.1",
      "Micro antibruit ajustable",
      "Éclairage RGB personnalisable",
      "Coussinets confortables",
      "Compatible PC et consoles",
    ],
  },
];
export default products;
