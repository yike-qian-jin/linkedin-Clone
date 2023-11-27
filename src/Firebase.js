import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBd9OO5akeOPAcjNRiu3sV0-s6w6XUd5NM",
    authDomain: "linkedin-clone-1767f.firebaseapp.com",
    projectId: "linkedin-clone-1767f",
    storageBucket: "linkedin-clone-1767f.appspot.com",
    messagingSenderId: "1067661027430",
    appId: "1:1067661027430:web:235bc5b627f2ec45eae5a7"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
