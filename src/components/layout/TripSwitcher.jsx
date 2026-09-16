import { useState } from 'react'
import { ARCS } from '../../data/worldTour/arcs'
import { useTravel } from '../../context/TravelContext'

function arcLabel(arc) {
  return (arc.navLabel || arc.title).replace(/\s·\s/g, ' + ')
}

export default function TripSwitcher() {
  const [open, setOpen] = useState(false)
  const { activeArc, selectArc } = useTravel()

  const handleSelect = (arc) => {
    setOpen(false)
    // selectArc queues the cinematic overlay; the overlay commits the switch
    // to the arc's primary trip once its animation finishes. Since arc/trip
    // now derive from one activeTripId, there's nothing else to sync here.
    selectArc(arc.year)
  }

  return (
    <div style={{ position: 'relative', padding: '8px 10px', borderTop: '1px solid var(--border)' }}>
      {/* Selector button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', minHeight: 38,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: open ? 'var(--paper)' : 'var(--surf)',
          border: `1px solid ${open ? 'var(--ink)' : 'var(--border)'}`,
          cursor: 'pointer',
          padding: '7px 10px', color: 'var(--ink)',
          transition: 'border-color 0.14s, background 0.14s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.background = 'var(--paper)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = open ? 'var(--ink)' : 'var(--border)'; e.currentTarget.style.background = open ? 'var(--paper)' : 'var(--surf)' }}
        title="Switch arc"
        aria-expanded={open}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0, overflow: 'hidden' }}>
          {activeArc ? (
            <>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: activeArc.theme.accent, flexShrink: 0,
              }} />
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 6, minWidth: 0 }}>
                <span style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: 11.5, fontWeight: 500,
                  color: 'var(--ink)', letterSpacing: '0.1px',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%',
                }}>
                  {arcLabel(activeArc)}
                </span>
                <span style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                  color: 'var(--ink4)', letterSpacing: '0.3px', flexShrink: 0,
                }}>
                  {activeArc.year}
                </span>
              </span>
            </>
          ) : (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
              color: 'var(--ink4)', letterSpacing: '0.8px', textTransform: 'uppercase',
            }}>
              World Tour
            </span>
          )}
        </span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: 'var(--ink4)', fontSize: 8, letterSpacing: 0, flexShrink: 0, marginLeft: 6,
          transition: 'transform 0.14s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>
          ▼
        </span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 598 }}
            onClick={() => setOpen(false)}
          />
          {/* Dropdown */}
          <div style={{
            position: 'absolute', bottom: 'calc(100% - 8px)', left: 12, right: 12,
            background: 'var(--surf)', border: '1.5px solid var(--ink)',
            zIndex: 599, boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
            maxHeight: 380, overflowY: 'auto',
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              color: 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase',
              padding: '10px 14px 7px',
            }}>
              World Tour · Select Arc
            </div>

            {ARCS.map((arc, i) => {
              const isActive = arc.year === activeArc?.year
              return (
                <button
                  key={arc.year}
                  onClick={() => handleSelect(arc)}
                  style={{
                    width: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: isActive ? 'var(--paper)' : 'transparent',
                    border: 'none',
                    borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: '1px solid var(--border)',
                    padding: '13px 14px', cursor: 'pointer',
                    textAlign: 'left', transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--paper)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: arc.theme.accent, flexShrink: 0,
                    }} />
                    <span>
                      <span style={{
                        display: 'block',
                        fontFamily: 'Outfit, sans-serif', fontSize: 13.5,
                        color: 'var(--ink)', fontWeight: isActive ? 600 : 400,
                        letterSpacing: '0.1px',
                      }}>
                        {arcLabel(arc)}
                      </span>
                      <span style={{
                        display: 'block',
                        fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
                        color: 'var(--ink4)', marginTop: 3,
                      }}>
                        {arc.month} · {arc.duration}
                      </span>
                    </span>
                  </span>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                    letterSpacing: '0.5px',
                    color: isActive ? arc.theme.accent : 'var(--ink4)',
                    fontWeight: isActive ? 600 : 400,
                    flexShrink: 0, marginLeft: 8,
                  }}>
                    {arc.year}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
