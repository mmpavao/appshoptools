import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB4hlzpQlZ3n1ailwXyrnlsf36vnXSe2rc",
  authDomain: "shoptools-pro.firebaseapp.com",
  projectId: "shoptools-pro",
  storageBucket: "shoptools-pro.appspot.com",
  messagingSenderId: "62767859321",
  appId: "1:62767859321:web:ae1bd1190f0ea1dec176a8",
  measurementId: "G-8YT32ELGCW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;