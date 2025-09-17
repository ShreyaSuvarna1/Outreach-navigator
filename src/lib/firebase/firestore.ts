'use server';

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  limit,
} from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase/config.server';
import type { Outreach } from '@/lib/types';

const db = getFirestore(firebaseApp);
const outreachCollection = collection(db, 'outreaches');

export async function getOutreaches(): Promise<Outreach[]> {
  const snapshot = await getDocs(outreachCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Outreach));
}

export async function saveOutreach(outreach: Omit<Outreach, 'id'> & { id?: string }): Promise<Outreach> {
  const { institution, topic } = outreach;

  if (outreach.id) {
    const docRef = doc(db, 'outreaches', outreach.id);
    await setDoc(docRef, outreach, { merge: true });
    return { ...(await getDoc(docRef)).data(), id: outreach.id } as Outreach;
  } else {
    const docRef = await addDoc(outreachCollection, outreach);
    return { ...outreach, id: docRef.id };
  }
}

async function getDoc(docRef: any) {
    const docSnap = await (await import('firebase/firestore')).getDoc(docRef);
    return docSnap.data();
}

export async function deleteOutreach(id: string): Promise<void> {
  const docRef = doc(db, 'outreaches', id);
  await deleteDoc(docRef);
}
