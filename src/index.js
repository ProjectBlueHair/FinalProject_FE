import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/config";
import { Provider } from "react-redux";

import { worker } from "./mocks/worker";
import ModalContainer from "./component/modal/ModalContainer";

if (process.env.NODE_ENV === "development") {
  worker.start({ onUnhandledRequest: "bypass" });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
    <ModalContainer />
  </Provider>
);
