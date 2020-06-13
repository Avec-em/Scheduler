import { useState } from "react"


const useVisualMode = function(initialMode) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode]);
  const transition = (newMode, replace = false) => {
    setMode(newMode)
    if (replace) {
      setHistory(prev => [prev[0]])
    }
    setHistory(prev => [...prev, newMode])
  }
  const back = () => {
    history.pop()
    if (history.length) {
      const prevMode = history[history.length - 1]
      setMode(prevMode)
    }
  }
  return { mode, transition, back }
}

export default useVisualMode
