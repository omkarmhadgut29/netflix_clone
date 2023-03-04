import React, { useEffect, useState } from "react";
import netflix_logo from "./netflix-logo.png";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

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
      <img src={netflix_logo} alt="Netflix Logo" className="nav__logo" />
    </div>
  );
}

export default Nav;
