import { createContext, useState } from 'react'

export const VoiceContext = createContext()

export const VoiceProvider = ({ children }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  const startListening = () => {
    setIsListening(true)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  return (
    <VoiceContext.Provider value={{ isListening, transcript, setTranscript, startListening, stopListening }}>
      {children}
    </VoiceContext.Provider>
  )
}
