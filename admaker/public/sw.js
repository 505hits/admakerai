/// <reference lib="webworker" />

const CACHE_NAME = 'admaker-v1';
const STATIC_ASSETS = [
    '/',
    '/manifest.json',
];

// Assets to cache on first load
const PRECACHE_ASSETS = [
    // Add critical assets here
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([...STATIC_ASSETS, ...PRECACHE_ASSETS]);
        })
    );
    // Activate immediately
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    // Take control immediately
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip API and auth requests
    if (url.pathname.startsWith('/api/') ||
        url.pathname.startsWith('/auth/') ||
        url.hostname.includes('supabase') ||
        url.hostname.includes('stripe')) {
        return;
    }

    // Cache-first strategy for static assets
    if (
        url.pathname.startsWith('/_next/static/') ||
        url.pathname.startsWith('/images/') ||
        url.pathname.match(/\.(png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2)$/)
    ) {
        event.respondWith(
            caches.match(request).then((cached) => {
                if (cached) return cached;
                return fetch(request).then((response) => {
                    // Clone and cache the response
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, clone);
                    });
                    return response;
                });
            })
        );
        return;
    }

    // Stale-while-revalidate for HTML pages
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(
            caches.match(request).then((cached) => {
                const fetchPromise = fetch(request).then((response) => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, clone);
                    });
                    return response;
                });
                return cached || fetchPromise;
            })
        );
        return;
    }

    // Network-first for external resources (Cloudflare R2 videos)
    if (url.hostname.includes('r2.dev') || url.hostname.includes('unsplash')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache successful responses
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, clone);
                        });
                    }
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }
});

export { };
