const CACHE_NAME = 'healthylife-v1';
const BASE = '/healthy-website/v2';

const PRECACHE = [
  `${BASE}/index.html`,
  `${BASE}/calculator.html`,
  `${BASE}/meal-plans.html`,
  `${BASE}/exercise.html`,
  `${BASE}/tips.html`,
  `${BASE}/articles.html`,
  `${BASE}/login.html`,
  `${BASE}/style.css`,
  `${BASE}/ar/index.html`,
  `${BASE}/ar/calculator.html`,
  `${BASE}/ar/meal-plans.html`,
  `${BASE}/ar/exercise.html`,
  `${BASE}/ar/tips.html`,
  `${BASE}/ar/articles.html`,
  `${BASE}/ar/login.html`,
  `${BASE}/ar/style-rtl.css`,
  `${BASE}/manifest.json`,
  `${BASE}/icons/icon-192x192.png`,
  `${BASE}/icons/icon-512x512.png`
];

const FONT_CACHE = 'healthylife-fonts-v1';
const IMG_CACHE  = 'healthylife-images-v1';

// Install: precache the app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME && k !== FONT_CACHE && k !== IMG_CACHE)
            .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: strategy per request type
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Google Fonts: cache-first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONT_CACHE).then(c =>
        c.match(e.request).then(cached => {
          if (cached) return cached;
          return fetch(e.request).then(res => { c.put(e.request, res.clone()); return res; });
        })
      )
    );
    return;
  }

  // Unsplash images: network-first with cache fallback
  if (url.hostname === 'images.unsplash.com') {
    e.respondWith(
      caches.open(IMG_CACHE).then(c =>
        fetch(e.request)
          .then(res => { c.put(e.request, res.clone()); return res; })
          .catch(() => c.match(e.request).then(cached =>
            cached || new Response('', { status: 408 })
          ))
      )
    );
    return;
  }

  // Local assets: stale-while-revalidate
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fresh = fetch(e.request).then(res => {
          if (res.ok) caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone()));
          return res;
        }).catch(() => {});
        return cached || fresh;
      })
    );
  }
});
