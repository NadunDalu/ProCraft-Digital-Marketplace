
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "procraft-digital-marketplace",
  "appId": "1:573218791868:web:8b50ef2a839c5de8c60bb9",
  "storageBucket": "procraft-digital-marketplace.firebasestorage.app",
  "apiKey": "AIzaSyALhVjZXn7NJrFTzKSuzxAwg7omXqQF_Zc",
  "authDomain": "procraft-digital-marketplace.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "573218791868"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
