import { useState, useEffect } from 'react'
import { useJournal, MOODS, WEATHER_OPTS } from '../../context/JournalContext'
import { usePlaceStatus } from '../../hooks/usePlaceStatus'
import { useTravel } from '../../context/TravelContext'
import { useTripDay } from '../../hooks/useTripDay'

// ── Helpers ───────────────────────────────────────────────────────────────────

function today() { return new Date().toISOString().slice(0, 10) }

// ── Sub-components ────────────────────────────────────────────────────────────

function MoodRow({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
      {MOODS.map(m => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          style={{
            flex: '1 1 60px',
            padding: '8px 4px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            border: `1.5px solid ${value === m.id ? 'var(--ink)' : 'var(--border)'}`,
            background: value === m.id ? 'var(--border)' : 'var(--surf)',
            cursor: 'pointer', fontFamily: '"JetBrains Mono", monospace',
          }}
        >
          <span style={{ fontSize: 20 }}>{m.emoji}</span>
          <span style={{ fontSize: 7, color: value === m.id ? 'var(--ink)' : 'var(--ink4)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
            {m.label}
          </span>
        </button>
      ))}
    </div>
  )
}

function WeatherRow({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
      {WEATHER_OPTS.map(w => (
        <button
          key={w.id}
          onClick={() => onChange(w.id)}
          style={{
            padding: '6px 10px',
            border: `1px solid ${value === w.id ? 'var(--ink)' : 'var(--border)'}`,
            background: value === w.id ? 'var(--ink)' : 'var(--surf)',
            cursor: 'pointer', display: 'flex', gap: 4, alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 14 }}>{w.emoji}</span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: value === w.id ? 'var(--surf)' : 'var(--ink4)' }}>
            {w.label}
          </span>
        </button>
      ))}
    </div>
  )
}

// ── Recent entries ────────────────────────────────────────────────────────────

function RecentEntry({ entry }) {
  const m = MOODS.find(x => x.id === entry.mood)
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      onClick={() => setExpanded(v => !v)}
      style={{
        border: '1px solid var(--border)', background: 'var(--surf)',
        padding: '10px 12px', marginBottom: 6, cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ fontSize: 18, flexShrink: 0 }}>{m?.emoji || '📔'}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 500, color: 'var(--ink)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {entry.title || 'Untitled'}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)' }}>
            {entry.date} · {entry.city}
            {entry.photos?.length > 0 && ` · ${entry.photos.length} 📷`}
          </div>
        </div>
        <span style={{ color: 'var(--ink4)', fontSize: 10, alignSelf: 'center' }}>{expanded ? '▾' : '▸'}</span>
      </div>
      {expanded && entry.notes && (
        <div style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 12.5, color: 'var(--ink3)',
          lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)',
        }}>
          {entry.notes}
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

const BLANK_BASE = {
  title: '', date: today(), city: '',
  mood: '', weather: '', notes: '', placeId: '',
  tags: [], favourite: false, photos: [], highlights: [],
}

