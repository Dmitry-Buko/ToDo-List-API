import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ ...props }) => {
  const isAuth = localStorage.getItem('token')
  return isAuth ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
