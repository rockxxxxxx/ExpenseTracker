import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LoginContext } from "../component/context/loginContext";
import Wave from "../component/wave/Wave";
import "./navigation.css";

export default function Navigation() {
  const { isLoggedIn, setUserEmail, setJwtToken, setIsLoggedIn } =
    useContext(LoginContext);
  const logout = () => {
    setJwtToken("");
    setUserEmail("");
    localStorage.clear();
    setIsLoggedIn(false);
  };
  console.log(isLoggedIn);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand nav-link" to="">
            <img
              src="/docs/5.0/assets/brand/bootstrap-logo.svg"
              alt=""
              width="30"
              height="24"
              class="d-inline-block align-text-top"
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
                  Expenses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                  to="/product"
                >
                  Product
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
                    Signup
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink className="nav-link " to="/aboutus">
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
