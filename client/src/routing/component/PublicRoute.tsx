import React from "react";
import { Navigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../../constant";

const PublicRoute = (props: any) => {
  const value = document.cookie;
  const temp = value.split("=");

  if (temp[0] !== "token")
    return <React.Fragment>{props.children}</React.Fragment>;

  return <Navigate to="/home" />;
};

export default PublicRoute;
