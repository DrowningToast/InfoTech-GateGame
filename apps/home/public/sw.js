if (!self.define) {
  let e,
    s = {};
  const n = (n, c) => (
    (n = new URL(n + ".js", c).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, a) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[t]) return;
    let i = {};
    const r = (e) => n(e, t),
      o = { module: { uri: t }, exports: i, require: r };
    s[t] = Promise.all(c.map((e) => o[e] || r(e))).then((e) => (a(...e), i));
  };
}
define(["./workbox-f3a8d5d8"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/XJnWwsV8UQWqDTTcnz9oh/_buildManifest.js",
          revision: "4f849e993f1256e598bf92081c27883f",
        },
        {
          url: "/_next/static/XJnWwsV8UQWqDTTcnz9oh/_ssgManifest.js",
          revision: "5352cb582146311d1540f6075d1f265e",
        },
        {
          url: "/_next/static/chunks/181.28522b8b7979ea5e.js",
          revision: "28522b8b7979ea5e",
        },
        {
          url: "/_next/static/chunks/401-f91349641567e1e0.js",
          revision: "f91349641567e1e0",
        },
        {
          url: "/_next/static/chunks/445-7d2c6462b58d9cd0.js",
          revision: "7d2c6462b58d9cd0",
        },
        {
          url: "/_next/static/chunks/823-719bc9869152740b.js",
          revision: "719bc9869152740b",
        },
        {
          url: "/_next/static/chunks/framework-fd1a5b78316afbd3.js",
          revision: "fd1a5b78316afbd3",
        },
        {
          url: "/_next/static/chunks/main-3e91c8f84a224ebb.js",
          revision: "3e91c8f84a224ebb",
        },
        {
          url: "/_next/static/chunks/pages/_app-d4a9407b49bda4c8.js",
          revision: "d4a9407b49bda4c8",
        },
        {
          url: "/_next/static/chunks/pages/_error-ba35cbeb3c4ccf4b.js",
          revision: "ba35cbeb3c4ccf4b",
        },
        {
          url: "/_next/static/chunks/pages/account-977804448b73a31f.js",
          revision: "977804448b73a31f",
        },
        {
          url: "/_next/static/chunks/pages/auth-ba3d85881d8db68e.js",
          revision: "ba3d85881d8db68e",
        },
        {
          url: "/_next/static/chunks/pages/index-1aa17a0540db92d6.js",
          revision: "1aa17a0540db92d6",
        },
        {
          url: "/_next/static/chunks/pages/jobs-7e8136ff338781c0.js",
          revision: "7e8136ff338781c0",
        },
        {
          url: "/_next/static/chunks/pages/link-702797cb943c3b73.js",
          revision: "702797cb943c3b73",
        },
        {
          url: "/_next/static/chunks/pages/scan-f7202990b8ed5d46.js",
          revision: "f7202990b8ed5d46",
        },
        {
          url: "/_next/static/chunks/pages/signout-f95e95a06b0fb4b1.js",
          revision: "f95e95a06b0fb4b1",
        },
        {
          url: "/_next/static/chunks/pages/test-3f7fcc76ba5c3b6a.js",
          revision: "3f7fcc76ba5c3b6a",
        },
        {
          url: "/_next/static/chunks/pages/unlink-6db4a7bdee6cccca.js",
          revision: "6db4a7bdee6cccca",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-d8b7bc531b31d66a.js",
          revision: "d8b7bc531b31d66a",
        },
        {
          url: "/_next/static/css/0579cc141e23cb28.css",
          revision: "0579cc141e23cb28",
        },
        {
          url: "/_next/static/css/451957c797e1894f.css",
          revision: "451957c797e1894f",
        },
        {
          url: "/assets/Fire.png",
          revision: "23d8d50365178927158f6a763132c1b5",
        },
        {
          url: "/assets/GGDay.png",
          revision: "ecc33e1545fa519f03abed254632d706",
        },
        {
          url: "/assets/Valorant.png",
          revision: "6cf9503135c7d49b39718b00a8858758",
        },
        {
          url: "/assets/hero.png",
          revision: "0b2d89095e6e0b4c703a5ec1d21bb4cd",
        },
        {
          url: "/assets/rov.png",
          revision: "c19b058f93a647fe7bf2755821ddf327",
        },
        { url: "/favicon.ico", revision: "8390cd24d60b7e6e962e08dc7c83b97d" },
        {
          url: "/fonts/SDRanger.ttf",
          revision: "b3e96571cf23ade65c7c24591aab61a2",
        },
        {
          url: "/icon-192x192.png",
          revision: "8789a1dbef34c135985768e62df3e657",
        },
        {
          url: "/icon-256x256.png",
          revision: "2954e103089c0822fb89021e285113c7",
        },
        {
          url: "/icon-384x384.png",
          revision: "b1546bb0999929f458ab3a3548368693",
        },
        {
          url: "/icon-512x512.png",
          revision: "51038e57e93c44f1f4e795d9ec07b001",
        },
        { url: "/manifest.json", revision: "536898b5bddcf3bdd05b9976c7e6e21b" },
        { url: "/vercel.svg", revision: "4b4f1876502eb6721764637fe5c41702" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: c,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
