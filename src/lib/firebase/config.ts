'use client';

import { getApp, getApps, initializeApp, type FirebaseOptions } from 'firebase/app';
import { firebaseConfig as serverConfig } from '@/lib/firebase/config.server';

const clientFirebaseConfig: FirebaseOptions = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = getApps().length
  ? getApp()
  : initializeApp(process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? clientFirebaseConfig : serverConfig);

export const firebaseApp = app;
