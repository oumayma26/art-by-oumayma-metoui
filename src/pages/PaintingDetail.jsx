import { useEffect, useState } from 'react'
import { FaInstagram, FaPinterest } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { paintings, techniques } from '../data/paintings'

import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiArrowLeft } from 'react-icons/fi'
import Lightbox from '../components/Lightbox'

function PaintingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [painting, setPainting] = useState(null)
  const [showLightbox, setShowLightbox] = useState(false)
  const [relatedPaintings, setRelatedPaintings] = useState([])

  useEffect(() => {
    const currentPainting = paintings.find(p => p.id === parseInt(id))
    setPainting(currentPainting)

    if (currentPainting) {
      // Get related paintings (same technique)
      const related = paintings
        .filter(p => p.id !== currentPainting.id && p.technique === currentPainting.technique)
        .slice(0, 3)
      setRelatedPaintings(related)
    }
  }, [id])

  if (!painting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl text-text-secondary"
        >
          Tableau non trouvé
        </motion.p>
      </div>
    )
  }

  const currentIndex = paintings.findIndex(p => p.id === painting.id)
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < paintings.length - 1

  const handlePrevious = () => {
    if (hasPrevious) {
      navigate(`/painting/${paintings[currentIndex - 1].id}`)
    }
  }

  const handleNext = () => {
    if (hasNext) {
      navigate(`/painting/${paintings[currentIndex + 1].id}`)
    }
  }

  const shareOnInstagram = () => {
    const text = `Découvrez "${painting.title}" sur la galerie d'art de Oumayma 🎨\n\nOumayma's Art Gallery`
    const url = `https://www.instagram.com/omayma.metoui/`
    window.open(`${url}`, '_blank')
  }

  const shareOnPinterest = () => {
    const text = `${painting.title} - ${painting.description}`
    const url = `https://pinterest.com/pin/create/button/?description=${encodeURIComponent(text)}&media=${encodeURIComponent(painting.image)}`
    window.open(url, '_blank')
  }



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
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

      {/* Lightbox Modal */}
      <Lightbox
        painting={showLightbox ? painting : null}
        onClose={() => setShowLightbox(false)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />

      {/* Main Content */}
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-rose-dark hover:text-rose-medium transition-colors font-medium"
            >
              <FiArrowLeft size={20} />
              Retour à la galerie
            </Link>
          </motion.div>

          {/* Content Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            {/* Image */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full rounded-3xl overflow-hidden shadow-pink-lg cursor-pointer"
                onClick={() => setShowLightbox(true)}
              >
                <img
                  src={painting.image}
                  alt={painting.title}
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>

            {/* Info */}
            <motion.div variants={itemVariants} className="flex flex-col justify-between">
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
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">
                      Technique
                    </p>
                    <p className="text-lg font-bold text-rose-dark">
                      {techniques[painting.technique]}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">
                      Année
                    </p>
                    <p className="text-lg font-bold text-rose-dark">
                      {painting.year}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">
                      Dimensions
                    </p>
                    <p className="text-lg font-bold text-rose-dark">
                      {painting.dimensions}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">
                      Prix
                    </p>
                    <p className="text-lg font-bold text-gold">
                      {painting.price}€
                    </p>
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
                  Voir en plein écran
                </button>
                <button
                  onClick={() => alert('Merci de votre intérêt ! Veuillez nous contacter pour plus d\'informations.')}
                  disabled={!painting.disponible}
                  className="btn-secondary flex-1 disabled:opacity-50"
                >
                  {painting.disponible ? 'Intéressé ?' : 'Non disponible'}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
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
                      <img src={p.image} alt={p.title} className="w-full h-64 object-cover" />
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
