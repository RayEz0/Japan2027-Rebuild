import { useParams, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ARCS } from '../data/worldTour/arcs'
import { ARC_CONTENT } from '../data/arcs/index'
import { TRIPS } from '../data/trips/index'
import ArcTransition from '../components/arc/ArcTransition'

const ArcDashboard = lazy(() => import('./ArcDashboard'))

export default function ArcPage() {
  const { year }    = useParams()
  const arc         = ARCS.find(a => a.year === Number(year))
  const content     = ARC_CONTENT[Number(year)]
  const primaryTrip = arc ? (TRIPS[arc.tripIds?.[0]] || null) : null

  if (!arc) {
    return (
      <div style={{ padding: '52px', fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--ink3)' }}>
        Arc not found.{' '}
        <Link to="/world-tour" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>← World Tour</Link>
      </div>
    )
  }

  return (
    <>
      <ArcTransition arc={arc} primaryTrip={primaryTrip} key={arc.year} />
      <Suspense fallback={null}>
        <ArcDashboard arc={arc} content={content} />
      </Suspense>
    </>
  )
}
