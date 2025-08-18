// Service Worker pour HealthyIMC
// Version du cache
const CACHE_NAME = 'healthyimc-v1.0.0';

// Fichiers à mettre en cache
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/lovable-uploads/dba49e63-b060-48ba-af66-496f4579fc82.png',
  '/lovable-uploads/fa3d23e1-be06-4b8f-812a-691e5c14a6ee.png'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Erreur lors de la mise en cache:', error);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Supprimer les anciens caches
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  // Stratégie Cache First pour les ressources statiques
  if (event.request.url.includes('/static/') || 
      event.request.url.includes('/lovable-uploads/') ||
      event.request.url.includes('fonts.googleapis.com')) {
    
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Retourner la version en cache si disponible
        if (response) {
          return response;
        }
        
        // Sinon, faire la requête réseau et mettre en cache
        return fetch(event.request).then((response) => {
          // Vérifier si c'est une réponse valide
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Cloner la réponse
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
    );
  }
  
  // Stratégie Network First pour les pages HTML
  else if (event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request).then((response) => {
        // Mettre en cache les pages HTML pour l'accès hors ligne
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(() => {
        // En cas d'erreur réseau, retourner la version en cache
        return caches.match(event.request);
      })
    );
  }
});

// Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});