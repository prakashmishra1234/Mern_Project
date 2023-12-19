import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const value = document.cookie;
  const temp = value.split("=");

  if (temp[0] === "token")
    return <React.Fragment>{props.children}</React.Fragment>;

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
