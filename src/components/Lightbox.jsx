import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { techniques } from '../data/paintings'

function Lightbox({ painting, onClose, onPrevious, onNext, hasPrevious, hasNext }) {
  if (!painting) return null

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          variants={contentVariants}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-b from-rose-snow to-rose-pale rounded-3xl overflow-auto shadow-pink-lg"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-rose-dark text-white rounded-full flex items-center justify-center hover:bg-rose-medium transition-colors shadow-lg"
          >
            <FiX size={24} />
          </motion.button>

          <div className="flex flex-col lg:flex-row gap-6 p-8">
            {/* Image */}
            <div className="flex-1 flex items-center justify-center">
              <motion.img
                src={painting.image}
                alt={painting.title}
                className="w-full h-auto rounded-2xl shadow-pink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
              {/* Content */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold font-display text-rose-dark mb-4"
                >
                  {painting.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-text-secondary text-lg mb-6 leading-relaxed"
                >
                  {painting.description}
                </motion.p>

                {/* Details Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-2 gap-4 mb-8 p-4 bg-white rounded-2xl border border-rose-misty"
                >
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
                      Technique
                    </p>
                    <p className="text-lg font-semibold text-rose-dark">
                      {techniques[painting.technique]}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
                      Année
                    </p>
                    <p className="text-lg font-semibold text-rose-dark">
                      {painting.year}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
                      Dimensions
                    </p>
                    <p className="text-lg font-semibold text-rose-dark">
                      {painting.dimensions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
                      Prix
                    </p>
                    <p className="text-lg font-semibold text-gold">
                      {painting.price}€
                    </p>
                  </div>
                </motion.div>

                {/* Status */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  {painting.disponible ? (
                    <span className="badge-available text-base">✓ Disponible</span>
                  ) : (
                    <span className="badge-sold text-base">Vendu</span>
                  )}
                </motion.div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  className="flex items-center gap-2 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                >
                  <FiChevronLeft size={20} />
                  Précédent
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNext}
                  disabled={!hasNext}
                  className="flex items-center gap-2 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                >
                  Suivant
                  <FiChevronRight size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Lightbox
