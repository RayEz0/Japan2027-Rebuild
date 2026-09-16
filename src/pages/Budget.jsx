import { useTravel } from '../context/TravelContext'
import { useTripData } from '../hooks/useTripData'

const BREAKDOWN = [
  { id: 'flights',       icon: '✈️',  name: 'Flights',          notes: 'Return airfare — all legs',                   pct: 0.30 },
  { id: 'accommodation', icon: '🏨',  name: 'Accommodation',    notes: 'Hotels, guesthouses, hostels, ryokans',        pct: 0.25 },
  { id: 'food',          icon: '🍜',  name: 'Food',             notes: 'Restaurants, street food, cafés, groceries',  pct: 0.20 },
  { id: 'transport',     icon: '🚃',  name: 'Local Transport',  notes: 'Trains, buses, taxis, car hire on-ground',    pct: 0.12 },
  { id: 'activities',    icon: '🎡',  name: 'Activities',       notes: 'Entry tickets, tours, museums, experiences',  pct: 0.07 },
  { id: 'shopping',      icon: '🛍️', name: 'Shopping',          notes: 'Gifts, souvenirs, personal items',            pct: 0.04 },
  { id: 'emergency',     icon: '🆘',  name: 'Emergency',        notes: 'Buffer for unexpected costs or medical',      pct: 0.02 },
]

function CategoryBar({ icon, name, notes, minVal, targetVal, maxVal, maxScale }) {
  const targetPct = maxScale > 0 ? (targetVal / maxScale) * 100 : 0
  const rangePct  = maxScale > 0 ? (maxVal    / maxScale) * 100 : 0
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18,
      padding: '16px 0', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 20, width: 30, textAlign: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink)' }}>{name}</div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink3)', marginTop: 2 }}>{notes}</div>
        <div style={{ height: 1.5, background: '#E5E2DA', marginTop: 8, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--border)', width: `${rangePct}%` }} />
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: 'var(--ink)', width: `${targetPct}%`,
            animation: 'barGrow 1s ease forwards',
          }} />
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 175 }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--ink)', fontWeight: 500 }}>
          ₹{minVal.toLocaleString('en-IN')} – ₹{maxVal.toLocaleString('en-IN')}
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink3)', marginTop: 3 }}>
          target ₹{targetVal.toLocaleString('en-IN')}
        </div>
      </div>
    </div>
  )
}

function LegacyBudgetRow({ item }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18,
      padding: '14px 0', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: 18, width: 30, textAlign: 'center', flexShrink: 0 }}>{item.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{item.name}</div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)', marginTop: 2 }}>{item.notes}</div>
        <div style={{ height: 1.5, background: '#E5E2DA', marginTop: 8, position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: 'var(--ink)', width: `${item.pct}%`,
            animation: 'barGrow 1s ease forwards',
          }} />
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 130 }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: 'var(--ink)', fontWeight: 500 }}>{item.inr}</div>
        {item.jpy && (
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink3)', marginTop: 3 }}>{item.jpy}</div>
        )}
      </div>
    </div>
  )
}

export default function Budget() {
  const { activeArc: arc } = useTravel()
  const { budgetItems } = useTripData()

  const range  = arc?.budgetRange || { min: 200000, max: 250000 }
  const target = Math.round((range.min + range.max) / 2)

  const rows = BREAKDOWN.map(cat => ({
    ...cat,
    minVal:    Math.round(range.min * cat.pct),
    targetVal: Math.round(target   * cat.pct),
    maxVal:    Math.round(range.max * cat.pct),
  }))
  const maxScale = Math.max(...rows.map(r => r.maxVal), 1)
  const hasLegacy = budgetItems?.length > 0

  const metaItems = [
    arc?.title    && { k: 'Arc',      v: arc.title },
    arc?.duration && { k: 'Duration', v: arc.duration },
    arc?.month    && { k: 'Timing',   v: `${arc.month} ${arc.year}` },
    arc?.budgetDisplay && { k: 'Range', v: arc.budgetDisplay },
  ].filter(Boolean)

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${arc?.heroImage || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=70&auto=format&fit=crop'}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 6 }}>
            Arc {arc?.no} — Budget
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            Budget
          </div>
        </div>
      </div>

      {/* Min / Target / Max */}
      <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: 'var(--border)' }}>
        {[
          { label: 'Minimum', value: range.min, note: 'Budget travel — hostels, street food'  },
          { label: 'Target',  value: target,     note: 'Comfortable — hotels + local dining'  },
          { label: 'Maximum', value: range.max,  note: 'Premium — with full splurge budget'   },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--surf)', padding: '24px 28px', minWidth: 0 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 600, color: 'var(--ink)', lineHeight: 1, marginBottom: 4 }}>
              ₹{s.value.toLocaleString('en-IN')}
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink4)' }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* Trip meta strip */}
      {metaItems.length > 0 && (
        <div style={{ padding: '12px 52px', borderBottom: '1px solid var(--border)', borderTop: '1px solid var(--border)', background: 'var(--paper)', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {metaItems.map(({ k, v }) => (
            <div key={k}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink3)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 2 }}>{k}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink)' }}>{v}</div>
            </div>
          ))}
        </div>
      )}

      {/* Category breakdown */}
      <div style={{ padding: '28px 52px 0' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>
          Category Breakdown — Proportional Estimate
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginBottom: 16 }}>
          Based on {arc?.budgetDisplay || `₹${range.min.toLocaleString('en-IN')} – ₹${range.max.toLocaleString('en-IN')}`} · Solo travel
        </div>
      </div>

      <div style={{ padding: '0 52px 40px' }}>
        {rows.map(r => <CategoryBar key={r.id} {...r} maxScale={maxScale} />)}
      </div>

      {/* Detailed line items (Japan / Scotland / Norway only) */}
      {hasLegacy && (
        <div style={{ padding: '0 52px 80px' }}>
          <div style={{ paddingTop: 20, borderTop: '1px solid var(--border)', marginBottom: 20 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Detailed Budget Line Items
            </div>
          </div>
          {[...budgetItems].sort((a, b) => b.pct - a.pct).map((item, i) => (
            <LegacyBudgetRow key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      )}
      {!hasLegacy && <div style={{ height: 80 }} />}
    </div>
  )
}
