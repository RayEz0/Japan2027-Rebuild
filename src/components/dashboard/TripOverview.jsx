import { useTravel } from '../../context/TravelContext'

function Row({ label, value, valueStyle }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      padding: '9px 0', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
        color: 'var(--ink3)', letterSpacing: '0.5px', textTransform: 'uppercase',
        flexShrink: 0, marginRight: 12, paddingTop: 2,
      }}>{label}</div>
      <div style={{
        fontFamily: 'Outfit, sans-serif', fontSize: 12.5, fontWeight: 500,
        color: 'var(--ink)', textAlign: 'right', lineHeight: 1.4,
        ...valueStyle,
      }}>{value}</div>
    </div>
  )
}

export default function TripOverview() {
  const { primaryTrip: trip } = useTravel()

  const cityRoute = trip?.route?.join(' → ') || 'TBD'
  const accomTypes = trip?.accommodation?.types?.join(' + ') || 'TBD'
  const rateMin = trip?.accommodation?.rateMin
  const rateMax = trip?.accommodation?.rateMax
  const currency = trip?.savingsCurrency || '₹'

  return (
    <div style={{
      padding: '28px 28px',
      borderLeft: '1px solid var(--border)',
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        color: 'var(--ink3)', fontWeight: 500, marginBottom: 16,
      }}>
        Trip Overview
      </div>

      <Row label="Duration"  value={trip?.duration > 0 ? `${trip.duration} Days` : 'TBD'} />
      <Row label="Style"     value={trip?.style || 'Solo'} />
      <Row
        label="Route"
        value={cityRoute}
        valueStyle={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10 }}
      />
      <Row label="Departure" value={trip?.departureCity || '—'} />
      <Row label="Return"    value={trip?.exitCity || '—'} />

      {/* Accommodation */}
      <div style={{ padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
          color: 'var(--ink3)', letterSpacing: '0.5px', textTransform: 'uppercase',
          marginBottom: 5,
        }}>Accommodation</div>
        <div style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink2)',
          lineHeight: 1.5,
        }}>
          {accomTypes}
        </div>
        {rateMin > 0 && (
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: 'var(--ink3)', marginTop: 2,
          }}>
            {currency}{rateMin.toLocaleString('en-IN')}–{currency}{rateMax.toLocaleString('en-IN')} / night
          </div>
        )}
      </div>

      {/* Camera Plan */}
      {trip?.camera?.devices?.length > 0 ? (
        <div style={{ padding: '9px 0' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            color: 'var(--ink3)', letterSpacing: '0.5px', textTransform: 'uppercase',
            marginBottom: 5,
          }}>Camera Plan</div>
          {trip.camera.devices.map(d => (
            <div key={d.name} style={{
              fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'var(--ink2)',
              lineHeight: 1.4,
            }}>
              {d.name}
            </div>
          ))}
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
            color: 'var(--ink3)', marginTop: 3,
          }}>
            {trip.camera.days > 0 ? `${trip.camera.days}-day ` : ''}{trip.camera.strategy}
            {trip.camera.provider ? ` · ${trip.camera.provider}` : ''}
          </div>
        </div>
      ) : (
        <div style={{ padding: '9px 0' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: 8.5,
            color: 'var(--ink3)', letterSpacing: '0.5px', textTransform: 'uppercase',
            marginBottom: 5,
          }}>Camera Plan</div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, color: 'var(--ink4)' }}>
            Not configured yet
          </div>
        </div>
      )}
    </div>
  )
}
