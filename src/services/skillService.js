import {
  createDocument,
  deleteDocument,
  listDocuments,
  subscribeToCollection,
  updateDocument,
} from "../firebase/firestore.js";

const COLLECTION = "skills";

export const getSkills = () => listDocuments(COLLECTION);
export const subscribeToSkills = (onChange, onError) =>
  subscribeToCollection(COLLECTION, onChange, onError);
export const addSkill = (skill) => createDocument(COLLECTION, skill);
export const editSkill = (id, skill) => updateDocument(COLLECTION, id, skill);
export const removeSkill = (id) => deleteDocument(COLLECTION, id);
