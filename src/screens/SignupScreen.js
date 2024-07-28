import React, { useRef, useState } from "react";
import "./SignupScreen.css";
import db, { createUser, getUser } from "../firebase";
import { addDoc, collection } from "firebase/firestore/lite";
import { useDispatch } from "react-redux";
import { getDocId, selectUser } from "../features/userSlice";

function SignupScreen() {
    const [registerUser, setRegisterUser] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);
    const signIn = (e) => {
        e.preventDefault();
        // console.log(emailRef.current.value);
        getUser(emailRef.current.value, passwordRef.current.value);
    };

    const dispatch = useDispatch(selectUser);

    const createUsingFirestore = async (uid, username) => {
        console.log("uid: " + uid);
        console.log("username: " + username);
        try {
            const docRef = await addDoc(collection(db, "users"), {
                uid: uid,
                username: username,
            });

            dispatch(
                getDocId({
                    docId: docRef.id,
                })
            );

            alert("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const signUp = async (e) => {
        e.preventDefault();
        const uid = await createUser(
            // usernameRef.current.value,
            emailRef.current.value,
            passwordRef.current.value
        );
        console.log("uid signup: ");
        console.log(uid);
        createUsingFirestore(uid, usernameRef.current.value);
    };

    return (
        <div className="signupScreen">
            <form action="">
                {registerUser ? (
                    <>
                        <h1>Sign Up</h1>
                        <input
                            ref={usernameRef}
                            type="text"
                            placeholder="Username"
                        />
                    </>
                ) : (
                    <>
                        <h1>Sign In</h1>
                    </>
                )}
                <input ref={emailRef} type="email" placeholder="Email" />
                <input
                    ref={passwordRef}
                    type="password"
                    name=""
                    id=""
                    placeholder="Password"
                />
                <button type="submit" onClick={registerUser ? signUp : signIn}>
                    Submit
                </button>
                {registerUser ? (
                    <h4>
                        <span className="signupScreen__gray">
                            Already Have Account?{" "}
                        </span>{" "}
                        <span
                            className="signupScreen__link"
                            onClick={() => {
                                setRegisterUser(false);
                            }}
                        >
                            Sign In Now.
                        </span>
                    </h4>
                ) : (
                    <h4>
                        <span className="signupScreen__gray">
                            New to Netflix?{" "}
                        </span>{" "}
                        <span
                            className="signupScreen__link"
                            onClick={() => setRegisterUser(true)}
                        >
                            Sign Up Now.
                        </span>
                    </h4>
                )}
            </form>
        </div>
    );
}

export default SignupScreen;
