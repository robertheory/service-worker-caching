// Arquivo: service-worker.js

const cacheName = 'my-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([
        // Lista de recursos a serem cacheados durante a instalação
        '/',
        '/index.html',
        '/script.js',
        // Adicione mais recursos conforme necessário
      ]);
    })
  );
});

const responseFromCache = async (url) => {
  console.log('responseFromCache');
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(url);

  if (!cachedResponse) {
    console.log('No cached response');
    return;
  }

  return cachedResponse;
};

const responseFromNetwork = async (request) => {
  console.log('responseFromNetwork');
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
  console.log(
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
