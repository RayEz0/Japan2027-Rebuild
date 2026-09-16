import { useState, useEffect, useMemo, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'
import { createGiftService } from '../services/gifts/index'

function rowToGift(r) {
  return { id: r.id, name: r.name, where: r.where_ || r.location || '', est: +r.est || 0, done: r.done }
}

export function useGifts() {
  const { user, supabase } = useAuth()
  const { activeTrip: trip } = useTravel()
  const tripId  = trip?.id || 'japan2027'
  const service = useMemo(() => createGiftService(tripId, user?.id), [tripId, user?.id])

  const [gifts, setGifts] = useState(() => service.load())

  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    setGifts(service.load())
  }, [service])

  useEffect(() => {
    if (!user || !supabase) return
    supabase
      .from('gifts')
      .select('*')
      .eq('user_id', user.id)
      .eq('trip_id', tripId)
      .then(({ data, error }) => {
        if (error || !data) return
        if (data.length > 0) {
          const loaded = data.map(rowToGift)
          setGifts(loaded)
          service.save(loaded)
        } else {
          const local = service.load()
          if (local.length > 0) {
            const rows = local.map(g => ({
              id: String(g.id), user_id: user.id, trip_id: tripId,
              name: g.name || '', location: g.where || '', est: +g.est || 0, done: g.done || false,
            }))
            supabase.from('gifts').insert(rows).then(() => {})
          }
        }
      })
  }, [user?.id, tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  const save = (next) => {
    setGifts(next)
    service.save(next)
  }

  const syncRow = (gift) => {
    if (!user || !supabase) return
    supabase.from('gifts').upsert({
      id: String(gift.id), user_id: user.id, trip_id: tripId,
      name: gift.name || '', location: gift.where || '', est: +gift.est || 0, done: gift.done || false,
    }, { onConflict: 'user_id,trip_id,id' }).then(() => {})
  }

  const toggle = (id) => {
    const next = gifts.map(g => g.id === id ? { ...g, done: !g.done } : g)
    save(next)
    const updated = next.find(g => g.id === id)
    if (updated) syncRow(updated)
  }

  const remove = (id) => {
    save(gifts.filter(g => g.id !== id))
    if (user && supabase) {
      supabase.from('gifts').delete().eq('id', String(id)).eq('user_id', user.id).eq('trip_id', tripId).then(() => {})
    }
  }

  const addNew = () => {
    const entry = { id: Date.now(), name: '', where: '', est: 0, done: false }
    save([...gifts, entry])
    syncRow(entry)
  }

  const update = (id, field, val) => {
    const next = gifts.map(g => g.id === id ? { ...g, [field]: val } : g)
    save(next)
    const updated = next.find(g => g.id === id)
    if (updated) syncRow(updated)
  }

  const addFromSuggestion = (suggestion) => {
    const alreadyAdded = gifts.some(g => g.name === suggestion.name)
    if (alreadyAdded) return
    const entry = {
      id:   Date.now() + Math.random(),
      name: suggestion.name,
      where: suggestion.where || '',
      est:  0,
      done: false,
    }
    save([...gifts, entry])
    syncRow(entry)
  }

  const total = gifts.reduce((s, g) => s + (+g.est || 0), 0)

  return { gifts, toggle, remove, addNew, update, addFromSuggestion, total }
}
