'use server';

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  getDoc,
  orderBy,
  query,
} from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase/config.server';
import type { Outreach } from '@/lib/types';

const db = getFirestore(firebaseApp);
const outreachCollection = collection(db, 'outreaches');

export async function getOutreaches(): Promise<Outreach[]> {
  try {
    const q = query(outreachCollection, orderBy('scheduledAt', 'desc'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Outreach));
  } catch (error) {
    console.error("Error fetching outreaches:", error);
    // In a real app, you might want to handle this error more gracefully
    // For now, returning an empty array to prevent the app from crashing.
    return [];
  }
}

export async function saveOutreach(outreach: Omit<Outreach, 'id'> & { id?: string }): Promise<Outreach> {
  let docRef;
  if (outreach.id) {
    docRef = doc(db, 'outreaches', outreach.id);
    await setDoc(docRef, outreach, { merge: true });
  } else {
    // Firestore will auto-generate an ID
    docRef = await addDoc(outreachCollection, outreach);
  }
  const savedDoc = await getDoc(docRef);
  return { ...savedDoc.data(), id: savedDoc.id } as Outreach;
}

export async function deleteOutreach(id: string): Promise<void> {
  const docRef = doc(db, 'outreaches', id);
  await deleteDoc(docRef);
}
