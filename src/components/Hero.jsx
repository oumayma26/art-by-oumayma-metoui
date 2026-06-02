import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaArrowDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Hero() {
  const { t } = useTranslation()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background image with rose overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'url(/public/img/univers.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Rose overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-pale/80 via-rose-misty/80 to-rose-snow/80" />

      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-32 h-32 opacity-10 hidden md:block z-10"
      >
        <div className="text-8xl">🎨</div>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-32 left-10 w-32 h-32 opacity-10 hidden md:block z-10"
      >
        <div className="text-8xl">✨</div>
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center px-4 z-10 max-w-4xl"
      >
        {/* Accent line */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-12 h-1 bg-gradient-to-r from-transparent to-gold rounded-full" />
          <span className="text-gold font-display text-lg">{t('common.atelier')}</span>
          <div className="w-12 h-1 bg-gradient-to-l from-transparent to-gold rounded-full" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-rose-dark mb-6 leading-tight"
        >
          {t('common.title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-text-secondary italic font-light mb-8"
        >
          {t('common.subtitle')}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-text-primary mb-12 max-w-2xl mx-auto"
        >
          {t('common.description')}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Link
            to="/#gallery"
            className="btn-primary flex items-center gap-2 text-lg"
          >
            <span>{t('hero.cta1')}</span>
            <span>🌸</span>
          </Link>
          <Link
            to="/about"
            className="btn-secondary text-lg"
          >
            {t('hero.cta2')}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <FaArrowDown className="text-rose-dark text-2xl opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
