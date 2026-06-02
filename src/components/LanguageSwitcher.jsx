import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' }
  ]

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('language', lng)
    document.documentElement.lang = lng
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-bold text-sm transition-all border ${
          isOpen
            ? 'bg-rose-dark text-white border-rose-dark shadow-pink'
            : 'bg-white/90 backdrop-blur-sm text-text-primary hover:bg-rose-pale border-rose-misty'
        }`}
      >
        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs bg-rose-pale text-rose-dark">
          {currentLang.label}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 bg-white rounded-xl shadow-pink-lg border border-rose-misty overflow-hidden z-50 p-2 min-w-[120px]"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  i18n.language === lang.code
                    ? 'bg-rose-pale text-rose-dark'
                    : 'text-text-primary hover:bg-gray-50'
                }`}
              >
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs bg-rose-pale text-rose-dark">
                  {lang.label}
                </span>
                <span className="text-xs font-medium">
                  {lang.code === 'fr' && 'Français'}
                  {lang.code === 'en' && 'English'}
                  {lang.code === 'ar' && 'العربية'}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSwitcher