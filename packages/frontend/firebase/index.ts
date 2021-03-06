import firebaseClient from "firebase/app";
import "firebase/auth";

const CLIENT_CONFIG = {
    apiKey: "AIzaSyAD-l1wsur3vf3junYfBveFtZuGjK7AgHE",
    authDomain: "generatewithpika.firebaseapp.com",
    databaseURL: "https://generatewithpika-default-rtdb.firebaseio.com",
    projectId: "generatewithpika",
    storageBucket: "generatewithpika.appspot.com",
    messagingSenderId: "626801019504",
    appId: "1:626801019504:web:0c586d37e3926f620102b5"
}

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
    firebaseClient.initializeApp(CLIENT_CONFIG);
    firebaseClient
        .auth()
        .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
    (window as any).firebase = firebaseClient;
}

export { firebaseClient as firebase };