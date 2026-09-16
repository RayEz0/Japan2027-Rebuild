const OSRM = 'https://router.project-osrm.org/route/v1/driving'
const _cache = new Map()

// Fetch real road geometry from OSRM using waypoints as intermediate stops.
// Returns an array of [lat, lng] pairs, or null on failure.
// Callers should keep their stored waypoints as instant fallback.
export async function fetchRoadRoute(waypoints, label = '') {
  if (!waypoints || waypoints.length < 2) return null

  // OSRM takes lng,lat order
  const coords = waypoints.map(([lat, lng]) => `${Number(lng).toFixed(5)},${Number(lat).toFixed(5)}`).join(';')
  if (_cache.has(coords)) return _cache.get(coords)

  try {
    const res = await fetch(
      `${OSRM}/${coords}?overview=full&geometries=geojson`,
      { signal: AbortSignal.timeout(12000) }
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const json = await res.json()
    if (json.code !== 'Ok' || !json.routes?.[0]?.geometry?.coordinates?.length) {
      throw new Error(`OSRM returned code: ${json.code}`)
    }

    // Convert OSRM [lng, lat] → Leaflet [lat, lng]
    const pts = json.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng])
    _cache.set(coords, pts)
    return pts
  } catch (err) {
    console.warn(`[RouteGeometry] "${label || 'route'}": OSRM failed (${err.message}) — using ${waypoints.length} stored waypoints`)
    return null
  }
}
