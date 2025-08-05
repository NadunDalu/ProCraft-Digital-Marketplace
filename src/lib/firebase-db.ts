
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getFirestore as getClientFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase'; // Client-side app

// Admin SDK initialization
if (!getApps().length && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
        const serviceAccount = JSON.parse(
            process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
        );
        initializeApp({
            credential: cert(serviceAccount),
        });
    } catch (e) {
        console.error('Firebase Admin initialization error:', e);
    }
}

const db = getApps().length ? getFirestore() : null;
const clientDb = getClientFirestore(app);

export { db, clientDb };
