import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app/App.jsx";
import { ToDoProvider } from "./todo/context/ToDoProvider.jsx";
import { Provider } from "react-redux";
import store from "./todo/RTK/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/ToDo-List-API">
    <Provider store={store}>
      <ToDoProvider>
        <App />
      </ToDoProvider>
    </Provider>
  </BrowserRouter>,
);
