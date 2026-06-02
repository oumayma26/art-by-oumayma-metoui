import { FiMenu, FiX } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-pink sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo/Title */}
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold font-display text-rose-dark"
          >
            🎨 Oumayma
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`font-medium transition-colors ${
              isActive('/') ? 'text-accent' : 'text-text-primary hover:text-rose-dark'
            }`}
          >
            {t('navigation.gallery')}
          </Link>
          <Link
            to="/about"
            className={`font-medium transition-colors ${
              isActive('/about') ? 'text-accent' : 'text-text-primary hover:text-rose-dark'
            }`}
          >
            {t('navigation.about')}
          </Link>
          <Link
            to="/contact"
            className={`font-medium transition-colors ${
              isActive('/contact') ? 'text-accent' : 'text-text-primary hover:text-rose-dark'
            }`}
          >
            {t('navigation.contact')}
          </Link>
          <LanguageSwitcher />
          <a
            href="https://oumayma.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            ← {t('buttons.back')}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-rose-dark text-2xl"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-rose-pale border-t border-rose-misty py-4 px-4"
        >
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`py-2 px-4 rounded-lg transition-colors ${
                isActive('/') ? 'bg-rose-dark text-white' : 'hover:bg-rose-misty'
              }`}
            >
              {t('navigation.gallery')}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`py-2 px-4 rounded-lg transition-colors ${
                isActive('/about') ? 'bg-rose-dark text-white' : 'hover:bg-rose-misty'
              }`}
            >
              {t('navigation.about')}
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`py-2 px-4 rounded-lg transition-colors ${
                isActive('/contact') ? 'bg-rose-dark text-white' : 'hover:bg-rose-misty'
              }`}
            >
              {t('navigation.contact')}
            </Link>
            <div className="py-2 px-4">
              <LanguageSwitcher />
            </div>
            <a
              href="https://oumayma.dev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="btn-primary text-center"
            >
              {t('buttons.back')}
            </a>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header
