import { useState } from 'react'
import { usePhotoLog, CAMERAS } from '../hooks/usePhotoLog'

const TRIP_DAYS = Array.from({ length: 13 }, (_, i) => String(i + 1).padStart(2, '0'))

const BLANK = { dayNum: '', camera: '', description: '', tags: '' }

function AddEntryForm({ onAdd }) {
  const [form, setForm] = useState(BLANK)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.description) return
    onAdd({
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    })
    setForm(BLANK)
  }

  const inp = {
    border: 'none', borderBottom: '1px solid var(--border)',
    background: 'none', fontFamily: 'Outfit, sans-serif',
    fontSize: 12.5, color: 'var(--ink)', padding: '4px 0', outline: 'none', width: '100%',
  }

  return (
    <form onSubmit={submit} style={{
      display: 'grid', gridTemplateColumns: '80px 160px 160px 1fr 120px 90px',
      gap: 12, alignItems: 'end', padding: '18px 52px',
      borderBottom: '1px solid var(--border)', background: 'var(--paper)',
    }}>
      <div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Day #</div>
        <select style={{ ...inp, cursor: 'pointer' }} value={form.dayNum} onChange={e => set('dayNum', e.target.value)}>
          <option value="">—</option>
          {TRIP_DAYS.map(d => <option key={d} value={d}>Day {Number(d)}</option>)}
        </select>
      </div>
      <div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Camera</div>
        <select style={{ ...inp, cursor: 'pointer' }} value={form.camera} onChange={e => set('camera', e.target.value)}>
          <option value="">—</option>
          {CAMERAS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Tags (comma sep)</div>
        <input style={inp} placeholder="street, temple, food…" value={form.tags} onChange={e => set('tags', e.target.value)} />
      </div>
      <div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Description / Shot Notes</div>
        <input style={inp} placeholder="What did you capture?" value={form.description} onChange={e => set('description', e.target.value)} required />
      </div>
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', paddingBottom: 6 }}>
        {form.camera === 'Insta360 GO 3' ? '360° / POV' : form.camera === 'DJI Pocket 3' ? 'Gimbal / Cinematic' : ''}
      </div>
      <button type="submit" style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, letterSpacing: '0.8px', textTransform: 'uppercase',
        background: 'var(--ink)', color: 'var(--surf)', border: '1.5px solid var(--ink)',
        padding: '6px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
      }}>+ Log</button>
    </form>
  )
}

