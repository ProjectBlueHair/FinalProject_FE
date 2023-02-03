import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import App from "./App";
import ModalContainer from "./component/modal/ModalContainer";
import ServerDown from "./page/ServerDown";
import store from "./redux/config";
if (process.env.NODE_ENV === "development") {
  // worker.start({ onUnhandledRequest: "bypass" });
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      {/* <App /> */}
      <ServerDown/>
      <ModalContainer />
    </Provider>
  </QueryClientProvider>
);
