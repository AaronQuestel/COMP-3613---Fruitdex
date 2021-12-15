//FIREBASE  AUTHENTICATION
import firebase from "firebase/compat/app"
import "firebase/compat/auth"


const firebaseConfig = {
    apiKey: "AIzaSyCd8B0-qZFawDxBk724OeoxDU6vezLtqKs",
    authDomain: "developerhub-bfbeb.firebaseapp.com",
    projectId: "developerhub-bfbeb",
    storageBucket: "developerhub-bfbeb.appspot.com",
    messagingSenderId: "301103554695",
    appId: "1:301103554695:web:1c22f5d25b2c7197795822",
    measurementId: "G-M48RKCV96P"
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  
  export const auth = app.auth()
  
  export default app