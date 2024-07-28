// import firebase from "firebase";
import * as firebase from "firebase/app";
import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore/lite";
import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAAPuJPi9lQCH183gM0r62m2-R7Glto-PY",
    authDomain: "netflix-clone-2fb68.firebaseapp.com",
    projectId: "netflix-clone-2fb68",
    storageBucket: "netflix-clone-2fb68.appspot.com",
    messagingSenderId: "323495430913",
    appId: "1:323495430913:web:53f2ef52380c8ecb97a900",
    measurementId: "G-LMTP0K5F5T",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

// const createUsingFirestore = async (uid, username) => {
//     try {
//         const docRef = await addDoc(collection(db, "users"), {
//             uid: uid,
//             username: username,
//         });

//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// };

const createUser = async (email, password) => {
    let uid = await createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            // console.log(authUser);
            // uid = authUser.user.uid;
            // uid.push(authUser.user.uid);
            return authUser.user.uid;
            // createUsingFirestore(authUser.user.uid, username);
        })
        .catch((error) => {
            alert(error.message);
        });
    return uid;
};

const getUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // .then((userCredential) => {
            alert("Logged in Successfully.");
        })
        .catch((error) => {
            alert(error.message);
        });
};

const getUserData = async (uid) => {
    const querySnapshot = await getDocs(
        query(collection(db, "users"), where("uid", "==", uid))
    );
    let username = "";
    console.log("querySnapshot");
    querySnapshot.forEach((doc) => {
        console.log("querySnapshot");
        console.log(doc.data());
        username = doc.data().username;
    });
    return username;
};

export { auth, createUser, getUser, onAuthStateChanged, signOut, getUserData };
export default db;
