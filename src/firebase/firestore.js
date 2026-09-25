import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig.js";

function requireDatabase() {
  if (!db) {
    throw new Error("Firebase is not configured. Add the VITE_FIREBASE_* variables first.");
  }

  return db;
}

export async function listDocuments(collectionName) {
  const snapshot = await getDocs(collection(requireDatabase(), collectionName));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export function subscribeToCollection(collectionName, onChange, onError) {
  return onSnapshot(
    collection(requireDatabase(), collectionName),
    (snapshot) => {
      onChange(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    },
    onError,
  );
}

export function createDocument(collectionName, data) {
  return addDoc(collection(requireDatabase(), collectionName), data);
}

export function updateDocument(collectionName, id, data) {
  return updateDoc(doc(requireDatabase(), collectionName, id), data);
}

export function deleteDocument(collectionName, id) {
  return deleteDoc(doc(requireDatabase(), collectionName, id));
}
