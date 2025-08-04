import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth as getFirebaseAuth } from 'firebase-admin/auth';

if (!getApps().length) {
    try {
        const serviceAccount = JSON.parse(
            process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
        );
        initializeApp({
            credential: cert(serviceAccount),
        });
    } catch(e) {
        console.error("Failed to initialize firebase-admin:", e);
    }
}

export const getAuth = getFirebaseAuth;
