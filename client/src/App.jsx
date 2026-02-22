import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Hospitals from './pages/Hospitals'
import Doctors from './pages/Doctors'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import AgePage from './pages/AgePage'
import Finance from './pages/Finance'
import AIChat from './pages/AIChat'
import NutritionGame from './pages/NutritionGame'

function App() {
  const { darkMode } = useTheme()
  const [reading, setReading] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Alt') {
        event.preventDefault()
        
        if (!reading && speechSynthesis) {
          // Get main content only, excluding navbar and footer
          const mainContent = document.querySelector('main') || document.getElementById('main-content')
          const text = mainContent ? mainContent.innerText : document.body.innerText
          const utterance = new SpeechSynthesisUtterance(text)
          utterance.lang = 'en-US'
          utterance.rate = 0.9
          
          // Try to use a male voice
          const voices = speechSynthesis.getVoices()
          const maleVoice = voices.find(voice => voice.name.includes('Male') || voice.name.includes('David') || voice.name.includes('Mark') || voice.name.includes('James'))
          if (maleVoice) {
            utterance.voice = maleVoice
          }
          
          speechSynthesis.speak(utterance)
          setReading(true)
          
          utterance.onend = () => setReading(false)
        } else {
          speechSynthesis.cancel()
          setReading(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [reading, speechSynthesis])

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
        <Navbar />
        
        {reading && (
          <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
            <span>Reading... Press ALT to stop</span>
          </div>
        )}
        
        <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/booking/:doctorId?" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/age-calculator" element={<AgePage />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/nutrition-game" element={<NutritionGame />} />
        </Routes>
        </main>
        
        {/* Floating Back Button - All pages except Home */}
        {location.pathname !== '/' && (
          <button 
            onClick={() => window.history.back()}
            className="fixed top-20 left-4 z-50 px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white font-bold rounded-full shadow-lg"
          >
            Back
          </button>
        )}
        
        <Footer />
        
        {/* Floating AI Button - Only on Home page */}
        {location.pathname === '/' && (
          <Link 
            to="/ai-chat" 
            className="fixed bottom-6 left-6 z-50 px-5 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            🤖 AI
          </Link>
        )}

        {/* Floating Age Button - Only on Age page */}
        {location.pathname === '/age-calculator' && (
          <Link 
            to="/nutrition-game" 
            className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1s' }}
          >
            Play Game
          </Link>
        )}

        {location.pathname === '/' && (
          <Link 
            to="/age-calculator" 
            className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.5s' }}
          >
            Age
          </Link>
        )}
      </div>
    </div>
  )
}

export default App
