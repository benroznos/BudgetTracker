self.addEventListener('install', event => {
  event.waitUntil(caches.open('data-cache-v1')
    .then(cache => cache.addAll([
      '/',
      '/db.js',
      '/index.js',
      '/style.css',
      '/icons/icon-192x192.png',
      '/icons/icon-512x512.png',
      '/manifest.json'
    ])))
})
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request)
    .catch(err => {
      return caches.match(event.request)
        .then(match => {
          if (match) {
            return match
          } else if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/')
          }
        })
    }))
})