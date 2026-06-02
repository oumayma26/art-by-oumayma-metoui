import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import { paintings } from '../data/paintings'
import PaintingCard from './PaintingCard'
import FilterBar from './FilterBar'

function Gallery() {
  const [selectedTechnique, setSelectedTechnique] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter and search paintings
  const filteredPaintings = useMemo(() => {
    return paintings.filter(painting => {
      const matchesTechnique = selectedTechnique === 'all' || painting.technique === selectedTechnique
      const matchesSearch = painting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           painting.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesTechnique && matchesSearch
    })
  }, [selectedTechnique, searchTerm])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="gallery" className="py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-rose-dark mb-4">
            Ma Collection
          </h2>
          <p className="text-text-secondary text-lg">
            {filteredPaintings.length} tableau{filteredPaintings.length > 1 ? 'x' : ''} sélectionné{filteredPaintings.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 max-w-xl mx-auto"
        >
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-rose-dark text-xl" />
            <input
              type="text"
              placeholder="Rechercher par titre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-rose pl-12"
            />
          </div>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar
          selectedTechnique={selectedTechnique}
          onFilterChange={setSelectedTechnique}
        />

        {/* No Results */}
        {filteredPaintings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-2xl text-text-secondary mb-4">Aucun tableau trouvé</p>
            <button
              onClick={() => {
                setSelectedTechnique('all')
                setSearchTerm('')
              }}
              className="btn-primary"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        ) : (
          /* Gallery Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPaintings.map((painting) => (
              <motion.div key={painting.id} variants={itemVariants}>
                <PaintingCard painting={painting} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Gallery
