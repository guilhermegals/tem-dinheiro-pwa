var cacheName = 'tem-dinheiro-101';

self.addEventListener('install', function (event) {
    console.log("Worker: Installed")

    caches.open(cacheName).then((cache) => {
        cache.addAll([
            '/',
            '/index.html',
            '/manifest.webmanifest',
            '/style.css',
            '/script.js',
            '/res/img/ic_arrow_back.png',
            '/res/img/icons/favicon.ico',
            '/res/img/icons/android-icon-36x36.png',
            '/res/img/icons/android-icon-48x48.png',
            '/res/img/icons/android-icon-72x72.png',
            '/res/img/icons/android-icon-96x96.png',
            '/res/img/icons/android-icon-144x144.png',
            '/res/img/icons/android-icon-192x192.png',
            '/res/img/icons/apple-icon-57x57.png',
            '/res/img/icons/apple-icon-60x60.png',
            '/res/img/icons/apple-icon-72x72.png',
            '/res/img/icons/apple-icon-120x120.png',
            '/res/img/icons/apple-icon-144x144.png',
            '/res/img/icons/apple-icon-152x152.png',
            '/res/img/icons/apple-icon-180x180.png'
        ]);
    });
});

self.addEventListener('activate', (e) => {
    console.log("Worker: Activated")

    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== cacheName) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', function (event) { 
    console.log("Worker: Fetched")

    let response = caches.open(cacheName).then((cache) => { 
      return cache.match(event.request).then((resource) => { 
        if (resource) 
            return resource; 
        
        return fetch(event.request).then((resource) => { 
          cache.put(event.request, resource.clone()); 
          return resource; 
        }); 
      }); 
    }); 
    
    event.respondWith(response); 
  });