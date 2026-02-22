import { useState, useRef, useEffect } from 'react'

const AIChat = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('Hello! I am TENA AI. How can I help you today?')
  const [showResponse, setShowResponse] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const giraffeRef = useRef(null)

  // Track mouse position for giraffe
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (giraffeRef.current) {
        const rect = giraffeRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const tenaChat = () => {
    if (!input.trim()) return

    const userInput = input.toLowerCase()
    let response = "I am TENA AI. How can I help you with your health today?"

    // Health-related responses
    if (userInput.includes('fever') || userInput.includes('ትኩሳት')) {
      response = "If you have a fever for more than 3 days, please visit a doctor. Stay hydrated and rest! 🌡️"
    } 
    else if (userInput.includes('headache') || userInput.includes('ራስ ምታት')) {
      response = "Stay hydrated and rest. If pain continues for more than 2 days, consult a specialist. Take pain relievers if needed. 🤕"
    }
    else if (userInput.includes('cough') || userInput.includes('ስንፍና')) {
      response = "Drink warm fluids and honey. If coughing persists for more than a week, see a doctor. 🍵"
    }
    else if (userInput.includes('stomach') || userInput.includes('እርግጠኛ') || userInput.includes('ሆድ')) {
      response = "Avoid spicy foods and stay hydrated. If pain persists, consult a doctor. 🍽️"
    }
    else if (userInput.includes('tired') || userInput.includes('ድካም') || userInput.includes('ሰርካሪታ')) {
      response = "Make sure you're getting enough sleep and nutrition. Consider taking vitamins. If fatigue continues, see a doctor. 😴"
    }
    else if (userInput.includes('help') || userInput.includes('እርዳታ')) {
      response = "እባክዎ የተለየ ምልክዎን ይግለጹ። (Please describe your specific symptoms)"
    }
    else if (userInput.includes('booking') || userInput.includes('ቦታ ማስያዝ')) {
      response = "You can book an appointment through our app! Go to the Doctors or Hospitals page to find specialists. 🏥"
    }
    else if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('ሰላም')) {
      response = "Hello! I'm TENA AI, your health assistant. How can I help you today? 😊"
    }
    else if (userInput.includes('thank')) {
      response = "You're welcome! Stay healthy! 💚"
    }

    setOutput(response)
    setShowResponse(false)
    setTimeout(() => setShowResponse(true), 100)
    setInput('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      tenaChat()
    }
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Giraffe that looks like it's eating the screen */}
      <div 
        ref={giraffeRef}
        className={`fixed z-10 cursor-pointer transition-all duration-300 ${
          isHovering ? 'scale-110' : 'scale-100'
        }`}
        style={{ 
          width: '200px',
          height: '180px',
          bottom: '-20px',
          left: '20px'
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Giraffe Body */}
        <div className="relative">
          {/* Neck */}
          <div 
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-8 bg-yellow-400 rounded-full"
            style={{ 
              height: '100px',
              transform: isHovering ? 'translateX(-50%) rotate(-5deg)' : 'translateX(-50%)'
            }}
          >
            {/* Spots on neck */}
            <div className="absolute top-4 left-1 w-3 h-3 bg-orange-600 rounded-full"></div>
            <div className="absolute top-12 left-2 w-4 h-4 bg-orange-600 rounded-full"></div>
            <div className="absolute top-20 left-1 w-3 h-3 bg-orange-600 rounded-full"></div>
            {/* Head */}
            <div 
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-yellow-400 rounded-full"
              style={{ 
                transform: isHovering ? 'translateX(-50%) scale(1.1)' : 'translateX(-50%)'
              }}
            >
              {/* Eyes */}
              <div className="absolute top-5 left-2 w-4 h-4 bg-black rounded-full"></div>
              <div className="absolute top-5 right-2 w-4 h-4 bg-black rounded-full"></div>
              {/* Snout */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-orange-300 rounded-full"></div>
              {/* Horns */}
              <div className="absolute -top-6 left-2 w-4 h-8 bg-orange-700 rounded-full"></div>
              <div className="absolute -top-6 right-2 w-4 h-8 bg-orange-700 rounded-full"></div>
              {/* Ears */}
              <div className="absolute -top-4 left-0 w-6 h-4 bg-yellow-400 rounded-full"></div>
              <div className="absolute -top-4 right-0 w-6 h-4 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
          {/* Body */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-yellow-400 rounded-3xl">
            {/* Spots on body */}
            <div className="absolute top-2 left-4 w-4 h-4 bg-orange-600 rounded-full"></div>
            <div className="absolute top-6 right-6 w-5 h-5 bg-orange-600 rounded-full"></div>
            <div className="absolute bottom-4 left-8 w-3 h-3 bg-orange-600 rounded-full"></div>
          </div>
          {/* Legs */}
          <div className="absolute bottom-0 left-6 w-3 h-10 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-0 right-6 w-3 h-10 bg-yellow-400 rounded-full"></div>
          {/* Tail */}
          <div className="absolute bottom-8 -right-4 w-8 h-2 bg-yellow-400 rounded-full transform rotate-12"></div>
          {/* Eating animation */}
          {isHovering && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce">
              <span className="text-2xl">🌿</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-center mb-8 text-gray-800 dark:text-white">TENA Mini Chat 🤖</h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          {/* Chat Output */}
          <div className="mb-4 min-h-[200px] max-h-[300px] overflow-y-auto bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            <div className={`${showResponse ? 'animate-scale-in' : ''}`}>
              <p className="text-gray-800 dark:text-white text-sm">{output}</p>
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="flex gap-2">
            <input
              type="text"
              id="chatInput"
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Ask about symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              onClick={tenaChat} 
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all hover:scale-105 animate-float"
            >
              Send
            </button>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mt-6">
          <p className="text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">Quick Questions:</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setInput('I have a fever'); tenaChat() }} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">🤒 Fever</button>
            <button onClick={() => { setInput('I have a headache'); tenaChat() }} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">🤕 Headache</button>
            <button onClick={() => { setInput('I have a cough'); tenaChat() }} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">😷 Cough</button>
            <button onClick={() => { setInput('I feel tired'); tenaChat() }} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">😴 Tired</button>
          </div>
        </div>

        {/* TENA AI floating */}
        <div className="mt-8 flex justify-center">
          <span className="text-6xl animate-float">🤖</span>
        </div>
      </div>
    </div>
  )
}

export default AIChat
