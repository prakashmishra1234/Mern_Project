import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Store";

const PublicRoute = (props: any) => {
  const context = useContext(AuthContext);

  if (!context.isUserVerifcationCompleted) return <></>;

  if (context.isUserVerifcationCompleted && !context.user)
    return <React.Fragment>{props.children}</React.Fragment>;

  return <Navigate to="/home" />;
};

export default PublicRoute;
