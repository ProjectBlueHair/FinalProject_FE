import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/config";
import { Provider } from "react-redux";
import ModalContainer from "./component/modal/ModalContainer";
import { QueryClient, QueryClientProvider } from "react-query";
if (process.env.NODE_ENV === "development") {
  // worker.start({ onUnhandledRequest: "bypass" });
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
      <ModalContainer />
    </Provider>
  </QueryClientProvider>
);
