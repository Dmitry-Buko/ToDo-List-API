import Header from "./Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./registation/Login";
const Register = lazy(() => import("./registation/Register"));
import PrivateRoute from "./privateRouter/PrivateRoute";
import ToDo from "./ToDo";
import { lazy, Suspense } from "react";

function App() {
  return (
    <div className="todo">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route index path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Register />
            </Suspense>
          }
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/todo"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <ToDo />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
