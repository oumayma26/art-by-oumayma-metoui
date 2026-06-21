import { Helmet } from 'react-helmet-async'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'

function Home() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://oumayma.art'

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    "name": "Oumayma's Art Gallery",
    "description": "Galerie d'art personnelle avec peintures originales - Huile, Acrylique, Aquarelle",
    "url": siteUrl,
    "image": `${siteUrl}/og-image.jpg`,
    "artist": {
      "@type": "Person",
      "name": "Oumayma Metoui"
    }
  }

  return (
    <>
      <Helmet>
        <title>Galerie d'Art | Oumayma Metoui</title>
        <meta name="description" content="Découvrez ma galerie de peintures personnelle - Huile, Acrylique, Aquarelle. Œuvres originales disponibles à la vente." />
        <meta property="og:title" content="Oumayma's Art Gallery" />
        <meta property="og:description" content="Galerie d'art personnelle avec peintures originales" />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Hero />
      <main id="gallery">
        <Gallery />
      </main>
    </>
  )
}

export default Home