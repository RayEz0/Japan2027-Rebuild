import { useState, useMemo } from 'react'
import {
  useExpenses,
  EXPENSE_CATEGORIES, EXPENSE_PEOPLE,
  calcBalances, calcSettlements,
} from '../hooks/useExpenses'
import { useTripData } from '../hooks/useTripData'
import { useTravel } from '../context/TravelContext'

function derivePlannedFromBudget(max) {
  return {
    transport:  { max: Math.round(max * 0.40) },
    stay:       { max: Math.round(max * 0.25) },
    food:       { max: Math.round(max * 0.18) },
    experience: { max: Math.round(max * 0.10) },
    shopping:   { max: Math.round(max * 0.05) },
    gear:       { max: Math.round(max * 0.01) },
    setup:      { max: Math.round(max * 0.01) },
  }
}

const INR_JPY = 1.82

const monoLabel = {
  fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
  color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4,
}
const sectionLabel = {
  fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
  letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16,
}

// ── FORM ─────────────────────────────────────────────────
const BLANK_FORM = {
  dayNum: '', city: '', category: '', description: '', inr: '',
  paidBy: EXPENSE_PEOPLE[0], notes: '', splitBetween: [...EXPENSE_PEOPLE],
}

function AddForm({ onAdd, expenseCities }) {
  const [form, setForm] = useState(BLANK_FORM)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const toggleSplit = (person) => {
    setForm(f => ({
      ...f,
      splitBetween: f.splitBetween.includes(person)
        ? f.splitBetween.filter(p => p !== person)
        : [...f.splitBetween, person],
    }))
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.description || !form.inr || +form.inr <= 0) return
    onAdd({ ...form, inr: +form.inr, jpy: Math.round(+form.inr * INR_JPY) })
    setForm(BLANK_FORM)
  }

  const input = {
    border: 'none', borderBottom: '1px solid var(--border)',
    background: 'none', fontFamily: 'Outfit, sans-serif',
    fontSize: 12.5, color: 'var(--ink)', padding: '4px 0', outline: 'none', width: '100%',
  }

  return (
    <form onSubmit={submit} style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper)', padding: '20px 52px 18px' }}>
      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 130px', gap: 14, marginBottom: 14 }}>
        <div>
          <div style={monoLabel}>Description</div>
          <input style={input} placeholder="What was spent on?" value={form.description} onChange={e => set('description', e.target.value)} />
        </div>
        <div>
          <div style={monoLabel}>₹ Amount</div>
          <input type="number" min="0" style={{ ...input, textAlign: 'right' }} placeholder="0" value={form.inr} onChange={e => set('inr', e.target.value)} />
        </div>
        <div>
          <div style={monoLabel}>Category</div>
          <select aria-label="Category" style={{ ...input, cursor: 'pointer' }} value={form.category} onChange={e => set('category', e.target.value)}>
            <option value="">—</option>
            {EXPENSE_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ width: 70 }}>
          <div style={monoLabel}>Day #</div>
          <input style={input} placeholder="01–13" value={form.dayNum} onChange={e => set('dayNum', e.target.value)} />
        </div>
        <div style={{ width: 110 }}>
          <div style={monoLabel}>City</div>
          <select aria-label="City" style={{ ...input, cursor: 'pointer' }} value={form.city} onChange={e => set('city', e.target.value)}>
            <option value="">—</option>
            {expenseCities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ width: 110 }}>
          <div style={monoLabel}>Paid By</div>
          <select aria-label="Paid By" style={{ ...input, cursor: 'pointer' }} value={form.paidBy} onChange={e => set('paidBy', e.target.value)}>
            {EXPENSE_PEOPLE.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <div style={monoLabel}>Split Between</div>
          <div style={{ display: 'flex', gap: 10, paddingBottom: 4 }}>
            {EXPENSE_PEOPLE.map(p => (
              <label key={p} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', userSelect: 'none' }}>
                <div
                  onClick={() => toggleSplit(p)}
                  style={{
                    width: 14, height: 14,
                    border: `1.5px solid ${form.splitBetween.includes(p) ? 'var(--ink)' : 'var(--border)'}`,
                    background: form.splitBetween.includes(p) ? 'var(--ink)' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, cursor: 'pointer', transition: 'all 0.12s',
                  }}
                >
                  {form.splitBetween.includes(p) && <span style={{ color: 'var(--surf)', fontSize: 8, lineHeight: 1 }}>✓</span>}
                </div>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink2)' }}>{p}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <div style={monoLabel}>Notes</div>
          <input style={input} placeholder="Optional note" value={form.notes} onChange={e => set('notes', e.target.value)} />
        </div>
        <button
          type="submit"
          style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            letterSpacing: '0.8px', textTransform: 'uppercase',
            background: 'var(--ink)', color: 'var(--surf)',
            border: '1.5px solid var(--ink)', padding: '7px 16px',
            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >+ Add</button>
      </div>
    </form>
  )
}

// ── EXPENSE DETAIL MODAL ─────────────────────────────────
function ExpenseModal({ entry, onClose }) {
  const cat = EXPENSE_CATEGORIES.find(c => c.id === entry.category)
  const perPerson = entry.splitBetween?.length
    ? Math.round((+entry.inr || 0) / entry.splitBetween.length)
    : null

  const field = (label, value) => value ? (
    <div>
      <div style={{ ...monoLabel, marginBottom: 3 }}>{label}</div>
      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{value}</div>
    </div>
  ) : null

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(12,12,12,0.48)', zIndex: 700 }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'var(--surf)', border: '1.5px solid var(--ink)',
        width: 480, maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto',
        zIndex: 701, padding: '28px 32px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>
              {cat?.icon} {cat?.label || 'Expense'}
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
              {entry.description}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--ink3)', padding: '0 4px', lineHeight: 1 }}
          >×</button>
        </div>

        {/* Amount */}
        <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 34, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
            ₹{Number(entry.inr).toLocaleString('en-IN')}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)', marginTop: 4 }}>
            ~¥{Number(entry.jpy || 0).toLocaleString()}
          </div>
        </div>

        {/* Details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px', marginBottom: 20 }}>
          {field('Day', entry.dayNum ? `Day ${entry.dayNum}` : null)}
          {field('City', entry.city || null)}
          {field('Paid By', entry.paidBy || null)}
          {field('Split Between', entry.splitBetween?.length ? entry.splitBetween.join(', ') : null)}
        </div>

        {/* Split breakdown */}
        {entry.splitBetween?.length > 0 && perPerson && (
          <div style={{ marginBottom: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <div style={{ ...monoLabel, marginBottom: 10 }}>Split Breakdown</div>
            {entry.splitBetween.map(p => (
              <div key={p} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink)' }}>{p}</span>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink)', fontWeight: 500 }}>
                  ₹{perPerson.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Notes */}
        {entry.notes && (
          <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <div style={{ ...monoLabel, marginBottom: 6 }}>Notes</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink3)', lineHeight: 1.8 }}>
              {entry.notes}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

// ── CATEGORY BAR ─────────────────────────────────────────
function CategoryBar({ cat, actual, planned }) {
  const pMax     = planned?.max || 0
  const scale    = pMax > 0 ? Math.max(actual, pMax) : actual || 1
  const actualPct  = Math.min((actual / scale) * 100, 100)
  const plannedPct = Math.min((pMax / scale) * 100, 100)
  const over     = actual > pMax && pMax > 0

  return (
    <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>{cat.icon}</span>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{cat.label}</span>
          {over && (
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--accent)', border: '1px solid var(--accent)', padding: '1px 5px', letterSpacing: '0.5px' }}>OVER</span>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: over ? 'var(--accent)' : 'var(--ink)', fontWeight: 500 }}>
            ₹{actual.toLocaleString('en-IN')}
          </span>
          {pMax > 0 && (
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)', marginLeft: 6 }}>
              / ₹{pMax.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
      <div style={{ position: 'relative', height: 3, background: '#E5E2DA' }}>
        {pMax > 0 && <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${plannedPct}%`, background: 'var(--border)' }} />}
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${actualPct}%`, background: over ? 'var(--accent)' : 'var(--ink)', transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
    </div>
  )
}

// ── BALANCES PANEL ────────────────────────────────────────
function BalancesPanel({ entries }) {
  const hasData = entries.some(e => e.paidBy && e.splitBetween?.length > 0)
  if (!hasData) return (
    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink4)', padding: '16px 0', lineHeight: 1.9 }}>
      Fill in Paid By + Split Between<br />to see balances here.
    </div>
  )
  const balances = calcBalances(entries)
  return (
    <div>
      {Object.entries(balances).map(([person, amount]) => {
        const credit = amount >  0.5
        const debt   = amount < -0.5
        return (
          <div key={person} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{person}</div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 600,
              color: credit ? '#2e7d32' : debt ? 'var(--accent)' : 'var(--ink4)',
            }}>
              {credit ? '+' : ''}₹{Math.round(Math.abs(amount)).toLocaleString('en-IN')}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── SETTLEMENT PANEL ──────────────────────────────────────
function SettlementPanel({ entries }) {
  const hasData = entries.some(e => e.paidBy && e.splitBetween?.length > 0)
  if (!hasData) return (
    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink4)', padding: '16px 0', lineHeight: 1.9 }}>
      Settlements appear once<br />expenses are split.
    </div>
  )
  const settlements = calcSettlements(calcBalances(entries))
  if (settlements.length === 0) return (
    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: '#2e7d32', padding: '16px 0' }}>
      All settled ✓
    </div>
  )
  return (
    <div>
      {settlements.map((s, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink)' }}>
            <span style={{ fontWeight: 500 }}>{s.from}</span>
            <span style={{ color: 'var(--ink3)', margin: '0 7px', fontSize: 11 }}>pays</span>
            <span style={{ fontWeight: 500 }}>{s.to}</span>
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>
            ₹{s.amount.toLocaleString('en-IN')}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── EXPENSE ROW ───────────────────────────────────────────
function ExpenseRow({ entry, onRemove, onClick }) {
  const cat = EXPENSE_CATEGORIES.find(c => c.id === entry.category)
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0',
        borderBottom: '1px solid var(--border)', cursor: 'pointer',
        transition: 'background 0.12s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{ fontSize: 14, flexShrink: 0, width: 22, textAlign: 'center' }}>{cat?.icon || '📌'}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {entry.description}
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)', marginTop: 1, display: 'flex', gap: 8 }}>
          {entry.city && <span>{entry.city}</span>}
          {entry.dayNum && <span>Day {entry.dayNum}</span>}
          {entry.paidBy && <span>· {entry.paidBy}</span>}
          {entry.splitBetween?.length > 0 && <span>· split {entry.splitBetween.length}</span>}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink)', fontWeight: 500 }}>
          ₹{Number(entry.inr).toLocaleString('en-IN')}
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink4)' }}>
          ~¥{Number(entry.jpy || 0).toLocaleString()}
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(entry.id) }}
        style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--ink4)', padding: '0 2px', flexShrink: 0, lineHeight: 1, transition: 'color 0.14s' }}
        onMouseEnter={e => { e.stopPropagation(); e.currentTarget.style.color = 'var(--accent)' }}
        onMouseLeave={e => { e.stopPropagation(); e.currentTarget.style.color = 'var(--ink4)' }}
      >×</button>
    </div>
  )
}

// ── DAILY CHART ───────────────────────────────────────────
function DailyChart({ byDay, daysCount }) {
  const tripDays = Array.from({ length: daysCount }, (_, i) => String(i + 1).padStart(2, '0'))
  const values = tripDays.map(d => byDay[d] || 0)
  const max    = Math.max(...values, 1)
  const hasAny = values.some(v => v > 0)

  if (!hasAny) return (
    <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink4)', padding: '16px 0' }}>
      No daily data yet — tag expenses with a day number to see the chart.
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 72 }}>
        {tripDays.map((d, i) => {
          const v   = values[i]
          const pct = (v / max) * 100
          return (
            <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, height: '100%', justifyContent: 'flex-end' }}>
              <div
                title={v > 0 ? `Day ${d}: ₹${v.toLocaleString('en-IN')}` : `Day ${d}: —`}
                style={{ width: '100%', background: v > 0 ? 'var(--ink)' : 'var(--border)', height: `${Math.max(pct, v > 0 ? 4 : 0)}%`, minHeight: v > 0 ? 2 : 0, transition: 'height 0.8s cubic-bezier(0.4,0,0.2,1)' }}
              />
            </div>
          )
        })}
      </div>
      <div style={{ height: 1, background: 'var(--border)', margin: '3px 0' }} />
      <div style={{ display: 'flex', gap: 4 }}>
        {tripDays.map(d => (
          <div key={d} style={{ flex: 1, fontFamily: '"JetBrains Mono", monospace', fontSize: 6.5, color: 'var(--ink4)', textAlign: 'center' }}>{Number(d)}</div>
        ))}
      </div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 6 }}>
        Peak: ₹{Math.max(...values).toLocaleString('en-IN')} · Avg (active): ₹{Math.round(values.filter(v => v > 0).reduce((s, v) => s + v, 0) / Math.max(values.filter(v => v > 0).length, 1)).toLocaleString('en-IN')}
      </div>
    </div>
  )
}

