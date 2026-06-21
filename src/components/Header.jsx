import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()
  const mobileMenuRef = useRef(null)
  const menuButtonRef = useRef(null)

  const isActive = (path) => location.pathname === path

  // ── Focus trap pour le menu mobile ──
  useEffect(() => {
    if (!isMenuOpen) return
    const menu = mobileMenuRef.current
    if (!menu) return

    const focusable = menu.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const handleTab = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    first?.focus()
    return () => document.removeEventListener('keydown', handleTab)
  }, [isMenuOpen])

  // Fermer le menu au changement de route
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  return (
    <>
      {/* Skip to content (accessibilité) */}
      <a
        href="#gallery"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-rose-dark focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Aller au contenu principal
      </a>

      <header className="bg-white shadow-pink sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
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
            <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-accent' : 'text-text-primary hover:text-rose-dark'}`}>
              {t('navigation.gallery')}
            </Link>
            <Link to="/about" className={`font-medium transition-colors ${isActive('/about') ? 'text-accent' : 'text-text-primary hover:text-rose-dark'}`}>
              {t('navigation.about')}
            </Link>
            <Link to="/contact" className={`font-medium transition-colors ${isActive('/contact') ? 'text-accent' : 'text-text-primary hover:text-rose-dark'}`}>
              {t('navigation.contact')}
            </Link>
            <LanguageSwitcher />
            <a
              href="https://oumayma-portfolio-five.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              ← {t('buttons.back')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-rose-dark text-2xl p-2 rounded-lg hover:bg-rose-pale transition-colors"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </nav>

        {/* Mobile Menu avec AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-rose-pale border-t border-rose-misty overflow-hidden"
            >
              <div className="py-4 px-4 flex flex-col gap-3">
                <Link to="/" className={`py-2 px-4 rounded-lg transition-colors ${isActive('/') ? 'bg-rose-dark text-white' : 'hover:bg-rose-misty'}`}>
                  {t('navigation.gallery')}
                </Link>
                <Link to="/about" className={`py-2 px-4 rounded-lg transition-colors ${isActive('/about') ? 'bg-rose-dark text-white' : 'hover:bg-rose-misty'}`}>
                  {t('navigation.about')}
                </Link>
                <Link to="/contact" className={`py-2 px-4 rounded-lg transition-colors ${isActive('/contact') ? 'bg-rose-dark text-white' : 'hover:bg-rose-misty'}`}>
                  {t('navigation.contact')}
                </Link>
                <div className="py-2 px-4">
                  <LanguageSwitcher />
                </div>
                <a
                  href="https://oumayma.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  ← {t('buttons.back')}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

export default Header