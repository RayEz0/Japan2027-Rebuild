/* World Tour — Service Worker v2.0 */
const CACHE   = 'worldtour-v2-0'
const CORE    = ['/', '/index.html', '/travel']

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  const { request } = e
  const url = new URL(request.url)

  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  // Navigation (HTML): network-first, SPA fallback to index.html
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then(res => {
          caches.open(CACHE).then(c => c.put(request, res.clone()))
          return res
        })
        .catch(() => caches.match('/index.html'))
    )
    return
  }

  // Cache-first for JS/CSS bundles, fonts, images
  const isAsset = url.pathname.startsWith('/assets/') ||
                  url.pathname.endsWith('.js')  ||
                  url.pathname.endsWith('.css') ||
                  url.pathname.endsWith('.woff2') ||
                  url.pathname.endsWith('.png') ||
                  url.pathname.endsWith('.jpg') ||
                  url.pathname.endsWith('.svg') ||
                  url.pathname.endsWith('.webp')

  if (isAsset) {
    e.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached
        return fetch(request).then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(request, res.clone()))
          return res
        }).catch(() => new Response('Offline', { status: 503 }))
      })
    )
    return
  }

  // Leaflet tiles: cache-first (for offline map)
  if (url.hostname.endsWith('tile.openstreetmap.org')) {
    e.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached
        return fetch(request).then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(request, res.clone()))
          return res
        }).catch(() => new Response('', { status: 503 }))
      })
    )
    return
  }

  // Everything else: network-first
  e.respondWith(
    fetch(request).catch(() => caches.match(request))
  )
})
