import { createContext, useState, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const toggleTheme = () => setIsDarkMode(!isDarkMode)
  const toggleMusic = () => setIsMusicPlaying(!isMusicPlaying)

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isMusicPlaying, toggleMusic }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
