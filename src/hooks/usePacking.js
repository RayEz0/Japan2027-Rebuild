import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'
import { createPackingService } from '../services/packing/index'
import { useTripData } from './useTripData'

export function usePacking() {
  const { user, supabase } = useAuth()
  const { activeTrip: trip } = useTravel()
  const tripId  = trip?.id || 'japan2027'
  const service = useMemo(() => createPackingService(tripId, user?.id), [tripId, user?.id])
  const { packingCategories: PACKING_CATEGORIES, totalItems: TOTAL_ITEMS } = useTripData()

  const [packed, setPacked] = useState(() => service.load())

  // Reload when the active trip or user switches
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    setPacked(service.load())
  }, [service])

  useEffect(() => {
    if (!user || !supabase) return
    supabase
      .from('packing')
      .select('*')
      .eq('user_id', user.id)
      .eq('trip_id', tripId)
      .then(({ data: rows, error }) => {
        if (error || !rows) return
        if (rows.length > 0) {
          const loaded = {}
          for (const r of rows) loaded[r.item_id] = r.packed
          setPacked(loaded)
          service.save(loaded)
        } else {
          const local = service.load()
          const localEntries = Object.entries(local).filter(([, v]) => v)
          if (localEntries.length > 0) {
            const upsertRows = localEntries.map(([itemId, p]) => ({ user_id: user.id, trip_id: tripId, item_id: itemId, packed: p }))
            supabase.from('packing').upsert(upsertRows, { onConflict: 'user_id,trip_id,item_id' }).then(() => {})
          }
        }
      })
  }, [user?.id, tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback((itemId) => {
    setPacked(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] }
      service.save(next)
      if (user && supabase) {
        supabase.from('packing').upsert({
          user_id: user.id, trip_id: tripId, item_id: itemId, packed: next[itemId],
        }, { onConflict: 'user_id,trip_id,item_id' }).then(() => {})
      }
      return next
    })
  }, [user, supabase, service, tripId])

  const isPacked = (itemId) => Boolean(packed[itemId])

  const packedCount = Object.values(packed).filter(Boolean).length
  const pct = TOTAL_ITEMS > 0 ? Math.round((packedCount / TOTAL_ITEMS) * 100) : 0

  const categoryProgress = PACKING_CATEGORIES.map(cat => {
    const done = cat.items.filter(item => packed[item.id]).length
    return { id: cat.id, done, total: cat.items.length }
  })

  return { isPacked, toggle, packedCount, totalItems: TOTAL_ITEMS, pct, categoryProgress }
}
