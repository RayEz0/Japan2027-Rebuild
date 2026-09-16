import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { TRIPS } from '../services/trips/index'
import { useSavings } from '../hooks/useSavings'
import { usePacking } from '../hooks/usePacking'
import { useExpenses } from '../hooks/useExpenses'
import { useTripData } from '../hooks/useTripData'

const ArcRouteMap = lazy(() => import('../components/arc/ArcRouteMap'))

const fmt = (n, sym = '₹') => `${sym}${Number(n).toLocaleString('en-IN')}`

// ─── Shared helpers ────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
      color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 12,
    }}>
      {children}
    </div>
  )
}

function StatCell({ label, value, sub, accent = false, first = false, last = false }) {
  return (
    <div style={{
      padding: '18px 22px',
      borderTop: '1.5px solid var(--ink)', borderBottom: '1.5px solid var(--ink)',
      borderLeft: first ? '1.5px solid var(--ink)' : '1px solid var(--border)',
      borderRight: last ? '1.5px solid var(--ink)' : 'none',
      background: 'var(--surf)',
    }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 5, whiteSpace: 'nowrap' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, color: accent ? 'var(--accent)' : 'var(--ink)', lineHeight: 1, whiteSpace: 'nowrap' }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 4 }}>
          {sub}
        </div>
      )}
    </div>
  )
}

// ─── Stats grid ────────────────────────────────────────────────────────────────

function StatsGrid({ arc }) {
  const trips = arc.tripIds.map(id => TRIPS[id]).filter(Boolean)
  const totalDays = trips.reduce((s, t) => s + (t.duration || 0), 0)
  const stats = [
    { label: 'Budget',    value: arc.budgetDisplay || 'TBD' },
    { label: 'Duration',  value: totalDays ? `${totalDays} days` : arc.duration },
    { label: 'Countries', value: String(arc.countries?.length || trips.length) },
    { label: 'Season',    value: arc.month || '—' },
  ]
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 32 }}>
      {stats.map((s, i) => (
        <StatCell key={s.label} {...s} first={i === 0} last={i === stats.length - 1} />
      ))}
    </div>
  )
}

// ─── Arc route map ─────────────────────────────────────────────────────────────

function MapSection({ content, accent }) {
  const mapData = content?.map
  if (!mapData) return null
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <SectionLabel>Arc Route Map</SectionLabel>
        <Link
          to="/map"
          style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: 'var(--ink4)', textDecoration: 'none', letterSpacing: '0.3px',
          }}
          onMouseEnter={e => e.currentTarget.style.color = accent}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--ink4)'}
        >
          → Full Map
        </Link>
      </div>
      <div style={{ border: '1px solid var(--border)', overflow: 'hidden' }}>
        <Suspense fallback={
          <div style={{ height: 360, background: '#f0ede8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#bbb', letterSpacing: '0.8px' }}>
              Loading map…
            </span>
          </div>
        }>
          <ArcRouteMap mapData={mapData} accent={accent} />
        </Suspense>
      </div>
    </div>
  )
}

// ─── Route strip ──────────────────────────────────────────────────────────────

