import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { techniques } from '../data/paintings'

function PaintingCard({ painting }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="h-full">
      <Link to={`/painting/${painting.id}`}>
        <div className="card-art h-full flex flex-col overflow-hidden group cursor-pointer">
          {/* Image Container */}
          <div className="relative h-80 md:h-96 overflow-hidden bg-rose-misty flex items-center justify-center">
            <motion.img
              src={painting.image}
              alt={painting.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />

            {/* Overlay with badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4"
            >
              <div className="w-full">
                {painting.disponible ? (
                  <span className="badge-available">Disponible</span>
                ) : (
                  <span className="badge-sold">Vendu</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-grow flex flex-col p-6">
            {/* Title */}
            <motion.h3
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              className="text-xl md:text-2xl font-bold font-display text-rose-dark mb-2 line-clamp-2"
            >
              {painting.title}
            </motion.h3>

            {/* Technique */}
            <p className="text-sm text-text-secondary mb-3 font-medium">
              {techniques[painting.technique]}
            </p>

            {/* Description */}
            <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
              {painting.description}
            </p>

            {/* Footer with price and year */}
            <div className="flex items-center justify-between pt-4 border-t border-rose-misty">
              <div>
                <p className="text-xs text-text-secondary">Prix</p>
                <p className="text-lg font-bold text-gold">{painting.price}€</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-secondary">{painting.year}</p>
                <p className="text-sm text-text-secondary">{painting.dimensions}</p>
              </div>
            </div>
          </div>

          {/* CTA on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="px-6 pb-4"
          >
            <button className="w-full btn-primary text-sm">
              Voir les détails
            </button>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

export default PaintingCard
