import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyBQMTtdhbgXpoJo5gkHnoJ5S0RoFFNiC_I",
  authDomain: "qwitter-5bd97.firebaseapp.com",
  projectId: "qwitter-5bd97",
  storageBucket: "qwitter-5bd97.appspot.com",
  messagingSenderId: "1085320423183",
  appId: "1:1085320423183:web:6db0e501687511e6fe007a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = getFirestore(app);

export default db

