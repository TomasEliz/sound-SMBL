import React from "react";
import ReactDOM from "react-dom";
import Routes from "./components/Routes";
import store from "./context/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
