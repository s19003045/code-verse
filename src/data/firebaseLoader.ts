import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import type { AppItem } from '@types/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let firebaseApp: FirebaseApp | null = null;

const ensureApp = () => {
  if (firebaseApp) return firebaseApp;
  const existing = getApps();
  if (existing.length > 0) {
    firebaseApp = existing[0];
    return firebaseApp;
  }
  const missing = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length > 0) {
    throw new Error(`Missing Firebase config keys: ${missing.join(', ')}`);
  }
  firebaseApp = initializeApp(firebaseConfig);
  return firebaseApp;
};

export const loadAppsFromFirebase = async (): Promise<AppItem[]> => {
  const app = ensureApp();
  const db = getFirestore(app);
  const snapshot = await getDocs(collection(db, 'apps'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as AppItem));
};

export default loadAppsFromFirebase;
