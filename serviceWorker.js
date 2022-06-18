const staticSpeedCube = "speed-cube-site-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/responsive.css",
  "/css/export-styles.css",
  "/export.html",
  "/js/script.js",
  "/js/timer.js",
  "/img/favicon.png",
  "/img/minitrash.png",
  "/img/trash.png"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticSpeedCube).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })