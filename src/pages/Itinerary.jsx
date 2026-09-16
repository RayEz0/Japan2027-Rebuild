import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTravel } from '../context/TravelContext'
import { useTripData } from '../hooks/useTripData'
import { ITINERARY_NAME_MAP } from '../data/places/index'
import { usePlaceStatus } from '../hooks/usePlaceStatus'

// ── Derived-value helpers (no data model changes — computed from existing fields) ──

function estimateTransitMinutes(transport) {
  if (!transport) return null
  const matches = [...transport.matchAll(/(\d+)\s*min/gi)]
  if (matches.length === 0) return null
  return matches.reduce((sum, m) => sum + parseInt(m[1], 10), 0)
}

function formatMinutes(mins) {
  if (mins == null) return null
  if (mins < 60) return `~${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m ? `~${h}h ${m}m` : `~${h}h`
}

function clockToMinutes(hhmm, meridiem) {
  const [hStr, mStr] = hhmm.split(':')
  let h = parseInt(hStr, 10)
  const m = parseInt(mStr, 10)
  if (meridiem) {
    const mer = meridiem.toUpperCase()
    if (mer === 'PM' && h !== 12) h += 12
    if (mer === 'AM' && h === 12) h = 0
  }
  return h * 60 + m
}

function visitDurationMinutes(timeStr) {
  if (!timeStr) return null
  const m = timeStr.match(/(\d{1,2}:\d{2})\s*(AM|PM)?\s*[–-]\s*(\d{1,2}:\d{2})\s*(AM|PM)?/i)
  if (!m) return null
  const [, t1, mer1raw, t2, mer2] = m
  const mer1 = mer1raw || mer2
  const start = clockToMinutes(t1, mer1)
  let end = clockToMinutes(t2, mer2)
  if (end < start) end += 24 * 60
  const diff = end - start
  if (diff <= 0 || diff > 20 * 60) return null
  return diff
}

function parseCostRange(cost) {
  if (!cost || typeof cost !== 'string') return null
  const nums = [...cost.matchAll(/¥\s?([\d,]+)/g)].map(m => parseInt(m[1].replace(/,/g, ''), 10))
  if (nums.length === 0) return /free/i.test(cost) ? { min: 0, max: 0 } : null
  return { min: Math.min(...nums), max: Math.max(...nums) }
}

function dailyBudget(places) {
  let min = 0, max = 0, any = false
  for (const p of places) {
    const r = parseCostRange(p.cost)
    if (r) { min += r.min; max += r.max; any = true }
  }
  return any ? { min, max } : null
}

function formatYen(n) {
  return `¥${n.toLocaleString('en-IN')}`
}

const PHOTO_KEYWORDS = ['photo', 'golden hour', 'sunrise', 'sunset', 'cinematic', 'dawn', 'silent', 'fog', 'misty', 'camera']

function photographyNotes(places) {
  return places.filter(p => p.tip && PHOTO_KEYWORDS.some(k => p.tip.toLowerCase().includes(k)))
}

const BASKETBALL_KEYWORDS = ['basketball', 'court', 'pickup', 'hoop', 'streetball', 'b.league']
const CAR_KEYWORDS = ['jdm', 'gtr', 'gt-r', 'garage', 'showroom', 'drift', 'daikoku', 'nismo']

function sportsHighlights(day, trip) {
  const text = (s) => (s || '').toLowerCase()
  const basketball = trip?.sports?.basketball
    ? day.places.filter(p => BASKETBALL_KEYWORDS.some(k => text(p.name).includes(k) || text(p.description).includes(k)))
    : []
  const cars = trip?.sports?.cars
    ? day.places.filter(p => CAR_KEYWORDS.some(k => text(p.name).includes(k) || text(p.description).includes(k)))
    : []
  return { basketball, cars }
}

function mapsLink(name, city) {
  const query = [name, city].filter(Boolean).join(' ')
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}`
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default function Itinerary() {
  const { activeArc: arc, primaryTrip } = useTravel()
  const { days } = useTripData()
  const { get } = usePlaceStatus()

  const heroImage = arc?.heroImage || ''
  const accent = arc?.theme?.accent || 'var(--ink)'

  const [openDay, setOpenDay] = useState(() => days[0]?.num ?? null)

  // Reset to Day 1 open whenever the active arc/trip changes while mounted
  const [lastArcNo, setLastArcNo] = useState(arc?.no)
  if (arc?.no !== lastArcNo) {
    setLastArcNo(arc?.no)
    setOpenDay(days[0]?.num ?? null)
  }

  const toggleDay = (num) => {
    setOpenDay(prev => (prev === num ? null : num))
  }

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${heroImage}')`,
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(12,12,12,0.1) 0%, rgba(12,12,12,0.7) 100%)',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px', width: '100%' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px',
            textTransform: 'uppercase', marginBottom: 6,
          }}>
            Arc {arc?.no || '01'} — {arc?.title || 'Itinerary'}
          </div>
          <div style={{
            fontFamily: 'Fraunces, serif', fontSize: 42,
            fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff',
          }}>Itinerary</div>
        </div>
      </div>

      {/* Summary bar */}
      <div style={{
        display: 'flex', gap: 32, alignItems: 'center',
        padding: '14px 52px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--paper)',
      }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>Duration</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginTop: 2 }}>{arc?.duration || `${days.length} days`}</div>
        </div>
        <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>Days</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginTop: 2 }}>{days.length}</div>
        </div>
        <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>Places</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginTop: 2 }}>{days.reduce((s, d) => s + (d.places?.length || 0), 0)}</div>
        </div>
        <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>Budget</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginTop: 2 }}>{arc?.budgetDisplay || '—'}</div>
        </div>
      </div>

      {/* No data */}
      {days.length === 0 && (
        <div style={{
          padding: '80px 52px', textAlign: 'center',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink4)',
        }}>
          Itinerary not yet planned for this arc.
        </div>
      )}

      {/* Day accordions */}
      <div style={{ padding: '20px var(--page-pad) 80px' }}>
        {days.map((day, di) => (
          <DayAccordion
            key={`itin-day-${di}`}
            day={day}
            accent={accent}
            isOpen={openDay === (day.num ?? di)}
            onToggle={() => toggleDay(day.num ?? di)}
            getStatus={get}
            trip={primaryTrip}
          />
        ))}
      </div>
    </div>
  )
}

