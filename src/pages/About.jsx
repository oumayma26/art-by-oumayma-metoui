import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaHeart } from 'react-icons/fa'

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <>
      <Helmet>
        <title>À Propos | Oumayma Metoui - Artiste & Développeuse</title>
        <meta name="description" content="Découvrez mon parcours artistique et professionnel" />
      </Helmet>

      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-rose-dark mb-4">
              À Propos de Moi
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
          >
            {/* Photo */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 rounded-full border-4 border-gold overflow-hidden shadow-pink-lg">
                  <img
                    src="/public/img/me.png"
                    alt="Oumayma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-5 -right-5 text-4xl"
                >
                  ✨
                </motion.div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-rose-dark">
                Bienvenue dans mon univers
              </h2>

              <p className="text-lg text-text-secondary leading-relaxed">
                Je suis Oumayma, développeuse et artiste passionnée. Mon parcours a toujours été partagé
                entre deux mondes : le code et la peinture. Ces deux disciplines m'ont appris la même
                chose : la créativité n'a pas de limites.
              </p>

              <p className="text-lg text-text-secondary leading-relaxed">
                Depuis mon plus jeune âge, je peins pour exprimer ce qui ne peut pas être dit avec des mots.
                Chaque toile est une conversation entre mon âme et le vide blanc, remplie d'émotions,
                de couleurs et de rêves.
              </p>

              <p className="text-lg text-text-secondary leading-relaxed">
                Cette galerie est le reflet de mon évolution artistique, où la science rencontre l'art,
                où la logique danse avec l'émotion.
              </p>

              <motion.p
                className="text-2xl italic font-display text-rose-dark flex items-center gap-3 pt-4"
                whileHover={{ scale: 1.05 }}
              >
                <FaHeart className="text-rose-dark" />
                <span>La créativité n'a pas de limites</span>
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { label: 'Tableaux Créés', value: '50+' },
              { label: 'Années d\'Expérience', value: '8' },
              { label: 'Expositions', value: '12' },
              { label: 'Collecteurs', value: '100+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 rounded-3xl bg-white shadow-pink border border-rose-misty"
              >
                <p className="text-3xl font-bold text-gold mb-2">{stat.value}</p>
                <p className="text-text-secondary font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Journey Timeline */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-pink border border-rose-misty"
          >
            <h3 className="text-2xl font-display font-bold text-rose-dark mb-8">
              Mon Parcours
            </h3>

            <div className="space-y-6">
              {[
                {
                  year: '2016',
                  title: 'Débuts artistiques',
                  description: 'J\'ai commencé à peindre sérieusement et à développer mon propre style.'
                },
                {
                  year: '2018',
                  title: 'Première exposition',
                  description: 'Présentation de mes œuvres dans une petite galerie locale.'
                },
                {
                  year: '2020',
                  title: 'Confluence du code et de l\'art',
                  description: 'J\'ai découvert que la programmation était aussi créative que la peinture.'
                },
                {
                  year: '2024',
                  title: 'Portfolio numérique',
                  description: 'Création de cette galerie en ligne pour partager ma passion avec le monde.'
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex gap-6 pb-6 border-b border-rose-misty last:border-0 last:pb-0"
                >
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-dark text-white font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold text-rose-dark">{milestone.title}</h4>
                    <p className="text-text-secondary">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default About
