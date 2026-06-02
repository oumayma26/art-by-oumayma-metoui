import { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'

import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

function MusicPlayer() {
  const audioRef = useRef(null)
  const { isMusicPlaying, toggleMusic } = useTheme()
  const [isAudioReady, setIsAudioReady] = useState(false)

  // URL de la musique dans le dossier public
  const musicURL = '/music/Wildfire - Jessie Villa.mp3'

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.play().catch(err => console.log('Audio play error:', err))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isMusicPlaying])

  const handleAudioCanPlay = () => {
    setIsAudioReady(true)
  }

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={musicURL}
        loop
        onCanPlay={handleAudioCanPlay}
        crossOrigin="anonymous"
      />

      {/* Music Player Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMusic}
        disabled={!isAudioReady}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-rose-dark text-white shadow-pink hover:bg-rose-medium transition-colors flex items-center justify-center disabled:opacity-50"
        title={isMusicPlaying ? 'Arrêter la musique' : 'Jouer la musique'}
      >
        {isMusicPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <FaPause size={20} />
          </motion.div>
        ) : (
          <FaPlay size={20} />
        )}
      </motion.button>

      {/* Visual indicator */}
      {isMusicPlaying && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="fixed bottom-8 right-8 z-39 w-14 h-14 rounded-full bg-rose-dark opacity-20"
        />
      )}
    </>
  )
}

export default MusicPlayer
