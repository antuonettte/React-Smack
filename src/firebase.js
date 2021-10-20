import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics';


const firebaseConfig = {
    apiKey: "AIzaSyBGgykTxNqpU5lRpnBnOA5D2J3V2ojvc10",
    authDomain: "smack-f611d.firebaseapp.com",
    projectId: "smack-f611d",
    storageBucket: "smack-f611d.appspot.com",
    messagingSenderId: "844668542733",
    appId: "1:844668542733:web:b93f48dafc63e2ae1d1a44",
    measurementId: "G-RK89MLHXP0"
    // apiKey: "AIzaSyBGgykTxNqpU5lRpnBnOA5D2J3V2ojvc10",
    // authDomain: "smack-f611d.firebaseapp.com",
    // projectId: "smack-f611d",
    // storageBucket: "smack-f611d.appspot.com",
    // messagingSenderId: "844668542733",
    // appId: "1:844668542733:web:b93f48dafc63e2ae1d1a44"
};


firebase.initializeApp(firebaseConfig);

// const analytics = getAnalytics(firebase);

export default firebase;
