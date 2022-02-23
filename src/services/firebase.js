import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZmtHYnKOEMTH4KJtaWDZTVfjvOo4_euQ",
  authDomain: "freezer-ab56d.firebaseapp.com",
  projectId: "freezer-ab56d",
  appId: "1:266443232989:web:575d508a2996549cd6ed34",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
export {
  signInWithPopup,
  auth,
  providerFacebook,
  providerGoogle,
  onAuthStateChanged,
};