// ── PAGE ──────────────────────────────────────────────────
export default function Expenses() {
  const { activeArc: arc } = useTravel()
  const { entries, add, remove, total, byCategory, byCity, byDay, expenseCities } = useExpenses()
  const { plannedByCategory: rawPlanned } = useTripData()
  const [modal, setModal] = useState(null)

  const BUDGET_MAX = arc?.budgetRange?.max || 250000

  const PLANNED_BY_CATEGORY = useMemo(() => {
    const hasData = Object.values(rawPlanned).some(v => v?.max > 0)
    if (hasData) return rawPlanned
    return derivePlannedFromBudget(BUDGET_MAX)
  }, [rawPlanned, BUDGET_MAX])

  const daysCount = useMemo(() => {
    const match = arc?.duration?.match(/\d+/)
    return match ? parseInt(match[0], 10) : 13
  }, [arc?.duration])
  const remaining = BUDGET_MAX - total
  const spentPct  = Math.min((total / BUDGET_MAX) * 100, 100)
  const over      = total > BUDGET_MAX

  return (
    <div className="page-enter">
      {/* Modal */}
      {modal && <ExpenseModal entry={modal} onClose={() => setModal(null)} />}

      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1400&q=70&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 6 }}>004B — Expenses</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            Expense <em style={{ color: 'rgba(255,200,150,0.95)' }}>Log</em>
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>Track · Split · Settle</div>
        </div>
      </div>

      <AddForm onAdd={add} expenseCities={expenseCities} />

      <div style={{ padding: '32px 52px 80px' }}>

        {/* Totals */}
        <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 24 }}>
          {[
            { label: 'Total Spent',   value: `₹${total.toLocaleString('en-IN')}`,                   accent: over },
            { label: 'Budget Limit',  value: `₹${BUDGET_MAX.toLocaleString('en-IN')}`,              accent: false },
            { label: over ? 'Over Budget' : 'Remaining', value: `₹${Math.abs(remaining).toLocaleString('en-IN')}`, accent: over },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surf)', padding: '20px 24px', minWidth: 0 }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, color: s.accent ? 'var(--accent)' : 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Budget progress */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase' }}>Budget Used</div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: over ? 'var(--accent)' : 'var(--ink)' }}>{spentPct.toFixed(1)}%</div>
          </div>
          <div style={{ height: 3, background: '#E5E2DA' }}>
            <div style={{ height: '100%', background: over ? 'var(--accent)' : 'var(--ink)', width: `${spentPct}%`, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
          </div>
        </div>

        {/* Balances + Settlement */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <div style={sectionLabel}>Balances</div>
            <BalancesPanel entries={entries} />
          </div>
          <div>
            <div style={sectionLabel}>Settlement</div>
            <SettlementPanel entries={entries} />
          </div>
        </div>

        {/* Category + City */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div>
            <div style={sectionLabel}>Category Breakdown</div>
            {EXPENSE_CATEGORIES.filter(c => byCategory[c.id] > 0 || PLANNED_BY_CATEGORY[c.id]?.max > 0).map(cat => (
              <CategoryBar key={cat.id} cat={cat} actual={byCategory[cat.id] || 0} planned={PLANNED_BY_CATEGORY[cat.id]} />
            ))}
            {EXPENSE_CATEGORIES.every(c => !byCategory[c.id]) && (
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink4)', padding: '16px 0' }}>No expenses logged yet.</div>
            )}
          </div>
          <div>
            <div style={sectionLabel}>City Breakdown</div>
            {expenseCities.map(city => {
              const amt = byCity[city] || 0
              const pct = total > 0 ? (amt / total) * 100 : 0
              return (
                <div key={city} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: amt > 0 ? 'var(--ink)' : 'var(--ink4)' }}>{city}</span>
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--ink)' }}>
                      {amt > 0 ? `₹${amt.toLocaleString('en-IN')}` : '—'}
                    </span>
                  </div>
                  {amt > 0 && (
                    <div style={{ height: 2, background: '#E5E2DA' }}>
                      <div style={{ height: '100%', background: 'var(--ink)', width: `${pct}%`, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Daily chart */}
        {entries.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <div style={sectionLabel}>Daily Spend — Days 01–{String(daysCount).padStart(2, '0')}</div>
            <DailyChart byDay={byDay} daysCount={daysCount} />
          </div>
        )}

        {/* Expense log */}
        {entries.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <div style={sectionLabel}>Expense Log — {entries.length} {entries.length === 1 ? 'entry' : 'entries'} · click to expand</div>
            {[...entries].reverse().map(e => (
              <ExpenseRow key={e.id} entry={e} onRemove={remove} onClick={() => setModal(e)} />
            ))}
          </div>
        )}

        {entries.length === 0 && (
          <div style={{ marginTop: 40, padding: '32px 0', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink4)', letterSpacing: '1px' }}>
              No expenses logged yet. Add your first expense above.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
