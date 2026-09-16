import { useState, useEffect, useRef } from 'react'
import { useTravel } from '../context/TravelContext'
import { useResolvedContent } from '../hooks/useResolvedContent'
import { useGifts }  from '../hooks/useGifts'

export default function Gifts() {
  const { activeArc: arc } = useTravel()
  const content = useResolvedContent()
  const { gifts, toggle, remove, addNew, update, addFromSuggestion, total } = useGifts()
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Close the suggestions panel when the active trip switches
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    setShowSuggestions(false)
  }, [arc?.year])

  const giftIdeas = content?.giftIdeas || []

  const heroImage = arc?.heroImage
    || 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1400&q=70&auto=format&fit=crop'

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{
        position: 'relative', overflow: 'hidden', height: 200,
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
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px',
            textTransform: 'uppercase', marginBottom: 6,
          }}>Arc {arc?.no || '01'} — Checklist</div>
          <div style={{
            fontFamily: 'Fraunces, serif', fontSize: 42,
            fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff',
          }}>Gift <em style={{ color: 'rgba(255,200,150,0.95)' }}>List</em></div>
        </div>
      </div>

      <div style={{ padding: '32px 52px 80px' }}>
        {/* Arc suggestions panel */}
        {giftIdeas.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <button
              onClick={() => setShowSuggestions(s => !s)}
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                letterSpacing: '0.8px', textTransform: 'uppercase',
                color: 'var(--ink3)', background: 'none',
                border: '1px solid var(--border)', padding: '5px 12px',
                cursor: 'pointer', marginBottom: showSuggestions ? 12 : 0,
              }}
            >
              {showSuggestions ? '▲ Hide' : '▼ Suggestions'} — {arc?.title}
            </button>

            {showSuggestions && (
              <div style={{
                border: '1px solid var(--border)',
                background: 'var(--paper)',
                padding: '16px 20px',
              }}>
                {giftIdeas.map((country, ci) => (
                  <div key={ci} style={{ marginBottom: ci < giftIdeas.length - 1 ? 20 : 0 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
                    }}>
                      <span style={{ fontSize: 16 }}>{country.flag}</span>
                      <span style={{
                        fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
                        color: 'var(--ink)', letterSpacing: '0.5px', fontWeight: 600,
                        textTransform: 'uppercase',
                      }}>{country.country}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {country.items.map((item, ii) => {
                        const added = gifts.some(g => g.name === item.name)
                        return (
                          <div key={ii} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            padding: '8px 12px',
                            background: added ? '#f0faf0' : 'var(--surf)',
                            border: `1px solid ${added ? '#a5d6a7' : 'var(--border)'}`,
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{
                                fontSize: 13, color: 'var(--ink)', fontWeight: 500, marginBottom: 2,
                              }}>{item.name}</div>
                              <div style={{
                                fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                                color: 'var(--ink3)', lineHeight: 1.4,
                              }}>📍 {item.where}</div>
                            </div>
                            <button
                              onClick={() => addFromSuggestion(item)}
                              disabled={added}
                              style={{
                                fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                                letterSpacing: '0.5px', textTransform: 'uppercase',
                                color: added ? '#2e7d32' : 'var(--ink)',
                                background: 'none',
                                border: `1px solid ${added ? '#a5d6a7' : 'var(--border)'}`,
                                padding: '3px 10px',
                                cursor: added ? 'default' : 'pointer',
                                flexShrink: 0,
                              }}
                            >{added ? '✓ Added' : '+ Add'}</button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Gift rows */}
        <div>
          {gifts.length === 0 && (
            <div style={{
              padding: '24px 0',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              color: 'var(--ink4)', textAlign: 'center',
            }}>No gifts yet — add from suggestions or use + Add Gift below.</div>
          )}
          {gifts.map(gift => (
            <div key={gift.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 0', borderBottom: '1px solid var(--border)',
            }}>
              <input
                type="checkbox"
                checked={gift.done}
                onChange={() => toggle(gift.id)}
                style={{ flexShrink: 0, accentColor: 'var(--ink)', cursor: 'pointer' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <input
                  value={gift.name}
                  placeholder="Gift name"
                  onChange={e => update(gift.id, 'name', e.target.value)}
                  style={{
                    width: '100%', border: 'none',
                    borderBottom: '1px solid var(--border)',
                    background: 'none', fontFamily: 'Outfit, sans-serif',
                    fontSize: 13, color: 'var(--ink)', padding: '2px 0', outline: 'none',
                    textDecoration: gift.done ? 'line-through' : 'none',
                    opacity: gift.done ? 0.4 : 1,
                  }}
                />
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                  color: 'var(--ink3)', marginTop: 2,
                }}>{gift.where}</div>
              </div>
              <input
                type="number"
                value={gift.est || ''}
                min="0"
                placeholder="₹"
                onChange={e => update(gift.id, 'est', +e.target.value || 0)}
                style={{
                  border: 'none', borderBottom: '1px solid var(--border)',
                  background: 'none', fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 11, color: 'var(--ink)', padding: '2px 0',
                  outline: 'none', width: 70, textAlign: 'right',
                }}
              />
              <button
                onClick={() => remove(gift.id)}
                style={{
                  border: 'none', background: 'none', cursor: 'pointer',
                  fontSize: 14, color: 'var(--ink4)', padding: '0 2px',
                  flexShrink: 0, lineHeight: 1, transition: 'color 0.14s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink4)'}
              >×</button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <button
            onClick={addNew}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              letterSpacing: '0.8px', textTransform: 'uppercase',
              color: 'var(--ink)', background: 'none',
              border: '1.5px solid var(--ink)', padding: '6px 14px',
              cursor: 'pointer', transition: 'background 0.14s, color 0.14s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--ink)' }}
          >+ Add Gift</button>

          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 3,
            }}>Total Estimate</div>
            <div style={{
              fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)',
            }}>
              ₹{total.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
