import { useEffect, useState } from 'react'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { paintings, techniques } from '../data/paintings'

import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

// ← IMPORT

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    selectedPaintings: []
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const TO_EMAIL = import.meta.env.VITE_EMAILJS_TO_EMAIL

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY)
    }
  }, [PUBLIC_KEY])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePaintingToggle = (paintingId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedPaintings.includes(paintingId)
      if (isSelected) {
        return {
          ...prev,
          selectedPaintings: prev.selectedPaintings.filter(id => id !== paintingId)
        }
      } else {
        return {
          ...prev,
          selectedPaintings: [...prev.selectedPaintings, paintingId]
        }
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      setError('Configuration EmailJS incomplète. Vérifie le fichier .env')
      return
    }

    setIsLoading(true)
    setError(null)

    // Crée la liste des tableaux sélectionnés avec leurs détails
    const selectedPaintingsList = paintings
      .filter(p => formData.selectedPaintings.includes(p.id))
      .map(p => `${p.title} (${techniques[p.technique] || p.technique}) - ${p.dimensions}`)
      .join('\n')

    const templateParams = {
      to_email: TO_EMAIL,
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      selected_paintings: selectedPaintingsList || 'Aucun tableau sélectionné'
    }

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then(() => {
        setIsSubmitted(true)
        setFormData({ 
          name: '', 
          email: '', 
          subject: '', 
          message: '',
          selectedPaintings: []
        })
        setIsLoading(false)
        setTimeout(() => setIsSubmitted(false), 5000)
      })
      .catch((err) => {
        setError(`Erreur: ${err.text || 'Inconnue'}`)
        setIsLoading(false)
      })
  }

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      value: 'oumayma.metoui@gmail.com',
      link: 'mailto:oumayma.metoui@gmail.com'
    },
    {
      icon: FiPhone,
      title: 'Téléphone',
      value: '+216 55 158 591',
      link: 'tel:+21655158591'
    },
    {
      icon: FiMapPin,
      title: 'Localisation',
      value: 'Tunis, Tunisie',
      link: '#'
    }
  ]

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
    <>
      <Helmet>
        <title>Contact | Oumayma Metoui</title>
        <meta name="description" content="Contactez-moi pour des commandes, collaborations ou toute question" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl font-bold font-display mb-4 text-text-primary"
          >
            Me Contacter
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl mx-auto"
          >
            Vous avez des questions sur un tableau ? Sélectionnez-le ci-dessous !
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.a
                key={index}
                href={info.link}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-lg bg-white shadow-pink hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-rose">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-text-primary">{info.title}</h3>
                </div>
                <p className="text-text-secondary hover:text-rose-dark transition-colors">
                  {info.value}
                </p>
              </motion.a>
            )
          })}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-lg shadow-pink p-8 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold font-display mb-6 text-text-primary">
            Envoyez-moi un message
          </h2>

          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700"
            >
              ✓ Merci ! Votre message a été envoyé avec succès.
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700"
            >
              ✗ {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sélection des tableaux */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Tableaux concernés (optionnel)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paintings.map((painting) => {
                  const isSelected = formData.selectedPaintings.includes(painting.id)
                  return (
                    <button
                      key={painting.id}
                      type="button"
                      onClick={() => handlePaintingToggle(painting.id)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-rose-dark bg-rose-pale text-rose-dark'
                          : 'border-gray-200 hover:border-rose-medium text-text-primary'
                      }`}
                    >
                      <div className="font-medium">{painting.title}</div>
                      <div className="text-sm text-text-secondary">
                        {techniques[painting.technique] || painting.technique}
                        {painting.disponible ? ' • Disponible' : ' • Vendu'}
                      </div>
                    </button>
                  )
                })}
              </div>
              {formData.selectedPaintings.length > 0 && (
                <p className="mt-2 text-sm text-rose-dark">
                  {formData.selectedPaintings.length} tableau(x) sélectionné(s)
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-rose-dark focus:outline-none transition-colors"
                placeholder="Votre nom"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-rose-dark focus:outline-none transition-colors"
                placeholder="votre.email@example.com"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-rose-dark focus:outline-none transition-colors"
                placeholder="Sujet de votre message"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-rose-dark focus:outline-none transition-colors resize-none"
                placeholder="Votre message..."
              ></textarea>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 font-semibold text-white rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Envoi en cours...' : 'Envoyer le message'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Contact