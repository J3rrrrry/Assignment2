import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
    onSnapshot,
  } from "firebase/firestore";
  import { database } from "../Firebase/firestoreSetup";
  
  export async function writeToDB(data, collectionName) {
    try {
      const docRef = await addDoc(collection(database, collectionName), data);
      console.log("Document written with ID:", docRef.id);
      return docRef.id;
    } catch (err) {
      console.error("Error adding document:", err);
    }
  }
  
  export async function deleteFromDB(deletedId, collectionName) {
    try {
      await deleteDoc(doc(database, collectionName, deletedId));
      console.log("Document deleted with ID:", deletedId);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  }
  
  export async function updateDB(id, data, collectionName) {
    try {
      await setDoc(doc(database, collectionName, id), data, { merge: true });
      console.log("Document updated with ID:", id);
    } catch (err) {
      console.error("Error updating document:", err);
    }
  }
  
  export async function getAllDocuments(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(database, collectionName));
      const data = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() });
      });
      return data;
    } catch (err) {
      console.error("Error getting documents:", err);
    }
  }
  
  export function listenToCollection(collectionName, callback) {
    return onSnapshot(collection(database, collectionName), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      callback(data);
    });
  }
  