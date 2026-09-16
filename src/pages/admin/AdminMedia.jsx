import { useState, useMemo } from 'react'
import { allPlaces }         from '../../data/places/index'
import { DAYS }              from '../../data/trips/japan2027/itinerary'
import { getAllMedia, setMediaMeta } from '../../services/cms/index'

// ── Collect all image URLs ────────────────────────────────────────────────────

function collectAllImages() {
  const seen   = new Set()
  const images = []

  const add = (url, source, label) => {
    if (!url || seen.has(url)) return
    seen.add(url)
    images.push({ url, source, label })
  }

  // Place hero images
  for (const p of allPlaces) {
    add(p.heroImage, 'place-hero', p.name)
    add(p.image,     'place-hero', p.name)
    for (const img of p.gallery || []) add(img, 'place-gallery', p.name)
  }

  // Itinerary images
  for (const day of DAYS) {
    for (const activity of day.places || []) {
      for (const img of activity.images || []) {
        add(img, 'itinerary', `Day ${day.num} · ${activity.name}`)
      }
    }
  }

  return images
}

// ── Image card ────────────────────────────────────────────────────────────────

function ImageCard({ img, meta, onUpdateMeta, onReplace }) {
  const [broken,   setBroken]   = useState(false)
  const [editing,  setEditing]  = useState(false)
  const [newUrl,   setNewUrl]   = useState(img.url)
  const [caption,  setCaption]  = useState(meta?.caption || '')

  const SOURCE_COLOR = {
    'place-hero':    '#2e7d32',
    'place-gallery': '#1D4ED8',
    'itinerary':     '#7C3AED',
  }

  return (
    <div style={{
      border: `1px solid ${broken ? '#b5451b' : 'var(--border)'}`,
      background: 'var(--surf)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Image */}
      <div style={{ height: 120, overflow: 'hidden', position: 'relative', background: '#f0f0f0' }}>
        {broken ? (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#b5451b',
          }}>
            ✕ Broken
          </div>
        ) : (
          <img
            src={img.url}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={() => setBroken(true)}
          />
        )}
        <span style={{
          position: 'absolute', top: 5, left: 5,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 7,
          background: SOURCE_COLOR[img.source] || '#555',
          color: '#fff', padding: '1px 5px',
        }}>
          {img.source}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '8px 9px', flex: 1 }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 500, color: 'var(--ink)',
          lineHeight: 1.3, marginBottom: 4,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {img.label}
        </div>
        {meta?.caption && (
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginBottom: 4 }}>
            {meta.caption}
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ padding: '0 9px 9px', display: 'flex', gap: 5 }}>
        <button
          onClick={() => setEditing(v => !v)}
          style={{
            flex: 1, fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            border: '1px solid var(--border)', background: 'none', color: 'var(--ink3)',
            padding: '4px', cursor: 'pointer', letterSpacing: '0.3px',
          }}
        >
          {editing ? 'Cancel' : 'Edit'}
        </button>
        <a
          href={img.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
            border: '1px solid var(--border)', color: 'var(--ink4)',
            padding: '4px 7px', textDecoration: 'none', display: 'flex', alignItems: 'center',
          }}
        >
          ↗
        </a>
      </div>

      {/* Edit panel */}
      {editing && (
        <div style={{ padding: '8px 9px', borderTop: '1px solid var(--border)', background: 'var(--paper)' }}>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', marginBottom: 3, textTransform: 'uppercase' }}>Replace URL</div>
          <input
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '5px 7px', marginBottom: 6,
              fontFamily: 'Outfit, sans-serif', fontSize: 11, border: '1px solid var(--border)',
              background: 'var(--surf)', color: 'var(--ink)', outline: 'none',
            }}
            placeholder="https://..."
          />
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', marginBottom: 3, textTransform: 'uppercase' }}>Caption</div>
          <input
            value={caption}
            onChange={e => setCaption(e.target.value)}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '5px 7px', marginBottom: 8,
              fontFamily: 'Outfit, sans-serif', fontSize: 11, border: '1px solid var(--border)',
              background: 'var(--surf)', color: 'var(--ink)', outline: 'none',
            }}
            placeholder="Optional caption…"
          />
          <button
            onClick={() => {
              onUpdateMeta(img.url, { caption })
              if (newUrl !== img.url) onReplace(img.url, newUrl)
              setEditing(false)
              setBroken(false)
            }}
            style={{
              width: '100%', background: 'var(--ink)', color: 'var(--surf)', border: 'none',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8, padding: '6px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

const SOURCE_FILTERS = [
  { id: '',               label: 'All'       },
  { id: 'place-hero',     label: 'Hero'      },
  { id: 'place-gallery',  label: 'Gallery'   },
  { id: 'itinerary',      label: 'Itinerary' },
]

export default function AdminMedia() {
  const [mediaMeta,    setMediaMeta_]   = useState(() => getAllMedia())
  const [sourceFilter, setSourceFilter] = useState('')
  const [query,        setQuery]        = useState('')
  const [saved,        setSaved]        = useState(false)

  const allImages = useMemo(() => collectAllImages(), [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return allImages.filter(img => {
      const matchSrc = !sourceFilter || img.source === sourceFilter
      const matchQ   = !q || img.label.toLowerCase().includes(q) || img.url.toLowerCase().includes(q)
      return matchSrc && matchQ
    })
  }, [allImages, sourceFilter, query])


  const handleUpdateMeta = (url, data) => {
    setMediaMeta(url, { ...mediaMeta[url], ...data })
    setMediaMeta_(getAllMedia())
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const handleReplace = (oldUrl, newUrl) => {
    // In a full implementation, this would update the CMS media map
    // so the old URL redirects to the new URL
    setMediaMeta(oldUrl, { ...mediaMeta[oldUrl], replacedBy: newUrl })
    setMediaMeta_(getAllMedia())
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1.5px solid var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 4 }}>
            Media Library
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
            {allImages.length} Images
          </div>
        </div>
        {saved && <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#2e7d32' }}>✓ Saved</span>}
      </div>

      {/* Filters */}
      <div style={{
        padding: '10px 24px', borderBottom: '1px solid var(--border)',
        display: 'flex', gap: 8, background: 'var(--paper)', alignItems: 'center',
      }}>
        {SOURCE_FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setSourceFilter(f.id)}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
              background: sourceFilter === f.id ? 'var(--ink)' : 'none',
              color: sourceFilter === f.id ? 'var(--surf)' : 'var(--ink4)',
              border: `1px solid ${sourceFilter === f.id ? 'var(--ink)' : 'var(--border)'}`,
              padding: '4px 10px', cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}

        <div style={{ width: 1, height: 20, background: 'var(--border)' }} />

        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name or URL…"
          style={{
            flex: 1, padding: '5px 10px',
            fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)',
            background: 'var(--surf)', border: '1px solid var(--border)', outline: 'none',
          }}
        />

        <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)' }}>
          {filtered.length} shown
        </span>
      </div>

      {/* Grid */}
      <div style={{
        padding: '16px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 1, background: 'var(--border)',
      }}>
        {filtered.map(img => (
          <ImageCard
            key={img.url}
            img={img}
            meta={mediaMeta[img.url]}
            onUpdateMeta={handleUpdateMeta}
            onReplace={handleReplace}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)' }}>
          No images match the current filter.
        </div>
      )}
    </div>
  )
}
