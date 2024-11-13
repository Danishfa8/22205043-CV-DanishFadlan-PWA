// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAn4Dp5FisfcCE_Xg1YWV3MVHv14k_j7U",
    authDomain: "portfolio-4f6eb.firebaseapp.com",
    projectId: "portfolio-4f6eb",
    storageBucket: "portfolio-4f6eb.firebasestorage.app",
    messagingSenderId: "118979819413",
    appId: "1:118979819413:web:9eb6990787994b0470a89c",
    measurementId: "G-R62H9KRQ3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: 'BNJs__kTWgr7zqkSbqdlDwgMTgbsZbMJMX3d1Zk9YXoHUIo9pYyHgke8qchCiB1cIfRoh91lExldi0cG_aVhvkM' })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                // Simpan token ini untuk digunakan dalam server notifikasi
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });