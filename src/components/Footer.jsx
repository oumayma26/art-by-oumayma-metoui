import { FaHeart, FaInstagram, FaPalette, FaPinterest, FaTiktok } from 'react-icons/fa'

import { motion } from 'framer-motion'

function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: 'https://www.instagram.com/omayma.metoui/'
    },
    {
      name: 'Pinterest',
      icon: FaPinterest,
      url: 'https://www.pinterest.com/oumaymametoui/'
    },
    {
      name: 'Tiktok',
      icon: FaTiktok,
      url: 'https://www.tiktok.com/@oumaymametoui'
    }
  ]

  return (
    <footer className="bg-white shadow-pink mt-20 border-t border-rose-misty">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold font-display text-rose-dark mb-4">
              Oumayma's Gallery</h3>
            <p className="text-text-secondary">
              Peintures, créations & explorations artistiques. Développeuse & Artiste.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-display text-rose-dark mb-4">
              Navigation
            </h3>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-text-secondary hover:text-rose-dark transition-colors">
                Galerie
              </a>
              <a href="/about" className="text-text-secondary hover:text-rose-dark transition-colors">
                À propos
              </a>
              <a href="https://oumayma.dev" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-rose-dark transition-colors">
                Portfolio Code
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold font-display text-rose-dark mb-4">
              Me suivre
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-rose-pale text-rose-dark hover:bg-rose-dark hover:text-white transition-colors"
                    title={link.name}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-rose-misty my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left text-text-secondary flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span>Made with</span>
            <FaHeart className="text-rose-dark" />
            <span>and</span>
            <FaPalette className="text-rose-dark" />
            <span>© {currentYear} Oumayma Metoui</span>
          </div>

          <div className="text-center md:text-right text-sm text-text-secondary">
            <p>Développeuse & Artiste | Design × Code</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
