import firebase from 'firebase'; // npm i firebase@^8.10.0

const firebaseConfig = {
    apiKey: "AIzaSyBKJm02UpoamWJAsfesCRgrsi2xaXwYroo",
    authDomain: "docs-62b3d.firebaseapp.com",
    projectId: "docs-62b3d",
    storageBucket: "docs-62b3d.appspot.com",
    messagingSenderId: "1088920908433",
    appId: "1:1088920908433:web:acdd6f8d37b8ee12120530"
};

const app = !firebase.apps.length               // if there aren't any apps inizialited yet
    ? firebase.initializeApp(firebaseConfig)    // we inizialite for first time
    : firebase.app();                           // or we use one that we alredy got
    
const db = app.firestore();

export { db };