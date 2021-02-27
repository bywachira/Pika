import firebase from "firebase-admin";
import credentials from "../generatewithpika-firebase-adminsdk-swuu9-b58d4f071a.json";

const creds: any = credentials

firebase.initializeApp({
    credential: firebase.credential.cert(creds),
    databaseURL: "https://generatewithpika-default-rtdb.firebaseio.com"
})

export default firebase;