export const paintings = [
    {
    id: 3,
    title: "Vagues",
    description: "Peinture à l'huile",
    image: "/img/vagues.jpg",
    dimensions: "50 x 70 cm",
    technique: "huile",
    date: "2026-05-24",
    price: '-    ',
    disponible: true,
    mood: "dramatic",
    featured: false
  },
    {
    id: 4,
    title: "Palestine",
    description: "Peinture à l'huile",
    image: "/img/p@lestine.jpg",
    dimensions: "70 x 70 cm",
    technique: "huile",
    date: "2026-01-27",
    price: '-    ',
    disponible: false,
    mood: "joyful",
    featured: false
  },
  {
    id: 1,
    title: "Madalina",
    description: "Peinture à l'huile",
    image: "/img/madalina.jpg",
    dimensions: "80 x 100 cm",
    technique: "huile",
    date: "2024-05-15",
    price: '-    ',
    disponible: true,
    mood: "joyful",
    featured: true
  },

  {
    id: 5,
    title: "To palestine",
    description: "Peinture à l'huile",
    image: "/img/to_p@lestine.jpg",
    dimensions: "90 x 60 cm",
    technique: "huile",
    date: "2023-11-08",
    price: '-    ',
    disponible: true,
    mood: "calm",
    featured: true
  },

  {
    id: 5,
    title: "Citron",
    description: "Peinture à l'huile",
    image: "/img/citron.png",
    dimensions: "90 x 60 cm",
    technique: "huile",
    date: "2023-11-08",
    price: '-    ',
    disponible: true,
    mood: "calm",
    featured: true
  },
  {
    id: 5,
    title: "The satary night",
    description: "Peinture acrylique",
    image: "/img/van_gogh.png",
    dimensions: "90 x 60 cm",
    technique: "huile",
    date: "2023-11-08",
    price: '-    ',
    disponible: true,
    mood: "calm",
    featured: true
  },
  {
    id: 5,
    title: "La porte rouge",
    description: "Peinture acrylique",
    image: "/img/porte_rouge.png",
    dimensions: "90 x 60 cm",
    technique: "huile",
    date: "2023-11-08",
    price: '-    ',
    disponible: true,
    mood: "calm",
    featured: true
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
