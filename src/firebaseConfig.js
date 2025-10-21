// Configuración de Firebase para tu proyecto
// Reemplaza los valores con los de tu proyecto en Firebase Console
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYkMK8jBJqov4ctwxkgFnHP-ovd9ymCAE",
  authDomain: "portafolio-f1995.firebaseapp.com",
  projectId: "portafolio-f1995",
  storageBucket: "portafolio-f1995.appspot.com",
  messagingSenderId: "39166065523",
  appId: "1:39166065523:web:de8f7f025e5dd9a2312306",
  measurementId: "G-X58T97MY08"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
