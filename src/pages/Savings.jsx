import { useSavings, SAVING_MONTHS, TRIP_GOAL, MONTHLY_TARGET } from '../hooks/useSavings'

const fmt  = (n) => '₹' + Number(n).toLocaleString('en-IN')
const fmtK = (n) => n >= 1000 ? `₹${(n / 1000).toFixed(1)}k` : fmt(n)

const VEHICLE_META = {
  cash: { label: 'Cash',          color: 'var(--ink)',    borderColor: 'var(--ink)'   },
  fd:   { label: 'Fixed Deposit', color: '#2e7d32',       borderColor: '#4caf50'      },
  mf:   { label: 'Mutual Funds',  color: '#1565c0',       borderColor: '#1e88e5'      },
}

function MonthCell({ label, entry, target, onSet, isCurrent, isPast }) {
  const total = (entry.cash || 0) + (entry.fd || 0) + (entry.mf || 0)
  const onTarget = total >= target

  const inputBase = {
    width: '100%', border: 'none', background: 'none',
    fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
    color: 'var(--ink)', padding: '2px 0', outline: 'none',
  }

  return (
    <div style={{
      background: 'var(--surf)', padding: '10px 10px 8px',
      outline: isCurrent ? '2px solid var(--accent)' : 'none',
      outlineOffset: -2,
      opacity: isPast && total === 0 ? 0.55 : 1,
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
        color: isCurrent ? 'var(--accent)' : 'var(--ink3)',
        letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>{label}</span>
        {isCurrent && <span style={{ fontSize: 6, letterSpacing: '0.5px' }}>NOW</span>}
      </div>

      {['cash', 'fd', 'mf'].map(v => (
        <div key={v} style={{ marginBottom: 5 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 6, color: 'var(--ink4)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 1 }}>
            {v === 'mf' ? 'MF' : v.toUpperCase()}
          </div>
          <input
            type="number" min="0"
            value={entry[v] || ''}
            onChange={e => onSet(v, Number(e.target.value) || 0)}
            placeholder="0"
            style={{
              ...inputBase,
              borderBottom: `1px solid ${entry[v] > 0 ? VEHICLE_META[v].borderColor : 'var(--border)'}`,
              color: entry[v] > 0 ? VEHICLE_META[v].color : 'var(--ink4)',
            }}
          />
        </div>
      ))}

      {total > 0 && (
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
          color: onTarget ? '#2e7d32' : 'var(--ink)', marginTop: 6,
          fontWeight: 600, borderTop: '1px solid var(--border)', paddingTop: 4,
        }}>
          {fmtK(total)}
        </div>
      )}
    </div>
  )
}

function VehicleBar({ vehicle, amount, total }) {
  const pct = total > 0 ? (amount / total) * 100 : 0
  const meta = VEHICLE_META[vehicle]
  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: meta.color }}>{meta.label}</span>
        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: meta.color }}>{fmt(amount)}</span>
      </div>
      <div style={{ height: 2, background: '#E5E2DA', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: meta.borderColor, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginTop: 3 }}>
        {pct.toFixed(1)}% of total saved
      </div>
    </div>
  )
}

function MonthBar({ month, value, maxValue, isCurrent }) {
  const pct = maxValue > 0 ? (value / maxValue) * 100 : 0
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, minWidth: 0 }}>
      <div style={{ width: '100%', height: 60, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          width: '100%',
          height: `${Math.max(pct, value > 0 ? 4 : 0)}%`,
          background: isCurrent ? 'var(--accent)' : value > 0 ? 'var(--ink)' : 'var(--border)',
          transition: 'height 0.8s cubic-bezier(0.4,0,0.2,1)',
          minHeight: value > 0 ? 2 : 0,
        }} />
      </div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 6.5, color: isCurrent ? 'var(--accent)' : 'var(--ink4)', textAlign: 'center', letterSpacing: '0.3px' }}>
        {month.label}
      </div>
    </div>
  )
}

