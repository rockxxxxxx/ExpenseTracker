import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Wave from "../component/wave/Wave";
import "./navigation.css";
import logo from "../logo.png";
import home from "../home.png";
import exp from "../expenses.png";
import prod from "../product.png";

import signup from "../signup.png";
import about from "../about.png";
import { useSelector, useDispatch } from "react-redux";
import { logoutD } from "../reducers/authReducr";

export default function Navigation() {
  const state = useSelector((state) => state.auth);
  const { isLoggedIn } = state;
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutD());
  };
  console.log(isLoggedIn);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand nav-link" to="">
            <img
              src={logo}
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            Expense Tracker
          </NavLink>
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
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                  to="/home"
                >
                  <img src={home} alt="home" />
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                  to="/expenses"
                >
                  <img src={exp} alt="Expenses" /> Expenses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                  to="/product"
                >
                  <img src={prod} alt="Product" /> Product
                </NavLink>
              </li>
              {!isLoggedIn && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active nav-link" : "nav-link"
                    }
                    to="/signup"
                  >
                    <img src={signup} alt="Sign Up" /> Signup
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link " to="/aboutus">
                  <img src={about} alt="About Us" />
                  About Us
                </NavLink>
              </li>
              {isLoggedIn && (
                <li className="nav-item" onClick={() => logout()}>
                  <NavLink className="nav-link " to="/signup">
                    Logout
                  </NavLink>
                </li>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Wave />
      <Outlet />
    </>
  );
}
