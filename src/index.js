import React from "react";
import ReactDOM from "react-dom";
import "./assets/main.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { FeedProvider } from "./context/FeedContext";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FeedProvider>
          <App />
        </FeedProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
