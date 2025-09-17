import { initializeApp, getApp, getApps, type FirebaseOptions } from 'firebase/app';

export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBbW60PVDR3PBy6Du-gcNpegDXiLEdqlNI",
  authDomain: "outreach-navigator-39383.firebaseapp.com",
  projectId: "outreach-navigator-39383",
  storageBucket: "outreach-navigator-39383.firebasestorage.app",
  messagingSenderId: "585524033191",
  appId: "1:585524033191:web:87449f96f498db6d028d82"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firebaseApp = app;
