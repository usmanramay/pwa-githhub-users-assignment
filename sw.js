var cacheName = 'mychace109';
var dataCacheName = 'mychace108'; 

var server = "https://api.github.com/users/octocat/followers";
//var server = "http://localhost:3000/users";
var filesToCache = [
  
  '/index.js',
  '/index.html',

  '/index.css',

  '/',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate');

  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key!=='dynamic-03') {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
 

self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  
  if(e.request.url.startsWith(server)){
  console.log("opens"); 
  caches.open(servers).then(function(cache){
    return fetch(e.request).then(function(response){
      cache.put(e.request,response.clone());
    console.log("cache returend");
      return response;
    })

   })
  

  }
  else{
  
    console.log("not openeing");

  

  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
}}
);