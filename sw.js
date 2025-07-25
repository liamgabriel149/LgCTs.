self.addEventListener("install", function (event) {
  console.log("📦 Service Worker installed.");
});

self.addEventListener("activate", function (event) {
  console.log("🚀 Service Worker activated.");
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://your-site.github.io/") // Change to your GitHub Page
  );
});
