import { useState, useEffect, useMemo } from 'react'
import { Link }                from 'react-router-dom'
import { useTravel }           from '../context/TravelContext'
import { useResolvedContent }  from '../hooks/useResolvedContent'
import CountdownModule         from '../components/dashboard/CountdownModule'
import SavingsModule           from '../components/dashboard/SavingsModule'
import DestinationTimeModule   from '../components/dashboard/DestinationTimeModule'
import QuickStats              from '../components/dashboard/QuickStats'
import TripOverview            from '../components/dashboard/TripOverview'
import { useSavings }          from '../hooks/useSavings'
import { useExpenses }         from '../hooks/useExpenses'
import { useGifts }            from '../hooks/useGifts'
import { useAuth }             from '../context/AuthContext'
import { createPackingNotesService } from '../services/packingNotes/index'

// ── Arc packing stats (reads same storage as Packing.jsx) ─────────────────────
function useArcPackingStats() {
  const { user } = useAuth()
  const { activeArc: arc } = useTravel()
  const content = useResolvedContent()
  const arcYear      = arc?.year || 2027
  const packingNotes = content?.packingNotes || []
  const service = useMemo(() => createPackingNotesService(arcYear, user?.id), [arcYear, user?.id])

  const [checkedMap, setCheckedMap] = useState(() => service.load())

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCheckedMap(service.load())
  }, [service])

  const totalItems = packingNotes.reduce((s, c) => s + c.items.length, 0)
  const doneItems  = packingNotes.reduce((sum, cat, ci) =>
    sum + cat.items.filter((_, ii) => checkedMap[`${ci}_${ii}`]).length, 0)
  const pct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0
  const categoryProgress = packingNotes.map((cat, ci) => ({
    icon:  cat.icon,
    label: cat.category,
    done:  cat.items.filter((_, ii) => checkedMap[`${ci}_${ii}`]).length,
    total: cat.items.length,
  }))

  return { packedCount: doneItems, totalItems, pct, categoryProgress, allDone: doneItems === totalItems && totalItems > 0 }
}

function daysUntil(target) {
  if (!target) return null
  return Math.max(0, Math.ceil((new Date(target) - new Date()) / 86400000))
}

function fmt(n, currency = '₹') {
  if (n >= 100000) return `${currency}${(n / 100000).toFixed(1)}L`
  if (n >= 1000)   return `${currency}${Math.round(n / 1000)}k`
  return `${currency}${n}`
}

// ── Status Ribbon ──────────────────────────────────────────────────────────────
function StatusRibbon() {
  const { user, hasSupabase } = useAuth()
  const { primaryTrip: trip } = useTravel()
  const { packedCount, totalItems } = useArcPackingStats()
  const { total } = useSavings()
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(id)
  }, [])

  const d = new Date()
  const dateStr = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
  const daysLeft = daysUntil(trip?.departure)
  const synced = hasSupabase && Boolean(user)
  const currency = trip?.savingsCurrency || '₹'
  const goal = trip?.savingsGoal || 0

  const chip = (label, value, accent = false) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        color: 'var(--ink4)', textTransform: 'uppercase', letterSpacing: '0.8px',
      }}>{label}</span>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        color: accent ? 'var(--accent)' : 'var(--ink)',
        fontWeight: 500,
      }}>{value}</span>
    </div>
  )

  const divider = (
    <div style={{ width: 1, height: 14, background: 'var(--border)' }} />
  )

  const departLabel = daysLeft !== null ? `${daysLeft}d` : 'TBD'
  const savingsLabel = goal > 0 ? `${fmt(total, currency)} / ${fmt(goal, currency)}` : '—'

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18,
      padding: '9px 52px', background: 'var(--paper)',
      borderBottom: '1px solid var(--border)', flexWrap: 'wrap',
    }}>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        color: 'var(--ink2)',
      }}>{dateStr}</span>

      {divider}
      {chip('Depart', departLabel)}
      {divider}
      {chip('Packing', `${packedCount}/${totalItems}`)}
      {divider}
      {chip('Saved', savingsLabel)}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: synced ? '#4caf50' : 'var(--border)',
        }} />
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
          color: 'var(--ink4)', letterSpacing: '0.3px',
        }}>
          {synced ? `Synced · ${user.email.split('@')[0]}` : 'Local only'}
        </span>
      </div>
    </div>
  )
}

