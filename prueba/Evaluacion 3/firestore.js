// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZPx_IXW3Hz5NnoVXEi2pF2qrEQMzM1sY",
    authDomain: "prueba-db28e.firebaseapp.com",
    projectId: "prueba-db28e",
    storageBucket: "prueba-db28e.appspot.com",
    messagingSenderId: "712180478796",
    appId: "1:712180478796:web:d1783ad964f5110c0dd5e9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app)

export const save = (ges) => {
    addDoc(collection(db, 'gestion'), ges)
}

export const getData = (data) => {
    onSnapshot(collection(db, 'gestion'), data)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'gestion', id))
}

export const getDocumento = (id) => getDoc(doc(db, 'gestion', id))

export const update = (id, gestion) =>{
    updateDoc(doc(db,'gestion',id),gestion)
}