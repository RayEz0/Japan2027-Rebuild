import { useSavings } from '../../hooks/useSavings'
import { useTravel } from '../../context/TravelContext'
import { useNavigate } from 'react-router-dom'

function fmt(n, currency = '₹') {
  return currency + Number(n).toLocaleString('en-IN')
}

export default function SavingsModule() {
  const { total, pct, remaining, contributed } = useSavings()
  const { primaryTrip: trip } = useTravel()
  const navigate = useNavigate()

  const goal = trip?.savingsGoal || 0
  const currency = trip?.savingsCurrency || '₹'

  // Show placeholder if no savings goal is configured
  if (goal === 0) {
    return (
      <div style={{
        padding: '28px 32px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
          letterSpacing: '1.5px', textTransform: 'uppercase',
          color: 'var(--ink3)', fontWeight: 500, marginBottom: 12,
        }}>Savings Tracker</div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: 'var(--ink4)', lineHeight: 2,
        }}>
          Budget goal not configured<br />for {trip?.title || 'this trip'}.
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => navigate('/savings')}
      style={{
        padding: '28px 32px',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'background 0.12s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--paper)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Label */}
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: 'var(--ink3)', fontWeight: 500, marginBottom: 6,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>Savings Tracker</span>
        <span style={{ color: 'var(--ink4)', fontSize: 8 }}>Click to manage →</span>
      </div>

      {/* Target label */}
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
        color: 'var(--ink3)', marginBottom: 4,
      }}>
        Target: {fmt(goal, currency)}
      </div>

      {/* Total saved — big serif */}
      <div style={{
        fontFamily: 'Fraunces, serif', fontSize: 46,
        fontWeight: 300, color: 'var(--ink)', lineHeight: 1,
        margin: '6px 0 2px',
      }}>
        {fmt(total, currency)}
      </div>

      {/* Pct text */}
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        color: 'var(--ink3)', marginTop: 2,
      }}>
        {pct}% of {fmt(goal, currency)} goal
      </div>

      {/* Progress bar */}
      <div style={{
        height: 2, background: '#E5E2DA', marginTop: 12, position: 'relative',
      }}>
        <div style={{
          height: '100%', background: 'var(--accent)',
          width: `${pct}%`,
          transition: 'width 0.9s var(--ease)',
        }} />
      </div>

      {/* Bottom row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginTop: 10,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)',
        }}>
          Remaining: {fmt(remaining, currency)}
        </div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)',
        }}>
          {contributed} months contributed
        </div>
      </div>
    </div>
  )
}
