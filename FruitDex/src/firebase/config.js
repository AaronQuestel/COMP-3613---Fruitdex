// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCd8B0-qZFawDxBk724OeoxDU6vezLtqKs",
    authDomain: "developerhub-bfbeb.firebaseapp.com",
    projectId: "developerhub-bfbeb",
    storageBucket: "developerhub-bfbeb.appspot.com",
    messagingSenderId: "301103554695",
    appId: "1:301103554695:web:1c22f5d25b2c7197795822",
    measurementId: "G-M48RKCV96P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


export { projectStorage, projectFirestore, timestamp };