import {
	createDocument,
	deleteDocument,
	listDocuments,
	subscribeToCollection,
	updateDocument,
} from "../firebase/firestore.js";

const COLLECTION = "messages";

export const getMessages = () => listDocuments(COLLECTION);
export const subscribeToMessages = (onChange, onError) =>
	subscribeToCollection(COLLECTION, onChange, onError);
export const addMessage = (message) => createDocument(COLLECTION, message);
export const markMessageRead = (id, read) =>
	updateDocument(COLLECTION, id, { read });
export const removeMessage = (id) => deleteDocument(COLLECTION, id);
