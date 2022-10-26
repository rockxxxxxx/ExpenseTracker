import React from "react";
import { NavLink } from "react-router-dom";
import Wave from "../component/wave/Wave";
import "./navigation.css";

export default function Navigation() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="nav-link ">MyWeb Link</NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <li class="nav-item">
                <NavLink className="nav-link ">Home</NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link ">Product</NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link ">About Us</NavLink>
              </li>
            </div>
          </div>
        </div>
      </nav>
      <Wave />
    </>
  );
}
