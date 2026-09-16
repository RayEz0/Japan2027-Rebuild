import { useState, useRef, useMemo } from 'react'
import { useBackup }    from '../hooks/useBackup'
import { useExpenses, EXPENSE_CATEGORIES } from '../hooks/useExpenses'
import { usePacking }   from '../hooks/usePacking'
import { useBookings }  from '../hooks/useBookings'
import { useTravel } from '../context/TravelContext'
import { useResolvedContent } from '../hooks/useResolvedContent'
import { useTripData }  from '../hooks/useTripData'
import { useJournal, MOODS, WEATHER_OPTS } from '../context/JournalContext'

/* ── design tokens ── */
const mono = { fontFamily: '"JetBrains Mono", monospace' }
const label = { ...mono, fontSize: 7.5, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--ink4)' }

const BUDGET_BREAKDOWN = [
  { id: 'flights',       icon: '✈️',  name: 'Flights',         pct: 0.30 },
  { id: 'accommodation', icon: '🏨',  name: 'Accommodation',   pct: 0.25 },
  { id: 'food',          icon: '🍜',  name: 'Food',            pct: 0.20 },
  { id: 'transport',     icon: '🚃',  name: 'Local Transport', pct: 0.12 },
  { id: 'activities',    icon: '🎡',  name: 'Activities',      pct: 0.07 },
  { id: 'shopping',      icon: '🛍️', name: 'Shopping',         pct: 0.04 },
  { id: 'emergency',     icon: '🆘',  name: 'Emergency',       pct: 0.02 },
]

function SectionHeader({ n, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
      <span style={{ ...mono, fontSize: 8.5, color: 'var(--ink4)', letterSpacing: '1px' }}>{n}</span>
      <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{title}</h2>
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--border)', margin: '36px 0' }} />
}