// ── Packing Quick Card ─────────────────────────────────────────────────────────
function PackingCard() {
  const { packedCount, totalItems, pct, categoryProgress, allDone } = useArcPackingStats()

  return (
    <div style={{ padding: '24px 52px 28px', borderTop: '1px solid var(--border)' }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: 'var(--ink3)', fontWeight: 500, marginBottom: 14,
      }}>Packing Progress</div>

      {/* Overall bar */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
        <span style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, color: allDone ? '#2e7d32' : 'var(--ink)', lineHeight: 1 }}>
          {packedCount}
        </span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink3)' }}>
          / {totalItems} items
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: allDone ? '#2e7d32' : 'var(--ink3)' }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 3, background: '#E5E2DA', marginBottom: 14 }}>
        <div style={{
          height: '100%', background: allDone ? '#4caf50' : 'var(--accent)',
          width: `${pct}%`, transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>

      {/* Per-category mini bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {categoryProgress.map((cat, i) => {
          const catPct = cat.total > 0 ? Math.round((cat.done / cat.total) * 100) : 0
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, width: 14, textAlign: 'center' }}>{cat.icon}</span>
              <div style={{ flex: 1, height: 2, background: '#E5E2DA' }}>
                <div style={{
                  height: '100%',
                  background: catPct === 100 ? '#4caf50' : 'var(--accent)',
                  width: `${catPct}%`,
                  transition: 'width 0.4s',
                }} />
              </div>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                color: 'var(--ink4)', width: 28, textAlign: 'right',
              }}>{cat.done}/{cat.total}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Recent Expenses Card ───────────────────────────────────────────────────────
function ExpensesCard() {
  const { entries, total } = useExpenses()
  const recent = [...entries].reverse().slice(0, 5)

  const catIcon = { transport:'🚃', food:'🍜', stay:'🛏️', experience:'🎡', shopping:'🛍️', gear:'📷', setup:'📶', other:'📌' }

  return (
    <div style={{ padding: '24px 52px 28px', borderTop: '1px solid var(--border)' }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: 'var(--ink3)', fontWeight: 500, marginBottom: 14,
      }}>Expense Summary</div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
        <span style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
          {entries.length > 0 ? `₹${total.toLocaleString('en-IN')}` : '₹0'}
        </span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)' }}>
          total logged · {entries.length} entries
        </span>
      </div>

      {recent.length === 0 ? (
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: 'var(--ink4)', padding: '12px 0',
        }}>No expenses logged yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {recent.map((e, i) => (
            <div key={e.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 0',
              borderBottom: i < recent.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: 12, flexShrink: 0 }}>{catIcon[e.category] || '📌'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {e.description || e.category}
                </div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginTop: 1 }}>
                  {e.city || '—'}{e.dayNum ? ` · Day ${Number(e.dayNum)}` : ''}
                </div>
              </div>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
                color: 'var(--ink)', flexShrink: 0,
              }}>₹{Number(e.inr).toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Must Do ────────────────────────────────────────────────────────────────────
function MustDoCard() {
  const { primaryTrip: trip } = useTravel()
  const mustDo = trip?.quickStats?.mustDo || []

  if (mustDo.length === 0) return null

  return (
    <div style={{ padding: '24px 52px 28px', borderTop: '1px solid var(--border)' }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: 'var(--ink3)', fontWeight: 500, marginBottom: 14,
      }}>Must Do</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)' }}>
        {mustDo.slice(0, 6).map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 10, alignItems: 'baseline',
            padding: '10px 16px',
            borderBottom: i < Math.min(5, mustDo.length - 1) ? '1px solid var(--border)' : 'none',
          }}>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', flexShrink: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink)' }}>{item}</span>
          </div>
        ))}
      </div>
      {mustDo.length > 6 && (
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
          color: 'var(--ink4)', marginTop: 10,
        }}>
          +{mustDo.length - 6} more experiences planned
        </div>
      )}
    </div>
  )
}

// ── Budget Summary ─────────────────────────────────────────────────────────────
function BudgetSummary() {
  const { activeArc: arc, primaryTrip: trip } = useTravel()
  const { total, pct } = useSavings()

  const budgetRange = arc?.budgetRange
  if (!budgetRange || (budgetRange.min === 0 && budgetRange.max === 0)) return null

  const currency    = budgetRange.currency || trip?.savingsCurrency || '₹'
  const goal        = trip?.savingsGoal || 0
  const recommended = Math.round((budgetRange.min + budgetRange.max) / 2)

  const stats = [
    { label: 'Minimum Budget',  value: `${currency}${budgetRange.min.toLocaleString('en-IN')}` },
    { label: 'Maximum Budget',  value: `${currency}${budgetRange.max.toLocaleString('en-IN')}` },
    { label: 'Recommended',     value: `${currency}${recommended.toLocaleString('en-IN')}` },
    { label: 'Savings Goal',    value: goal > 0 ? `${currency}${goal.toLocaleString('en-IN')}` : '—' },
    { label: 'Saved So Far',    value: `${currency}${total.toLocaleString('en-IN')}` },
    { label: 'Progress',        value: `${pct}%`, green: pct >= 100 },
  ]

  const savingsPct = goal > 0 ? Math.min(100, Math.round((total / goal) * 100)) : pct

  return (
    <div style={{ padding: '24px 52px 28px', borderTop: '1px solid var(--border)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: 'var(--ink3)', fontWeight: 500,
        }}>Budget Summary</div>
        {goal > 0 && (
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            color: savingsPct >= 100 ? '#2e7d32' : 'var(--ink3)',
          }}>{savingsPct}% saved</div>
        )}
      </div>

      {/* Savings progress bar */}
      {goal > 0 && (
        <div style={{ height: 3, background: '#E5E2DA', marginBottom: 16, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            background: savingsPct >= 100 ? '#4caf50' : 'var(--accent)',
            width: `${savingsPct}%`,
            transition: 'width 0.9s var(--ease)',
          }} />
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {stats.map((stat, i) => (
          <div key={stat.label} style={{
            padding: '14px 22px',
            borderTop: '1.5px solid var(--ink)',
            borderBottom: '1.5px solid var(--ink)',
            borderLeft: i === 0 ? '1.5px solid var(--ink)' : '1px solid var(--border)',
            borderRight: i === stats.length - 1 ? '1.5px solid var(--ink)' : 'none',
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
              color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: 6, whiteSpace: 'nowrap',
            }}>{stat.label}</div>
            <div style={{
              fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600,
              color: stat.green ? '#2e7d32' : 'var(--ink)', lineHeight: 1,
              whiteSpace: 'nowrap',
            }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Currency Card ──────────────────────────────────────────────────────────────
function CurrencyCard({ c }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '1 1 220px',
        border: `1.5px solid ${hovered ? 'var(--ink3)' : 'var(--ink)'}`,
        background: hovered ? '#FDFCFB' : 'var(--surf)',
        padding: '16px 20px',
        transition: 'border-color 0.16s var(--ease), background 0.16s var(--ease)',
        cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
        <span style={{
          fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 700,
          color: 'var(--ink)', lineHeight: 1,
        }}>{c.country}</span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
          color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase',
        }}>{c.code}</span>
      </div>

      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: c.notes ? 10 : 0,
      }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
          color: 'var(--ink)', fontWeight: 600,
        }}>1 {c.symbol || c.code}</span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)',
        }}>=</span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
          color: 'var(--ink)', fontWeight: 600,
        }}>₹{c.rateToINR}</span>
      </div>

      {c.notes && (
        <div style={{
          fontSize: 11, color: 'var(--ink3)', lineHeight: 1.55,
          borderTop: '1px solid var(--border)', paddingTop: 8,
        }}>{c.notes}</div>
      )}
    </div>
  )
}

