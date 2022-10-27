import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiPT9gqpAiRkMjhKdfN__oql5VxCWIdEI",
  authDomain: "fir-login-6912b.firebaseapp.com",
  projectId: "fir-login-6912b",
  storageBucket: "fir-login-6912b.appspot.com",
  messagingSenderId: "814254274889",
  appId: "1:814254274889:web:2d91d9288543f99a560298"
};

initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore(app);