import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const NutritionGame = () => {
  const [score, setScore] = useState(10) // Start from 10
  const [goodFoods, setGoodFoods] = useState(0) // Track good foods caught
  const [badFoods, setBadFoods] = useState(0) // Track bad foods caught
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [basketPosition, setBasketPosition] = useState(50)
  const [mode, setMode] = useState('adult')
  const [items, setItems] = useState([])
  const [currentTip, setCurrentTip] = useState('')
  const [speechSynthesis, setSpeechSynthesis] = useState(null)
  const [lastCaughtItem, setLastCaughtItem] = useState(null)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis)
      window.speechSynthesis.getVoices()
    }
  }, [])

  const speak = (text) => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      
      const voices = speechSynthesis.getVoices()
      const maleVoice = voices.find(voice => 
        voice.name.includes('Male') || 
        voice.name.includes('David') || 
        voice.name.includes('Mark') || 
        voice.name.includes('James')
      )
      if (maleVoice) {
        utterance.voice = maleVoice
      }
      
      speechSynthesis.speak(utterance)
    }
  }

  // Welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      speak('Lunchbox Hero. Catch the healthy foods and avoid the junk foods. Press Start to begin.')
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleModeChange = (newMode) => {
    setMode(newMode)
    if (newMode === 'child') {
      speak('Child mode. Catch the good foods!')
    } else {
      speak('Adult mode. Learn about nutrition while you play!')
    }
  }
  
  const healthyItems = [
    { emoji: '🍎', name: 'Apple', points: 10, tip: 'An apple contains 4g of fiber!' },
    { emoji: '💧', name: 'Water', points: 10, tip: 'Water makes up 60% of your body!' },
    { emoji: '🥕', name: 'Carrot', points: 10, tip: 'Carrots are great for your eyes!' },
    { emoji: '🍌', name: 'Banana', points: 10, tip: 'Bananas are rich in potassium!' },
    { emoji: '🥦', name: 'Broccoli', points: 10, tip: 'Broccoli is packed with vitamins!' },
  ]
  
  const junkItems = [
    { emoji: '🍔', name: 'Burger', points: -5, tip: 'Fast food is high in unhealthy fats' },
    { emoji: '🥤', name: 'Soda', points: -5, tip: 'Soda contains too much sugar!' },
    { emoji: '🍟', name: 'Fries', points: -5, tip: 'French fries are high in calories' },
    { emoji: '🍕', name: 'Pizza', points: -5, tip: 'Pizza can be high in sodium' },
    { emoji: '🍩', name: 'Donut', points: -5, tip: 'Donuts are loaded with sugar' },
  ]

  const getRandomTip = useCallback(() => {
    const allItems = [...healthyItems, ...junkItems]
    const randomItem = allItems[Math.floor(Math.random() * allItems.length)]
    return randomItem.tip
  }, [])

  useEffect(() => {
    if (mode === 'adult' && !isPlaying) {
      setCurrentTip(getRandomTip())
    }
  }, [mode, isPlaying, getRandomTip])

  const startGame = () => {
    setScore(10) // Start from 10
    setGoodFoods(0)
    setBadFoods(0)
    setGameOver(false)
    setGameWon(false)
    setIsPlaying(true)
    setBasketPosition(50)
    setItems([])
    speak('Go! Catch the healthy foods. Use left and right arrow keys to move your basket.')
  }

  // Spawn items
  useEffect(() => {
    if (!isPlaying || gameOver) return
    
    const spawnItem = () => {
      const isHealthy = Math.random() > 0.4
      const itemList = isHealthy ? healthyItems : junkItems
      const item = itemList[Math.floor(Math.random() * itemList.length)]
      
      const newItem = {
        ...item,
        id: Date.now() + Math.random(),
        left: Math.random() * 70 + 10,
        top: -10,
        speed: Math.random() * 1.5 + 1.5,
      }
      
      setItems(prev => [...prev, newItem])
    }

    const spawnInterval = setInterval(spawnItem, 1200)
    return () => clearInterval(spawnInterval)
  }, [isPlaying, gameOver])

  // Game loop - move items
  useEffect(() => {
    if (!isPlaying || gameOver) return
    
    const gameLoop = setInterval(() => {
      setItems(prevItems => {
        const updated = prevItems.map(item => ({
          ...item,
          top: item.top + item.speed
        }))
        
        // Check for catch
        const caughtItems = updated.filter(item => {
          if (item.top > 80 && item.top < 95) {
            const basketLeft = basketPosition
            const itemLeft = item.left
            if (Math.abs(basketLeft - itemLeft) < 12) {
              setScore(s => s + item.points)
              
              // Track good and bad foods
              if (item.points > 0) {
                setGoodFoods(g => g + 1)
                speak(`${item.name}. ${item.tip}`)
                setCurrentTip(`Great catch! ${item.tip}`)
                
                // Check win condition: 7+ good foods, 3 or less bad foods
                setGoodFoods(g => {
                  if (g + 1 >= 7) {
                    // Check current bad foods
                    return g + 1
                  }
                  return g + 1
                })
              } else {
                setBadFoods(b => b + 1)
                speak(`${item.name}. ${item.tip}`)
                setCurrentTip(`Oops! ${item.tip}`)
              }
              return false
            }
          }
          return item.top < 100
        })
        
        return caughtItems
      })
      
      // Check game over (4 bad foods) or win (7 good foods with 3 or less bad foods)
      setBadFoods(currentBad => {
        if (currentBad >= 4) {
          setGameOver(true)
          setIsPlaying(false)
          speak('Boo! Game over. Too many junk foods! Fast food is high in unhealthy fats, soda contains too much sugar, french fries are high in calories, pizza can be high in sodium, and donuts are loaded with sugar. These can cause obesity, diabetes, and heart problems.')
          return currentBad
        }
        return currentBad
      })
      
      setGoodFoods(currentGood => {
        if (currentGood >= 7) {
          // Check if bad foods is 3 or less
          let badCount = 0
          setBadFoods(b => { badCount = b; return b })
          if (badCount <= 3) {
            setGameWon(true)
            setIsPlaying(false)
            speak('Congratulations! You won! Great job eating healthy foods. Apples contain fiber, water hydrates your body, carrots are great for your eyes, bananas are rich in potassium, and broccoli is packed with vitamins. Eating healthy keeps you strong, helps you grow, and prevents diseases!')
          }
        }
        return currentGood
      })
    }, 50)

    return () => clearInterval(gameLoop)
  }, [isPlaying, gameOver, basketPosition, mode, goodFoods, badFoods])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return
      if (e.key === 'ArrowLeft') {
        setBasketPosition(prev => Math.max(10, prev - 8))
      } else if (e.key === 'ArrowRight') {
        setBasketPosition(prev => Math.min(90, prev + 8))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying])

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-black text-center mb-2 text-green-600">
          Lunchbox Hero 🎮
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Catch healthy foods! Avoid junk food!
        </p>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => handleModeChange('child')}
            className={`px-5 py-2 rounded-full font-bold text-sm ${
              mode === 'child' 
                ? 'bg-yellow-400 text-black shadow-lg' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            👶 Child Mode
          </button>
          <button
            onClick={() => handleModeChange('adult')}
            className={`px-5 py-2 rounded-full font-bold text-sm ${
              mode === 'adult' 
                ? 'bg-blue-500 text-white shadow-lg' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            👨 Adult Mode
          </button>
        </div>

        {/* Health Tips - Adult Mode */}
        {mode === 'adult' && (
          <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg mb-4 text-center">
            <span className="text-blue-800 dark:text-blue-200 text-sm">
              💡 {currentTip}
            </span>
          </div>
        )}

        {/* Score */}
        <div className="text-center mb-3">
          <span className="text-2xl font-black">
            Score: <span className={score >= 0 ? 'text-green-600' : 'text-red-500'}>{score}</span>
          </span>
        </div>

        {/* Game Area */}
        <div 
          className="relative w-full h-80 bg-gradient-to-b from-sky-200 to-green-100 rounded-2xl overflow-hidden border-4 border-green-300 shadow-xl"
          style={{ touchAction: 'none' }}
        >
          {/* Items */}
          {items.map(item => (
            <div
              key={item.id}
              className="absolute text-4xl transition-none"
              style={{
                left: item.left + '%',
                top: item.top + '%',
              }}
            >
              {item.emoji}
            </div>
          ))}

          {/* Basket */}
          <div 
            className="absolute text-5xl transition-all duration-100"
            style={{ 
              left: basketPosition + '%',
              bottom: '10px',
              transform: 'translateX(-50%)',
            }}
          >
            🧺
          </div>

          {/* Game Over Overlay */}
          {gameOver && !gameWon && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-black text-red-500 mb-2">Game Over!</h2>
              <p className="text-white text-xl mb-4">Bad Foods: {badFoods}/4</p>
              <button 
                onClick={startGame} 
                className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full mb-4"
              >
                Play Again
              </button>
              <Link 
                to="/hospitals" 
                className="text-green-400 hover:text-green-300 font-bold"
              >
                Need a Dietician?
              </Link>
            </div>
          )}

          {/* Win Overlay */}
          {gameWon && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
              <h2 className="text-3xl font-black text-yellow-400 mb-2">You Won!</h2>
              <p className="text-white text-xl mb-4">Good Foods: {goodFoods} | Bad Foods: {badFoods}</p>
              <button 
                onClick={startGame} 
                className="px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full mb-4"
              >
                Play Again
              </button>
            </div>
          )}

          {/* Start Overlay */}
          {!isPlaying && !gameOver && !gameWon && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <button 
                onClick={startGame} 
                className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold text-xl rounded-full shadow-lg animate-bounce"
              >
                ▶️ Start Game
              </button>
              <p className="text-white mt-4 text-sm">Use ← → arrow keys to move</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍎</span>
            <span className="font-bold text-green-600">+10</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍔</span>
            <span className="font-bold text-red-500">-5</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutritionGame
