import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../src/NavBar.css"

function NavBar() {
    const navigate = useNavigate();

    const handleNewLogClick = () => {
      navigate("/transactions/new");
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-nav">
      <Link className="navbar-brand" to="/transactions"  style={{ color: "#E4D1CF", fontSize: "64px", paddingLeft: "45px" }}>
        Budget App
      </Link>
      <div className="collapse navbar-collapse d-flex justify-content-end">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="/transactions/new" className="button new-button" onClick={handleNewLogClick} >
              New transaction
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
