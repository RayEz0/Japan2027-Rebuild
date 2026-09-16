import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'
import { createSavingsService } from '../services/savings/index'

export const TRIP_GOAL        = 225000
export const SAVINGS_CURRENCY = '₹'

export const SAVING_MONTHS = [
  { key: 'Apr2026', label: 'Apr 26' },
  { key: 'May2026', label: 'May 26' },
  { key: 'Jun2026', label: 'Jun 26' },
  { key: 'Jul2026', label: 'Jul 26' },
  { key: 'Aug2026', label: 'Aug 26' },
  { key: 'Sep2026', label: 'Sep 26' },
  { key: 'Oct2026', label: 'Oct 26' },
  { key: 'Nov2026', label: 'Nov 26' },
  { key: 'Dec2026', label: 'Dec 26' },
  { key: 'Jan2027', label: 'Jan 27' },
  { key: 'Feb2027', label: 'Feb 27' },
  { key: 'Mar2027', label: 'Mar 27' },
  { key: 'Apr2027', label: 'Apr 27' },
  { key: 'May2027', label: 'May 27' },
  { key: 'Jun2027', label: 'Jun 27' },
  { key: 'Jul2027', label: 'Jul 27' },
  { key: 'Aug2027', label: 'Aug 27' },
  { key: 'Sep2027', label: 'Sep 27' },
  { key: 'Oct2027', label: 'Oct 27' },
]

export const MONTHLY_TARGET = Math.ceil(TRIP_GOAL / SAVING_MONTHS.length)

function blankEntry() { return { cash: 0, fd: 0, mf: 0 } }

function calcMonthTotal(e = {}) { return (e.cash || 0) + (e.fd || 0) + (e.mf || 0) }
function calcTotal(data) { return Object.values(data).reduce((s, e) => s + calcMonthTotal(e), 0) }

// Map month key (e.g. "Jun2026") to current-month index for projection
function currentMonthIdx() {
  const now = new Date()
  const key = `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][now.getMonth()]}${now.getFullYear()}`
  return SAVING_MONTHS.findIndex(m => m.key === key)
}

export function useSavings() {
  const { user, supabase } = useAuth()
  const { activeArc: arc, activeTrip: trip } = useTravel()
  // Savings is intentionally trip-agnostic (one pot across every trip), so the
  // service is only user-scoped. tripId is still derived for goal/month lookups.
  const tripId  = trip?.id || 'japan2027'
  const service = useMemo(() => createSavingsService(user?.id), [user?.id])

  const [data, setData] = useState(() => service.load())

  // Reload when the user switches
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    setData(service.load())
  }, [service])

  useEffect(() => {
    if (!user || !supabase) return
    supabase
      .from('savings')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data: rows, error }) => {
        if (error || !rows) return
        if (rows.length > 0) {
          const loaded = {}
          for (const r of rows) loaded[r.month_key] = { cash: r.cash, fd: r.fd, mf: r.mf }
          setData(loaded)
          service.save(loaded)
        } else {
          const local = service.load()
          const entries = Object.entries(local)
          if (entries.length > 0) {
            const upsertRows = entries.map(([monthKey, v]) => ({
              user_id: user.id, month_key: monthKey,
              cash: v.cash || 0, fd: v.fd || 0, mf: v.mf || 0,
            }))
            supabase.from('savings').upsert(upsertRows, { onConflict: 'user_id,month_key' }).then(() => {})
          }
        }
      })
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const upsertMonth = useCallback((key, entry) => {
    if (user && supabase) {
      supabase.from('savings').upsert({
        user_id: user.id, month_key: key,
        cash: entry.cash, fd: entry.fd, mf: entry.mf,
      }, { onConflict: 'user_id,month_key' }).then(() => {})
    }
  }, [user, supabase])

  const setMonth = useCallback((key, vehicle, value) => {
    setData(prev => {
      const entry = { ...(prev[key] || blankEntry()), [vehicle]: Math.max(0, Number(value) || 0) }
      const next = { ...prev, [key]: entry }
      service.save(next)
      upsertMonth(key, entry)
      return next
    })
  }, [upsertMonth, service])

  // Convenience: put entire amount into cash (used by old single-input UI)
  const setMonthTotal = useCallback((key, total) => {
    setData(prev => {
      const entry = { ...(prev[key] || blankEntry()), cash: Math.max(0, Number(total) || 0) }
      const next = { ...prev, [key]: entry }
      service.save(next)
      upsertMonth(key, entry)
      return next
    })
  }, [upsertMonth, service])

  const tripGoal     = arc?.budgetRange?.max || TRIP_GOAL
  const savingMonths = tripId === 'japan2027' ? SAVING_MONTHS : []

  const total       = calcTotal(data)
  const pct         = Math.min(100, Math.round((total / tripGoal) * 100))
  const remaining   = Math.max(0, tripGoal - total)
  const contributed = savingMonths.filter(m => calcMonthTotal(data[m.key]) > 0).length
  const avgPerMonth = contributed > 0 ? Math.round(total / contributed) : 0

  const byCash = Object.values(data).reduce((s, e) => s + (e.cash || 0), 0)
  const byFD   = Object.values(data).reduce((s, e) => s + (e.fd   || 0), 0)
  const byMF   = Object.values(data).reduce((s, e) => s + (e.mf   || 0), 0)

  const nowIdx       = currentMonthIdx()
  const monthsLeft   = nowIdx >= 0 ? Math.max(0, savingMonths.length - nowIdx - 1) : 0
  const projected    = avgPerMonth > 0 ? Math.min(total + avgPerMonth * monthsLeft, tripGoal * 1.5) : total
  const reqPerMonth  = monthsLeft > 0 ? Math.ceil(remaining / monthsLeft) : 0

  const getMonthTotal = (key) => calcMonthTotal(data[key])
  const getMonthEntry = (key) => data[key] || blankEntry()

  return {
    data, setMonth, setMonthTotal,
    total, pct, remaining, contributed, avgPerMonth,
    byCash, byFD, byMF,
    projected, reqPerMonth, monthsLeft, nowIdx,
    getMonthTotal, getMonthEntry,
    goal: tripGoal, savingMonths,
  }
}
