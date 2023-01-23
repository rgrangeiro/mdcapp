import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCrc71Lrsoz_MBtBPkI8kE_NUNKOAX2kVM",
    authDomain: "mdcapp-project.firebaseapp.com",
    projectId: "mdcapp-project",
    storageBucket: "mdcapp-project.appspot.com",
    messagingSenderId: "1063088768057",
    appId: "1:1063088768057:web:c56b4dbf9f55055c64b9e8"
};
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
