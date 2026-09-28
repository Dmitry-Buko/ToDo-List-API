import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./shared/styles/index.css";
import App from "./app/App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/ToDo-List-API">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
