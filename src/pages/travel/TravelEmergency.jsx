import { useState } from 'react'
import { useTravel } from '../../context/TravelContext'

// ── Japan emergency data ──────────────────────────────────────────────────────
// Curated, structured content — kept for the one trip it was authored for.
// Other trips fall back to the generic practicalInfo.emergency string that
// exists for every arc (see GenericEmergency below) rather than showing
// Japan's numbers under a different country, which would be actively wrong.

const JAPAN = {
  country: 'Japan',
  numbers: [
    { label: 'Police',         number: '110',          icon: '🚓', note: 'Emergencies, theft, accidents' },
    { label: 'Fire / Ambulance', number: '119',        icon: '🚑', note: 'Medical emergencies, fire' },
    { label: 'Coast Guard',    number: '118',          icon: '🚢', note: 'Maritime emergencies' },
    { label: 'Tourist Helpline', number: '0570-01-9010', icon: '🗺', note: 'Japan Tourism Agency · 24/7' },
    { label: 'Japan Helpline', number: '0570-000-911', icon: '☎️',  note: 'English assistance · 24/7' },
  ],
  embassy: {
    name:    'Embassy of India, Tokyo',
    phone:   '+81-3-3262-2391',
    address: '2-2-11 Kudan Minami, Chiyoda-ku, Tokyo 102-0074',
    hours:   'Mon–Fri 9:00 AM – 5:30 PM',
    emergency: 'Call main number for emergencies after hours',
  },
  hospitals: [
    { name: "St Luke's International Hospital",   city: 'Tokyo', phone: '+81-3-5550-7166', english: true, note: '24h ER · International clinic' },
    { name: 'Tokyo Medical & Surgical Clinic',     city: 'Tokyo', phone: '+81-3-3436-3028', english: true, note: 'Daytime English clinic' },
    { name: 'Kameda Medical Center',               city: 'Tokyo', phone: '+81-4-7099-1111', english: true, note: 'Comprehensive international care' },
    { name: 'Kyoto City Hospital',                 city: 'Kyoto', phone: '+81-75-311-5311', english: false, note: 'Nearest major hospital in Kyoto' },
    { name: 'Osaka Red Cross Hospital',            city: 'Osaka', phone: '+81-6-6774-5111', english: false, note: 'Large trauma centre, Osaka' },
  ],
  medicalNotes: [
    'Japan has excellent healthcare but can require upfront payment.',
    'Carry your travel insurance card at all times.',
    'Show insurance card at International Patient desk.',
    'Google Translate can help communicate symptoms.',
    'Common OTC meds available at any combini (convenience store).',
    'Carry a copy of your passport and visa at all times.',
  ],
  insurance: {
    reminder: 'Record your policy number and emergency number before you fly.',
    apps: ['Travel Guard', 'Cover-More', 'World Nomads'],
    emergencyLine: 'Check your insurance policy card for the 24/7 number.',
  },
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CallButton({ number }) {
  return (
    <a
      href={`tel:${number.replace(/\s/g, '')}`}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, flex: 1,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
        background: 'var(--ink)', color: 'var(--surf)',
        padding: '8px', textDecoration: 'none',
        letterSpacing: '0.3px',
      }}
    >
      📞 {number}
    </a>
  )
}

function EmergencyNumber({ item }) {
  return (
    <div style={{
      border: '1px solid var(--border)', marginBottom: 4,
      background: 'var(--surf)', padding: '10px 12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{item.icon}</span>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>
              {item.label}
            </div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 2 }}>
              {item.note}
            </div>
          </div>
        </div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: '#b5451b' }}>
          {item.number}
        </div>
      </div>
      <CallButton number={item.number} label={item.label} />
    </div>
  )
}

function HospitalRow({ hospital }) {
  return (
    <div style={{
      border: '1px solid var(--border)', marginBottom: 4,
      background: 'var(--surf)', padding: '10px 12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>
            {hospital.name}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5, color: 'var(--ink4)', marginTop: 2 }}>
            {hospital.city} · {hospital.note}
          </div>
          {hospital.english && (
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, background: '#e8f5e9', color: '#2e7d32', padding: '1px 6px', display: 'inline-block', marginTop: 4 }}>
              ENGLISH SPOKEN
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        <a href={`tel:${hospital.phone}`} style={{
          flex: 1, fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
          background: 'var(--ink)', color: 'var(--surf)', textDecoration: 'none',
          padding: '7px', textAlign: 'center',
        }}>
          📞 {hospital.phone}
        </a>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(hospital.name + ' ' + hospital.city)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            border: '1px solid var(--border)', color: 'var(--ink4)',
            padding: '7px 12px', textDecoration: 'none',
          }}
        >
          ↗
        </a>
      </div>
    </div>
  )
}

