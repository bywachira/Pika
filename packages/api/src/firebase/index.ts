import firebase from "firebase-admin";
import credentials from "../firebase-creds.json";

const creds: any = credentials

firebase.initializeApp({
    credential: firebase.credential.cert(creds),
    databaseURL: "https://generatewithpika-default-rtdb.firebaseio.com"
})

export default firebase;