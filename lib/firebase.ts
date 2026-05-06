import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Import the Firebase configuration
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Only initialize Firestore & Auth on the client side to prevent Next.js SSR hangs
export const db = (typeof window !== 'undefined' ? getFirestore(app, firebaseConfig.firestoreDatabaseId) : null) as Firestore;
export const auth = (typeof window !== 'undefined' ? getAuth() : null) as any;
