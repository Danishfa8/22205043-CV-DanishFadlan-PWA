importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBAn4Dp5FisfcCE_Xg1YWV3MVHv14k_j7U",
    authDomain: "portfolio-4f6eb.firebaseapp.com",
    projectId: "portfolio-4f6eb",
    storageBucket: "portfolio-4f6eb.firebasestorage.app",
    messagingSenderId: "118979819413",
    appId: "1:118979819413:web:9eb6990787994b0470a89c",
    measurementId: "G-R62H9KRQ3P"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/maskable-icon-512x512.png', 
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
