import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { VoiceProvider } from './context/VoiceContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
      <AuthProvider>
        <ThemeProvider>
          <VoiceProvider>
            <App />
          </VoiceProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
)
