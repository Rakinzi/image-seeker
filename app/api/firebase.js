import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD4sG4T1-hBtcLwjPnePiUgsnhUewzFtlY",
    authDomain: "chatapp-aeaa7.firebaseapp.com",
    projectId: "chatapp-aeaa7",
    storageBucket: "chatapp-aeaa7.appspot.com",
    messagingSenderId: "130243180712",
    appId: "1:130243180712:web:bb72e9f168c80333a1ea9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app.options.storageBucket)

const auth = getAuth(app);

const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.log("Error:", error)
    }
}

const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.log("Error:", error)
    }
}

export default {
    register,
    login
}