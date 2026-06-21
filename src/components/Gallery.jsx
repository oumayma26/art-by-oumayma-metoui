import { useCallback, useEffect, useMemo, useState } from 'react'
import { FiRefreshCcw, FiSearch } from 'react-icons/fi'

import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { paintings } from '../data/paintings'
import FilterBar from './FilterBar'
import PaintingCard from './PaintingCard'

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedTechnique, setSelectedTechnique] = useState(searchParams.get('technique') || 'all')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const debouncedSearch = useDebounce(searchTerm, 300)

  // Sync URL avec les filtres
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedTechnique !== 'all') params.set('technique', selectedTechnique)
    if (debouncedSearch) params.set('q', debouncedSearch)
    setSearchParams(params, { replace: true })
  }, [selectedTechnique, debouncedSearch, setSearchParams])

  const filteredPaintings = useMemo(() => {
    return paintings.filter(painting => {
      const matchesTechnique = selectedTechnique === 'all' || painting.technique === selectedTechnique
      const matchesSearch = debouncedSearch === '' ||
        painting.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        painting.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      return matchesTechnique && matchesSearch
    })
  }, [selectedTechnique, debouncedSearch])

  const resetFilters = useCallback(() => {
    setSelectedTechnique('all')
    setSearchTerm('')
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
              placeholder="Rechercher par titre ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-rose pl-12 pr-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-dark/50 hover:text-rose-dark"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar
          selectedTechnique={selectedTechnique}
          onFilterChange={setSelectedTechnique}
        />

        {/* No Results - Empty State */}
        {filteredPaintings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-2xl text-text-secondary mb-2 font-display">Aucun tableau trouvé</p>
            <p className="text-text-secondary mb-6">
              Essayez d'autres critères de recherche ou réinitialisez les filtres.
            </p>
            <button onClick={resetFilters} className="btn-primary inline-flex items-center gap-2">
              <FiRefreshCcw />
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