function RouteStrip({ arc, content }) {
  const trips = arc.tripIds.map(id => TRIPS[id]).filter(Boolean)
  const names = content?.tripOrder?.length
    ? content.tripOrder.map(id => TRIPS[id]?.title?.replace(/\s+\d{4}$/, '') || id)
    : trips.map(t => t.title.replace(/\s+\d{4}$/, ''))
  if (names.length < 2) return null
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionLabel>Arc Route</SectionLabel>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {names.map((name, i) => (
          <span key={name + i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              color: 'var(--ink)', border: '1.5px solid var(--ink)', padding: '4px 14px',
            }}>
              {name}
            </span>
            {i < names.length - 1 && (
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--ink3)' }}>→</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Summary cards (savings / packing / expenses) ─────────────────────────────

function SavingsCard() {
  const { total, pct } = useSavings()
  const hasSavings = total > 0
  return (
    <div style={{ flex: 1, padding: '20px 24px', borderRight: '1px solid var(--border)', background: 'var(--surf)' }}>
      <SectionLabel>Savings</SectionLabel>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
          {hasSavings ? `${pct}%` : '—'}
        </span>
        {hasSavings && (
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)' }}>
            {fmt(total)} saved
          </span>
        )}
      </div>
      {hasSavings && (
        <div style={{ height: 2, background: '#E5E2DA', marginBottom: 10 }}>
          <div style={{ height: '100%', background: 'var(--ink)', width: `${pct}%`, transition: 'width 0.6s' }} />
        </div>
      )}
      {!hasSavings && (
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink4)', marginBottom: 10 }}>
          No savings logged yet
        </div>
      )}
      <Link to="/savings" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', textDecoration: 'none', letterSpacing: '0.3px' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--ink4)'}
      >
        → View Savings
      </Link>
    </div>
  )
}

function PackingCard() {
  const { packedCount, totalItems, pct } = usePacking()
  const allDone = totalItems > 0 && packedCount === totalItems
  return (
    <div style={{ flex: 1, padding: '20px 24px', borderRight: '1px solid var(--border)', background: 'var(--surf)' }}>
      <SectionLabel>Packing</SectionLabel>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, color: allDone ? '#2e7d32' : 'var(--ink)', lineHeight: 1 }}>
          {totalItems > 0 ? packedCount : '—'}
        </span>
        {totalItems > 0 && (
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)' }}>
            / {totalItems} items
          </span>
        )}
      </div>
      {totalItems > 0 && (
        <div style={{ height: 2, background: '#E5E2DA', marginBottom: 10 }}>
          <div style={{ height: '100%', background: allDone ? '#4caf50' : 'var(--ink)', width: `${pct}%`, transition: 'width 0.6s' }} />
        </div>
      )}
      {totalItems === 0 && (
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink4)', marginBottom: 10 }}>
          No packing list yet
        </div>
      )}
      <Link to="/packing" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', textDecoration: 'none', letterSpacing: '0.3px' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--ink4)'}
      >
        → View Packing
      </Link>
    </div>
  )
}

function ExpensesCard() {
  const { total, entries } = useExpenses()
  return (
    <div style={{ flex: 1, padding: '20px 24px', background: 'var(--surf)' }}>
      <SectionLabel>Expenses</SectionLabel>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
        <span style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
          {entries.length > 0 ? fmt(total) : '—'}
        </span>
        {entries.length > 0 && (
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)' }}>
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </span>
        )}
      </div>
      {entries.length === 0 && (
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink4)', marginBottom: 10 }}>
          No expenses logged yet
        </div>
      )}
      {entries.length > 0 && <div style={{ height: 2, background: 'var(--border)', marginBottom: 10 }} />}
      <Link to="/expenses" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', textDecoration: 'none', letterSpacing: '0.3px' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--ink4)'}
      >
        → View Expenses
      </Link>
    </div>
  )
}

// ─── Booking progress ─────────────────────────────────────────────────────────

function BookingProgress() {
  const { bookingItems } = useTripData()
  if (!bookingItems?.length) return null
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionLabel>Bookings — {bookingItems.length} items</SectionLabel>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {bookingItems.slice(0, 6).map((item, i) => (
          <span key={i} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            color: 'var(--ink3)', border: '1px solid var(--border)',
            padding: '3px 10px', background: 'var(--surf)',
          }}>
            {item.title || item.label || `Item ${i + 1}`}
          </span>
        ))}
        {bookingItems.length > 6 && (
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink4)', padding: '3px 0' }}>
            +{bookingItems.length - 6} more
          </span>
        )}
      </div>
      <Link to="/bookings" style={{ display: 'inline-block', marginTop: 10, fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', textDecoration: 'none', letterSpacing: '0.3px' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--ink4)'}
      >
        → View Bookings
      </Link>
    </div>
  )
}

