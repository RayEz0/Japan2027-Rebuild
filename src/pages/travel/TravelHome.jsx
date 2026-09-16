import { useState, useEffect, useMemo } from 'react'
import { useTravel } from '../../context/TravelContext'
import { useTripDay } from '../../hooks/useTripDay'
import { useResolvedContent } from '../../hooks/useResolvedContent'
import { useJournal }    from '../../context/JournalContext'
import {
  getSnapshotStatus, runOfflineSnapshot,
} from '../../services/offline/index'
import { getCurrencyRate } from '../../services/offline/index'

// ── Time of day helper ────────────────────────────────────────────────────────

function getTimeSlot(timeStr) {
  if (!timeStr) return 'anytime'
  const s = timeStr.toUpperCase()
  if (s.includes('PM')) {
    const m = s.match(/^(\d+)/)
    const h = m ? parseInt(m[1]) : 12
    return (h >= 6 && h !== 12) ? 'evening' : 'afternoon'
  }
  return 'morning'
}

// Returns the earliest start hour (24h) among an activity's time range, or
// null if unparseable — used for the early-departure smart reminder.
function earliestHour(timeStr) {
  if (!timeStr) return null
  const m = timeStr.match(/^(\d+):(\d+)/)
  if (!m) return null
  let h = parseInt(m[1], 10)
  if (timeStr.toUpperCase().includes('PM') && h !== 12) h += 12
  return h
}

function useNow() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(t)
  }, [])
  return now
}

// ── Smart reminders ───────────────────────────────────────────────────────────
// Generalised across every trip: no place-name or country-specific keyword
// matching — everything here is derived from the day's own time/transport
// fields and its position in the itinerary.

function getReminders(day, hour, isLastDay) {
  if (!day) return []
  const items = []
  const acts  = day.places || []

  // Any activity starting before 7 AM
  const earlyStart = acts.some(a => {
    const h = earliestHour(a.time)
    return h != null && h < 7
  })
  if (earlyStart) {
    if (hour < 6) items.push({ icon: '🌄', text: 'Early start today — set an alarm before 5:30 AM' })
    else if (hour < 8) items.push({ icon: '🌅', text: 'Leave soon for the early activity' })
  }

  // Long-distance transport day (train/flight/ferry/drive)
  const transport = day.transport?.toLowerCase() || ''
  if (transport.includes('train') || transport.includes('rail')) {
    items.push({ icon: '🚄', text: `Train travel day — ${day.transport}` })
  } else if (transport.includes('flight') || transport.includes('fly')) {
    items.push({ icon: '✈️', text: `Flight day — ${day.transport}` })
  } else if (transport.includes('ferry')) {
    items.push({ icon: '⛴', text: `Ferry day — ${day.transport}` })
  } else if (transport.includes('car') || transport.includes('drive') || transport.includes('rental')) {
    items.push({ icon: '🚗', text: 'Driving day — check fuel and route before setting off' })
  }

  // Time-based
  if (hour >= 7  && hour < 9)  items.push({ icon: '☀️',  text: 'Good morning! Check today\'s plan below' })
  if (hour >= 11 && hour < 13) items.push({ icon: '🍱',  text: 'Lunchtime — check the food recommendation for this area' })
  if (hour >= 18 && hour < 20) items.push({ icon: '🌆',  text: 'Golden hour — photography conditions are good' })
  if (hour >= 21)               items.push({ icon: '📋',  text: 'Check tomorrow\'s plan and pack tonight' })

  // Last day of the trip
  if (isLastDay || day.city?.toLowerCase().includes('departure')) {
    items.push({ icon: '✈️',  text: 'Departure day — check out early and build in buffer for the airport' })
  }

  return items
}

// ── Next booking ──────────────────────────────────────────────────────────────

