import React, { useState } from "react";
import "./LoginScreen.css";
import logo from "../netflix-logo.png";
import SignupScreen from "./SignupScreen";

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);
    return (
        <div className="loginScreen">
            <div className="loginScreen__background">
                <img
                    src={logo}
                    alt="Netflix Logo"
                    className="loginScreen__logo"
                />
                <button
                    className="loginScreen__button"
                    onClick={() => setSignIn(true)}
                >
                    Sign In
                </button>

                <div className="loginScreen__gradient" />
            </div>

            {signIn ? (
                <div className="signUpScreen__body">
                    <SignupScreen />
                </div>
            ) : (
                <>
                    <div className="loginScreen__body">
                        <h1>Unlimited movies, TV shows and more.</h1>
                        <h2>Watch anywhere. Cancel anytime.</h2>
                        <h3>
                            Ready to watch? Enter your email to create or
                            restart your membership.
                        </h3>

                        <div className="loginScreen__input">
                            <form>
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    placeholder="Email Address"
                                />
                                <button
                                    className="loginScreen__getStarted"
                                    onClick={() => setSignIn(true)}
                                >
                                    GET STARTED
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default LoginScreen;
