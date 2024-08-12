// In public/service-worker.js

// Set a name for the current cache
var cacheName = 'v1';

// Default files to always cache
var cacheFiles = [
  '/',
  '/index.html',
  '/offline.html',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Installed');

  // e.waitUntil Delays the event until the Promise is resolved
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching cacheFiles');
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (cachedResponse) {
      // Cache hit - return the response from the cached version
      if (cachedResponse) {
        return cachedResponse;
      }

      // Cache miss - return the request from the network
      return fetch(e.request).catch(() => caches.match('/offline.html'));
    })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activated');

  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (thisCacheName) {
          if (thisCacheName !== cacheName) {
            console.log('[ServiceWorker] Removing Cached Files from', thisCacheName);
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});