// ── Day accordion ─────────────────────────────────────────────────────────────

function DayAccordion({ day, accent, isOpen, onToggle, getStatus, trip }) {
  const places = day.places || []
  const transitMinutes = estimateTransitMinutes(day.transport)
  const budget = dailyBudget(places)
  const photoNotes = photographyNotes(places)
  const { basketball, cars } = sportsHighlights(day, trip)

  return (
    <div
      className={`itin-day-card${isOpen ? ' is-open' : ''}`}
      style={{ marginBottom: 20 }}
    >
      {/* Collapsed header — always visible, click to toggle */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`itin-day-header${isOpen ? ' is-open' : ''}`}
        style={{
          display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
          width: '100%', textAlign: 'left', cursor: 'pointer',
          padding: '32px 32px', border: 'none', minHeight: 104,
        }}
      >
        {/* Day / date / city / title block */}
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 10 }}>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 14,
              color: accent, letterSpacing: '1.8px', textTransform: 'uppercase', fontWeight: 700,
            }}>
              Day {day.num}
            </span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
              color: 'var(--ink4)', letterSpacing: '0.5px',
            }}>
              {day.date}
            </span>
            {day.city && (
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                color: 'var(--ink3)', letterSpacing: '0.3px',
              }}>
                · {day.city}
              </span>
            )}
          </div>
          <div style={{
            fontFamily: 'Fraunces, serif', fontSize: 24,
            fontWeight: 700, color: 'var(--ink)', lineHeight: 1.15,
          }}>
            {day.title}
          </div>
        </div>

        {/* Quick stats + chevron */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexShrink: 0, marginLeft: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11.5, color: 'var(--ink2)', fontWeight: 500 }}>
              {places.length} place{places.length === 1 ? '' : 's'}
            </span>
            {formatMinutes(transitMinutes) && (
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10.5, color: 'var(--ink4)' }}>
                🚃 {formatMinutes(transitMinutes)}
              </span>
            )}
          </div>
          <span
            aria-hidden="true"
            className={`itin-day-chevron${isOpen ? ' is-open' : ''}`}
            style={{
              width: 40, height: 40, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1.5px solid ${isOpen ? accent : 'var(--border)'}`,
              borderRadius: 10,
              color: isOpen ? accent : 'var(--ink3)',
              fontSize: 17,
            }}
          >
            ▾
          </span>
        </div>
      </button>

      {/* Expanded body — animated via CSS grid-rows */}
      <div className={`itin-accordion-body${isOpen ? ' is-open' : ''}`}>
        <div>
          {/* Day transport */}
          {day.transport && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 8,
              padding: '14px 32px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--surf)',
            }}>
              <span style={{ fontSize: 11, flexShrink: 0 }}>🚃</span>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                color: 'var(--ink3)', lineHeight: 1.6,
              }}>{day.transport}</span>
            </div>
          )}

          {/* Places timeline */}
          <div style={{ background: 'var(--surf)' }}>
            {places.map((place, pi) => (
              <PlaceRow
                key={pi}
                place={place}
                city={day.city}
                accent={accent}
                isLast={pi === places.length - 1}
                getStatus={getStatus}
              />
            ))}
          </div>

          {/* Daily budget + photography notes */}
          {(budget || photoNotes.length > 0) && (
            <div style={{
              padding: '18px 32px',
              borderTop: '1px solid var(--border)',
              background: 'var(--paper)',
              display: 'flex', flexWrap: 'wrap', gap: 24,
            }}>
              {budget && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', paddingTop: 2, flexShrink: 0 }}>Daily Budget</span>
                  <span style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>
                    {budget.min === budget.max ? formatYen(budget.min) : `${formatYen(budget.min)}–${formatYen(budget.max)}`}
                  </span>
                </div>
              )}
              {photoNotes.length > 0 && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flex: '1 1 260px' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', paddingTop: 2, flexShrink: 0 }}>📷 Photo Notes</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {photoNotes.map((p, i) => (
                      <span key={i} style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11.5, color: 'var(--ink2)', lineHeight: 1.5 }}>
                        <em style={{ color: 'var(--ink3)' }}>{p.name}:</em> {p.tip}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Basketball / Car highlights — only when applicable */}
          {(basketball.length > 0 || cars.length > 0) && (
            <div style={{
              padding: '18px 32px',
              borderTop: '1px solid var(--border)',
              background: 'var(--paper)',
              display: 'flex', flexWrap: 'wrap', gap: 24,
            }}>
              {basketball.length > 0 && (
                <Link to="/basketball" style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                  color: accent, textDecoration: 'none',
                  border: `1px solid ${accent}`, padding: '5px 12px',
                }}>
                  🏀 Basketball highlight this day — see Basketball page →
                </Link>
              )}
              {cars.length > 0 && (
                <Link to="/cars" style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                  color: accent, textDecoration: 'none',
                  border: `1px solid ${accent}`, padding: '5px 12px',
                }}>
                  🚗 Car culture highlight this day — see JDM / Cars page →
                </Link>
              )}
            </div>
          )}

          {/* Day footer — food + stay */}
          {(day.food || day.stay || day.nextDay) && (
            <div style={{
              padding: '18px 32px',
              borderTop: '1px solid var(--border)',
              background: 'var(--paper)',
              display: 'flex', flexWrap: 'wrap', gap: 24,
            }}>
              {day.food && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', paddingTop: 2, flexShrink: 0 }}>Food</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink2)', lineHeight: 1.5 }}>{day.food}</span>
                </div>
              )}
              {day.stay && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', paddingTop: 2, flexShrink: 0 }}>Stay</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink2)', lineHeight: 1.5 }}>{day.stay}</span>
                </div>
              )}
              {day.nextDay && (
                <div style={{ marginLeft: 'auto' }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: accent, letterSpacing: '0.3px' }}>{day.nextDay}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PlaceRow({ place, city, accent, isLast, getStatus }) {
  const images   = place.images || []
  const placeId  = ITINERARY_NAME_MAP[place.name]
  const status   = placeId && getStatus ? getStatus(placeId) : null
  const duration = formatMinutes(visitDurationMinutes(place.time))

  return (
    <div style={{
      padding: '24px 32px',
      borderBottom: isLast ? 'none' : '1px solid var(--border)',
    }}>
      {/* Place header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
        {place.time && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: accent, letterSpacing: '0.5px', flexShrink: 0,
          }}>{place.time}</span>
        )}
        <span style={{
          fontFamily: 'Fraunces, serif', fontSize: 18,
          fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1,
        }}>{place.name}</span>

        {/* Visit duration */}
        {duration && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            color: 'var(--ink4)', flexShrink: 0,
          }}>{duration}</span>
        )}

        {/* Status badge */}
        {status?.visited && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
            background: '#2e7d32', color: '#fff', padding: '2px 7px',
            letterSpacing: '0.5px', flexShrink: 0,
          }}>VISITED</span>
        )}
        {!status?.visited && status?.favourite && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
            background: '#b5451b', color: '#fff', padding: '2px 7px',
            letterSpacing: '0.5px', flexShrink: 0,
          }}>FAVOURITE</span>
        )}
        {!status?.visited && status?.wantToVisit && (
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
            background: 'var(--ink)', color: '#fff', padding: '2px 7px',
            letterSpacing: '0.5px', flexShrink: 0,
          }}>WISHLIST</span>
        )}

        {/* View Place link */}
        {placeId && (
          <Link
            to={`/place/${placeId}`}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              color: 'var(--ink3)', textDecoration: 'none',
              border: '1px solid var(--border)', padding: '2px 8px',
              letterSpacing: '0.4px', flexShrink: 0,
              transition: 'border-color 0.12s, color 0.12s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink3)' }}
          >
            View Place →
          </Link>
        )}

        {/* Google Maps link */}
        <a
          href={mapsLink(place.name, city)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            color: 'var(--ink3)', textDecoration: 'none',
            border: '1px solid var(--border)', padding: '2px 8px',
            letterSpacing: '0.4px', flexShrink: 0,
            transition: 'border-color 0.12s, color 0.12s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--ink3)' }}
        >
          ↗ Google Maps
        </a>
      </div>

      {/* Description */}
      {place.description && (
        <p style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 13.5,
          color: 'var(--ink2)', lineHeight: 1.7,
          margin: '0 0 12px',
          maxWidth: 680,
        }}>{place.description}</p>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: images.length === 1
            ? '1fr'
            : images.length === 2
            ? '1fr 1fr'
            : 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 2,
          marginBottom: 12,
        }}>
          {images.slice(0, 6).map((src, i) => (
            <div key={i} style={{ height: images.length === 1 ? 320 : 180, overflow: 'hidden' }}>
              <img
                src={src}
                alt={`${place.name} ${i + 1}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Cost + tip */}
      {(place.cost || place.tip) && (
        <div style={{
          padding: '10px 14px', marginBottom: 10,
          borderLeft: `3px solid ${accent}`,
          background: 'var(--paper)',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          color: 'var(--ink2)', lineHeight: 1.9,
        }}>
          {place.cost && <div style={{ color: 'var(--ink3)' }}>{place.cost}</div>}
          {place.tip && <div style={{ marginTop: place.cost ? 3 : 0 }}><em>{place.tip}</em></div>}
        </div>
      )}

      {/* Place transport */}
      {place.transport && (
        <div style={{
          display: 'flex', gap: 7, alignItems: 'flex-start',
          paddingTop: 8, borderTop: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: 10 }}>🚃</span>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            color: 'var(--ink4)', lineHeight: 1.55,
          }}>{place.transport}</span>
        </div>
      )}
    </div>
  )
}
