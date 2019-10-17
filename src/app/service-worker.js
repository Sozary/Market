const version = 3;
self.addEventListener('install', () => {
  console.log(`Installation du service worker v${version}`)
  return self.skipWaiting();
});
self.addEventListener('push', event => {
  const dataJSON = event.data.json();
  const notificationOptions = {
    body: dataJSON.body,
  };
  return self.registration.showNotification(dataJSON.title, notificationOptions);
});
self.addEventListener('activate', () => console.log(`Activation du service worker v${version}`));
