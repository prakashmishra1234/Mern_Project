import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Store";

const ProtectedRoute = (props: any) => {
  const context = useContext(AuthContext);

  if (context.isUserVerified)
    return <React.Fragment>{props.children}</React.Fragment>;

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
