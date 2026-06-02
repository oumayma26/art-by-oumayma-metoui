import { Helmet } from 'react-helmet-async'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import MusicPlayer from './components/MusicPlayer'
import ThemeToggle from './components/ThemeToggle'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import PaintingDetail from './pages/PaintingDetail'

function AppContent() {
  const { isDarkMode } = useTheme()

  return (
    <Router>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div
        className={`min-h-screen flex flex-col transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-rose-medium via-rose-dark to-purple-900'
            : 'bg-gradient-rose'
        }`}
      >
        {/* Music Player */}
        <MusicPlayer />

        {/* Theme Toggle */}
        <ThemeToggle />

        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/painting/:id" element={<PaintingDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
