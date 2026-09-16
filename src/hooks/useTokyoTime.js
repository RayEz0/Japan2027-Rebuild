import { useState, useEffect } from 'react'

function getTimeForZone(tz) {
  const now = new Date()
  return {
    time: now.toLocaleTimeString('en-US', {
      timeZone: tz, hour12: false,
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    }),
    date: now.toLocaleDateString('en-US', {
      timeZone: tz, month: 'long', day: 'numeric', year: 'numeric',
    }),
    day: now.toLocaleDateString('en-US', { timeZone: tz, weekday: 'long' }),
    dateShort: now.toLocaleDateString('en-US', {
      timeZone: tz, month: 'short', day: 'numeric',
    }),
  }
}

export function useTokyoTime(timezone = 'Asia/Tokyo') {
  const [clock, setClock] = useState(() => getTimeForZone(timezone))

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClock(getTimeForZone(timezone))
    const t = setInterval(() => setClock(getTimeForZone(timezone)), 1000)
    return () => clearInterval(t)
  }, [timezone])

  return clock
}
