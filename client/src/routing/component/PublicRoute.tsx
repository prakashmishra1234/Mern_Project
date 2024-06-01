import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Store";

const PublicRoute = (props: any) => {
  const context = useContext(AuthContext);

  if (!context.isUserVerified)
    return <React.Fragment>{props.children}</React.Fragment>;

  return <Navigate to="/home" />;
};

export default PublicRoute;
