import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Gallery from '../components/Gallery'

function Home() {
  return (
    <>
      <Helmet>
        <title>Galerie d'Art | Oumayma Metoui</title>
        <meta name="description" content="Découvrez ma galerie de peintures personnelle - Huile, Acrylique, Aquarelle" />
        <meta property="og:title" content="Oumayma's Art Gallery" />
        <meta property="og:description" content="Galerie d'art personnelle avec peintures originales" />
      </Helmet>
      
      <Hero />
      <Gallery />
    </>
  )
}

export default Home
