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
import { changeTheme } from "../reducers/themeReducer";
import { activatePremium } from "../reducers/premiumServiceReducer";

export default function Navigation() {
  const state = useSelector((state) => state.auth);
  const { isLoggedIn } = state;

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutD());
  };

  const getExpense = useSelector((state) => state.addExpenses.userExpense);
  const premium = useSelector((state) => state.premium.permiumService);

  console.log(premium);
  const expenseTotal = getExpense.reduce(
    (total, expenseAmount) => parseInt(total) + parseInt(expenseAmount.amount),
    0
  );
  const themeToggler = () => {
    dispatch(changeTheme(!themeDefault));
    console.log(themeDefault);
  };
  const themeDefault = useSelector((state) => state.theme.themeDefault);

  return (
    <>
      <nav
        class={`navbar navbar-expand-sm navbar-${
          themeDefault === true ? "light" : "dark"
        } bg-${themeDefault === true ? "light" : "dark"}`}
      >
        <div class="container-fluid">
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
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
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
              <li class="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active nav-link" : "nav-link"
                  }
                  to="/expenses"
                >
                  <img src={exp} alt="Expenses" /> Expenses
                </NavLink>
              </li>
              <li class="nav-item">
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
                <li className="nav-item " onClick={() => logout()}>
                  <NavLink className="nav-link " to="/signup">
                    Logout
                  </NavLink>
                </li>
              )}
              {isLoggedIn && expenseTotal >= 10000 && (
                <li
                  className="nav-item"
                  onClick={() => {
                    premium === true
                      ? console.log("")
                      : dispatch(activatePremium());
                  }}
                >
                  <NavLink className="nav-link" disabled>
                    {premium === true ? "Premium Member" : "Activate Premium "}
                  </NavLink>
                </li>
              )}
            </ul>
            {premium && (
              <div
                style={{
                  paddingReft: "0px",
                  paddingLeft: "auto",
                  color: themeDefault === true ? "black" : "white",
                }}
                class="custom-control custom-switch"
              >
                {`Toogle ${themeDefault === true ? "dark" : "light"} Mode`}
                &nbsp;
                <label class="switch">
                  <input type="checkbox" onClick={themeToggler} />
                  <span class="slider round"></span>
                </label>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Wave />
      <Outlet />
    </>
  );
}
