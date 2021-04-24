import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0hUzzhp4la9oNaYCyr-O5tjQlRnWHWD4",
    authDomain: "mineral-oxide-137723.firebaseapp.com",
    projectId: "mineral-oxide-137723",
    storageBucket: "mineral-oxide-137723.appspot.com",
    messagingSenderId: "978609462555",
    appId: "1:978609462555:web:f03fbb69e13864b6a6c7be",
    measurementId: "G-YF9NY5LYF9"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };












