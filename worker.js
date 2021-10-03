self.addEventListener('install', function (event) {
    console.log("Worker: Installed", event)
})

self.addEventListener('activate', function (event) {
    console.log("Worker: Activated", event)
})