import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBpyHn7vrXJzNjjjWA_EKmHpMwHx2ZQ4y4",
  authDomain: "hostelmart37.firebaseapp.com",
  projectId: "hostelmart37",
  storageBucket: "hostelmart37.appspot.com",
  messagingSenderId: "281103957255",
  appId: "1:281103957255:web:5a4ea9e588d74a45f499a2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const fs = firebase.firestore();
const imgDB = getStorage(firebaseApp);
const textDB = getFirestore(firebaseApp);
const messages = getStorage(firebaseApp);
const products = getStorage(firebaseApp);

// Other exports if needed
export { db, auth ,storage,fs, imgDB, textDB , messages,products};