export default function Savings() {
  const {
    total, pct, remaining, contributed, avgPerMonth,
    byCash, byFD, byMF,
    projected, reqPerMonth, monthsLeft, nowIdx,
    getMonthTotal, getMonthEntry, setMonth,
  } = useSavings()

  const projectedPct = Math.min(100, Math.round((projected / TRIP_GOAL) * 100))
  const maxMonthly   = Math.max(...SAVING_MONTHS.map(m => getMonthTotal(m.key)), 1)

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1400&q=70&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 6 }}>003B — Savings</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            Savings <em style={{ color: 'rgba(255,200,150,0.95)' }}>Tracker</em>
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 52px 80px' }}>

        {/* Goal progress */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Goal Progress — Target {fmt(TRIP_GOAL)}
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>{pct}%</div>
          </div>
          <div style={{ height: 3, background: '#E5E2DA', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'var(--ink)', transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)' }}>
              Saved: {fmt(total)}
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)' }}>
              Remaining: {fmt(remaining)}
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 32 }}>
          {[
            { label: 'Total Saved',    value: fmt(total),         sub: `${contributed} months contributed` },
            { label: 'Avg / Month',    value: fmt(avgPerMonth),   sub: `Target: ${fmt(MONTHLY_TARGET)}/mo` },
            { label: 'Months Left',    value: String(monthsLeft), sub: `Req: ${fmt(reqPerMonth)}/mo to hit goal` },
            { label: 'At Current Pace', value: fmt(Math.round(projected)), sub: projectedPct >= 100 ? 'On track to hit goal' : `${projectedPct}% of goal` },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surf)', padding: '18px 20px' }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 600, color: 'var(--ink)', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Month grid — Cash / FD / MF per month */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 16 }}>
            Monthly Contributions
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
            {SAVING_MONTHS.map(({ key, label }, idx) => (
              <MonthCell
                key={key}
                label={label}
                entry={getMonthEntry(key)}
                target={MONTHLY_TARGET}
                onSet={(vehicle, value) => setMonth(key, vehicle, value)}
                isCurrent={idx === nowIdx}
                isPast={idx < nowIdx}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 10, padding: '0 2px' }}>
            {Object.entries(VEHICLE_META).map(([v, meta]) => (
              <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 2, background: meta.borderColor }} />
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)' }}>{meta.label}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
              <div style={{ width: 8, height: 2, background: 'var(--accent)' }} />
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)' }}>Current month</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>

          {/* Vehicle breakdown */}
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 8 }}>
              Savings by Vehicle
            </div>
            <VehicleBar vehicle="cash" amount={byCash} total={total} />
            <VehicleBar vehicle="fd"   amount={byFD}   total={total} />
            <VehicleBar vehicle="mf"   amount={byMF}   total={total} />
          </div>

          {/* Monthly bar chart */}
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)', marginBottom: 8 }}>
              Contribution History
            </div>
            <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 84, padding: '0 0 4px' }}>
              {SAVING_MONTHS.map(({ key, label }, idx) => (
                <MonthBar
                  key={key}
                  month={{ key, label }}
                  value={getMonthTotal(key)}
                  maxValue={maxMonthly}
                  isCurrent={idx === nowIdx}
                />
              ))}
            </div>
            <div style={{ height: 1, background: 'var(--border)', marginBottom: 6 }} />
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)' }}>
              Peak: {fmt(maxMonthly > 1 ? maxMonthly : 0)} · Avg: {fmt(avgPerMonth)} · {contributed} / {SAVING_MONTHS.length} months active
            </div>
          </div>
        </div>

        {/* Projection callout */}
        {monthsLeft > 0 && (
          <div style={{
            marginTop: 32, padding: '18px 22px',
            border: projected >= TRIP_GOAL ? '1px solid #4caf50' : '1px solid var(--border)',
            background: 'var(--surf)',
            borderLeft: `3px solid ${projected >= TRIP_GOAL ? '#4caf50' : 'var(--ink)'}`,
          }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>
              Projection — {monthsLeft} months remaining
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, color: 'var(--ink)', lineHeight: 1.7 }}>
              At your average of <strong>{fmt(avgPerMonth)}/month</strong>, you will save approximately{' '}
              <strong style={{ color: projected >= TRIP_GOAL ? '#2e7d32' : 'var(--ink)' }}>{fmt(Math.round(projected))}</strong> by Nov 2027.{' '}
              {projected >= TRIP_GOAL
                ? 'You are on track to hit your goal.'
                : `To hit ${fmt(TRIP_GOAL)}, save ${fmt(reqPerMonth)}/month from now.`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
