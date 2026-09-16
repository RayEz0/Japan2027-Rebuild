import { useState, useEffect, useCallback } from 'react'
import { loadTripData } from '../../context/TripDataContext'
import { TRIPS } from '../../data/trips/index'
import { getItinerary, setItinerary } from '../../services/cms/index'

// Normalise DAYS into CMS itinerary format
function daysToCMS(days) {
  return days.map((d, i) => ({
    id:        `day-${d.num || i + 1}`,
    dayNo:     parseInt(d.num || i + 1),
    date:      d.date     || '',
    city:      d.city     || '',
    title:     d.title    || '',
    transport: d.transport || '',
    food:      d.food     || '',
    stay:      d.stay     || '',
    activities: (d.places || []).map((p, j) => ({
      id:          `act-${d.num}-${j}`,
      type:        'place',
      name:        p.name        || '',
      time:        p.time        || '',
      description: p.description || '',
      cost:        p.cost        || '',
      tip:         p.tip         || '',
      transport:   p.transport   || '',
    })),
  }))
}

const INPUT_STYLE = {
  padding: '5px 8px', fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)',
  background: 'var(--paper)', border: '1px solid var(--border)', outline: 'none',
}

// ── Activity row ──────────────────────────────────────────────────────────────

function ActivityRow({ act, dayIdx, actIdx, onUpdate, onDelete, onMove, total }) {
  const [expanded, setExpanded] = useState(false)

  const update = (key, val) => onUpdate(dayIdx, actIdx, key, val)

  return (
    <div style={{ border: '1px solid var(--border)', marginBottom: 4, background: 'var(--surf)' }}>
      {/* Row header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flexShrink: 0 }}>
          <button
            disabled={actIdx === 0}
            onClick={() => onMove(dayIdx, actIdx, -1)}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink4)', padding: '0 3px', fontSize: 9, lineHeight: 1 }}
          >▲</button>
          <button
            disabled={actIdx === total - 1}
            onClick={() => onMove(dayIdx, actIdx, 1)}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--ink4)', padding: '0 3px', fontSize: 9, lineHeight: 1 }}
          >▼</button>
        </div>

        <select
          value={act.type}
          onChange={e => update('type', e.target.value)}
          style={{ ...INPUT_STYLE, width: 90, fontSize: 10 }}
        >
          <option value="place">Place</option>
          <option value="transport">Transport</option>
          <option value="meal">Meal</option>
          <option value="note">Note</option>
        </select>

        <input
          style={{ ...INPUT_STYLE, flex: 1 }}
          value={act.name}
          onChange={e => update('name', e.target.value)}
          placeholder="Activity name…"
        />

        <input
          style={{ ...INPUT_STYLE, width: 90 }}
          value={act.time}
          onChange={e => update('time', e.target.value)}
          placeholder="10:00–12:00"
        />

        <button
          onClick={() => setExpanded(v => !v)}
          style={{ border: '1px solid var(--border)', background: 'none', cursor: 'pointer', color: 'var(--ink3)', padding: '4px 8px', fontSize: 10 }}
        >
          {expanded ? '▾' : '▸'}
        </button>

        <button
          onClick={() => onDelete(dayIdx, actIdx)}
          style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#b5451b', fontSize: 14, lineHeight: 1, padding: '0 2px' }}
        >×</button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ padding: '8px 10px 10px', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', display: 'block', marginBottom: 3 }}>Description</label>
            <textarea
              value={act.description}
              onChange={e => update('description', e.target.value)}
              style={{ ...INPUT_STYLE, width: '100%', boxSizing: 'border-box', minHeight: 52, resize: 'vertical', fontSize: 11 }}
            />
          </div>
          <div>
            <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', display: 'block', marginBottom: 3 }}>Cost</label>
            <input style={{ ...INPUT_STYLE, width: '100%', boxSizing: 'border-box' }} value={act.cost} onChange={e => update('cost', e.target.value)} />
          </div>
          <div>
            <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', display: 'block', marginBottom: 3 }}>Transport</label>
            <input style={{ ...INPUT_STYLE, width: '100%', boxSizing: 'border-box' }} value={act.transport} onChange={e => update('transport', e.target.value)} />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', display: 'block', marginBottom: 3 }}>Tip</label>
            <input style={{ ...INPUT_STYLE, width: '100%', boxSizing: 'border-box' }} value={act.tip} onChange={e => update('tip', e.target.value)} />
          </div>
        </div>
      )}
    </div>
  )
}

// ── Day block ─────────────────────────────────────────────────────────────────

function DayBlock({ day, dayIdx, onUpdate, onActivityUpdate, onActivityAdd, onActivityDelete, onActivityMove, onMoveDay, totalDays }) {
  const [open, setOpen] = useState(dayIdx === 0)

  return (
    <div style={{ marginBottom: 8, border: '1.5px solid var(--border)', background: 'var(--surf)' }}>
      {/* Day header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px', background: open ? 'var(--border)' : 'var(--surf)',
        borderBottom: open ? '1px solid var(--border)' : 'none',
      }}>
        {/* Reorder */}
        <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
          <button disabled={dayIdx === 0}           onClick={() => onMoveDay(dayIdx, -1)} style={{ border: '1px solid var(--border)', background: 'none', cursor: 'pointer', color: 'var(--ink4)', padding: '1px 5px', fontSize: 9 }}>▲</button>
          <button disabled={dayIdx === totalDays - 1} onClick={() => onMoveDay(dayIdx, 1)}  style={{ border: '1px solid var(--border)', background: 'none', cursor: 'pointer', color: 'var(--ink4)', padding: '1px 5px', fontSize: 9 }}>▼</button>
        </div>

        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)', minWidth: 36 }}>
          Day {day.dayNo}
        </span>

        <input
          style={{ ...INPUT_STYLE, flex: 1, fontWeight: 600 }}
          value={day.city}
          onChange={e => onUpdate(dayIdx, 'city', e.target.value)}
          placeholder="City…"
        />

        <input
          style={{ ...INPUT_STYLE, width: 110 }}
          value={day.date}
          onChange={e => onUpdate(dayIdx, 'date', e.target.value)}
          placeholder="Nov 23"
        />

        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)',
        }}>
          {day.activities.length} activities
        </span>

        <button onClick={() => setOpen(v => !v)} style={{ border: '1px solid var(--border)', background: 'none', cursor: 'pointer', color: 'var(--ink3)', padding: '3px 8px', fontSize: 12 }}>
          {open ? '▾' : '▸'}
        </button>
      </div>

      {/* Expanded */}
      {open && (
        <div style={{ padding: '12px 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
            <div>
              <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', display: 'block', marginBottom: 3 }}>Title</label>
              <input style={{ ...INPUT_STYLE, width: '100%', boxSizing: 'border-box' }} value={day.title} onChange={e => onUpdate(dayIdx, 'title', e.target.value)} />
            </div>
            <div>
              <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', display: 'block', marginBottom: 3 }}>Transport Summary</label>
              <input style={{ ...INPUT_STYLE, width: '100%', boxSizing: 'border-box' }} value={day.transport} onChange={e => onUpdate(dayIdx, 'transport', e.target.value)} />
            </div>
            <div>
              <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', display: 'block', marginBottom: 3 }}>Food Highlights</label>
              <input style={{ ...INPUT_STYLE, width: '100%', boxSizing: 'border-box' }} value={day.food} onChange={e => onUpdate(dayIdx, 'food', e.target.value)} />
            </div>
            <div>
              <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', display: 'block', marginBottom: 3 }}>Stay</label>
              <input style={{ ...INPUT_STYLE, width: '100%', boxSizing: 'border-box' }} value={day.stay} onChange={e => onUpdate(dayIdx, 'stay', e.target.value)} />
            </div>
          </div>

          {/* Activities */}
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', marginBottom: 8, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Activities</div>

          {day.activities.map((act, ai) => (
            <ActivityRow
              key={act.id || ai}
              act={act}
              dayIdx={dayIdx}
              actIdx={ai}
              total={day.activities.length}
              onUpdate={onActivityUpdate}
              onDelete={onActivityDelete}
              onMove={onActivityMove}
            />
          ))}

          <button
            onClick={() => onActivityAdd(dayIdx)}
            style={{
              width: '100%', border: '1px dashed var(--border)', background: 'none',
              color: 'var(--ink4)', padding: '7px', cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
              marginTop: 4,
            }}
          >
            + Add Activity
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminItinerary({ tripId = 'japan2027' }) {
  const [bundledDays, setBundledDays] = useState(null)
  const [days, setDays] = useState([])
  const [saved, setSaved] = useState(false)

  // Load the selected trip's bundled itinerary, then layer any existing
  // CMS override on top for the editor's starting state.
  useEffect(() => {
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBundledDays(null)
    loadTripData(tripId).then(data => {
      if (cancelled) return
      const bundled = data.days || []
      setBundledDays(bundled)
      const cms = getItinerary(tripId)
      setDays(cms?.days || daysToCMS(bundled))
    })
    return () => { cancelled = true }
  }, [tripId])

  const handleSave = () => {
    setItinerary(tripId, { days })
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  const handleReset = () => {
    if (!window.confirm('Reset to static itinerary data? CMS edits will be lost.')) return
    const fresh = daysToCMS(bundledDays || [])
    setDays(fresh)
    setItinerary(tripId, { days: fresh })
  }

  const handleAddDay = () => {
    setDays(prev => [
      ...prev,
      {
        id: `day-${prev.length + 1}-new`,
        dayNo: prev.length + 1,
        date: '', city: 'New City', title: '', transport: '', food: '', stay: '',
        activities: [],
      },
    ])
  }

  const updateDay = useCallback((idx, key, val) => {
    setDays(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], [key]: val }
      return next
    })
  }, [])

  const moveDay = useCallback((idx, dir) => {
    setDays(prev => {
      const next = [...prev]
      const target = idx + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[idx], next[target]] = [next[target], next[idx]]
      // Renumber
      return next.map((d, i) => ({ ...d, dayNo: i + 1 }))
    })
  }, [])

  const addActivity = useCallback((dayIdx) => {
    setDays(prev => {
      const next = [...prev]
      next[dayIdx] = {
        ...next[dayIdx],
        activities: [
          ...next[dayIdx].activities,
          { id: `new-${Date.now()}`, type: 'place', name: '', time: '', description: '', cost: '', tip: '', transport: '' },
        ],
      }
      return next
    })
  }, [])

  const updateActivity = useCallback((dayIdx, actIdx, key, val) => {
    setDays(prev => {
      const next = [...prev]
      const acts = [...next[dayIdx].activities]
      acts[actIdx] = { ...acts[actIdx], [key]: val }
      next[dayIdx] = { ...next[dayIdx], activities: acts }
      return next
    })
  }, [])

  const deleteActivity = useCallback((dayIdx, actIdx) => {
    setDays(prev => {
      const next = [...prev]
      const acts = next[dayIdx].activities.filter((_, i) => i !== actIdx)
      next[dayIdx] = { ...next[dayIdx], activities: acts }
      return next
    })
  }, [])

  const moveActivity = useCallback((dayIdx, actIdx, dir) => {
    setDays(prev => {
      const next = [...prev]
      const acts = [...next[dayIdx].activities]
      const target = actIdx + dir
      if (target < 0 || target >= acts.length) return prev
      ;[acts[actIdx], acts[target]] = [acts[target], acts[actIdx]]
      next[dayIdx] = { ...next[dayIdx], activities: acts }
      return next
    })
  }, [])

  if (!bundledDays) {
    return <div style={{ padding: 24, fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)' }}>Loading…</div>
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1.5px solid var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, background: 'var(--surf)', zIndex: 10,
      }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 4 }}>
            Itinerary Editor — {TRIPS[tripId]?.title || tripId}
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
            {days.length} Days
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {saved && (
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#2e7d32', alignSelf: 'center' }}>
              ✓ Saved
            </span>
          )}
          <button onClick={handleReset} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            border: '1px solid var(--border)', background: 'none', color: 'var(--ink3)',
            padding: '7px 14px', cursor: 'pointer', letterSpacing: '0.4px',
          }}>
            ↺ Reset to Static
          </button>
          <button onClick={handleAddDay} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            border: '1px solid var(--border)', background: 'none', color: 'var(--ink)',
            padding: '7px 14px', cursor: 'pointer', letterSpacing: '0.4px',
          }}>
            + Add Day
          </button>
          <button onClick={handleSave} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            background: 'var(--ink)', color: 'var(--surf)', border: 'none',
            padding: '7px 20px', cursor: 'pointer', letterSpacing: '0.4px',
          }}>
            Save
          </button>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>
        {days.map((day, i) => (
          <DayBlock
            key={day.id || i}
            day={day}
            dayIdx={i}
            totalDays={days.length}
            onUpdate={updateDay}
            onActivityUpdate={updateActivity}
            onActivityAdd={addActivity}
            onActivityDelete={deleteActivity}
            onActivityMove={moveActivity}
            onMoveDay={moveDay}
          />
        ))}
      </div>
    </div>
  )
}
