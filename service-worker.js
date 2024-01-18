// ** cache name **
const cacheName = 'my-cache-v1';

// ** send message to client - just for loggin purposes **
const sendMessageToClient = (message) => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'sw-fetch',
        message,
      });
    });
  });
};

// ** install event and first cached resources **
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

// ** utility static data **
const offlineResponse = new Response('You are offline', {
  status: 200,
  statusText: 'OK',
  headers: new Headers({
    'Content-Type': 'text/html',
  }),
});

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

// ** utility basic functions **
const cacheRequest = async (request, response) => {
  const cache = await caches.open(cacheName);

  cache.put(request, response.clone());
};

const shouldCacheRequest = (request) => {
  if (request.method === 'GET') return true;

  if (assetsExtensions.some((ext) => request.url.endsWith(ext))) return true;

  return false;
};

const responseFromCache = async (url) => {
  console.debug('trying responseFromCache');
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(url);

  if (!cachedResponse) {
    console.debug('No cached response');
    return;
  }

  console.debug('cached response found');
  return cachedResponse;
};

const responseFromNetwork = async (request) => {
  console.debug('trying responseFromNetwork');

  try {
    const networkResponse = await fetch(request);

    console.debug('network response found');

    return networkResponse;
  } catch (error) {
    console.debug('No network response');
    return;
  }
};

// ** cache strategies - the fun part **

const cacheOnly = async (event) => {
  event.respondWith(await responseFromCache(event.request.url));
};

const networkOnly = async (event) => {
  event.respondWith(await responseFromNetwork(event.request));
};

const cacheFirstFallingBackToNetwork = async (event) => {
  event.respondWith(
    (async () => {
      const cachedResponse = await responseFromCache(event.request.url);

      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const networkResponse = await responseFromNetwork(event.request);

        await cacheRequest(event.request, networkResponse);

        return networkResponse;
      } catch (error) {
        return offlineResponse;
      }
    })()
  );
};

const networkFirstFallingBackToCache = async (event) => {
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await responseFromNetwork(event.request);

        if (!networkResponse) {
          return offlineResponse;
        }

        await cacheRequest(event.request, networkResponse);

        return networkResponse;
      } catch (error) {
        const cachedResponse = await responseFromCache(event.request.url);

        if (cachedResponse) {
          return cachedResponse;
        }

        throw error;
      }
    })()
  );
};

const staleWhileRevalidate = async (event) => {
  event.respondWith(
    (async () => {
      const cachedResponse = await responseFromCache(event.request.url);

      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const networkResponse = await responseFromNetwork(event.request);

        if (!networkResponse) {
          return offlineResponse;
        }

        await cacheRequest(event.request, networkResponse);
        return networkResponse;
      } catch (error) {
        return offlineResponse;
      }
    })()
  );
};

// ** fetch event using cache strategies - this is where the magic happens **

self.addEventListener('fetch', async (event) => {
  sendMessageToClient({
    url: event.request.url,
    method: event.request.method,
  });

  if (shouldCacheRequest(event.request)) {
    cacheFirstFallingBackToNetwork(event);
  } else {
    return networkOnly(event);
  }
});
