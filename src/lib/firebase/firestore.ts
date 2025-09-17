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
  const q = query(outreachCollection, orderBy('scheduledAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Outreach));
}

export async function saveOutreach(outreach: Omit<Outreach, 'id'> & { id?: string }): Promise<Outreach> {
  if (outreach.id) {
    const docRef = doc(db, 'outreaches', outreach.id);
    await setDoc(docRef, outreach, { merge: true });
    const savedDoc = await getDoc(docRef);
    return { ...savedDoc.data(), id: savedDoc.id } as Outreach;
  } else {
    const docRef = await addDoc(outreachCollection, outreach);
    return { ...outreach, id: docRef.id };
  }
}

export async function deleteOutreach(id: string): Promise<void> {
  const docRef = doc(db, 'outreaches', id);
  await deleteDoc(docRef);
}
