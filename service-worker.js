const cacheName = 'my-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        // resources to be cached during installation
        '/',
        '/style.css',
        '/index.html',
        '/script.js',
      ]);
    })
  );
});

const responseFromCache = async (url) => {
  console.debug('responseFromCache');
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(url);

  if (!cachedResponse) {
    console.debug('No cached response');
    return;
  }

  return cachedResponse;
};

const responseFromNetwork = async (request) => {
  console.debug('responseFromNetwork');
  const networkResponse = await fetch(request);
  const cache = await caches.open(cacheName);
  cache.put(request, networkResponse.clone());
  return networkResponse;
};

const assetsExtensions = [
  '.css',
  '.js',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.json',
  '.woff2',
  '.woff',
  '.ttf',
  '.otf',
  '.eot',
];

const shouldCacheRequest = (request) => {
  if (request.method === 'GET') return true;

  if (assetsExtensions.some((ext) => request.url.endsWith(ext))) return true;

  return false;
};

self.addEventListener('fetch', (event) => {
  console.debug(
    'shouldCacheRequest(event.request)',
    shouldCacheRequest(event.request)
  );
  if (shouldCacheRequest(event.request)) {
    event.respondWith(
      responseFromCache(event.request.url) || responseFromNetwork(event.request)
    );
  } else {
    return;
  }
});
