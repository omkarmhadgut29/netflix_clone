import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { auth, getUserData, onAuthStateChanged } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                // Logged In
                const username = await getUserData(userAuth.uid);
                console.log("app.js username: ");
                console.log(username);
                dispatch(
                    login({
                        uid: userAuth.uid,
                        username: username,
                        email: userAuth.email,
                    })
                );
            } else {
                // Logged out
                dispatch(logout());
            }
        });

        return unsubscribe;
    }, [dispatch]);

    return (
        <div className="app">
            <BrowserRouter>
                {!user ? (
                    <LoginScreen />
                ) : (
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/profile" element={<ProfileScreen />} />
                    </Routes>
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
