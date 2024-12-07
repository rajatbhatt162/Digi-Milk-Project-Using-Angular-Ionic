import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCV0HznLScSZguUeUL8K8han2WZejTj5pM",
    authDomain: "our-erp.firebaseapp.com",
    projectId: "our-erp",
    storageBucket: "our-erp.appspot.com",
    messagingSenderId: "13602899813",
    appId: "1:13602899813:web:ffd25f2018bd434000438c",
    measurementId: "G-GBHEDK52PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup, signInWithRedirect, getRedirectResult, firebaseConfig };
