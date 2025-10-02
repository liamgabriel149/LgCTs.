

// sw.js - Complete Service Worker

// Triggered when the Service Worker is installed
self.addEventListener("install", (event) => {
  console.log("📦 Service Worker installed.");
  self.skipWaiting(); // Activate immediately after installation
});

// Triggered when the Service Worker is activated
self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker activated.");
  self.clients.claim(); // Take control of uncontrolled clients immediately
});

// Triggered when a push message is received
self.addEventListener("push", (event) => {
  console.log("🔔 Push received.");

  // Extract data from the push event (assuming JSON)
  const data = event.data ? event.data.json() : {};

  const title = data.title || "MeterWatch Notification";
  const options = {
    body: data.body || "You have a new notification.",
    icon: data.icon || "/icon.png",
    badge: data.badge || "/badge.png",
    data: {
      url: "https://liamgabriel149.github.io/LgCTs./" // URL to open on notification click
    }
  };

  // Show notification
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Triggered when a notification is clicked
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the notification

  const urlToOpen = event.notification.data.url || "https://meterwatch.ct.ws/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(windowClients => {
      // Check if the target URL is already open, focus it
      for (const client of windowClients) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise, open a new window/tab
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});



// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDXNrUVM1VBaXOg2ZmkIFE9BKxexxBmpIs",
  authDomain: "waterbase-b1393.firebaseapp.com",
  databaseURL: "https://waterbase-b1393-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Listen for alerts
const alertsRef = db.ref("/sensors1/water_alerts");
alertsRef.limitToLast(1).on("child_added", snap => {
  const alert = snap.val();
  if (alert) {
    self.registration.showNotification("Water Leak Detected", {
      body: alert.message,
      icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
      vibrate: [100, 50, 100],
      tag: "water-alert",
    });
  }
});

// Listen for chat messages
const chatRef = db.ref("chats/Residence_Employee");
chatRef.limitToLast(1).on("child_added", snap => {
    const msg = snap.val();
    if(msg && msg.sender !== 'Residence'){
         self.registration.showNotification("New Message", {
            body: `${msg.sender}: ${msg.text}`,
            icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
            vibrate: [100, 50, 100],
            tag: "chat-message",
         });
    }
});


self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        return client.focus();
      }
      return clients.openWindow("index.html"); // redirect if no window open
    })
  );
});


// sw.js - Service Worker

self.addEventListener("install", event => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("Service Worker activated");
});

// Listen for push events (if using FCM or custom push)
self.addEventListener("push", event => {
  const data = event.data?.json() || {};
  const title = data.title || "New Notification";
  const options = {
    body: data.body || "You have a new message",
    icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
    vibrate: [100, 50, 100],
    tag: "chat-message",
    renotify: true,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Optional: handle notification click
self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // Open dashboard or homepage
  );
});



