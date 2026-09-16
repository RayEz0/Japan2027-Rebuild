import { useTravel } from '../context/TravelContext'
import { TRIPS } from '../data/trips/index'
import {
  BASKETBALL_COURTS as JP_COURTS,
  BASKETBALL_TIPS   as JP_TIPS,
  ITINERARY_NOTE    as JP_NOTE,
} from '../data/trips/japan2027/basketball'
import {
  BASKETBALL_COURTS as KR_COURTS,
  KBL_VENUES,
  BASKETBALL_CULTURE,
  BASKETBALL_TIPS   as KR_TIPS,
  ITINERARY_NOTE    as KR_NOTE,
} from '../data/trips/korea/basketball'

// ── Shared sub-components ─────────────────────────────────────────────────────

function CourtCard({ court }) {
  const accessLabel = court.station || court.access
  return (
    <div style={{
      background: 'var(--surf)', border: '1px solid var(--border)',
      padding: '20px 22px',
    }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 4 }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{court.name}</div>
          <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
            {court.pickup && (
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
                letterSpacing: '0.5px', textTransform: 'uppercase',
                color: 'var(--accent)', border: '1px solid var(--accent)',
                padding: '2px 6px', whiteSpace: 'nowrap',
              }}>Pickup</span>
            )}
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
              letterSpacing: '0.5px', textTransform: 'uppercase',
              color: 'var(--ink3)', background: 'var(--paper)',
              padding: '2px 6px', whiteSpace: 'nowrap',
            }}>{court.type}</span>
          </div>
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)' }}>{court.area}</div>
      </div>

      <div className="rule" style={{ marginBottom: 12 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', marginBottom: 12 }}>
        {[
          { k: 'Access',   v: accessLabel   },
          { k: 'Surface',  v: court.surface  },
          { k: 'Hoops',    v: `${court.hoops} baskets` },
          { k: 'Hours',    v: court.hours    },
          { k: 'Fee',      v: court.fee      },
          { k: 'Level',    v: court.level    },
        ].map(({ k, v }) => (
          <div key={k}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>{k}</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink)', marginTop: 1 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.75, marginBottom: 10 }}>{court.note}</div>

      <div style={{
        padding: '8px 12px', borderLeft: '3px solid var(--border)',
        background: 'var(--paper)', fontFamily: '"JetBrains Mono", monospace',
        fontSize: 9.5, color: 'var(--ink3)', lineHeight: 1.7,
      }}>
        <span style={{ color: 'var(--accent)', marginRight: 6 }}>TIP</span>
        {court.dayTip}
      </div>

      <div style={{ marginTop: 12 }}>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(court.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            letterSpacing: '0.6px', textTransform: 'uppercase',
            color: 'var(--ink3)', textDecoration: 'none',
            border: '1.5px solid var(--border)', padding: '4px 10px',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}
        >
          📍 Maps
        </a>
      </div>
    </div>
  )
}

function TipsList({ tips }) {
  return (
    <div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 12 }}>
        Pickup Culture Notes
      </div>
      {tips.map((tip, i) => (
        <div key={i} style={{
          display: 'flex', gap: 14, padding: '10px 0',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 300,
            color: 'var(--ink4)', width: 24, flexShrink: 0, lineHeight: 1.4,
          }}>{String(i + 1).padStart(2, '0')}</div>
          <div style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.7 }}>{tip}</div>
        </div>
      ))}
    </div>
  )
}

// ── Japan basketball view ─────────────────────────────────────────────────────

function JapanBasketball() {
  return (
    <div className="page-enter">
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1400&q=70&auto=format&fit=crop')",
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 6 }}>008 — Culture</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            Tokyo <em style={{ color: 'rgba(255,200,150,0.95)' }}>Pickup</em>
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 52px 80px' }}>
        <div style={{
          padding: '12px 18px', borderLeft: '3px solid var(--ink)',
          background: 'var(--surf)', border: '1px solid var(--border)',
          borderLeftWidth: 3, borderLeftColor: 'var(--ink)',
          marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink3)' }}>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Day {JP_NOTE.day}</span>
            {' · '}
            {JP_NOTE.note}
          </div>
        </div>

        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
          Tokyo Courts — {JP_COURTS.length} spots
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 36 }}>
          {JP_COURTS.map(court => (
            <CourtCard key={court.id} court={court} />
          ))}
        </div>

        <TipsList tips={JP_TIPS} />
      </div>
    </div>
  )
}

// ── Korea basketball view ─────────────────────────────────────────────────────

function KblVenueCard({ venue }) {
  return (
    <div style={{
      background: 'var(--surf)', border: '1px solid var(--border)',
      padding: '20px 22px',
    }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 4 }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{venue.name}</div>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
            letterSpacing: '0.5px', textTransform: 'uppercase',
            color: 'var(--ink)', border: '1px solid var(--ink)',
            padding: '2px 6px', whiteSpace: 'nowrap', flexShrink: 0,
          }}>KBL</span>
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--accent)' }}>{venue.team}</div>
      </div>

      <div className="rule" style={{ marginBottom: 10 }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', marginBottom: 12 }}>
        {[
          { k: 'City',     v: venue.city          },
          { k: 'Capacity', v: `${venue.capacity.toLocaleString()} seats` },
          { k: 'Season',   v: venue.season        },
          { k: 'Tickets',  v: venue.ticketRange    },
          { k: 'Access',   v: venue.access         },
        ].map(({ k, v }) => (
          <div key={k} style={{ gridColumn: k === 'Access' ? 'span 2' : undefined }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase' }}>{k}</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink)', marginTop: 1 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.75, marginBottom: 12 }}>{venue.notes}</div>

      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          letterSpacing: '0.6px', textTransform: 'uppercase',
          color: 'var(--ink3)', textDecoration: 'none',
          border: '1.5px solid var(--border)', padding: '4px 10px',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}
      >
        📍 Maps
      </a>
    </div>
  )
}

