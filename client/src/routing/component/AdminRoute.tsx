import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Store";

const AdminRoute = (props: any) => {
  const context = useContext(AuthContext);
  const location = useLocation();

  if (context?.user && context?.user.role === "admin")
    return <React.Fragment>{props.children}</React.Fragment>;

  const from = location.state?.from?.pathname || "/home";

  return <Navigate to={from} />;
};

export default AdminRoute;
