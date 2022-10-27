import React, { Suspense } from "react";
import "./App.css";
import Navigation from "./router/Navigation";

import { Route, Routes, Navigate } from "react-router-dom";

import { useContext } from "react";
import Login from "./component/login/Login";
import Home from "./component/home/Home";

const SignUp = React.lazy(() => import("./component/signup/Signup"));

function App() {
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
            <Route path="signup" element={<SignUp />} />
            <Route path="/" element={<Navigate replace to="/signup" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
