import { motion } from 'framer-motion'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed bottom-8 left-8 z-40 w-14 h-14 rounded-full bg-white border-2 border-rose-dark text-rose-dark shadow-pink hover:shadow-pink-lg transition-all flex items-center justify-center"
      title={isDarkMode ? 'Mode jour' : 'Mode nuit'}
    >
      <motion.div
        animate={{ rotate: isDarkMode ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
