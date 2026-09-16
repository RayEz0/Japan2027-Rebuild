import { useState, useEffect } from 'react'

function calcTimeLeft(target) {
  if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0, departed: false, unknown: true }
  const diff = new Date(target) - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, departed: true, unknown: false }
  return {
    days:     Math.floor(diff / 86400000),
    hours:    Math.floor((diff % 86400000) / 3600000),
    minutes:  Math.floor((diff % 3600000) / 60000),
    seconds:  Math.floor((diff % 60000) / 1000),
    departed: false,
    unknown:  false,
  }
}

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(targetDate))

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(calcTimeLeft(targetDate))
    if (!targetDate) return
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}