// ─── Currency ─────────────────────────────────────────────────────────────────

function CurrencySection({ content, accent }) {
  if (!content?.currencies?.length) return null
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionLabel>Currency Exchange</SectionLabel>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginBottom: 8, letterSpacing: '0.5px' }}>
        Rate to INR · Approximate guide rates
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
        {content.currencies.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 60px 80px 1fr', gap: 16, background: 'var(--surf)', padding: '12px 20px', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12.5, fontWeight: 500, color: 'var(--ink)' }}>{c.country}</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: accent, fontWeight: 600 }}>{c.symbol} {c.code}</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
              ₹{c.rateToINR.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', lineHeight: 1.6 }}>{c.notes}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Country cards ────────────────────────────────────────────────────────────

function CountryCards({ arc, content }) {
  const orderedIds = content?.tripOrder || arc.tripIds
  const trips = orderedIds.map(id => TRIPS[id]).filter(Boolean)
  if (trips.length === 0) return null
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionLabel>Countries — {trips.length}</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 1, background: 'var(--border)' }}>
        {trips.map(t => (
          <div key={t.id} style={{ background: 'var(--surf)', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 24, lineHeight: 1 }}>{t.flag}</span>
              <div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
                  {t.title}
                </div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase', marginTop: 3 }}>
                  {t.duration > 0 ? `${t.duration} days` : arc.year} · {t.style}
                </div>
              </div>
            </div>
            {t.route?.length > 0 && (
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', lineHeight: 2 }}>
                {t.route.join(' → ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Practical info ───────────────────────────────────────────────────────────

function PracticalInfo({ content, accent }) {
  const info = content?.practicalInfo
  if (!info) return null

  const sections = [
    { key: 'weather',   label: 'Weather',         items: [info.weather].filter(Boolean) },
    { key: 'emergency', label: 'Emergency',        items: [info.emergency].filter(Boolean) },
    { key: 'driving',   label: 'Driving',          items: info.driving   || [] },
    { key: 'transit',   label: 'Transit',          items: info.transit   || [] },
    { key: 'payment',   label: 'Money & Payment',  items: info.payment   || [] },
    { key: 'sim',       label: 'SIM & Data',       items: info.sim       || [] },
    { key: 'etiquette', label: 'Culture & Etiquette', items: info.etiquette || [] },
  ].filter(s => s.items.length > 0)

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionLabel>Practical Info</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderTop: `3px solid ${accent}` }}>
        {sections.map(s => (
          <div key={s.key} style={{ background: 'var(--surf)', padding: '16px 20px' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: accent, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 10 }}>
              {s.label}
            </div>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
              {s.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, marginBottom: 7 }}>
                  <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: accent, flexShrink: 0, marginTop: 1 }}>·</span>
                  <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink2)', lineHeight: 1.55 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Food highlights ──────────────────────────────────────────────────────────

function FoodHighlights({ content, accent }) {
  const food = content?.foodHighlights
  if (!food?.length) return null

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionLabel>Food & Drink</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
        {food.map((city, ci) => (
          <div key={ci} style={{ background: 'var(--surf)' }}>
            <div style={{ padding: '10px 20px 0', fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: accent, letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              {city.city}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 1, background: 'var(--border)', margin: '8px 0 0 0' }}>
              {city.must.map((dish, di) => (
                <div key={di} style={{ background: 'var(--surf)', padding: '12px 20px' }}>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4, lineHeight: 1.2 }}>
                    {dish.dish}
                  </div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11.5, color: 'var(--ink3)', lineHeight: 1.55 }}>
                    {dish.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Photography spots ────────────────────────────────────────────────────────

function PhotographySpots({ content, accent }) {
  const spots = content?.photographySpots
  if (!spots?.length) return null

  return (
    <div style={{ marginBottom: 32 }}>
      <SectionLabel>Photography Spots</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
        {spots.map((spot, i) => (
          <div key={i} style={{ background: 'var(--surf)', padding: '14px 20px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 5, lineHeight: 1.2 }}>
                {spot.location}
              </div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink3)', lineHeight: 1.55 }}>
                {spot.tip}
              </div>
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: accent, letterSpacing: '0.8px', textTransform: 'uppercase', whiteSpace: 'nowrap', paddingTop: 2 }}>
              {spot.timing}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Quick nav links ──────────────────────────────────────────────────────────

function QuickNav({ accent }) {
  const pages = [
    { to: '/itinerary', label: 'Itinerary', desc: 'Day-by-day route' },
    { to: '/map',       label: 'Map',       desc: 'Interactive route map' },
    { to: '/packing',   label: 'Packing',   desc: 'Pack list & progress' },
    { to: '/stays',     label: 'Stays',     desc: 'Accommodation options' },
  ]
  return (
    <div style={{ marginBottom: 32 }}>
      <SectionLabel>Quick Nav</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 1, background: 'var(--border)' }}>
        {pages.map(p => (
          <Link
            key={p.to}
            to={p.to}
            style={{
              background: 'var(--surf)', padding: '16px 20px',
              textDecoration: 'none', display: 'block',
              transition: 'background 0.12s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--surf)'}
          >
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: accent, letterSpacing: '0.5px', marginBottom: 4 }}>
              {p.label} →
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11.5, color: 'var(--ink3)' }}>
              {p.desc}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Main ArcDashboard ────────────────────────────────────────────────────────
// standalone=true: rendered directly as the Dashboard page (no breadcrumb)

export default function ArcDashboard({ arc, content, standalone = false }) {
  const accent = arc.theme.accent

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${arc.heroImage}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, ${accent}22 0%, rgba(12,12,12,0.80) 100%)`,
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px', width: '100%' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: accent, letterSpacing: '2.2px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>
            Arc {arc.no} · {arc.year} · {arc.month}
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.9, letterSpacing: '-1.5px', color: '#fff' }}>
            {arc.title}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '32px 52px 80px' }}>

        {!standalone && (
          <div style={{ marginBottom: 24 }}>
            <Link to="/world-tour" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', textDecoration: 'none', letterSpacing: '0.5px' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ink3)'}
            >
              ← World Tour
            </Link>
          </div>
        )}

        {/* Accent strip */}
        <div style={{ height: 3, background: accent, width: 48, marginBottom: 28 }} />

        {/* Arc stats */}
        <StatsGrid arc={arc} />

        {/* Route overview */}
        <RouteStrip arc={arc} content={content} />

        {/* Arc route map */}
        <MapSection content={content} accent={accent} />

        {/* Summary row: savings / packing / expenses */}
        <div style={{ marginBottom: 32 }}>
          <SectionLabel>Live Summary</SectionLabel>
          <div style={{
            display: 'flex', background: 'var(--border)', gap: 1,
            border: '1px solid var(--border)',
            borderTop: `3px solid ${accent}`,
          }}>
            <SavingsCard arc={arc} />
            <PackingCard arc={arc} />
            <ExpensesCard />
          </div>
        </div>

        {/* Booking progress */}
        <BookingProgress />

        {/* Quick nav */}
        <QuickNav accent={accent} />

        {/* Country cards */}
        <CountryCards arc={arc} content={content} />

        {/* Currency */}
        <CurrencySection content={content} accent={accent} />

        {/* Practical info */}
        <PracticalInfo content={content} accent={accent} />

        {/* Food highlights */}
        <FoodHighlights content={content} accent={accent} />

        {/* Photography spots */}
        <PhotographySpots content={content} accent={accent} />

        {/* Footer */}
        <div style={{ paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, background: accent, flexShrink: 0 }} />
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            {arc.theme.label} · Arc {arc.no} visual identity
          </div>
        </div>
      </div>
    </div>
  )
}
