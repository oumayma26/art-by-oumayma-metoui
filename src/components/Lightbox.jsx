import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

import { paintings } from '../data/paintings'

function Lightbox({ painting, onClose, onPrevious, onNext, hasPrevious, hasNext }) {
  const [direction, setDirection] = useState(0)

  // ── Navigation clavier ──
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && hasPrevious) {
      setDirection(-1)
      onPrevious()
    }
    if (e.key === 'ArrowRight' && hasNext) {
      setDirection(1)
      onNext()
    }
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext])

  useEffect(() => {
    if (!painting) return
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [painting, handleKeyDown])

  // ── Swipe mobile ──
  const [touchStart, setTouchStart] = useState(null)
  const minSwipeDistance = 50

  const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX)
  const onTouchEnd = (e) => {
    if (!touchStart) return
    const distance = touchStart - e.changedTouches[0].clientX
    if (distance > minSwipeDistance && hasNext) { setDirection(1); onNext() }
    if (distance < -minSwipeDistance && hasPrevious) { setDirection(-1); onPrevious() }
    setTouchStart(null)
  }

  if (!painting) return null

  const currentIndex = paintings.findIndex(p => p.id === painting.id)

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Compteur */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          {currentIndex + 1} / {paintings.length}
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
        >
          <FiX size={24} />
        </motion.button>

        {/* Previous Button */}
        {hasPrevious && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setDirection(-1); onPrevious() }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <FiChevronLeft size={24} />
          </motion.button>
        )}

        {/* Next Button */}
        {hasNext && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setDirection(1); onNext() }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <FiChevronRight size={24} />
          </motion.button>
        )}

        {/* Image seule */}
        <motion.div
          key={painting.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="max-w-[90vw] max-h-[85vh] flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={painting.image}
            alt={painting.title}
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
            draggable={false}
          />
        </motion.div>

        {/* Titre en bas */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center">
          <p className="text-white/90 text-lg font-medium drop-shadow-lg">
            {painting.title}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Lightbox