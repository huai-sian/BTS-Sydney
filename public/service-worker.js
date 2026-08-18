const CACHE_NAME = 'bts-sydney-v1'
const APP_SHELL = ['/', '/index.html', '/manifest.webmanifest', '/icons/icon.svg', '/icons/icon-192.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)
  if (url.origin === 'https://api.open-meteo.com') {
    event.respondWith(networkFirst(event.request))
    return
  }

  event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached

  try {
    const response = await fetch(request)
    const cache = await caches.open(CACHE_NAME)
    cache.put(request, response.clone())
    return response
  } catch (error) {
    if (request.mode === 'navigate') return caches.match('/')
    throw error
  }
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME)

  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) return cached
    throw error
  }
}
