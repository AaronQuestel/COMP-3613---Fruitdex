const admin = require('firebase-admin')
const serviceAccount = require('../developerhub-bfbeb-firebase-adminsdk-f8a6o-b0dc43646a.json')

require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



/*
const projectStorage = firebase.storage();
const projectFirestore = admin.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const Images = projectFirestore.collection("images");
*/
const projectFirestore = admin.firestore();
//These statements setup the retrieval of the collections from the firestore
//If there isn't a collection by the name provided it creates that collection name

const Images = projectFirestore.collection("images");
const Users = projectFirestore.collection("users");
const Posts = projectFirestore.collection("posts");

module.exports = {
    projectFirestore, Images, Users, Posts, admin
}