console.log('done');
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./assets/css/main.css", "./assets/css/mobile.css", "./logo.png"])
        }))
    }
);


self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            console.log(response);
            return response || fetch(e.request);
        })
    );
});