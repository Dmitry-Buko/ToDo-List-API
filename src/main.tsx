import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./shared/styles/index.css";
import App from "./app/App";
import { Provider } from "react-redux";
import store from "./app/store";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <BrowserRouter basename="/ToDo-List-API">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);