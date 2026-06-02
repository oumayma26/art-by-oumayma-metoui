export const paintings = [
    {
    id: 3,
    title: "Vagues",
    description: "Une aquarelle dynamique qui exprime les turbulences émotionnelles à travers des couleurs vibrantes et des formes en mouvement.",
    image: "/img/vagues.jpg",
    dimensions: "50 x 70 cm",
    technique: "aquarelle",
    date: "2026-05-24",
    price: 650,
    disponible: true,
    mood: "dramatic",
    featured: false
  },
    {
    id: 4,
    title: "Palestine",
    description: "Une composition mixte combinant techniques de peinture et collage, célébrant la beauté de la nature et du renouveau.",
    image: "/img/p@lestine.jpg",
    dimensions: "70 x 70 cm",
    technique: "mixed media",
    date: "2026-01-27",
    price: 1100,
    disponible: false,
    mood: "joyful",
    featured: false
  },
  {
    id: 1,
    title: "Les Rêves en Rose",
    description: "Une exploration abstraite des émotions délicates, où les teintes de rose et or se rencontrent pour créer une harmonie poétique.",
    image: "/img/madalina.jpg",
    dimensions: "80 x 100 cm",
    technique: "huile",
    date: "2024-05-15",
    price: 1200,
    disponible: true,
    mood: "joyful",
    featured: true
  },
  {
    id: 2,
    title: "Silence Automnal",
    description: "Un paysage peint à l'acrylique, capturant la sérénité d'une forêt en automne avec des touches dorées.",
    image: "/img/paintings.jpg",
    dimensions: "60 x 80 cm",
    technique: "acrylique",
    date: "2023-09-20",
    price: 850,
    disponible: true,
    mood: "calm",
    featured: false
  },
  

  {
    id: 5,
    title: "Reflets de L'âme",
    description: "Huile sur toile montrant l'introspection et la connexion avec la beauté intérieure, avec des teintes rose et or prédominantes.",
    image: "/img/to_p@lestine.jpg",
    dimensions: "90 x 60 cm",
    technique: "huile",
    date: "2023-11-08",
    price: 1400,
    disponible: true,
    mood: "calm",
    featured: true
  },
  {
    id: 6,
    title: "Danse des Étoiles",
    description: "Une aquarelle onirique où les teintes pastel créent une atmosphère magique et apaisante.",
    image: "/img/paintings.jpg",
    dimensions: "65 x 85 cm",
    technique: "aquarelle",
    date: "2024-02-14",
    price: 750,
    disponible: true,
    mood: "joyful",
    featured: false
  }
].sort((a, b) => new Date(b.date) - new Date(a.date))

export const moods = {
  joyful: "Joyeux",
  calm: "Calme",
  dramatic: "Dramatique"
}

export const techniques = {
  huile: "Huile",
  acrylique: "Acrylique",
  aquarelle: "Aquarelle",
  "mixed media": "Mixed Media"
}
