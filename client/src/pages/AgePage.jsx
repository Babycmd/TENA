import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const AgePage = () => {
  const [birthDate, setBirthDate] = useState('')
  const [age, setAge] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis)
      // Load voices
      window.speechSynthesis.getVoices()
    }
  }, [])

  // Welcome message on page load - just prompts user to enter date, doesn't continue
  useEffect(() => {
    const timer = setTimeout(() => {
      speak('Enter your birth date.')
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const speak = (text) => {
    if (speechSynthesis) {
      speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      
      // Try to use a male voice
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
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const calculateAge = () => {
    if (!birthDate) {
      speak('Please enter your birth date.')
      alert('Please select your birth date.')
      return
    }
    
    const today = new Date()
    const birth = new Date(birthDate)
    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    
    if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
      years--
      months += 12
    }
    
    if (today.getDate() < birth.getDate()) {
      months--
      if (months < 0) months += 12
    }
    
    setAge({ years, months })
    setShowResult(false)
    setTimeout(() => setShowResult(true), 100)
    
    // Speak the result after animation
    setTimeout(() => {
      const responsibility = getResponsibility(years)
      speak(`Your age is ${years} years and ${months} months. ${responsibility.speech}`)
    }, 500)
  }

  const getResponsibility = (ageYears) => {
    if (ageYears < 1) {
      return {
        title: "Baby",
        description: "You need full-time care from parents/guardians.",
        responsibilities: [
          "Dependent on parents/guardians",
          "Regular feeding and sleep schedule",
          "Regular health checkups",
          "Lots of love and attention"
        ],
        speech: "You are a Baby. You need full-time care from your parents or guardians."
      }
    } else if (ageYears < 3) {
      return {
        title: "Toddler",
        description: "You are growing fast and learning new things!",
        responsibilities: [
          "Full care from parents/guardians",
          "Learning to walk and talk",
          "Playing and exploring safely",
          "Starting to learn basic words"
        ],
        speech: "You are a Toddler. You are growing fast and learning new things!"
      }
    } else if (ageYears < 6) {
      return {
        title: "Preschooler",
        description: "Time to play, learn, and make friends!",
        responsibilities: [
          "Under parental supervision",
          "Learning through play",
          "Starting preschool",
          "Socializing with other kids"
        ],
        speech: "You are a Preschooler. Time to play, learn, and make friends!"
      }
    } else if (ageYears < 13) {
      return {
        title: "School Age",
        description: "Time to study and have fun with friends!",
        responsibilities: [
          "Going to school regularly",
          "Doing homework",
          "Making friends and being kind",
          "Limiting screen time",
          "Staying active and healthy"
        ],
        speech: "You are in School Age. Time to study and have fun with friends! Your responsibilities include going to school regularly, doing homework, and staying active and healthy."
      }
    } else if (ageYears < 18) {
      return {
        title: "Teenager",
        description: "Growing up and becoming more independent!",
        responsibilities: [
          "Focus on education and studies",
          "Start taking responsibility for actions",
          "Listen to parents/guardians",
          "Respect others and their opinions",
          "Use technology responsibly",
          "Maintain healthy lifestyle"
        ],
        speech: "You are a Teenager. Growing up and becoming more independent! Your responsibilities include focusing on education and studies, taking responsibility for your actions, and maintaining a healthy lifestyle."
      }
    } else if (ageYears < 21) {
      return {
        title: "Young Adult",
        description: "You are becoming independent!",
        responsibilities: [
          "Focus on career/education",
          "Start managing finances",
          "Making independent decisions",
          "Taking responsibility for actions",
          "Building professional relationships",
          "Taking care of health"
        ],
        speech: "You are a Young Adult. You are becoming independent! Your responsibilities include focusing on your career or education, managing your finances, and making independent decisions."
      }
    } else if (ageYears < 60) {
      return {
        title: "Adult",
        description: "Time to work, family, and contribute to society!",
        responsibilities: [
          "Career and professional growth",
          "Financial management",
          "Family care and responsibilities",
          "Regular health checkups",
          "Community involvement",
          "Continuous learning"
        ],
        speech: "You are an Adult. Time to work, family, and contribute to society! Your responsibilities include career and professional growth, financial management, and family care and responsibilities."
      }
    } else {
      return {
        title: "Senior",
        description: "Enjoy your wisdom and experience!",
        responsibilities: [
          "Regular health checkups",
          "Managing medications",
          "Family time and legacy",
          "Staying active and healthy",
          "Proper retirement planning",
          "Maintaining mental health"
        ],
        speech: "You are a Senior. Enjoy your wisdom and experience! Your responsibilities include regular health checkups, managing medications, and staying active and healthy."
      }
    }
  }

  const responsibility = age ? getResponsibility(age.years) : null

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-center mb-8 text-gray-800 dark:text-white">Age Calculator</h1>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Enter Your Birth Date</label>
            <input
              type="date"
              id="dob"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          
          <button 
            onClick={calculateAge} 
            className="w-full mb-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all hover:scale-105"
          >
            Calculate Age
          </button>
          
          <div 
            id="ageResult"
            className={`text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg transition-all duration-500 ${
              showResult ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{
              transform: showResult ? 'scale(1.05)' : 'scale(0.95)',
            }}
          >
            {age && (
              <>
                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Your Age</h2>
                <p className="text-4xl font-black text-green-600 bounce">
                  {age.years} years, {age.months} months
                </p>
              </>
            )}
          </div>
        </div>

        {/* Responsibility Section */}
        {responsibility && showResult && (
          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white text-center">
              {responsibility.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              {responsibility.description}
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-bold text-green-700 dark:text-green-400 mb-3">Your Responsibilities:</h3>
              <ul className="space-y-2">
                {responsibility.responsibilities.map((resp, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300 flex items-start gap-2">
                    <span className="text-green-500">*</span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Fun floating icons */}
        <div className="mt-8 flex justify-center gap-4">
          <span className="text-4xl float" style={{ animationDelay: '0s' }}>B</span>
          <span className="text-4xl float" style={{ animationDelay: '0.5s' }}>D</span>
          <span className="text-4xl float" style={{ animationDelay: '1s' }}>P</span>
        </div>
      </div>
    </div>
  )
}

export default AgePage
