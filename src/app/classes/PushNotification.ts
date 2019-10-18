export default class PushNotification {
  private sw_registration: ServiceWorkerRegistration
  constructor() {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
  }

  public async register() {
    try {
      this.sw_registration = await navigator.serviceWorker.register('/src/app/service-worker.js');
    } catch (e) {
      throw new Error(e)
    }
  }

  public showLocalNotification(title, body) {
    const options = {
      body,
    };
    this.sw_registration.showNotification(title, options);
  }

  public async grantPermission() {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted')
      throw new Error('Permission not granted for Notification');
  }
}
