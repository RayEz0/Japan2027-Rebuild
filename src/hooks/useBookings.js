import { useState, useEffect, useMemo, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'
import { createBookingService } from '../services/bookings/index'

const DEFAULT_ITEM = { done: false, notes: '', link: '', confirmRef: '' }

export function useBookings() {
  const { user, supabase } = useAuth()
  const { activeTrip: trip } = useTravel()
  const tripId  = trip?.id || 'japan2027'
  const service = useMemo(() => createBookingService(tripId, user?.id), [tripId, user?.id])

  const [data, setData] = useState(() => service.load())

  // Reload when the active trip or user switches
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    setData(service.load())
  }, [service])

  useEffect(() => {
    if (!user || !supabase) return
    supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id)
      .eq('trip_id', tripId)
      .then(({ data: rows, error }) => {
        if (error || !rows) return
        if (rows.length > 0) {
          const loaded = {}
          for (const r of rows) {
            loaded[r.item_id] = { done: r.done, notes: r.notes, link: r.link, confirmRef: r.confirm_ref }
          }
          setData(loaded)
          service.save(loaded)
        } else {
          const local = service.load()
          const localEntries = Object.entries(local)
          if (localEntries.length > 0) {
            const upsertRows = localEntries.map(([itemId, v]) => ({
              user_id: user.id, trip_id: tripId, item_id: itemId,
              done: v.done || false, notes: v.notes || '',
              link: v.link || '', confirm_ref: v.confirmRef || '',
            }))
            supabase.from('bookings').upsert(upsertRows, { onConflict: 'user_id,trip_id,item_id' }).then(() => {})
          }
        }
      })
  }, [user?.id, tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  const persist = (next) => { service.save(next); return next }

  const get = (id) => data[id] || { ...DEFAULT_ITEM }

  const setField = (id, field, val) => {
    setData(prev => {
      const cur = prev[id] || {}
      const entry = { ...DEFAULT_ITEM, ...cur, [field]: val }
      const next = persist({ ...prev, [id]: entry })
      if (user && supabase) {
        supabase.from('bookings').upsert({
          user_id: user.id, trip_id: tripId, item_id: id,
          done: entry.done, notes: entry.notes,
          link: entry.link, confirm_ref: entry.confirmRef,
        }, { onConflict: 'user_id,trip_id,item_id' }).then(() => {})
      }
      return next
    })
  }

  const toggle = (id) => {
    setData(prev => {
      const cur = prev[id] || {}
      const entry = { ...DEFAULT_ITEM, ...cur, done: !cur.done }
      const next = persist({ ...prev, [id]: entry })
      if (user && supabase) {
        supabase.from('bookings').upsert({
          user_id: user.id, trip_id: tripId, item_id: id,
          done: entry.done, notes: entry.notes,
          link: entry.link, confirm_ref: entry.confirmRef,
        }, { onConflict: 'user_id,trip_id,item_id' }).then(() => {})
      }
      return next
    })
  }

  const doneIds = Object.entries(data).filter(([, v]) => v.done).map(([k]) => k)
  return { data, get, setField, toggle, doneIds }
}
