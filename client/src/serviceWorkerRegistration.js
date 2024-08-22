// src/service-worker.js

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("eliteGPA-cache").then((cache) => {
      return cache.addAll(["/offline.html", "/main.js", "/index.html"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || caches.match("/offline.html");
      })
    );
  }
});
