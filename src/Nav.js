import React, { useEffect, useState } from "react";
import netflix_logo from "./netflix-logo.png";
import netflix_avatar from "./netflix-avatar.png";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
    const [show, handleShow] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });

        return () => {
            window.removeEventListener("scroll", this);
        };
    }, []);

    return (
        <div className={`nav ${show && "nav__black"} `}>
            <img
                onClick={() => navigate("/")}
                src={netflix_logo}
                alt="Netflix Logo"
                className="nav__logo"
            />
            <img
                onClick={() => navigate("/profile")}
                src={netflix_avatar}
                alt="Netflix Avatar"
                className="nav__avatar"
            />
        </div>
    );
}

export default Nav;
