import { useState, useEffect } from 'react'
import { useTravel } from '../../context/TravelContext'
import { getCurrencyRate, setCurrencyRate } from '../../services/offline/index'

// ── Preset quick amounts ──────────────────────────────────────────────────────

const PRESETS = [100, 500, 1000, 2000, 5000, 10000, 50000]

// Curated common-cost examples — only meaningful for the trip they were
// authored for. No equivalent data exists for other trips, so this section
// is hidden rather than showing Japanese prices under a different currency.
const JAPAN_COMMON_ITEMS = [
  { label: 'Convenience store snack',  jpy: 200  },
  { label: 'Ramen bowl',               jpy: 900  },
  { label: 'Coffee / matcha',          jpy: 600  },
  { label: 'Subway ride (avg)',         jpy: 200  },
  { label: 'Capsule hotel (1 night)',   jpy: 3500 },
  { label: 'Business hotel (1 night)', jpy: 8000 },
  { label: 'Shinkansen (Tokyo–Kyoto)', jpy: 14170 },
  { label: 'Disneyland ticket',        jpy: 9400 },
  { label: 'Convenience bento',        jpy: 600  },
  { label: 'Vending machine drink',    jpy: 150  },
]

// ── Big display ───────────────────────────────────────────────────────────────

function BigDisplay({ symbol, amount, inr }) {
  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--surf)',
      padding: '20px 16px', marginBottom: 16,
      display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      <div style={{
        fontFamily: 'Fraunces, serif', fontSize: 44, fontWeight: 700, lineHeight: 1,
        letterSpacing: '-1px',
      }}>
        {symbol}{Number(amount).toLocaleString('en-IN')}
      </div>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
        opacity: 0.55,
      }}>
        =
      </div>
      <div style={{
        fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 700, lineHeight: 1,
        color: 'rgba(255,220,140,0.95)',
      }}>
        ₹{Number(inr).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function TravelCurrency() {
  const { activeTrip, content } = useTravel()
  const currencies = content?.currencies?.length ? content.currencies : null
  const [curIdx, setCurIdx] = useState(0)
  const cur = currencies?.[curIdx] || null
  const symbol = cur?.symbol || '¥'
  const isJapan = activeTrip?.id === 'japan2027'

  const defaultRate = cur?.rateToINR ?? getCurrencyRate().rate

  const [rate,      setRateState]  = useState(defaultRate)
  const [amountInput, setAmountInput] = useState('1000')
  const [inrInput,  setInrInput]   = useState('')
  const [direction, setDirection]  = useState('local-to-inr')
  const [editRate,  setEditRate]   = useState(false)
  const [draftRate, setDraftRate]  = useState(String(defaultRate))
  const [savedFlash, setSavedFlash]= useState(false)

  // Reset to the active trip/currency's bundled rate whenever either changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRateState(defaultRate)
    setDraftRate(String(defaultRate))
    setCurIdx(0)
  }, [activeTrip?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const amount = direction === 'local-to-inr' ? parseFloat(amountInput) || 0 : (parseFloat(inrInput) || 0) / rate
  const inr    = direction === 'local-to-inr' ? (parseFloat(amountInput) || 0) * rate : parseFloat(inrInput) || 0

  const handleSaveRate = () => {
    const r = parseFloat(draftRate)
    if (!r || r <= 0) return
    setRateState(r)
    setCurrencyRate(r)
    setEditRate(false)
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1500)
  }

  const flip = () => {
    setDirection(d => d === 'local-to-inr' ? 'inr-to-local' : 'local-to-inr')
    setAmountInput('')
    setInrInput('')
  }

  const INPUT = {
    width: '100%', boxSizing: 'border-box',
    padding: '12px 14px',
    fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600,
    border: '1px solid var(--border)', background: 'var(--paper)',
    color: 'var(--ink)', outline: 'none', textAlign: 'right',
  }

  return (
    <div style={{ padding: 16 }}>

      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>
          Currency Converter
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)' }}>
            {symbol}1 = ₹{rate.toFixed(3)}
            {savedFlash && <span style={{ marginLeft: 8, color: '#2e7d32' }}>✓ Saved</span>}
          </div>
          <button onClick={() => setEditRate(v => !v)} style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
            border: '1px solid var(--border)', background: 'none', color: 'var(--ink4)',
            padding: '4px 10px', cursor: 'pointer',
          }}>
            {editRate ? 'Cancel' : 'Edit Rate'}
          </button>
        </div>
      </div>

      {/* Currency selector — only shown when the active arc has more than one */}
      {currencies && currencies.length > 1 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {currencies.map((c, i) => (
            <button
              key={`${c.code}-${c.country}-${i}`}
              onClick={() => setCurIdx(i)}
              style={{
                flex: 1, fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                background: curIdx === i ? 'var(--ink)' : 'none',
                color: curIdx === i ? 'var(--surf)' : 'var(--ink4)',
                border: `1px solid ${curIdx === i ? 'var(--ink)' : 'var(--border)'}`,
                padding: '7px', cursor: 'pointer',
              }}
            >
              {c.symbol} {c.code}
            </button>
          ))}
        </div>
      )}

      {/* Rate editor */}
      {editRate && (
        <div style={{ border: '1px solid var(--border)', padding: '12px 14px', marginBottom: 14, background: 'var(--surf)' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginBottom: 6 }}>
            Set custom rate ({symbol}1 = ₹?)
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="number"
              step="0.001"
              value={draftRate}
              onChange={e => setDraftRate(e.target.value)}
              style={{
                flex: 1, padding: '8px 10px',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 13,
                border: '1px solid var(--border)', background: 'var(--paper)',
                color: 'var(--ink)', outline: 'none',
              }}
            />
            <button onClick={handleSaveRate} style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
              background: 'var(--ink)', color: 'var(--surf)', border: 'none',
              padding: '8px 16px', cursor: 'pointer',
            }}>
              Save
            </button>
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 6 }}>
            Default: {defaultRate.toFixed(3)}{cur ? ` (${cur.country})` : ''}
          </div>
        </div>
      )}

      {/* Big display */}
      {direction === 'local-to-inr' ? (
        <BigDisplay symbol={symbol} amount={amount} inr={inr} />
      ) : (
        <div style={{
          background: 'var(--ink)', color: 'var(--surf)',
          padding: '20px 16px', marginBottom: 16,
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 44, fontWeight: 700, lineHeight: 1, color: 'rgba(255,220,140,0.95)' }}>
            ₹{Number(inr).toLocaleString('en-IN')}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, opacity: 0.55 }}>=</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 700, lineHeight: 1 }}>
            {symbol}{Number(amount).toLocaleString('en-IN')}
          </div>
        </div>
      )}

      {/* Input + flip */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', display: 'block', marginBottom: 4, textTransform: 'uppercase' }}>
            {direction === 'local-to-inr' ? `${cur?.code || 'Local'} (${symbol})` : 'Indian Rupee (₹)'}
          </label>
          <input
            type="number"
            value={direction === 'local-to-inr' ? amountInput : inrInput}
            onChange={e => direction === 'local-to-inr' ? setAmountInput(e.target.value) : setInrInput(e.target.value)}
            style={INPUT}
            placeholder="0"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <button
            onClick={flip}
            style={{
              height: 50, width: 50, border: '1px solid var(--border)',
              background: 'var(--surf)', color: 'var(--ink)',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 14,
              cursor: 'pointer',
            }}
          >
            ⇄
          </button>
        </div>
      </div>

      {/* Quick presets */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', textTransform: 'uppercase', marginBottom: 8 }}>
          Quick amounts
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {PRESETS.map(v => (
            <button
              key={v}
              onClick={() => { setDirection('local-to-inr'); setAmountInput(String(v)) }}
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                border: '1px solid var(--border)', background: 'var(--surf)',
                color: 'var(--ink)', padding: '6px 12px', cursor: 'pointer',
              }}
            >
              {symbol}{v.toLocaleString()}
              <span style={{ display: 'block', fontSize: 7, color: 'var(--ink4)' }}>
                ₹{(v * rate).toFixed(0)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Common items — only for the trip they were authored for */}
      {isJapan && (
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', textTransform: 'uppercase', marginBottom: 8 }}>
            Common costs
          </div>
          <div style={{ border: '1px solid var(--border)' }}>
            {JAPAN_COMMON_ITEMS.map((item, i) => (
              <div
                key={i}
                onClick={() => { setDirection('local-to-inr'); setAmountInput(String(item.jpy)) }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '9px 12px',
                  borderBottom: i < JAPAN_COMMON_ITEMS.length - 1 ? '1px solid var(--border)' : 'none',
                  background: 'var(--surf)', cursor: 'pointer',
                }}
              >
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink)' }}>
                  {item.label}
                </span>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink)', fontWeight: 600 }}>
                    ¥{item.jpy.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)' }}>
                    ₹{(item.jpy * rate).toFixed(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
