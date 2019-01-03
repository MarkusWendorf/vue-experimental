self.addEventListener("install", function () {
    console.log("ServiceWorker installed");
});

self.addEventListener("fetch", fetchOrCache);

function fetchOrCache(event) {

    // only cache fonts, don't cache anything else
    if (!event.request.url.match("fonts.gstatic.com")) {
        return;
    }

    // Cache fonts
    event.respondWith(caches.match(event.request).then(function(response) {

        if (response !== undefined) {
            console.log("cached");
            return response;
        } else {
            return fetch(event.request).then(function (response) {

                console.log("fetched");
                const responseClone = response.clone();
                caches.open("fonts/v1").then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            });
        }
    }));
}
