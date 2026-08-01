const CACHE = 'smt1-v4';
const SHELL = [
  '.',
  'index.html',
  'manifest.webmanifest',
  'icon.svg',
  'vendor/leaflet/leaflet.css',
  'vendor/leaflet/leaflet.js',
  'vendor/mqtt/mqtt.min.js',
  'vendor/fonts/press-start-2p-latin-400-normal.woff2',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // le tile della mappa restano sempre di rete: la mappa deve essere reale
  if (url.hostname.includes('cartocdn') || url.hostname.includes('openstreetmap')) return;
  // pagina e navigazioni: prima la rete (così gli aggiornamenti arrivano subito),
  // cache solo come ripiego offline
  if (e.request.mode === 'navigate' || url.pathname.endsWith('index.html')) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request).then((hit) => hit || caches.match('index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request))
  );
});
