import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'
import { createPhotoService } from '../services/photos/index'

export const CAMERAS = ['Insta360 GO 3', 'DJI Pocket 3', 'Phone']

export function usePhotoLog() {
  const { user, supabase } = useAuth()
  const { activeTrip: trip } = useTravel()
  const tripId  = trip?.id || 'japan2027'
  const service = useMemo(() => createPhotoService(tripId, user?.id), [tripId, user?.id])

  const [entries, setEntries] = useState(() => service.load())

  // Reload when the active trip or user switches
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    setEntries(service.load())
  }, [service])

  useEffect(() => {
    if (!user || !supabase) return
    supabase
      .from('photo_log')
      .select('*')
      .eq('user_id', user.id)
      .eq('trip_id', tripId)
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (error || !data) return
        if (data.length > 0) {
          const loaded = data.map(r => ({
            id: r.id, dayNum: r.day_num, camera: r.camera,
            description: r.description, favorite: r.favorite, tags: r.tags || [],
          }))
          setEntries(loaded)
          service.save(loaded)
        } else {
          const local = service.load()
          if (local.length > 0) {
            const rows = local.map(e => ({
              id: String(e.id), user_id: user.id, trip_id: tripId, day_num: e.dayNum,
              camera: e.camera, description: e.description,
              favorite: e.favorite || false, tags: e.tags || [],
            }))
            supabase.from('photo_log').insert(rows).then(() => {})
          }
        }
      })
  }, [user?.id, tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  const add = useCallback((entry) => {
    const id = String(Date.now())
    const newEntry = { ...entry, id, tags: entry.tags || [], favorite: false }
    setEntries(prev => {
      const next = [...prev, newEntry]
      service.save(next)
      return next
    })
    if (user && supabase) {
      supabase.from('photo_log').insert({
        id, user_id: user.id, trip_id: tripId, day_num: newEntry.dayNum,
        camera: newEntry.camera, description: newEntry.description,
        favorite: false, tags: newEntry.tags,
      }).then(() => {})
    }
  }, [user, supabase, service, tripId])

  const remove = useCallback((id) => {
    setEntries(prev => {
      const next = prev.filter(e => e.id !== id)
      service.save(next)
      return next
    })
    if (user && supabase) {
      supabase.from('photo_log').delete().eq('id', String(id)).eq('user_id', user.id).eq('trip_id', tripId).then(() => {})
    }
  }, [user, supabase, service, tripId])

  const toggleFavorite = useCallback((id) => {
    setEntries(prev => {
      const next = prev.map(e => e.id === id ? { ...e, favorite: !e.favorite } : e)
      service.save(next)
      const entry = next.find(e => e.id === id)
      if (user && supabase && entry) {
        supabase.from('photo_log').update({ favorite: entry.favorite }).eq('id', String(id)).eq('user_id', user.id).eq('trip_id', tripId).then(() => {})
      }
      return next
    })
  }, [user, supabase, service, tripId])

  const byDay = entries.reduce((acc, e) => {
    const k = e.dayNum || 'untagged'
    if (!acc[k]) acc[k] = []
    acc[k].push(e)
    return acc
  }, {})

  const favorites = entries.filter(e => e.favorite)
  const byCamera  = CAMERAS.reduce((acc, c) => { acc[c] = entries.filter(e => e.camera === c).length; return acc }, {})

  return { entries, add, remove, toggleFavorite, byDay, favorites, byCamera }
}
