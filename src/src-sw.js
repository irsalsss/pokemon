import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  "https://pokeapi.co/api/v2/pokemon",
  new NetworkFirst({
    cacheName: "pokemon",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 10 * 60 // 10 minutes
      })
    ]
  })
);

addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    skipWaiting();
  }
})