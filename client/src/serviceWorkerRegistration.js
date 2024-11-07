const CACHE_NAME = 'eliteGPA-cache-v1';  // Versioned cache name

// List of files to cache during the install phase
const urlsToCache = [
  "/offline.html",    // Offline fallback page
  "/main.js",         // Main JS bundle
  "/index.html",      // Main index file
  // Add any other files you want to cache initially
];

self.addEventListener("install", (event) => {
  // Cache specified assets during install
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);  // Delete old caches
          }
        })
      );
    })
  );
});

// Fetch event to handle online/offline scenarios
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache fetched response dynamically for future offline use
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // If network fails, attempt to serve from cache or fallback to offline page
        return caches.match(event.request).then((response) => {
          return response || caches.match("/offline.html");
        });
      })
  );
});
