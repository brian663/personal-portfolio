import {
  createDocument,
  deleteDocument,
  listDocuments,
  subscribeToCollection,
  updateDocument,
} from "../firebase/firestore.js";

const COLLECTION = "projects";

export const getProjects = () => listDocuments(COLLECTION);
export const subscribeToProjects = (onChange, onError) =>
  subscribeToCollection(COLLECTION, onChange, onError);
export const addProject = (project) => createDocument(COLLECTION, project);
export const editProject = (id, project) => updateDocument(COLLECTION, id, project);
export const removeProject = (id) => deleteDocument(COLLECTION, id);
