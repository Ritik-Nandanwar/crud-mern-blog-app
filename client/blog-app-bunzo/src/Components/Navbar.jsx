import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav
        className="nav mb-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="logo mx-2">
          <a href="/">App</a>
        </div>
        <li className="center-align red-text">
          <h6>use hyphen (-) instead of space</h6>
        </li>
        <ul className="" style={{ display: "flex", justifyContent: "" }}>
          <li>
            <a href="/all">All Posts</a>
          </li>
          <li>
            <a href="/contacts">Contacts</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
