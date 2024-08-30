const CACHE_NAME = 'spa-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/styles/main.css',
    '/site.pages.json',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});