function getNextBooking(bookingItems) {
  const today = new Date()
  const year  = today.getFullYear()
  const m     = (today.getMonth() + 1).toString().padStart(2, '0')
  const ym    = `${year}-${m}`

  const upcoming = (bookingItems || []).filter(b => b.window?.start >= ym)
  return upcoming.sort((a, b) => a.window.start.localeCompare(b.window.start))[0] || null
}

// ── Offline download ──────────────────────────────────────────────────────────

function OfflineDownloadCard({ trip, days, bookingItems, entries }) {
  const [status,   setStatus]   = useState(() => getSnapshotStatus())
  const [running,  setRunning]  = useState(false)
  const [steps,    setSteps]    = useState([])
  const [done,     setDone]     = useState(false)

  const handleDownload = async () => {
    setRunning(true)
    setSteps([])
    const result = await runOfflineSnapshot(
      trip, days, bookingItems, entries
    )
    setSteps(result)
    setStatus(getSnapshotStatus())
    setRunning(false)
    setDone(true)
    setTimeout(() => setDone(false), 3000)
  }

  return (
    <div style={{ margin: '14px 0', border: '1px solid var(--border)', background: 'var(--surf)' }}>
      <div style={{
        padding: '10px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink)', fontWeight: 600 }}>
            Offline Snapshot
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 2 }}>
            {status.hasSnapshot
              ? `Saved ${new Date(status.lastSnapshot).toLocaleDateString()}`
              : 'Not saved yet'}
          </div>
        </div>
        <button
          onClick={handleDownload}
          disabled={running}
          style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            background: 'var(--ink)', color: 'var(--surf)', border: 'none',
            padding: '8px 16px', cursor: running ? 'not-allowed' : 'pointer',
            opacity: running ? 0.6 : 1,
          }}
        >
          {running ? '⏳ Saving…' : done ? '✓ Done' : '↓ Save Offline'}
        </button>
      </div>

      {steps.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '8px 14px' }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              color: s.ok ? '#2e7d32' : '#b5451b', padding: '2px 0',
            }}>
              {s.ok ? '✓' : '✕'} {s.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Activity card ─────────────────────────────────────────────────────────────

function ActivityCard({ act, slot, mapsQuerySuffix }) {
  const colors = { morning: '#FFF8F0', afternoon: '#F0F8FF', evening: '#F5F0FF', anytime: 'var(--surf)' }
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      border: '1px solid var(--border)', marginBottom: 6,
      background: colors[slot] || 'var(--surf)',
    }}>
      <div
        onClick={() => setExpanded(v => !v)}
        style={{ padding: '10px 12px', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'flex-start' }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginBottom: 3 }}>
            {act.name}
          </div>
          {act.time && (
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)' }}>
              {act.time}
              {act.cost && <span> · {act.cost}</span>}
            </div>
          )}
        </div>
        <span style={{ fontSize: 10, color: 'var(--ink4)', flexShrink: 0 }}>{expanded ? '▾' : '▸'}</span>
      </div>

      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '10px 12px' }}>
          {act.description && (
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, margin: '0 0 8px' }}>
              {act.description}
            </p>
          )}
          {act.transport && (
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginBottom: 4 }}>
              🚇 {act.transport}
            </div>
          )}
          {act.tip && (
            <div style={{
              background: 'rgba(0,0,0,0.04)', padding: '6px 10px', marginTop: 8,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)',
              lineHeight: 1.6, borderLeft: '2px solid var(--ink3)',
            }}>
              💡 {act.tip}
            </div>
          )}
          {act.images?.[0] && (
            <div style={{ marginTop: 10, height: 100, overflow: 'hidden' }}>
              <img src={act.images[0]} alt={act.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          {/* Google Maps quick link */}
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(act.name + (mapsQuerySuffix ? ' ' + mapsQuerySuffix : ''))}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', marginTop: 10,
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              color: 'var(--ink4)', textDecoration: 'none',
              border: '1px solid var(--border)', padding: '4px 10px',
            }}
          >
            ↗ Google Maps
          </a>
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function TravelHome() {
  const now  = useNow()
  const hour = now.getHours()
  const trip = useTripDay()
  const { activeTrip } = useTravel()
  const content = useResolvedContent()
  const { entries } = useJournal()
  const rate     = getCurrencyRate()
  const nextBook = useMemo(() => getNextBooking(content?.bookings), [content?.bookings])

  const tripTitle   = activeTrip?.title || 'your trip'
  const countryName = content?.currencies?.[0]?.country || activeTrip?.title || null

  const { morning, afternoon, evening } = useMemo(() => {
    if (!trip.day) return { morning: [], afternoon: [], evening: [] }
    const acts = trip.day.places || []
    return {
      morning:   acts.filter(a => getTimeSlot(a.time) === 'morning'),
      afternoon: acts.filter(a => getTimeSlot(a.time) === 'afternoon'),
      evening:   acts.filter(a => getTimeSlot(a.time) === 'evening'),
    }
  }, [trip.day])

  const isLastDay = trip.phase === 'active' && trip.dayIndex === trip.days.length - 1
  const reminders = useMemo(() => getReminders(trip.day, hour, isLastDay), [trip.day, hour, isLastDay])

  // ── Loading (itinerary not resolved yet) ────────────────────────────────────
  if (trip.phase === 'loading') {
    return (
      <div style={{ padding: 40, textAlign: 'center', fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)' }}>
        Loading trip…
      </div>
    )
  }

  // ── Unknown (no departure/return dates or no itinerary for this trip) ──────
  if (trip.phase === 'unknown') {
    return (
      <div style={{ padding: 18, textAlign: 'center', paddingTop: 40 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
          {tripTitle}
        </div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink3)' }}>
          No day-by-day itinerary is available for this trip yet.
        </div>
        <OfflineDownloadCard trip={activeTrip} days={trip.days} bookingItems={content?.bookings} entries={entries} />
      </div>
    )
  }

  // ── Pre-trip state ──────────────────────────────────────────────────────────
  if (trip.phase === 'pre') {
    return (
      <div style={{ padding: 18 }}>
        <div style={{
          textAlign: 'center', padding: '32px 0',
          borderBottom: '1px solid var(--border)', marginBottom: 18,
        }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)', letterSpacing: '1px', marginBottom: 8 }}>
            UPCOMING TRIP
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 52, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
            {trip.daysUntilTrip}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)', marginTop: 6 }}>
            days until {tripTitle}
          </div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink3)', marginTop: 8 }}>
            {activeTrip?.routeFull}
          </div>
        </div>

        {/* Day 1 preview */}
        {trip.days[0] && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 10 }}>
              Day 1 Preview · {trip.days[0].city}
            </div>
            {(trip.days[0].places || []).slice(0, 2).map((act, i) => (
              <ActivityCard key={i} act={act} slot={getTimeSlot(act.time)} mapsQuerySuffix={countryName} />
            ))}
          </div>
        )}

        <OfflineDownloadCard trip={activeTrip} days={trip.days} bookingItems={content?.bookings} entries={entries} />
      </div>
    )
  }

  // ── Post-trip state ─────────────────────────────────────────────────────────
  if (trip.phase === 'post') {
    return (
      <div style={{ padding: 18, textAlign: 'center', paddingTop: 40 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
          Trip Complete ✓
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)' }}>
          {tripTitle} — {trip.days.length} days
        </div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink3)', marginTop: 12 }}>
          You've been home for {trip.daysAfterTrip} day{trip.daysAfterTrip !== 1 ? 's' : ''}. Write some memories!
        </div>
      </div>
    )
  }

  // ── Active trip ─────────────────────────────────────────────────────────────
  const { day, dayNumber, days } = trip

  return (
    <div style={{ padding: 16 }}>

      {/* Day header */}
      <div style={{
        background: 'var(--ink)', color: 'var(--surf)',
        padding: '14px 16px', marginBottom: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, letterSpacing: '1px', opacity: 0.6 }}>
            DAY {dayNumber} OF {days.length}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, opacity: 0.5 }}>
            {day.date} · {now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.05 }}>
          {day.city}
        </div>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, opacity: 0.7, marginTop: 3 }}>
          {day.title}
        </div>
      </div>

      {/* Transport strip */}
      {day.transport && (
        <div style={{
          padding: '8px 12px', background: 'var(--surf)',
          border: '1px solid var(--border)', marginBottom: 14,
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          <span style={{ fontSize: 14 }}>🚇</span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', lineHeight: 1.5 }}>
            {day.transport}
          </span>
        </div>
      )}

      {/* Smart reminders */}
      {reminders.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          {reminders.map((r, i) => (
            <div key={i} style={{
              padding: '8px 12px', background: '#FFFBEB',
              border: '1px solid #C9A227', marginBottom: 4,
              display: 'flex', gap: 8, alignItems: 'center',
            }}>
              <span>{r.icon}</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: '#92690a' }}>
                {r.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Activities — Morning */}
      {morning.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>☀️ Morning</span>
          </div>
          {morning.map((act, i) => <ActivityCard key={i} act={act} slot="morning" mapsQuerySuffix={countryName} />)}
        </div>
      )}

      {/* Activities — Afternoon */}
      {afternoon.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8,
          }}>
            🌤 Afternoon
          </div>
          {afternoon.map((act, i) => <ActivityCard key={i} act={act} slot="afternoon" mapsQuerySuffix={countryName} />)}
        </div>
      )}

      {/* Activities — Evening */}
      {evening.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8,
          }}>
            🌆 Evening
          </div>
          {evening.map((act, i) => <ActivityCard key={i} act={act} slot="evening" mapsQuerySuffix={countryName} />)}
        </div>
      )}

      {/* Food + stay */}
      {(day.food || day.stay) && (
        <div style={{ border: '1px solid var(--border)', padding: '10px 12px', marginBottom: 14, background: 'var(--surf)' }}>
          {day.food && (
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', marginBottom: 5 }}>
              🍜 {day.food}
            </div>
          )}
          {day.stay && (
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)' }}>
              🛏 {day.stay}
            </div>
          )}
        </div>
      )}

      {/* Currency quick — the active arc's primary currency, falling back to
          the manually-set offline rate (JPY-INR) only if no arc currency data exists */}
      {(() => {
        const primary = content?.currencies?.[0]
        const symbol  = primary?.symbol || '¥'
        const rateVal = primary?.rateToINR ?? rate.rate
        return (
          <div style={{
            border: '1px solid var(--border)', padding: '10px 14px',
            background: 'var(--surf)', marginBottom: 14,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink4)' }}>
              Quick rate: {symbol}1 = ₹{rateVal.toFixed(2)}
            </span>
            <span style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
              {symbol}1,000 = ₹{(1000 * rateVal).toFixed(0)}
            </span>
          </div>
        )
      })()}

      {/* Offline snapshot */}
      <OfflineDownloadCard trip={activeTrip} days={days} bookingItems={content?.bookings} entries={entries} />

      {/* Next booking */}
      {nextBook && (
        <div style={{ border: '1px solid var(--border)', padding: '10px 12px', background: 'var(--surf)', marginBottom: 14 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', textTransform: 'uppercase', marginBottom: 4 }}>
            Next booking task
          </div>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>
            {nextBook.label}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 2 }}>
            {nextBook.window?.start} → {nextBook.window?.end}
          </div>
        </div>
      )}

      {/* Tomorrow preview */}
      {trip.dayIndex < days.length - 1 && (
        <div style={{
          border: '1px solid var(--border)', padding: '10px 12px', background: 'var(--surf)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 600, color: 'var(--ink3)', marginBottom: 2 }}>Tomorrow</div>
          {day.nextDay || days[trip.dayIndex + 1]?.city}
        </div>
      )}

    </div>
  )
}
