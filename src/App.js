import React, { Suspense } from "react";
import "./App.css";
import Navigation from "./router/Navigation";

import { Route, Routes, Navigate } from "react-router-dom";

import { useContext } from "react";
import { LoginContext } from "./component/context/loginContext";
import { useSelector } from "react-redux";

const SignUp = React.lazy(() => import("./component/signup/Signup"));
const Login = React.lazy(() => import("./component/login/Login"));
const Home = React.lazy(() => import("./component/home/Home"));
const Expenses = React.lazy(() => import("./component/expenses/Expenses"));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="ui segment sementic-loader">
            <div className="ui active inverted dimmer">
              <div className="ui large text loader">Loading</div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route
              path="/signup"
              element={
                isLoggedIn ? <Navigate replace to="/home" /> : <SignUp />
              }
            />

            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate replace to="/home" />
                ) : (
                  <Navigate replace to="/signup" />
                )
              }
            />

            <Route
              path="/login"
              element={isLoggedIn ? <Navigate replace to="/home" /> : <Login />}
            />
            <Route
              path="/home"
              element={
                !isLoggedIn ? <Navigate replace to="/login" /> : <Home />
              }
            />
            <Route
              path="/expenses"
              element={
                !isLoggedIn ? <Navigate replace to="/login" /> : <Expenses />
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
