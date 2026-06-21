import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { techniques } from '../data/paintings'

function PaintingCard({ painting }) {
  const isAvailable = painting.disponible
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        to={`/painting/${painting.id}`}
        className="card-art h-full flex flex-col overflow-hidden group cursor-pointer block"
        aria-label={`Voir les détails de ${painting.title}`}
      >
        {/* Image Container */}
        <div className="relative h-80 md:h-96 overflow-hidden bg-rose-misty">
          {/* Skeleton / Blur placeholder */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-rose-misty animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-rose-pale/50" />
            </div>
          )}
          
          <img
            src={painting.image}
            alt={painting.title}
            className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={(e) => {
              e.target.src = '/placeholder-painting.jpg'
              e.target.alt = 'Image non disponible'
              setImgLoaded(true)
            }}
          />

          {/* Badge de disponibilité */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                isAvailable
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}
            >
              {isAvailable ? 'Disponible' : 'Vendu'}
            </span>
          </div>

          {/* Overlay subtil au hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col p-6">
          <h3 className="text-xl md:text-2xl font-bold font-display text-rose-dark mb-2 line-clamp-2 group-hover:text-rose-700 transition-colors">
            {painting.title}
          </h3>

          <p className="text-sm text-text-secondary mb-3 font-medium">
            {techniques[painting.technique] || 'Technique inconnue'}
          </p>

          <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
            {painting.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-rose-misty">
            <div>
              <p className="text-xs text-text-secondary mb-1">Prix</p>
              <p className={`text-lg font-bold ${painting.price ? 'text-gold' : 'text-text-secondary italic'}`}>
                {painting.price
                  ? `${painting.price.toLocaleString('fr-FR')} €`
                  : 'Sur demande'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary mb-1">Année</p>
              <p className="text-sm text-text-secondary font-medium">
                {painting.year}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {painting.dimensions}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6">
          <span className="w-full btn-primary text-sm inline-flex items-center justify-center gap-2">
            Voir les détails
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default PaintingCard