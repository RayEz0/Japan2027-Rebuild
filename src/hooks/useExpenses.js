import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTravel } from '../context/TravelContext'
import { TRIPS } from '../services/trips/index'
import { createExpenseService } from '../services/expenses/index'

export const EXPENSE_CATEGORIES = [
  { id: 'transport',  label: 'Transport',  icon: '🚃' },
  { id: 'food',       label: 'Food',       icon: '🍜' },
  { id: 'stay',       label: 'Stay',       icon: '🛏️' },
  { id: 'experience', label: 'Experience', icon: '🎡' },
  { id: 'shopping',   label: 'Shopping',   icon: '🛍️' },
  { id: 'gear',       label: 'Gear',       icon: '📷' },
  { id: 'setup',      label: 'Setup',      icon: '📶' },
  { id: 'other',      label: 'Other',      icon: '📌' },
]

export const EXPENSE_PEOPLE = ['Aman', 'Rithwik', 'Vishal']

// ── BALANCE ENGINE ──────────────────────────────────────
// Returns net balance per person: positive = owed money, negative = owes money.
export function calcBalances(entries) {
  const balances = {}
  for (const p of EXPENSE_PEOPLE) balances[p] = 0

  for (const e of entries) {
    if (!e.paidBy || !e.splitBetween?.length) continue
    const amt   = +e.inr || 0
    const split = e.splitBetween
    const share = amt / split.length

    if (e.paidBy in balances) balances[e.paidBy] += amt
    for (const p of split) {
      if (p in balances) balances[p] -= share
    }
  }

  return balances
}

// Minimum-transaction greedy settlement from net balances.
export function calcSettlements(balances) {
  const creditors = Object.entries(balances).filter(([, v]) => v >  0.5).sort((a, b) => b[1] - a[1]).map(([p, v]) => [p, v])
  const debtors   = Object.entries(balances).filter(([, v]) => v < -0.5).sort((a, b) => a[1] - b[1]).map(([p, v]) => [p, -v])

  const txns = []
  let i = 0, j = 0
  while (i < creditors.length && j < debtors.length) {
    const amt = Math.min(creditors[i][1], debtors[j][1])
    if (amt > 0.5) txns.push({ from: debtors[j][0], to: creditors[i][0], amount: Math.round(amt) })
    creditors[i][1] -= amt
    debtors[j][1]   -= amt
    if (creditors[i][1] < 0.5) i++
    if (debtors[j][1]   < 0.5) j++
  }

  return txns
}

// ── SUPABASE MAPPING ─────────────────────────────────────
function rowToEntry(r) {
  return {
    id:           r.id,
    dayNum:       r.day_num,
    city:         r.city,
    category:     r.category,
    description:  r.description,
    inr:          r.inr,
    jpy:          r.jpy,
    paidBy:       r.paid_by       || '',
    notes:        r.notes         || '',
    splitBetween: r.split_between || [],
  }
}

export function useExpenses() {
  const { user, supabase } = useAuth()
  const { activeArc: arc, activeTrip: trip } = useTravel()
  const tripId       = trip?.id || 'japan2027'
  const service      = useMemo(() => createExpenseService(tripId, user?.id), [tripId, user?.id])
  const expenseCities = useMemo(() => {
    if (!arc) return []
    return arc.tripIds.flatMap(id => TRIPS[id]?.cities?.map(c => c.name) ?? [])
  }, [arc?.year]) // eslint-disable-line react-hooks/exhaustive-deps

  const [entries, setEntries] = useState(() => service.load())

  // Reload local data when the active trip or user switches
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    setEntries(service.load())
  }, [service])

  useEffect(() => {
    if (!user || !supabase) return
    supabase
      .from('expenses')
      .select('*')
      .eq('user_id', user.id)
      .eq('trip_id', tripId)
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (error || !data) return
        if (data.length > 0) {
          const loaded = data.map(rowToEntry)
          setEntries(loaded)
          service.save(loaded)
        } else {
          const local = service.load()
          if (local.length > 0) {
            const rows = local.map(e => ({
              id: String(e.id), user_id: user.id, trip_id: tripId,
              day_num: e.dayNum, city: e.city, category: e.category,
              description: e.description, inr: +e.inr || 0, jpy: +e.jpy || 0,
              paid_by: e.paidBy || '', notes: e.notes || '',
              split_between: e.splitBetween || [],
            }))
            supabase.from('expenses').insert(rows).then(() => {})
          }
        }
      })
  }, [user?.id, tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  const add = useCallback((entry) => {
    const id = String(Date.now())
    const newEntry = { ...entry, id }
    setEntries(prev => {
      const next = [...prev, newEntry]
      service.save(next)
      return next
    })
    if (user && supabase) {
      supabase.from('expenses').insert({
        id, user_id: user.id, trip_id: tripId,
        day_num: entry.dayNum, city: entry.city,
        category: entry.category, description: entry.description,
        inr: +entry.inr || 0, jpy: +entry.jpy || 0,
        paid_by: entry.paidBy || '', notes: entry.notes || '',
        split_between: entry.splitBetween || [],
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
      supabase.from('expenses').delete().eq('id', String(id)).eq('user_id', user.id).eq('trip_id', tripId).then(() => {})
    }
  }, [user, supabase, service, tripId])

  const update = useCallback((id, patch) => {
    setEntries(prev => {
      const next = prev.map(e => e.id === id ? { ...e, ...patch } : e)
      service.save(next)
      return next
    })
    if (user && supabase) {
      const dbPatch = {}
      if ('dayNum'       in patch) dbPatch.day_num       = patch.dayNum
      if ('city'         in patch) dbPatch.city          = patch.city
      if ('category'     in patch) dbPatch.category      = patch.category
      if ('description'  in patch) dbPatch.description   = patch.description
      if ('inr'          in patch) dbPatch.inr           = +patch.inr
      if ('jpy'          in patch) dbPatch.jpy           = +patch.jpy
      if ('paidBy'       in patch) dbPatch.paid_by       = patch.paidBy
      if ('notes'        in patch) dbPatch.notes         = patch.notes
      if ('splitBetween' in patch) dbPatch.split_between = patch.splitBetween
      supabase.from('expenses').update(dbPatch).eq('id', String(id)).eq('user_id', user.id).eq('trip_id', tripId).then(() => {})
    }
  }, [user, supabase, service, tripId])

  const total = entries.reduce((s, e) => s + (+e.inr || 0), 0)

  const byCategory = {}
  for (const cat of EXPENSE_CATEGORIES) {
    byCategory[cat.id] = entries.filter(e => e.category === cat.id).reduce((s, e) => s + (+e.inr || 0), 0)
  }

  const byCity = {}
  for (const city of expenseCities) {
    byCity[city] = entries.filter(e => e.city === city).reduce((s, e) => s + (+e.inr || 0), 0)
  }

  const byDay = entries.reduce((acc, e) => {
    if (e.dayNum) acc[e.dayNum] = (acc[e.dayNum] || 0) + (+e.inr || 0)
    return acc
  }, {})

  return { entries, add, remove, update, total, byCategory, byCity, byDay, expenseCities }
}