function EntryCard({ entry, onRemove, onToggleFav }) {
  const cameraColor = entry.camera === 'Insta360 GO 3' ? 'var(--accent)' : entry.camera === 'DJI Pocket 3' ? '#1565c0' : 'var(--ink3)'

  return (
    <div style={{
      background: 'var(--surf)', padding: '14px 16px',
      borderLeft: entry.favorite ? '3px solid var(--ink)' : '1px solid var(--border)',
      borderTop: '1px solid var(--border)', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.5 }}>{entry.description}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center', flexWrap: 'wrap' }}>
            {entry.dayNum && (
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)' }}>Day {Number(entry.dayNum)}</span>
            )}
            {entry.camera && (
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: cameraColor }}>
                {entry.camera}
              </span>
            )}
            {entry.tags && entry.tags.length > 0 && entry.tags.map(t => (
              <span key={t} style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                color: 'var(--ink4)', background: 'var(--paper)',
                border: '1px solid var(--border)', padding: '1px 5px',
              }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button
            onClick={() => onToggleFav(entry.id)}
            title={entry.favorite ? 'Remove from favorites' : 'Mark as favorite'}
            style={{
              border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 14, padding: '0 2px', lineHeight: 1,
              color: entry.favorite ? 'var(--ink)' : 'var(--ink4)',
              transition: 'color 0.14s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
            onMouseLeave={e => e.currentTarget.style.color = entry.favorite ? 'var(--ink)' : 'var(--ink4)'}
          >
            {entry.favorite ? '★' : '☆'}
          </button>
          <button
            onClick={() => onRemove(entry.id)}
            style={{
              border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 14, color: 'var(--ink4)', padding: '0 2px', lineHeight: 1,
              transition: 'color 0.14s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink4)'}
          >×</button>
        </div>
      </div>
    </div>
  )
}

export default function PhotoLog() {
  const { entries, add, remove, toggleFavorite, favorites, byCamera } = usePhotoLog()
  const [filterDay, setFilterDay] = useState('')
  const [filterCam, setFilterCam] = useState('')
  const [showFavsOnly, setShowFavsOnly] = useState(false)

  let filtered = entries
  if (filterDay) filtered = filtered.filter(e => e.dayNum === filterDay)
  if (filterCam) filtered = filtered.filter(e => e.camera === filterCam)
  if (showFavsOnly) filtered = filtered.filter(e => e.favorite)

  const displayByDay = filtered.reduce((acc, e) => {
    const k = e.dayNum || 'untagged'
    if (!acc[k]) acc[k] = []
    acc[k].push(e)
    return acc
  }, {})

  const dayKeys = Object.keys(displayByDay).sort()

  return (
    <div className="page-enter">
      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', height: 200, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1400&q=70&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center 60%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,12,12,0.12) 0%, rgba(12,12,12,0.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '0 52px 24px' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'rgba(255,255,255,0.65)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 6 }}>011 — Photo Log</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 42, fontWeight: 700, lineHeight: 0.95, letterSpacing: '-1px', color: '#fff' }}>
            Shot <em style={{ color: 'rgba(255,200,150,0.95)' }}>Log</em>
          </div>
        </div>
      </div>

      {/* Add form */}
      <AddEntryForm onAdd={add} />

      <div style={{ padding: '28px 52px 80px' }}>

        {/* Stats row */}
        {entries.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', marginBottom: 28 }}>
            {[
              { label: 'Total Shots', value: String(entries.length) },
              { label: 'Favorites',   value: String(favorites.length) },
              { label: 'Insta360',    value: String(byCamera['Insta360 GO 3'] || 0) },
              { label: 'DJI Pocket',  value: String(byCamera['DJI Pocket 3'] || 0) },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surf)', padding: '14px 16px' }}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink3)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        {entries.length > 0 && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={filterDay}
              onChange={e => setFilterDay(e.target.value)}
              style={{
                border: '1px solid var(--border)', background: 'var(--surf)',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
                color: 'var(--ink)', padding: '5px 10px', cursor: 'pointer', outline: 'none',
              }}
            >
              <option value="">All Days</option>
              {TRIP_DAYS.map(d => <option key={d} value={d}>Day {Number(d)}</option>)}
            </select>
            <select
              value={filterCam}
              onChange={e => setFilterCam(e.target.value)}
              style={{
                border: '1px solid var(--border)', background: 'var(--surf)',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
                color: 'var(--ink)', padding: '5px 10px', cursor: 'pointer', outline: 'none',
              }}
            >
              <option value="">All Cameras</option>
              {CAMERAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              onClick={() => setShowFavsOnly(v => !v)}
              style={{
                border: `1px solid ${showFavsOnly ? 'var(--ink)' : 'var(--border)'}`,
                background: showFavsOnly ? 'var(--ink)' : 'transparent',
                color: showFavsOnly ? 'var(--surf)' : 'var(--ink3)',
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
                padding: '5px 12px', cursor: 'pointer', transition: 'all 0.14s',
              }}
            >★ Favorites only</button>
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)', marginLeft: 'auto' }}>
              {filtered.length} / {entries.length} entries
            </span>
          </div>
        )}

        {/* Entries by day */}
        {dayKeys.length > 0 ? (
          dayKeys.map(dayKey => (
            <div key={dayKey} style={{ marginBottom: 28 }}>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
                letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--ink3)',
                marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span>{dayKey === 'untagged' ? 'Untagged' : `Day ${Number(dayKey)}`}</span>
                <span style={{ fontSize: 8, color: 'var(--ink4)' }}>{displayByDay[dayKey].length} shots</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
                {displayByDay[dayKey].map(entry => (
                  <EntryCard key={entry.id} entry={entry} onRemove={remove} onToggleFav={toggleFavorite} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px 0', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5, color: 'var(--ink4)', letterSpacing: '1px' }}>
              {entries.length === 0 ? 'No shots logged yet. Log your first shot above.' : 'No entries match the current filters.'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
