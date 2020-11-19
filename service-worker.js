const CACHE_NAME = "Hydrogen-v1";
var urlsToCache = [
  "/",
  "/navigasi.html",
  "/index.html",
  "/pages/overview.html",
  "/pages/properties.html",
  "/pages/grid.html",
  "/pages/prevelance.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/navigasi.js",
  "/images/earth.png",
  "/images/energy.gif",
  "/images/Grid.png",
  "/images/grid2.png",
  "/images/human.png",
  "/images/hydrogen.png",
  "/images/hydrogencolor.jpg",
  "/images/meteorite.jpg",
  "/images/oceans.png",
  "/images/spectrum.png",
  "/images/sun.png",
  "/images/universe.png",
  "manifest.json"
];
 
self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }

          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
