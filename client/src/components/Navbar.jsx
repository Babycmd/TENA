import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme()
  const { user, logout } = useContext(AuthContext)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50">
      {/* Glassmorphism Navbar - Compact */}
      <div className="mx-2 mt-2">
        <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/80 shadow-2xl rounded-xl border border-white/20 dark:border-gray-700/50 px-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2">
                <img src="/tena-logo.png" alt="TENA FLOW" className="h-8 w-8 rounded-full border-2 border-black dark:border-white shadow-md" />
                <span className="text-xl font-black bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">TENA</span>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">FLOW</span>
              </Link>
              
              {/* Desktop Menu - Compact Modern Pills */}
              <div className="hidden md:flex items-center gap-1">
                <Link to="/" className="px-3 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-lg transition-all hover:shadow-md text-sm">
                  Home
                </Link>

                <Link to="/finance" className="px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold rounded-lg transition-all hover:shadow-md text-sm">
                  Finance
                </Link>
                
                {user ? (
                  <>
                    <Link to="/dashboard" className="px-3 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-lg transition-all hover:shadow-md text-sm">
                      Dashboard
                    </Link>
                    <button onClick={logout} className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all hover:shadow-md text-sm">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="px-3 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-lg transition-all hover:shadow-md text-sm">
                      Login
                    </Link>
                    <Link to="/register" className="px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold rounded-lg transition-all hover:shadow-md text-sm">
                      Sign Up
                    </Link>
                  </>
                )}
                
                <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:shadow-md text-sm">
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white" 
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="text-2xl">☰</span>
              </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <div className="md:hidden pb-4 space-y-2">
                <Link to="/" className="block py-3 px-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl text-white font-bold">Home</Link>

                <Link to="/finance" className="block py-3 px-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl text-black font-bold">Finance</Link>
                <hr className="my-2 border-gray-300 dark:border-gray-600" />
                {user ? (
                  <>
                    <Link to="/dashboard" className="block py-3 px-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl text-white font-bold">Dashboard</Link>
                    <button onClick={logout} className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white font-bold">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block py-3 px-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl text-white font-bold">Login</Link>
                    <Link to="/register" className="block py-3 px-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl text-black font-bold text-center">Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