export default function TravelJournal() {
  const { entries, create } = useJournal()
  const { toggle }          = usePlaceStatus()
  const { content } = useTravel()
  const tripDay = useTripDay()

  const countryName = content?.currencies?.[0]?.country || ''
  const blank = { ...BLANK_BASE, country: countryName }

  const [form,     setForm]     = useState(blank)
  const [photoUrl, setPhotoUrl] = useState('')
  const [saved,    setSaved]    = useState(false)
  const [view,     setView]     = useState('new') // 'new' | 'recent'

  // Refresh the form's default country when the active trip changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(f => (f.country ? f : { ...f, country: countryName }))
  }, [countryName])

  const todayActs = (tripDay.day?.places || []).map(p => p.name)
  const recent    = entries.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 5)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    if (!form.notes && !form.title) return
    create(form)
    // Mark linked place as visited
    if (form.placeId) toggle(form.placeId, 'visited')
    setForm({ ...blank })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addPhoto = () => {
    if (!photoUrl.trim()) return
    set('photos', [...form.photos, { id: Date.now().toString(), url: photoUrl.trim(), caption: '', favourite: false }])
    setPhotoUrl('')
  }

  const INPUT = {
    width: '100%', boxSizing: 'border-box',
    padding: '8px 10px', marginBottom: 10,
    fontFamily: 'Outfit, sans-serif', fontSize: 13, color: 'var(--ink)',
    background: 'var(--paper)', border: '1px solid var(--border)', outline: 'none',
  }

  const LABEL = {
    display: 'block', fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
    color: 'var(--ink4)', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: 4,
  }

  return (
    <div style={{ padding: 16 }}>

      {/* Header */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {['new', 'recent'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            style={{
              flex: 1, fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
              background: view === v ? 'var(--ink)' : 'none',
              color: view === v ? 'var(--surf)' : 'var(--ink4)',
              border: `1px solid ${view === v ? 'var(--ink)' : 'var(--border)'}`,
              padding: '8px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.4px',
            }}
          >
            {v === 'new' ? '+ New Entry' : `Recent (${entries.length})`}
          </button>
        ))}
      </div>

      {/* ── Recent entries ── */}
      {view === 'recent' && (
        <>
          {recent.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 0', fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)' }}>
              No entries yet
            </div>
          ) : (
            recent.map(e => (
              <RecentEntry key={e.id} entry={e} />
            ))
          )}
        </>
      )}

      {/* ── New entry form ── */}
      {view === 'new' && (
        <>
          {saved && (
            <div style={{ background: '#e8f5e9', border: '1px solid #2e7d32', padding: '8px 12px', marginBottom: 12, fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#2e7d32' }}>
              ✓ Journal entry saved!
            </div>
          )}

          {/* Quick mood */}
          <label style={LABEL}>How are you feeling?</label>
          <MoodRow value={form.mood} onChange={v => set('mood', v)} />

          {/* Weather */}
          <label style={LABEL}>Weather</label>
          <WeatherRow value={form.weather} onChange={v => set('weather', v)} />

          {/* Title */}
          <label style={LABEL}>Title (optional)</label>
          <input
            style={INPUT}
            value={form.title}
            onChange={e => set('title', e.target.value)}
            placeholder="e.g. Sensoji at dawn…"
          />

          {/* Today's locations quick-select */}
          {todayActs.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <label style={LABEL}>Today's places</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {todayActs.map(name => (
                  <button
                    key={name}
                    onClick={() => set('city', name)}
                    style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                      border: `1px solid ${form.city === name ? 'var(--ink)' : 'var(--border)'}`,
                      background: form.city === name ? 'var(--ink)' : 'var(--surf)',
                      color: form.city === name ? 'var(--surf)' : 'var(--ink4)',
                      padding: '4px 9px', cursor: 'pointer',
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Date + City */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 0 }}>
            <div>
              <label style={LABEL}>Date</label>
              <input type="date" style={{ ...INPUT, marginBottom: 0 }} value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div>
              <label style={LABEL}>City</label>
              <input style={{ ...INPUT, marginBottom: 0 }} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Tokyo" />
            </div>
          </div>
          <div style={{ marginBottom: 10 }} />

          {/* Notes */}
          <label style={LABEL}>Memory *</label>
          <textarea
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            placeholder="What happened today? How did it feel?"
            rows={5}
            style={{ ...INPUT, resize: 'vertical' }}
          />

          {/* Photo */}
          <label style={LABEL}>Add photo URL</label>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            <input
              style={{ ...INPUT, flex: 1, marginBottom: 0 }}
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              placeholder="https://..."
            />
            <button onClick={addPhoto} style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
              background: 'var(--surf)', border: '1px solid var(--border)',
              color: 'var(--ink)', padding: '0 12px', cursor: 'pointer',
            }}>+ Add</button>
          </div>
          {form.photos.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              {form.photos.map(p => (
                <div key={p.id} style={{ width: 60, height: 60, overflow: 'hidden', position: 'relative' }}>
                  <img src={p.url} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={() => set('photos', form.photos.filter(x => x.id !== p.id))} style={{
                    position: 'absolute', top: 2, right: 2,
                    background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff',
                    width: 16, height: 16, cursor: 'pointer', fontSize: 10, lineHeight: '14px', padding: 0,
                  }}>×</button>
                </div>
              ))}
            </div>
          )}

          {/* Favourite toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 14 }}>
            <input
              type="checkbox"
              checked={form.favourite}
              onChange={e => set('favourite', e.target.checked)}
              style={{ width: 16, height: 16 }}
            />
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink3)' }}>
              ★ Mark as favourite memory
            </span>
          </label>

          {/* Save */}
          <button
            onClick={handleSave}
            style={{
              width: '100%', padding: '14px',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              background: 'var(--ink)', color: 'var(--surf)', border: 'none',
              cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase',
            }}
          >
            Save Memory
          </button>
        </>
      )}
    </div>
  )
}
