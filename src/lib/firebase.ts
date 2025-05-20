// Import the functions you need from the SDKs
import { initializeApp, getApps } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChTkr0nTW5k5BzfNfMDckcYEMjmJ-UE8M",
  authDomain: "oasisvillagestmartins.firebaseapp.com",
  projectId: "oasisvillagestmartins",
  storageBucket: "oasisvillagestmartins.firebasestorage.app",
  messagingSenderId: "654151338648",
  appId: "1:654151338648:web:09d15962b8d7959d4b5eed",
  measurementId: "G-TBFL4YH0LY"
};

// Initialize Firebase
let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
let analytics: Analytics | undefined;

// Initialize analytics only on the client side
if (typeof window !== 'undefined') {
  analytics = getAnalytics(firebaseApp);
}

export { firebaseApp, analytics }; 