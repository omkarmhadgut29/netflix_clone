import React from "react";
import Nav from "../Nav";
import "./ProfileScreen.css";
import avatar from "../netflix-avatar.png";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth, signOut } from "../firebase";

function ProfileScreen() {
    const user = useSelector(selectUser);

    return (
        <div className="profileScreen">
            <Nav />

            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src={avatar} alt="Netflix Avatar" />

                    <div className="profileScreen__details">
                        <h2>{user.username}</h2>
                        <h2>{user.email}</h2>
                        <div className="profileScreen__list">
                            <h3>Watch List</h3>

                            <div className="profileScreen__watchList"></div>

                            <button
                                onClick={() => {
                                    signOut(auth);
                                }}
                                className="profileScreen__signOut"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileScreen;