// ── Currency Module ────────────────────────────────────────────────────────────
function CurrencyModule() {
  const { content } = useTravel()
  const currencies = content?.currencies || []

  if (currencies.length === 0) return null

  return (
    <div style={{ padding: '24px 52px 28px', borderTop: '1px solid var(--border)' }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: 'var(--ink3)', fontWeight: 500, marginBottom: 16,
      }}>Arc Currencies</div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {currencies.map((c, i) => (
          <CurrencyCard key={i} c={c} />
        ))}
      </div>
    </div>
  )
}

// ── Stays Card ─────────────────────────────────────────────────────────────────
function StaysCard() {
  const { content } = useTravel()
  const stays = content?.stays || []

  if (stays.length === 0) return null

  const totalNights = stays.reduce(
    (sum, block) => sum + block.cities.reduce((s, c) => s + (c.nights || 0), 0), 0
  )
  const totalStops = stays.reduce((s, b) => s + b.cities.length, 0)
  const upcoming = stays.flatMap(b => b.cities.map(c => ({ ...c, flag: b.flag }))).slice(0, 4)

  return (
    <div style={{ padding: '24px 52px 28px', borderTop: '1px solid var(--border)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: 'var(--ink3)', fontWeight: 500,
        }}>Hotels / Stays</div>
        <Link to="/stays" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', textDecoration: 'none' }}>
          All stays →
        </Link>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 1, background: 'var(--border)', flex: '0 0 auto' }}>
          {[
            { label: 'Nights', value: totalNights },
            { label: 'Stops',  value: totalStops },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surf)', padding: '10px 18px', textAlign: 'center', minWidth: 64 }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)' }}>
          {upcoming.map((c, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
              borderBottom: i < upcoming.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: 13, flexShrink: 0 }}>{c.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.city}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 1 }}>{c.type}</div>
              </div>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)', flexShrink: 0 }}>
                {c.nights > 0 ? `${c.nights}n` : 'day trip'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Gifts Card ─────────────────────────────────────────────────────────────────
function GiftsCard() {
  const { gifts, total } = useGifts()
  const done = gifts.filter(g => g.done).length

  return (
    <div style={{ padding: '24px 52px 28px', borderTop: '1px solid var(--border)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: 'var(--ink3)', fontWeight: 500,
        }}>Gifts</div>
        <Link to="/gifts" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', textDecoration: 'none' }}>
          Manage list →
        </Link>
      </div>

      {gifts.length === 0 ? (
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)' }}>
          No gifts added yet.
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 1, background: 'var(--border)', flexWrap: 'wrap', width: 'fit-content' }}>
          {[
            { label: 'Gifts',     value: gifts.length },
            { label: 'Bought',    value: done, green: done > 0 },
            { label: 'Est. Cost', value: `₹${total.toLocaleString('en-IN')}` },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surf)', padding: '10px 18px', textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: s.green ? '#2e7d32' : 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Map Preview Card ──────────────────────────────────────────────────────────
// Static teaser only — the interactive map itself lives on /map and is untouched.
function MapPreviewCard({ heroImage }) {
  const { primaryTrip: trip } = useTravel()
  const routeSegs = trip?.routeFull ? trip.routeFull.split('→').map(s => s.trim()) : []

  return (
    <div style={{ padding: '24px 52px 28px', borderTop: '1px solid var(--border)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: 'var(--ink3)', fontWeight: 500,
        }}>Map Preview</div>
        <Link to="/map" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', textDecoration: 'none' }}>
          Open full map →
        </Link>
      </div>

      <Link to="/map" style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          position: 'relative', height: 140, overflow: 'hidden',
          border: '1px solid var(--border)',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('${heroImage}')`,
            backgroundSize: 'cover', backgroundPosition: 'center 40%',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(12,12,12,0.05) 0%, rgba(12,12,12,0.65) 100%)',
          }} />
          {routeSegs.length > 0 && (
            <div style={{ position: 'absolute', left: 16, right: 16, bottom: 12 }}>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                color: '#fff', lineHeight: 1.6,
              }}>
                {routeSegs.map((seg, i, arr) => (
                  <span key={i}>
                    {seg}
                    {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.55)' }}> → </span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { activeArc: arc, primaryTrip } = useTravel()
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const gridCols = isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))'
  const heroImage = primaryTrip?.heroImage || arc?.heroImage || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1400&q=70&auto=format&fit=crop'

  return (
    <div className="page-enter">
      {/* 1. Hero */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        height: isMobile ? 130 : 200,
        display: 'flex', alignItems: 'flex-end',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${heroImage}')`,
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, padding: isMobile ? '0 20px 16px' : '0 52px 24px', width: '100%' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px',
            textTransform: 'uppercase', marginBottom: 6,
          }}>
            {primaryTrip?.flag && <span style={{ marginRight: 8 }}>{primaryTrip.flag}</span>}
            Arc {arc?.no || '01'} — Overview
          </div>
          <div style={{
            fontFamily: 'Fraunces, serif', fontSize: isMobile ? 32 : 42,
            fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff',
          }}>
            Dashboard
          </div>
        </div>
      </div>

      {/* Status Ribbon */}
      <StatusRibbon />

      {/* 2. Currency Exchange — first card, always visible without scrolling */}
      <CurrencyModule />

      {/* 3. Quick Trip Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: gridCols,
        borderBottom: '1px solid var(--border)',
      }}>
        {isMobile ? (
          <>
            <CountdownModule />
            <DestinationTimeModule />
            <QuickStats />
            <TripOverview />
          </>
        ) : (
          <>
            <CountdownModule />
            <DestinationTimeModule />
            <div style={{ borderLeft: '1px solid var(--border)' }}><QuickStats /></div>
            <TripOverview />
          </>
        )}
      </div>

      {/* 4. Must Do */}
      <MustDoCard />

      {/* 5. Budget Summary */}
      <BudgetSummary />

      {/* 6. Savings Progress */}
      <SavingsModule />

      {/* 7. Expense Summary */}
      <ExpensesCard />

      {/* 8. Stays */}
      <StaysCard />

      {/* 9. Packing Progress */}
      <PackingCard />

      {/* 10. Gifts */}
      <GiftsCard />

      {/* 11. Map Preview */}
      <MapPreviewCard heroImage={heroImage} />
    </div>
  )
}
