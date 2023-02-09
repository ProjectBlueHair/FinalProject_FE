import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import ModalContainer from "./component/modal/ModalContainer";
import store from "./redux/config";
if (process.env.NODE_ENV === "development") {
  // worker.start({ onUnhandledRequest: "bypass" });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
    {/* <ServerDown/> */}
    <ModalContainer />
  </Provider>
);
