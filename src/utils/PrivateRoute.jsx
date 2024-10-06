// utils/PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
