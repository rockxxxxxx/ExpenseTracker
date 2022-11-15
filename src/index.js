import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToasterContextProvider } from "./component/context/toasterContext";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./component/context/modalContext";
import { LoginProvider } from "./component/context/loginContext";
import { ExpenseDataProvider } from "./component/context/expenseDataContext";
import { Provider } from "react-redux";
import { store } from "./reducers/authReducr";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <LoginProvider>
        <ModalContextProvider>
          <ToasterContextProvider>
            <ExpenseDataProvider>
              <App />
            </ExpenseDataProvider>
          </ToasterContextProvider>
        </ModalContextProvider>
      </LoginProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
