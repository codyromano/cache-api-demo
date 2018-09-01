const urlsToCache = [
  '/cache-api-demo',
  '/cache-api-demo/',
  '/cache-api-demo/index.html',
  '/cache-api-demo/demo.css',
  'https://s3-us-west-2.amazonaws.com/codyromano/video/ghostbusters.mp4'
];
const CACHE_NAME = 'cache-api-demo';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .catch(error => console.error(error))
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
