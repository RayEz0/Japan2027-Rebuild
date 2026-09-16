import { useState, useMemo } from 'react'
import { allPlaces }            from '../../data/places/index'
import { DAYS }                 from '../../data/trips/japan2027/itinerary'
import { ARCS }                 from '../../data/worldTour/arcs'
import { useJournal }           from '../../context/JournalContext'
import { usePlaceStatus }       from '../../hooks/usePlaceStatus'
import { ITINERARY_NAME_MAP }   from '../../data/places/index'
import {
  exportAll, importAll, clearAll, runValidation,
  getAllPlaceOverrides, getMeta,
} from '../../services/cms/index'

// ── Helpers ───────────────────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase',
        marginBottom: 12,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function ActionButton({ onClick, children, danger, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
        letterSpacing: '0.4px', textTransform: 'uppercase',
        background: danger ? '#b5451b' : 'var(--ink)',
        color: 'var(--surf)', border: 'none',
        padding: '9px 18px', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  )
}

// ── Validation report ─────────────────────────────────────────────────────────

const SEV_COLORS = { error: '#b5451b', warn: '#C9954C', info: 'var(--ink3)' }

function ValidationReport({ issues }) {
  const [filter, setFilter] = useState('')

  const counts = {
    error: issues.filter(i => i.severity === 'error').length,
    warn:  issues.filter(i => i.severity === 'warn').length,
    info:  issues.filter(i => i.severity === 'info').length,
  }

  const visible = filter ? issues.filter(i => i.severity === filter) : issues

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        {Object.entries(counts).map(([sev, n]) => (
          <button
            key={sev}
            onClick={() => setFilter(f => f === sev ? '' : sev)}
            style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
              color: filter === sev ? 'var(--surf)' : SEV_COLORS[sev],
              background: filter === sev ? SEV_COLORS[sev] : 'none',
              border: `1px solid ${SEV_COLORS[sev]}`,
              padding: '4px 12px', cursor: 'pointer',
            }}
          >
            {n} {sev}
          </button>
        ))}
        {issues.length === 0 && (
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: '#2e7d32' }}>
            ✓ No issues found
          </span>
        )}
      </div>

      {/* Table */}
      {visible.length > 0 && (
        <div style={{ border: '1px solid var(--border)', maxHeight: 320, overflowY: 'auto' }}>
          {visible.map((issue, i) => (
            <div
              key={i}
              style={{
                display: 'flex', gap: 12, alignItems: 'center',
                padding: '7px 12px', borderBottom: '1px solid var(--border)',
                background: i % 2 === 0 ? 'var(--surf)' : 'var(--paper)',
              }}
            >
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
                color: SEV_COLORS[issue.severity], minWidth: 36, textTransform: 'uppercase',
              }}>
                {issue.severity}
              </span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', minWidth: 100 }}>
                {issue.type}
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink)', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {issue.label || issue.placeId}
              </span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)' }}>
                {issue.msg}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminSystem() {
  const { entries }         = useJournal()
  const { totals }          = usePlaceStatus()
  const [flash,   setFlash] = useState(null)
  const [importFile, setImportFile] = useState(null)

  const meta      = getMeta()
  const overrides = getAllPlaceOverrides()

  const issues = useMemo(() => runValidation(allPlaces, DAYS, ITINERARY_NAME_MAP), [])

  const showFlash = (msg, type = 'success') => {
    setFlash({ msg, type })
    setTimeout(() => setFlash(null), 2500)
  }

  // ── Export handlers ───────────────────────────────────────────────────────

  const handleExportCMS = () => {
    const data = exportAll()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `wtcms-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showFlash('CMS backup exported.')
  }

  const handleExportPlaces = () => {
    const data = allPlaces.map(p => {
      const o = overrides[p.id] || {}
      return { ...p, ...o }
    })
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `places-merged-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showFlash('Merged places exported.')
  }

  const handleExportFull = () => {
    const data = {
      exportedAt:  new Date().toISOString(),
      version:     1,
      cms:         exportAll(),
      journalEntries: entries,
      stats: {
        places:    allPlaces.length,
        overrides: Object.keys(overrides).length,
        visited:   totals.visited,
        journal:   entries.length,
        arcs:      ARCS.length,
      },
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `worldtour-full-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showFlash('Full backup exported.')
  }

  // ── Import handler ────────────────────────────────────────────────────────

  const handleImport = () => {
    if (!importFile) return
    if (!window.confirm('Import will replace ALL existing CMS overrides. This cannot be undone. Continue?')) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        // Accept either a raw CMS dump or a full backup with cms key
        const cms = data.cms || data
        importAll(cms)
        showFlash('CMS data imported successfully.')
        setImportFile(null)
      } catch {
        showFlash('Failed to parse JSON file.', 'error')
      }
    }
    reader.readAsText(importFile)
  }

  const handleClear = () => {
    if (!window.confirm('Clear ALL CMS overrides? This cannot be undone.')) return
    clearAll()
    showFlash('CMS data cleared.')
  }

  // ── System stats ──────────────────────────────────────────────────────────

  const noCoords = allPlaces.filter(p => !p.coordinates?.lat).length
  const noImage  = allPlaces.filter(p => !p.heroImage && !p.image).length
  const noCity   = allPlaces.filter(p => !p.city).length

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '16px 28px', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 4 }}>
          Admin Studio — System
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
          System Health
        </div>
        {meta.lastExport && (
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginTop: 4 }}>
            Last export: {meta.lastExport.slice(0, 19).replace('T', ' ')}
          </div>
        )}
      </div>

      {/* Flash */}
      {flash && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          background: flash.type === 'error' ? '#b5451b' : '#2e7d32',
          color: '#fff', padding: '9px 20px',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        }}>
          {flash.type === 'error' ? '✕ ' : '✓ '}{flash.msg}
        </div>
      )}

      <div style={{ padding: '24px 28px' }}>

        {/* ── Health stats ── */}
        <Section title="Database Health">
          <div style={{ display: 'flex', gap: 1, background: 'var(--border)', flexWrap: 'wrap', marginBottom: 0 }}>
            {[
              { label: 'Total Places',    value: allPlaces.length },
              { label: 'Missing Coords',  value: noCoords,  accent: noCoords  > 0 ? '#C9954C' : undefined },
              { label: 'Missing Image',   value: noImage,   accent: noImage   > 0 ? '#C9954C' : undefined },
              { label: 'Missing City',    value: noCity,    accent: noCity    > 0 ? '#C9954C' : undefined },
              { label: 'CMS Overrides',   value: Object.keys(overrides).length, accent: '#2e7d32' },
              { label: 'Total Issues',    value: issues.length, accent: issues.length > 0 ? '#C9954C' : '#2e7d32' },
            ].map(s => (
              <div key={s.label} style={{ flex: '1 1 120px', padding: '12px 16px', background: 'var(--surf)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 700, color: s.accent || 'var(--ink)', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--ink4)', marginTop: 5, textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Validation ── */}
        <Section title={`Content Validation — ${issues.length} issues`}>
          <ValidationReport issues={issues} />
        </Section>

        {/* ── Export ── */}
        <Section title="Export">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
            <ActionButton onClick={handleExportCMS}>
              ↓ Export CMS Backup
            </ActionButton>
            <ActionButton onClick={handleExportPlaces}>
              ↓ Export Merged Places
            </ActionButton>
            <ActionButton onClick={handleExportFull}>
              ↓ Full Backup (Journal + CMS)
            </ActionButton>
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', lineHeight: 1.7 }}>
            CMS Backup — Place overrides, itinerary edits, booking updates, budget adjustments.<br />
            Merged Places — Static JS data merged with all CMS overrides (ready to replace JS files).<br />
            Full Backup — Everything above plus journal entries and user stats.
          </div>
        </Section>

        {/* ── Import ── */}
        <Section title="Import">
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="file"
              accept=".json"
              onChange={e => setImportFile(e.target.files[0])}
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                color: 'var(--ink)', cursor: 'pointer',
              }}
            />
            <ActionButton onClick={handleImport} disabled={!importFile}>
              ↑ Import CMS JSON
            </ActionButton>
          </div>
          {importFile && (
            <div style={{ marginTop: 8, fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)' }}>
              File: {importFile.name} ({(importFile.size / 1024).toFixed(1)} KB)
            </div>
          )}
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', marginTop: 8, lineHeight: 1.7 }}>
            Accepts: CMS backup JSON (wtcms_v1 format) or full backup JSON with cms key.<br />
            Existing CMS data will be replaced. Static JS files are never modified.
          </div>
        </Section>

        {/* ── Versioning / Rollback ── */}
        <Section title="Versioning">
          <div style={{
            border: '1px solid var(--border)', padding: '12px 16px', background: 'var(--paper)',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink3)',
            lineHeight: 1.8,
          }}>
            <div style={{ color: 'var(--ink)', fontWeight: 600, marginBottom: 6 }}>Current State</div>
            <div>CMS Version: {meta.version || 1}</div>
            <div>Place overrides: {Object.keys(overrides).length}</div>
            <div>Last import: {meta.importedAt?.slice(0, 19).replace('T', ' ') || '—'}</div>
            <div>Last export: {meta.lastExport?.slice(0, 19).replace('T', ' ')  || '—'}</div>
          </div>
          <div style={{ marginTop: 10, fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', lineHeight: 1.7 }}>
            To roll back: export a backup before making changes, then import the backup to restore.<br />
            Each place override tracks a <em>_version</em> counter (increments on every save).
          </div>
        </Section>

        {/* ── Danger zone ── */}
        <Section title="Danger Zone">
          <div style={{ border: '1px solid #b5451b', padding: '14px 16px' }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600, color: '#b5451b', marginBottom: 8 }}>
              Clear All CMS Data
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', marginBottom: 12, lineHeight: 1.7 }}>
              Removes all place overrides, itinerary edits, booking updates, and budget adjustments from localStorage.
              The static JavaScript data files are untouched. Export a backup first.
            </div>
            <ActionButton danger onClick={handleClear}>
              ✕ Clear All CMS Data
            </ActionButton>
          </div>
        </Section>

        {/* ── Supabase readiness ── */}
        <Section title="Future: Supabase Migration">
          <div style={{
            border: '1px solid var(--border)', padding: '14px 16px', background: 'var(--paper)',
          }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
              Interface-ready design
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink3)', lineHeight: 1.9 }}>
              All CMS data flows through <code>src/services/cms/index.js</code>.<br />
              To switch to Supabase: replace each function with <code>await supabase.from(…)</code> and make callers async.<br />
              <br />
              Tables to create:<br />
              &nbsp;&nbsp;place_overrides (id, data jsonb, updated_at)<br />
              &nbsp;&nbsp;itinerary_cms (trip_id, days jsonb, updated_at)<br />
              &nbsp;&nbsp;budget_cms (trip_id, items jsonb, updated_at)<br />
              &nbsp;&nbsp;bookings_cms (trip_id, items jsonb, updated_at)<br />
              &nbsp;&nbsp;media_meta (url text pk, caption, notes, updated_at)
            </div>
          </div>
        </Section>

      </div>
    </div>
  )
}
