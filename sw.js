importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([{
    url: '/',
    revision: '1'
  },
  {
    url: '/index.html',
    revision: '1'
  },
  {
    url: '/nav.html',
    revision: '1'
  },
  {
    url: '/team.html',
    revision: '1'
  },
  {
    url: '/manifest.json',
    revision: '1'
  },
  {
    url: '/pages/home.html',
    revision: '1'
  },
  {
    url: '/pages/team-favorite.html',
    revision: '1'
  },
  {
    url: '/css/icon.css',
    revision: '1'
  },
  {
    url: '/css/materialize.min.css',
    revision: '1'
  },
  {
    url: '/css/materialize.css',
    revision: '1'
  },
  {
    url: '/css/style.css',
    revision: '1'
  },
  {
    url: '/js/api.js',
    revision: '1'
  },
  {
    url: '/js/date.js',
    revision: '1'
  },
  {
    url: '/js/db.js',
    revision: '1'
  },
  {
    url: '/js/idb.js',
    revision: '1'
  },
  {
    url: '/js/materialize.min.js',
    revision: '1'
  },
  {
    url: '/js/materialize.js',
    revision: '1'
  },
  {
    url: '/js/nav.js',
    revision: '1'
  },
  {
    url: '/js/reg-sw.js',
    revision: '1'
  },
  {
    url: '/font/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
    revision: '1'
  },
  {
    url: '/img/lap.jpg',
    revision: '1'
  },
  {
    url: '/img/la-liga.png',
    revision: '1'
  },
  {
    url: '/img/logo/icon.png',
    revision: '1'
  },
], {
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp("/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: "hal"
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }

  var options = {
    body: body,
    badge: "/img/logo/icon-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});