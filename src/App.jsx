import Header from "./Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./registation/Login";
import Register from "./registation/Register";
import PrivateRoute from "./privateRouter/PrivateRoute";
import ToDo from "./ToDo";

function App() {
  return (
    <div className="todo">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route index path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/todo" element={<ToDo />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