function Section({ title, accent, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 7.5,
        color: accent || 'var(--ink4)', letterSpacing: '1px', textTransform: 'uppercase',
        marginBottom: 10, paddingBottom: 4,
        borderBottom: `2px solid ${accent || 'var(--border)'}`,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

// ── Generic emergency card (every other trip) ─────────────────────────────────
// Built from ARC_CONTENT.practicalInfo.emergency, which exists for every arc,
// plus the arc's own currencies/countries — never invents numbers that
// weren't authored for this specific trip.

function GenericEmergency({ tripTitle, emergencyLine, countries }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{
        background: '#b5451b', color: '#fff',
        padding: '14px 16px', marginBottom: 18, textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' }}>
          Emergency Hub
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, opacity: 0.75, marginTop: 4 }}>
          {(countries.join(' · ') || tripTitle).toUpperCase()}
        </div>
      </div>

      <Section title="Emergency Numbers" accent="#b5451b">
        <div style={{
          border: '1px solid var(--border)', background: 'var(--surf)',
          padding: '12px 14px', fontFamily: 'Outfit, sans-serif', fontSize: 13,
          color: 'var(--ink)', lineHeight: 1.7,
        }}>
          {emergencyLine || 'No emergency numbers recorded for this trip yet — check your travel insurance provider or search "emergency number" for your destination before you go.'}
        </div>
      </Section>

      <Section title="Embassy / Consulate">
        <div style={{ border: '1px solid var(--border)', padding: '12px 14px', background: 'var(--surf)', fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink4)', lineHeight: 1.8 }}>
          No embassy details recorded for this trip yet. Look up the nearest embassy/consulate for your destination before departure.
        </div>
      </Section>

      <Section title="Hospitals">
        <div style={{ border: '1px solid var(--border)', padding: '12px 14px', background: 'var(--surf)', fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: 'var(--ink4)', lineHeight: 1.8 }}>
          No hospital list recorded for this trip yet.
        </div>
      </Section>

      <Section title="Insurance">
        <div style={{
          border: '1px solid #C9A227', padding: '12px 14px', background: '#FFFBEB',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: '#92690a',
          lineHeight: 1.8,
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Before you need it:</div>
          <div>Record your policy number and emergency number before you fly.</div>
        </div>
      </Section>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function TravelEmergency() {
  const { activeTrip, content } = useTravel()
  const [city, setCity] = useState('Tokyo')
  const cities          = [...new Set(JAPAN.hospitals.map(h => h.city))]
  const localHospitals  = JAPAN.hospitals.filter(h => h.city === city)

  if (activeTrip?.id !== 'japan2027') {
    return (
      <GenericEmergency
        tripTitle={activeTrip?.title || 'This trip'}
        emergencyLine={content?.practicalInfo?.emergency}
        countries={(content?.currencies || []).map(c => c.country)}
      />
    )
  }

  return (
    <div style={{ padding: 16 }}>

      {/* SOS header */}
      <div style={{
        background: '#b5451b', color: '#fff',
        padding: '14px 16px', marginBottom: 18, textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px' }}>
          Emergency Hub
        </div>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, opacity: 0.75, marginTop: 4 }}>
          JAPAN · OFFLINE AVAILABLE
        </div>
      </div>

      {/* Primary emergency numbers */}
      <Section title="Emergency Numbers" accent="#b5451b">
        {JAPAN.numbers.map(n => <EmergencyNumber key={n.number} item={n} />)}
      </Section>

      {/* Indian Embassy */}
      <Section title="Indian Embassy — Tokyo">
        <div style={{ border: '1px solid var(--border)', padding: '12px 14px', background: 'var(--surf)', marginBottom: 8 }}>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
            {JAPAN.embassy.name}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: 'var(--ink4)', lineHeight: 1.8, marginBottom: 8 }}>
            <div>{JAPAN.embassy.address}</div>
            <div>{JAPAN.embassy.hours}</div>
            <div>{JAPAN.embassy.emergency}</div>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            <a href={`tel:${JAPAN.embassy.phone}`} style={{
              flex: 1, fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
              background: 'var(--ink)', color: 'var(--surf)', textDecoration: 'none',
              padding: '8px', textAlign: 'center',
            }}>
              📞 {JAPAN.embassy.phone}
            </a>
          </div>
        </div>
      </Section>

      {/* Hospitals — by city */}
      <Section title="Hospitals">
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {cities.map(c => (
            <button
              key={c}
              onClick={() => setCity(c)}
              style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 8,
                background: city === c ? 'var(--ink)' : 'none',
                color: city === c ? 'var(--surf)' : 'var(--ink4)',
                border: `1px solid ${city === c ? 'var(--ink)' : 'var(--border)'}`,
                padding: '5px 12px', cursor: 'pointer',
              }}
            >
              {c}
            </button>
          ))}
        </div>
        {localHospitals.map(h => <HospitalRow key={h.name} hospital={h} />)}
      </Section>

      {/* Medical notes */}
      <Section title="Medical Notes">
        <div style={{ border: '1px solid var(--border)', padding: '12px 14px', background: 'var(--surf)' }}>
          {JAPAN.medicalNotes.map((note, i) => (
            <div key={i} style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
              color: 'var(--ink3)', lineHeight: 1, padding: '5px 0',
              borderBottom: i < JAPAN.medicalNotes.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              · {note}
            </div>
          ))}
        </div>
      </Section>

      {/* Insurance reminder */}
      <Section title="Insurance">
        <div style={{
          border: '1px solid #C9A227', padding: '12px 14px', background: '#FFFBEB',
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5, color: '#92690a',
          lineHeight: 1.8,
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Before you need it:</div>
          <div>{JAPAN.insurance.reminder}</div>
          <div style={{ marginTop: 6 }}>Emergency line: {JAPAN.insurance.emergencyLine}</div>
        </div>
      </Section>

    </div>
  )
}
