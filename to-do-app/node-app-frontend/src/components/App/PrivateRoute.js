import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {

const isAuthenticated = localStorage.isAuthenticated;
 
  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};
export default PrivateRoute;