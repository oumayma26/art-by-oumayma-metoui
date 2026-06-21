import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaInstagram, FaPinterest } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { paintings, techniques } from '../data/paintings'

import { Helmet } from 'react-helmet-async'
import { FiArrowLeft } from 'react-icons/fi'
import Lightbox from '../components/Lightbox'

// ← Import AnimatePresence ici

function PaintingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [painting, setPainting] = useState(null)
  const [showLightbox, setShowLightbox] = useState(false)
  const [relatedPaintings, setRelatedPaintings] = useState([])
  const [showContactModal, setShowContactModal] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const currentPainting = paintings.find(p => p.id === parseInt(id))
    setPainting(currentPainting)

    if (currentPainting) {
      const related = paintings
        .filter(p => p.id !== currentPainting.id && p.technique === currentPainting.technique)
        .slice(0, 3)
      setRelatedPaintings(related)

      // Préchargement images adjacentes
      const currentIndex = paintings.findIndex(p => p.id === currentPainting.id)
      const preloadIds = [currentIndex - 1, currentIndex + 1].filter(
        i => i >= 0 && i < paintings.length
      )
      preloadIds.forEach(i => {
        const img = new Image()
        img.src = paintings[i].image
      })
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!painting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl text-text-secondary">
          Tableau non trouvé
        </motion.p>
      </div>
    )
  }

  const currentIndex = paintings.findIndex(p => p.id === painting.id)
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < paintings.length - 1

  const handlePrevious = () => {
    if (hasPrevious) navigate(`/painting/${paintings[currentIndex - 1].id}`)
  }

  const handleNext = () => {
    if (hasNext) navigate(`/painting/${paintings[currentIndex + 1].id}`)
  }

  const shareOnInstagram = () => {
    const text = `Découvrez "${painting.title}" sur la galerie d'art de Oumayma 🎨\n\n${window.location.href}`
    navigator.clipboard?.writeText(text)
    window.open('https://www.instagram.com/omayma.metoui/', '_blank')
  }

  const shareOnPinterest = () => {
    const text = `${painting.title} - ${painting.description}`
    const url = `https://pinterest.com/pin/create/button/?description=${encodeURIComponent(text)}&media=${encodeURIComponent(painting.image)}&url=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  return (
    <>
      <Helmet>
        <title>{painting.title} | Oumayma's Gallery</title>
        <meta name="description" content={painting.description} />
        <meta property="og:title" content={painting.title} />
        <meta property="og:description" content={painting.description} />
        <meta property="og:image" content={painting.image} />
      </Helmet>

      {/* ✅ AnimatePresence ENVELOPPE le Lightbox ici */}
      <AnimatePresence>
        {showLightbox && (
        <Lightbox
          painting={painting}
          onClose={() => {
            console.log('🔘 onClose appelé')
            setShowLightbox(false)
          }}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      )}
      </AnimatePresence>
a
      {/* Modal Contact */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-pink-lg text-center"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-rose-dark mb-4">Intéressé par cette œuvre ?</h3>
              <p className="text-text-secondary mb-6">
                Contactez Oumayma directement pour plus d'informations sur <strong>{painting.title}</strong>.
              </p>
              <div className="flex flex-col gap-3">
                <a href="mailto:contact@oumayma.art" className="btn-primary">
                  📧 Envoyer un email
                </a>
                <a href="https://www.instagram.com/omayma.metoui/" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  📱 Contacter sur Instagram
                </a>
                <button onClick={() => setShowContactModal(false)} className="text-text-secondary hover:text-rose-dark transition-colors">
                  Fermer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-rose-dark hover:text-rose-medium transition-colors font-medium">
              <FiArrowLeft size={20} />
              Retour à la galerie
            </Link>
          </motion.div>

          {/* Content Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full rounded-3xl overflow-hidden shadow-pink-lg cursor-pointer relative bg-rose-misty"
                onClick={() => setShowLightbox(true)}
              >
                {!imgLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-rose-misty flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-rose-pale/50" />
                  </div>
                )}
                <img
                  src={painting.image}
                  alt={painting.title}
                  className={`w-full h-auto transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImgLoaded(true)}
                />
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  🔍 Cliquer pour agrandir
                </div>
              </motion.div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-rose-dark mb-4">
                  {painting.title}
                </h1>

                <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                  {painting.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-6 mb-8 p-6 bg-white rounded-2xl shadow-pink border border-rose-misty">
                  <div>
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">Technique</p>
                    <p className="text-lg font-bold text-rose-dark">{techniques[painting.technique]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">Année</p>
                    <p className="text-lg font-bold text-rose-dark">{painting.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">Dimensions</p>
                    <p className="text-lg font-bold text-rose-dark">{painting.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">Prix</p>
                    <p className="text-lg font-bold text-gold">{painting.price}€</p>
                  </div>
                </div>

                {/* Status & Share */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                  <div>
                    {painting.disponible ? (
                      <span className="badge-available text-lg">✓ Disponible</span>
                    ) : (
                      <span className="badge-sold text-lg">Vendu</span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareOnInstagram}
                      className="w-12 h-12 rounded-full bg-rose-pale text-rose-dark hover:bg-rose-dark hover:text-white flex items-center justify-center transition-colors"
                      title="Partager sur Instagram"
                    >
                      <FaInstagram size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={shareOnPinterest}
                      className="w-12 h-12 rounded-full bg-rose-pale text-rose-dark hover:bg-rose-dark hover:text-white flex items-center justify-center transition-colors"
                      title="Partager sur Pinterest"
                    >
                      <FaPinterest size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setShowLightbox(true)} className="btn-primary flex-1">
                  🔍 Voir en plein écran
                </button>
                <button
                  onClick={() => painting.disponible && setShowContactModal(true)}
                  disabled={!painting.disponible}
                  className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {painting.disponible ? '💬 Intéressé ?' : 'Non disponible'}
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Précédent
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!hasNext}
              className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant →
            </motion.button>
          </motion.div>

          {/* Related Paintings */}
          {relatedPaintings.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-3xl font-display font-bold text-rose-dark mb-8">
                Autres œuvres en {techniques[painting.technique].toLowerCase()}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPaintings.map((p) => (
                  <Link key={p.id} to={`/painting/${p.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="rounded-2xl overflow-hidden shadow-pink hover:shadow-pink-lg transition-shadow cursor-pointer"
                    >
                      <img src={p.image} alt={p.title} className="w-full h-64 object-cover" loading="lazy" />
                      <div className="p-4 bg-white">
                        <h3 className="font-bold text-rose-dark mb-2">{p.title}</h3>
                        <p className="text-gold text-sm font-semibold">{p.price}€</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default PaintingDetail