/* ── 01. Trip Overview ── */
function TripOverviewExport({ arc, content }) {
  if (!arc) return null
  return (
    <div className="print-section">
      <SectionHeader n="01" title="Trip Overview" />

      {/* Arc hero info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 24 }}>
        {[
          { l: 'Arc',       v: `${arc.no} — ${arc.title}` },
          { l: 'Year',      v: `${arc.month} ${arc.year}` },
          { l: 'Duration',  v: arc.duration  || '—' },
          { l: 'Status',    v: arc.status === 'active' ? 'Planning Active' : 'Planned' },
          { l: 'Budget',    v: arc.budgetDisplay || '—' },
          { l: 'Countries', v: arc.countries?.join(' · ') || '—' },
        ].map(({ l, v }) => (
          <div key={l} style={{ background: 'var(--surf)', padding: '14px 18px' }}>
            <div style={{ ...label, marginBottom: 4 }}>{l}</div>
            <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500, lineHeight: 1.3 }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Subtitle */}
      {arc.subtitle && (
        <p style={{ ...mono, fontSize: 9, color: 'var(--ink3)', marginBottom: 20, lineHeight: 1.8 }}>
          {arc.subtitle}
        </p>
      )}

      {/* Currencies */}
      {content?.currencies?.length > 0 && (
        <>
          <div style={{ ...mono, fontSize: 8, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--ink4)', marginBottom: 12 }}>Currencies</div>
          <div style={{ border: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 60px 60px 100px 1fr', padding: '7px 14px', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
              {['Country', 'Code', 'Symbol', '1 INR →', 'Notes'].map(h => (
                <span key={h} style={{ ...label }}>{h}</span>
              ))}
            </div>
            {content.currencies.map(c => (
              <div key={c.code + c.country} style={{ display: 'grid', gridTemplateColumns: '140px 60px 60px 100px 1fr', padding: '9px 14px', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--surf)' }}>
                <span style={{ fontSize: 13, color: 'var(--ink)' }}>{c.country}</span>
                <span style={{ ...mono, fontSize: 10, color: 'var(--ink)', fontWeight: 600 }}>{c.code}</span>
                <span style={{ ...mono, fontSize: 11, color: 'var(--ink)' }}>{c.symbol}</span>
                <span style={{ ...mono, fontSize: 10, color: 'var(--ink3)' }}>
                  {c.rateToINR < 1
                    ? `${c.symbol}${(1 / c.rateToINR).toFixed(1)}`
                    : `${c.symbol}${c.rateToINR.toFixed(2)}`}
                </span>
                <span style={{ fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.5 }}>{c.notes}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Planning notes */}
      {content?.notes?.length > 0 && (
        <>
          <div style={{ ...mono, fontSize: 8, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--ink4)', marginTop: 20, marginBottom: 12 }}>Planning Notes</div>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {content.notes.map((n, i) => (
              <li key={i} style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.8, marginBottom: 4 }}>{n}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

/* ── 02. Budget Summary ── */
function BudgetSummaryExport({ arc }) {
  if (!arc?.budgetRange) return null
  const { min, max } = arc.budgetRange
  const target = Math.round((min + max) / 2)

  return (
    <div className="print-section">
      <SectionHeader n="02" title="Budget Summary" />
      <p style={{ ...mono, fontSize: 8.5, color: 'var(--ink3)', marginBottom: 20 }}>
        {arc.title} · {arc.duration || '—'} · Solo travel
      </p>

      {/* Min / Target / Max */}
      <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 20 }}>
        {[
          { l: 'Minimum', v: min },
          { l: 'Target',  v: target },
          { l: 'Maximum', v: max },
        ].map(({ l, v }) => (
          <div key={l} style={{ background: 'var(--surf)', padding: '16px 20px', minWidth: 0 }}>
            <div style={{ ...label, marginBottom: 6 }}>{l}</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 600, color: 'var(--ink)' }}>
              ₹{v.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>

      {/* Category table */}
      <div style={{ border: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 120px 120px 120px', padding: '7px 14px', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
          {['', 'Category', 'Min', 'Target', 'Max'].map(h => (
            <span key={h} style={{ ...label }}>{h}</span>
          ))}
        </div>
        {BUDGET_BREAKDOWN.map(cat => (
          <div key={cat.id} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 120px 120px 120px', padding: '8px 14px', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--surf)' }}>
            <span style={{ fontSize: 14 }}>{cat.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--ink)' }}>{cat.name}</span>
            <span style={{ ...mono, fontSize: 10, color: 'var(--ink3)' }}>₹{Math.round(min * cat.pct).toLocaleString('en-IN')}</span>
            <span style={{ ...mono, fontSize: 10, color: 'var(--ink)', fontWeight: 500 }}>₹{Math.round(target * cat.pct).toLocaleString('en-IN')}</span>
            <span style={{ ...mono, fontSize: 10, color: 'var(--ink3)' }}>₹{Math.round(max * cat.pct).toLocaleString('en-IN')}</span>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 120px 120px 120px', padding: '10px 14px', background: 'var(--paper)', borderTop: '1.5px solid var(--ink)' }}>
          <span />
          <span style={{ ...mono, fontSize: 9, color: 'var(--ink)', fontWeight: 600 }}>TOTAL</span>
          <span style={{ ...mono, fontSize: 10, color: 'var(--ink3)' }}>₹{min.toLocaleString('en-IN')}</span>
          <span style={{ ...mono, fontSize: 10, color: 'var(--ink)', fontWeight: 600 }}>₹{target.toLocaleString('en-IN')}</span>
          <span style={{ ...mono, fontSize: 10, color: 'var(--ink3)' }}>₹{max.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  )
}

/* ── 03. Itinerary ── */
function ItineraryExport({ content, arc }) {
  const itinerary = content?.itinerary || []
  return (
    <div className="print-section print-page-break">
      <SectionHeader n="03" title="Itinerary" />
      <p style={{ ...mono, fontSize: 8.5, color: 'var(--ink3)', marginBottom: 20 }}>
        {arc?.title || 'Arc'} · {arc?.duration || '—'} · {arc?.month} {arc?.year}
      </p>

      {itinerary.length === 0 ? (
        <div style={{ ...mono, fontSize: 9.5, color: 'var(--ink4)', padding: '20px 0' }}>
          No itinerary data for this arc.
        </div>
      ) : (
        <div style={{ border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 140px 80px 1fr', padding: '7px 14px', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
            {['Days', 'City', 'Nights', 'Highlights'].map(h => (
              <span key={h} style={{ ...label }}>{h}</span>
            ))}
          </div>
          {itinerary.map((day, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 140px 80px 1fr', padding: '10px 14px', alignItems: 'start', borderBottom: i < itinerary.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--surf)' }}>
              <span style={{ ...mono, fontSize: 9, color: 'var(--ink3)', marginTop: 2 }}>D{day.days}</span>
              <div>
                <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{day.city}</div>
                {day.transport && (
                  <div style={{ ...mono, fontSize: 7.5, color: 'var(--ink4)', marginTop: 3, lineHeight: 1.5 }}>{day.transport}</div>
                )}
              </div>
              <span style={{ ...mono, fontSize: 9, color: 'var(--ink3)', marginTop: 2 }}>
                {day.nights > 0 ? `${day.nights}n` : 'Day trip'}
              </span>
              <div style={{ fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.7 }}>
                {day.highlights?.join(' · ') || '—'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── 04. Stays ── */
function StaysExport({ content }) {
  const stays = content?.stays || []
  return (
    <div className="print-section">
      <SectionHeader n="04" title="Stays" />

      {stays.length === 0 ? (
        <div style={{ ...mono, fontSize: 9.5, color: 'var(--ink4)', padding: '20px 0' }}>
          No stays data for this arc.
        </div>
      ) : (
        stays.map((country, ci) => (
          <div key={ci} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, paddingBottom: 6, borderBottom: '1.5px solid var(--ink)' }}>
              <span style={{ fontSize: 18 }}>{country.flag}</span>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{country.country}</span>
            </div>
            <div style={{ border: '1px solid var(--border)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 180px 60px 1fr', padding: '7px 14px', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
                {['City', 'Type', 'Nights', 'Notes'].map(h => (
                  <span key={h} style={{ ...label }}>{h}</span>
                ))}
              </div>
              {country.cities.map((city, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 180px 60px 1fr', padding: '9px 14px', alignItems: 'start', borderBottom: i < country.cities.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--surf)' }}>
                  <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{city.city}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink3)' }}>{city.type}</span>
                  <span style={{ ...mono, fontSize: 9, color: 'var(--ink3)' }}>{city.nights > 0 ? `${city.nights}n` : 'Day'}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.5 }}>{city.note}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

/* ── 05. Bookings ── */
function BookingsExport({ bookings, content, tripData }) {
  const { get } = bookings
  const { activeArc: arc, primaryTrip } = useTravel()

  // Use arc content bookings first; fall back to legacy tripData bookingItems
  const bookingItems = content?.bookings?.length > 0
    ? content.bookings
    : tripData.bookingItems

  return (
    <div className="print-section">
      <SectionHeader n="05" title="Booking Summary" />
      <p style={{ ...mono, fontSize: 8.5, color: 'var(--ink3)', marginBottom: 20 }}>
        Confirmation references for {arc?.title || primaryTrip?.title || 'this trip'} — carry this printout.
      </p>

      {!bookingItems?.length ? (
        <div style={{ ...mono, fontSize: 9.5, color: 'var(--ink4)', padding: '20px 0' }}>
          No booking roadmap configured for this arc.
        </div>
      ) : (
        <div style={{ border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 160px 1fr', padding: '7px 14px', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
            {['Booking', 'Priority', 'Status', 'Conf. Ref', 'Notes'].map(h => (
              <span key={h} style={{ ...label }}>{h}</span>
            ))}
          </div>
          {bookingItems.map(item => {
            const state = get(item.id)
            return (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px 160px 1fr', padding: '10px 14px', alignItems: 'start', borderBottom: '1px solid var(--border)', background: 'var(--surf)' }}>
                <div>
                  <div style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.3 }}>{item.label}</div>
                  {item.window && (
                    <div style={{ ...mono, fontSize: 7.5, color: 'var(--ink4)', marginTop: 2 }}>
                      {item.window.start} – {item.window.end}
                    </div>
                  )}
                </div>
                <span style={{ ...mono, fontSize: 8, color: item.priority === 'critical' ? 'var(--accent)' : 'var(--ink4)', marginTop: 2, textTransform: 'uppercase' }}>
                  {item.priority || '—'}
                </span>
                <span style={{ ...mono, fontSize: 9, color: state?.done ? '#2e7d32' : 'var(--ink4)', marginTop: 2 }}>
                  {state?.done ? '✓ Done' : '—'}
                </span>
                <span style={{ ...mono, fontSize: 10, color: 'var(--ink)', marginTop: 2, wordBreak: 'break-all' }}>
                  {state?.confirmRef || '—'}
                </span>
                <span style={{ fontSize: 12, color: 'var(--ink3)', marginTop: 2, lineHeight: 1.4 }}>
                  {state?.notes || '—'}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ── 06. Packing ── */
function PackingExport({ packing, content, tripData }) {
  const { isPacked } = packing
  const { activeArc: arc, primaryTrip } = useTravel()

  function fmtDate(str, opts) {
    if (!str) return ''
    const d = new Date(str.includes('T') ? str : str + 'T12:00:00')
    return isNaN(d) ? str : d.toLocaleDateString('en-GB', opts)
  }

  const dateOpts = { day: 'numeric', month: 'short', year: 'numeric' }
  const trip = primaryTrip

  // Legacy detailed packing categories (Japan / Scotland / Norway)
  const hasLegacyPacking = tripData.packingCategories?.length > 0
  const packingCategories = tripData.packingCategories || []
  const totalItems = tripData.totalItems || 0

  // Arc content packing notes fallback
  const packingNotes = content?.packingNotes || []

  const subtitle = [
    arc?.title || trip?.title,
    trip?.departure && trip?.return_
      ? `${fmtDate(trip.departure, dateOpts)} – ${fmtDate(trip.return_, dateOpts)}`
      : arc?.duration ? arc.duration : null,
    'Solo',
    hasLegacyPacking && totalItems ? `${totalItems} items across ${packingCategories.length} categories` : null,
  ].filter(Boolean).join(' · ')

  return (
    <div className="print-section print-page-break">
      <SectionHeader n="06" title="Packing List" />
      <p style={{ ...mono, fontSize: 8.5, color: 'var(--ink3)', marginBottom: 20 }}>{subtitle}</p>

      {/* Legacy detailed packing (Japan / Scotland / Norway) */}
      {hasLegacyPacking && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {packingCategories.map(cat => (
            <div key={cat.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, paddingBottom: 6, borderBottom: '1.5px solid var(--ink)' }}>
                <span style={{ fontSize: 14 }}>{cat.icon}</span>
                <span style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{cat.label}</span>
              </div>
              {cat.items.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 12, height: 12, border: '1.5px solid var(--ink)', background: isPacked(item.id) ? 'var(--ink)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isPacked(item.id) && (
                      <svg width="7" height="5" viewBox="0 0 8 6" fill="none" stroke="white" strokeWidth="1.5">
                        <path d="M1 3l2 2 4-4"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 11.5, color: isPacked(item.id) ? 'var(--ink4)' : 'var(--ink)', textDecoration: isPacked(item.id) ? 'line-through' : 'none', flex: 1 }}>
                    {item.label}
                  </span>
                  {item.critical && (
                    <span style={{ ...mono, fontSize: 6.5, color: 'var(--accent)', border: '1px solid var(--accent)', padding: '1px 3px' }}>!</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Arc content packing notes (arcs 03–09 and any arc with packingNotes) */}
      {!hasLegacyPacking && packingNotes.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {packingNotes.map((cat, ci) => (
            <div key={ci}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, paddingBottom: 6, borderBottom: '1.5px solid var(--ink)' }}>
                <span style={{ fontSize: 14 }}>{cat.icon}</span>
                <span style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{cat.category}</span>
              </div>
              {cat.items.map((itemStr, ii) => (
                <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 12, height: 12, border: '1.5px solid var(--ink)', background: 'transparent', flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 11.5, color: 'var(--ink)', flex: 1, lineHeight: 1.4 }}>{itemStr}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {!hasLegacyPacking && packingNotes.length === 0 && (
        <div style={{ ...mono, fontSize: 9.5, color: 'var(--ink4)', padding: '20px 0' }}>
          No packing list for this arc yet.
        </div>
      )}
    </div>
  )
}

/* ── 07. Gift Ideas ── */
function GiftsExport({ content }) {
  const giftIdeas = content?.giftIdeas || []
  return (
    <div className="print-section">
      <SectionHeader n="07" title="Gift Ideas" />

      {giftIdeas.length === 0 ? (
        <div style={{ ...mono, fontSize: 9.5, color: 'var(--ink4)', padding: '20px 0' }}>
          No gift ideas for this arc yet.
        </div>
      ) : (
        giftIdeas.map((country, ci) => (
          <div key={ci} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, paddingBottom: 6, borderBottom: '1.5px solid var(--ink)' }}>
              <span style={{ fontSize: 18 }}>{country.flag}</span>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>{country.country}</span>
            </div>
            <div style={{ border: '1px solid var(--border)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '7px 14px', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
                {['Item', 'Where to Buy'].map(h => (
                  <span key={h} style={{ ...label }}>{h}</span>
                ))}
              </div>
              {country.items.map((gift, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '9px 14px', alignItems: 'start', borderBottom: i < country.items.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--surf)' }}>
                  <span style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.4 }}>{gift.name}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.4 }}>{gift.where}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

/* ── 08. Expense Log ── */
function ExpensesExport({ expenses }) {
  const { entries, total, byCategory } = expenses
  const catMap = Object.fromEntries(EXPENSE_CATEGORIES.map(c => [c.id, c]))

  return (
    <div className="print-section print-page-break">
      <SectionHeader n="08" title="Expense Log" />
      <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <div style={{ ...label, marginBottom: 4 }}>Total Spent</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 600, color: 'var(--ink)' }}>
            ₹{total.toLocaleString('en-IN')}
          </div>
        </div>
        <div>
          <div style={{ ...label, marginBottom: 4 }}>Entries</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 600, color: 'var(--ink)' }}>
            {entries.length}
          </div>
        </div>
      </div>

      {entries.length === 0 ? (
        <div style={{ ...mono, fontSize: 9.5, color: 'var(--ink4)', padding: '20px 0' }}>
          No expenses logged.
        </div>
      ) : (
        <div style={{ border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '50px 100px 120px 1fr 90px 90px', padding: '7px 14px', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
            {['Day', 'City', 'Category', 'Description', '₹ INR', '¥ JPY'].map(h => (
              <span key={h} style={{ ...label }}>{h}</span>
            ))}
          </div>
          {entries.map((e, i) => (
            <div key={e.id} style={{ display: 'grid', gridTemplateColumns: '50px 100px 120px 1fr 90px 90px', padding: '7px 14px', alignItems: 'center', borderBottom: i < entries.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--surf)' }}>
              <span style={{ ...mono, fontSize: 9, color: 'var(--ink3)' }}>D{e.dayNum || '—'}</span>
              <span style={{ fontSize: 12, color: 'var(--ink)' }}>{e.city || '—'}</span>
              <span style={{ fontSize: 12, color: 'var(--ink)' }}>{catMap[e.category]?.icon || ''} {catMap[e.category]?.label || e.category}</span>
              <span style={{ fontSize: 12, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.description || '—'}</span>
              <span style={{ ...mono, fontSize: 9.5, color: 'var(--ink)', textAlign: 'right' }}>{e.inr ? `₹${Number(e.inr).toLocaleString('en-IN')}` : '—'}</span>
              <span style={{ ...mono, fontSize: 9.5, color: 'var(--ink3)', textAlign: 'right' }}>{e.jpy ? `¥${Number(e.jpy).toLocaleString()}` : '—'}</span>
            </div>
          ))}
          <div style={{ padding: '12px 14px', borderTop: '1.5px solid var(--ink)', background: 'var(--paper)' }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {EXPENSE_CATEGORIES.filter(c => byCategory[c.id] > 0).map(c => (
                <span key={c.id} style={{ ...mono, fontSize: 8.5, color: 'var(--ink3)' }}>
                  {c.icon} {c.label}: ₹{byCategory[c.id].toLocaleString('en-IN')}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── 09. Backup & Restore ── */
function BackupSection({ backup }) {
  const { downloadBackup, restoreBackup } = backup
  const fileRef = useRef(null)
  const [status, setStatus] = useState(null)

  async function handleRestore(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setStatus({ type: 'loading', msg: 'Restoring…' })
    try {
      const result = await restoreBackup(file)
      setStatus({ type: 'ok', msg: `Restored ${result.restored} stores from backup created ${result.createdAt?.slice(0, 10) || 'unknown'}.` })
      setTimeout(() => window.location.reload(), 1500)
    } catch (err) {
      setStatus({ type: 'error', msg: err.message })
    }
    e.target.value = ''
  }

  return (
    <div className="print-section">
      <SectionHeader n="09" title="Backup & Restore" />
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <button
          onClick={downloadBackup}
          style={{ ...mono, fontSize: 9, letterSpacing: '0.8px', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--surf)', border: '1.5px solid var(--ink)', padding: '9px 20px', cursor: 'pointer' }}
        >↓ Download Backup (JSON)</button>
        <button
          onClick={() => fileRef.current?.click()}
          style={{ ...mono, fontSize: 9, letterSpacing: '0.8px', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--ink)', padding: '9px 20px', cursor: 'pointer' }}
        >↑ Restore from File</button>
        <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleRestore} />
      </div>
      {status && (
        <div style={{ ...mono, fontSize: 9, padding: '10px 14px', background: 'var(--surf)', border: '1px solid var(--border)', borderLeftWidth: 3, borderLeftColor: status.type === 'ok' ? '#4caf50' : status.type === 'error' ? 'var(--accent)' : 'var(--border)', color: status.type === 'error' ? 'var(--accent)' : 'var(--ink)' }}>
          {status.msg}
        </div>
      )}
      <p style={{ ...mono, fontSize: 8.5, color: 'var(--ink3)', marginTop: 12, lineHeight: 1.7 }}>
        Backup exports all data stores (expenses, bookings, place status, savings, gifts, packing, photos) as a single JSON file. Restore overwrites local data and reloads the app.
      </p>
    </div>
  )
}

/* ── 10. Data Integrity ── */
function IntegritySection({ backup }) {
  const { checkIntegrity, resetStore, resetAll } = backup
  const [report, setReport] = useState(null)
  const [confirm, setConfirm] = useState(null)

  function runCheck() { setReport(checkIntegrity()) }

  function handleReset(id) {
    if (confirm === id) {
      resetStore(id)
      setReport(checkIntegrity())
      setConfirm(null)
    } else {
      setConfirm(id)
      setTimeout(() => setConfirm(c => c === id ? null : c), 3000)
    }
  }

  const statusColor = s => s === 'ok' ? 'var(--ink)' : s === 'empty' ? 'var(--ink4)' : 'var(--accent)'

  return (
    <div className="print-section">
      <SectionHeader n="10" title="Data Integrity" />
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button onClick={runCheck} style={{ ...mono, fontSize: 9, letterSpacing: '0.8px', textTransform: 'uppercase', background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--ink)', padding: '9px 20px', cursor: 'pointer' }}>
          Run Integrity Check
        </button>
        <button
          onClick={() => { if (window.confirm('Reset ALL data stores? This cannot be undone.')) { resetAll(); window.location.reload() } }}
          style={{ ...mono, fontSize: 9, letterSpacing: '0.8px', textTransform: 'uppercase', background: 'transparent', color: 'var(--accent)', border: '1.5px solid var(--accent)', padding: '9px 20px', cursor: 'pointer' }}
        >Reset All Data</button>
      </div>

      {report && (
        <div style={{ border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 60px 70px 80px', padding: '7px 14px', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
            {['Store', 'Status', 'Records', 'Size', 'Action'].map(h => <span key={h} style={{ ...label }}>{h}</span>)}
          </div>
          {report.map(row => (
            <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1fr 70px 60px 70px 80px', padding: '8px 14px', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--surf)' }}>
              <span style={{ fontSize: 12.5, color: 'var(--ink)' }}>{row.label}</span>
              <span style={{ ...mono, fontSize: 9, color: statusColor(row.status) }}>{row.status}</span>
              <span style={{ ...mono, fontSize: 9, color: 'var(--ink3)' }}>{row.status === 'ok' ? row.count : '—'}</span>
              <span style={{ ...mono, fontSize: 9, color: 'var(--ink3)' }}>{row.status === 'ok' ? `${row.sizeKB} KB` : '—'}</span>
              <button
                onClick={() => handleReset(row.id)}
                disabled={row.status === 'empty'}
                style={{ ...mono, fontSize: 8, letterSpacing: '0.5px', textTransform: 'uppercase', background: 'transparent', cursor: row.status === 'empty' ? 'default' : 'pointer', border: `1px solid ${confirm === row.id ? 'var(--accent)' : 'var(--border)'}`, color: confirm === row.id ? 'var(--accent)' : 'var(--ink3)', padding: '3px 8px', opacity: row.status === 'empty' ? 0.3 : 1, transition: 'all 0.14s' }}
              >{confirm === row.id ? 'Confirm?' : 'Reset'}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── 11. Journal ── */
function JournalExport({ journal }) {
  const { entries } = journal
  const { activeArc: arc } = useTravel()

  // Show entries for the active arc, or all entries if none
  const relevant = useMemo(() => {
    if (!arc) return entries
    const filtered = entries.filter(e => e.arcYear === arc.year || !e.arcYear)
    return filtered.length > 0 ? filtered : entries
  }, [entries, arc])

  // Group by date
  const byDate = useMemo(() => {
    const map = {}
    for (const e of relevant) {
      const key = e.date || 'undated'
      if (!map[key]) map[key] = []
      map[key].push(e)
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
  }, [relevant])

  function fmtDate(d) {
    if (!d) return 'Undated'
    try {
      return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    } catch { return d }
  }

  return (
    <div className="print-section print-page-break">
      <SectionHeader n="11" title="Travel Journal" />
      {relevant.length === 0 ? (
        <div style={{ ...mono, fontSize: 9.5, color: 'var(--ink4)', padding: '20px 0' }}>
          No journal entries yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {byDate.map(([date, dayEntries]) => (
            <div key={date} style={{ marginBottom: 24 }}>
              {/* Day header */}
              <div style={{
                paddingBottom: 6, marginBottom: 12,
                borderBottom: '1.5px solid var(--ink)',
                display: 'flex', alignItems: 'baseline', gap: 14,
              }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
                  {fmtDate(date)}
                </div>
                <div style={{ ...mono, fontSize: 8, color: 'var(--ink4)' }}>
                  {[...new Set(dayEntries.map(e => e.city).filter(Boolean))].join(' · ')}
                </div>
              </div>

              {/* Entries for this day */}
              {dayEntries.map(e => {
                const mood    = MOODS.find(m => m.id === e.mood)
                const weather = WEATHER_OPTS.find(w => w.id === e.weather)
                return (
                  <div key={e.id} style={{
                    paddingLeft: 16, marginBottom: 18,
                    borderLeft: e.favourite ? '2.5px solid var(--ink)' : '1px solid var(--border)',
                  }}>
                    {/* Entry header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5, flexWrap: 'wrap' }}>
                      {mood    && <span style={{ fontSize: 13 }} title={mood.label}>{mood.emoji}</span>}
                      {weather && <span style={{ fontSize: 12 }} title={weather.label}>{weather.emoji}</span>}
                      <span style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1 }}>
                        {e.title || <em style={{ color: 'var(--ink4)', fontStyle: 'italic' }}>Untitled</em>}
                      </span>
                      {e.favourite && <span style={{ color: '#b5451b', fontSize: 11 }}>★</span>}
                      {(e.city || e.country) && (
                        <span style={{ ...mono, fontSize: 8, color: 'var(--ink4)', marginLeft: 'auto' }}>
                          {[e.city, e.country].filter(Boolean).join(', ')}
                        </span>
                      )}
                    </div>

                    {/* Notes */}
                    {e.notes && (
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.7, margin: '0 0 8px' }}>
                        {e.notes}
                      </p>
                    )}

                    {/* Highlights */}
                    {e.highlights?.length > 0 && (
                      <ul style={{ margin: '0 0 8px', paddingLeft: 14 }}>
                        {e.highlights.map((h, i) => (
                          <li key={i} style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.6 }}>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Photo captions */}
                    {e.photos?.length > 0 && (
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                        {e.photos.map(ph => ph.caption && (
                          <span key={ph.id} style={{
                            ...mono, fontSize: 8, color: 'var(--ink4)',
                            border: '1px solid var(--border)', padding: '2px 8px',
                          }}>
                            📷 {ph.caption}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    {e.tags?.length > 0 && (
                      <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                        {e.tags.map(t => (
                          <span key={t} style={{ ...mono, fontSize: 7.5, color: 'var(--ink4)', border: '1px solid var(--border)', padding: '1px 6px' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Main ── */
export default function Export() {
  const backup   = useBackup()
  const expenses = useExpenses()
  const packing  = usePacking()
  const bookings = useBookings()
  const journal  = useJournal()
  const { activeArc: arc } = useTravel()
  const content  = useResolvedContent()
  const tripData = useTripData()

  const PAD = { padding: '28px 52px' }

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--ink)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 6 }}>
            Arc {arc?.no} — Export
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            Export <em style={{ color: 'rgba(255,200,150,0.9)' }}>& Backup</em>
          </div>
        </div>
      </div>

      {/* Print button */}
      <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 52px', borderBottom: '1px solid var(--border)', background: 'var(--paper)' }}>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)' }}>
          All sections below are print-ready — use browser print (Ctrl+P) to export as PDF
        </span>
        <button
          onClick={() => window.print()}
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.8px', textTransform: 'uppercase', background: 'var(--ink)', color: 'var(--surf)', border: '1.5px solid var(--ink)', padding: '7px 18px', cursor: 'pointer' }}
        >Print / Save PDF</button>
      </div>

      {/* Content */}
      <div style={{ ...PAD, paddingBottom: 80 }}>
        <TripOverviewExport arc={arc} content={content} />
        <Divider />
        <BudgetSummaryExport arc={arc} />
        <Divider />
        <ItineraryExport content={content} arc={arc} />
        <Divider />
        <StaysExport content={content} />
        <Divider />
        <BookingsExport bookings={bookings} content={content} tripData={tripData} />
        <Divider />
        <PackingExport packing={packing} content={content} tripData={tripData} />
        <Divider />
        <GiftsExport content={content} />
        <Divider />
        <ExpensesExport expenses={expenses} />
        <Divider />
        <JournalExport journal={journal} />
        <Divider />
        <BackupSection backup={backup} />
        <Divider />
        <IntegritySection backup={backup} />
      </div>
    </div>
  )
}