function KoreaBasketball() {
  const pickupCourts  = KR_COURTS.filter(c => c.pickup)
  const casualCourts  = KR_COURTS.filter(c => !c.pickup)

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1400&q=70&auto=format&fit=crop')",
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 6 }}>Korea 2029 — Culture</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            Seoul <em style={{ color: 'rgba(255,200,150,0.95)' }}>Hoops</em>
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 52px 80px' }}>

        {/* Itinerary anchor */}
        <div style={{
          padding: '12px 18px',
          background: 'var(--surf)', border: '1px solid var(--border)',
          borderLeftWidth: 3, borderLeftColor: 'var(--ink)',
          marginBottom: 28,
        }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink3)' }}>
            <span style={{ color: 'var(--ink)', fontWeight: 700 }}>Day {KR_NOTE.day}</span>
            {' · '}
            {KR_NOTE.note}
          </div>
        </div>

        {/* Culture intro */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 14 }}>
            Korean Basketball Culture
          </div>
          <div style={{
            fontSize: 14, color: 'var(--ink2)', lineHeight: 1.9,
            maxWidth: 760, borderLeft: '3px solid var(--border)',
            paddingLeft: 18,
          }}>
            {BASKETBALL_CULTURE}
          </div>
        </div>

        {/* Pickup courts */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
            Pickup Courts — {pickupCourts.length} spots
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {pickupCourts.map(court => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        </div>

        {/* Casual / shooting courts */}
        {casualCourts.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
              Shooting / Solo Courts — {casualCourts.length} spots
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
              {casualCourts.map(court => (
                <CourtCard key={court.id} court={court} />
              ))}
            </div>
          </div>
        )}

        {/* KBL venues */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 6 }}>
            KBL — Korean Basketball League
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink3)', marginBottom: 16, lineHeight: 1.7 }}>
            Season runs October–April. April is playoff season — the most intense games of the year.
            Tickets via <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11 }}>kbl.or.kr</span> or Interpark (Korean payment required — buy at convenience store terminal).
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {KBL_VENUES.map(venue => (
              <KblVenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>

        {/* NBA Store callout */}
        <div style={{
          padding: '18px 22px', border: '1px solid var(--border)',
          background: 'var(--surf)', marginBottom: 36,
          display: 'flex', gap: 20, alignItems: 'flex-start',
        }}>
          <div style={{
            fontFamily: 'Fraunces, serif', fontSize: 32, lineHeight: 1,
            color: 'var(--ink4)', flexShrink: 0,
          }}>🏀</div>
          <div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>NBA Store Korea — Gangnam</div>
            <div style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.75, marginBottom: 10 }}>
              Six-floor flagship in Gangnam — the largest NBA Store in Asia outside the US. Every current team, Asia-exclusive colourways, same-day jersey customisation (45 min, order on arrival). On Day 1 itinerary. Order the custom jersey first, browse while it's being made.
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)' }}>
              136 Teheran-ro, Gangnam-gu · Mon–Fri 10:30–21:30, Sat–Sun 10:00–22:00
            </div>
          </div>
        </div>

        <TipsList tips={KR_TIPS} />
      </div>
    </div>
  )
}

// ── Generic trip basketball content (from TRIP_META.sports.basketball —
// thinner than Japan/Korea's dedicated data files, so this renders
// whichever fields exist) ────────────────────────────────────────────────────

function GenericBasketball({ trip, basketball }) {
  const courts     = basketball.courts || []
  const pickupRuns = basketball.pickupRuns || []

  return (
    <div className="page-enter" style={{ padding: '52px', maxWidth: 760 }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
        Basketball — {trip?.title}
      </div>

      {basketball.note && (
        <div style={{
          padding: '18px 22px', border: '1px solid var(--border)',
          background: 'var(--surf)', marginBottom: 28,
          fontSize: 14, color: 'var(--ink2)', lineHeight: 1.8,
        }}>
          {basketball.note}
        </div>
      )}

      {courts.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
            Courts — {courts.length}
          </div>
          {courts.map((c, i) => (
            <div key={i} style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.7, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>{c}</div>
          ))}
        </div>
      )}

      {pickupRuns.length > 0 && (
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
            Pickup Runs
          </div>
          {pickupRuns.map((p, i) => (
            <div key={i} style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.7, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>{p}</div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── No-basketball fallback ────────────────────────────────────────────────────

function NoBasketball({ trip }) {
  return (
    <div className="page-enter" style={{ padding: '52px', maxWidth: 600 }}>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>Basketball</div>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
        Not planned for {trip?.title || 'this trip'}
      </div>
      <div style={{ fontSize: 13.5, color: 'var(--ink3)', lineHeight: 1.8 }}>
        Basketball content is currently available for Japan 2027 and South Korea 2029.
      </div>
    </div>
  )
}

// ── Root export ───────────────────────────────────────────────────────────────

export default function Basketball() {
  const { activeTrip: trip } = useTravel()
  const basketball = TRIPS[trip?.id]?.sports?.basketball

  if (trip?.id === 'japan2027') return <JapanBasketball />
  if (trip?.id === 'korea')     return <KoreaBasketball />
  if (basketball)               return <GenericBasketball trip={trip} basketball={basketball} />
  return <NoBasketball trip={trip} />
}
