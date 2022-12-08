import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDe0dcUGm9MIs0ZCKEjutDVXVslHLDd9Xk",
  authDomain: "hacku-kosen-2022.firebaseapp.com",
  projectId: "hacku-kosen-2022",
  storageBucket: "hacku-kosen-2022.appspot.com",
  messagingSenderId: "670492509559",
  appId: "1:670492509559:web:d382b686ea0114f5d9cd72",
  measurementId: "G-FNZG7VGC5Z",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =  getFirestore(app)
export const storage = getStorage(app)