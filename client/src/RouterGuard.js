import { Navigate } from "react-router-dom";

const RouterGuard = ({ component: Component }) => {
  const isToken = localStorage.getItem("token") ? true : false;
  return isToken ? <Component /> : <Navigate to="/login" />;
};

export default RouterGuard;
