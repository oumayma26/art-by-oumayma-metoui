import { motion } from 'framer-motion'
import { techniques } from '../data/paintings'

function FilterBar({ selectedTechnique, onFilterChange }) {
  const filterOptions = [
    { value: 'all', label: 'Tous' },
    { value: 'huile', label: techniques.huile },
    { value: 'acrylique', label: techniques.acrylique },
    { value: 'aquarelle', label: techniques.aquarelle },
    { value: 'mixed media', label: techniques['mixed media'] }
  ]

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-3 mb-12"
    >
      {filterOptions.map((filter) => (
        <motion.button
          key={filter.value}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter.value)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            selectedTechnique === filter.value
              ? 'bg-rose-dark text-white shadow-pink'
              : 'bg-rose-pale text-rose-dark border border-rose-dark hover:bg-rose-misty'
          }`}
        >
          {filter.label}
        </motion.button>
      ))}
    </motion.div>
  )
}

export default FilterBar
