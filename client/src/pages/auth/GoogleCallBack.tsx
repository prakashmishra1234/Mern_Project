import React from "react";
import { AuthContext } from "../../Store";
import { useLocation } from "react-router-dom";

const GoogleCallBack = () => {
  const context = React.useContext(AuthContext);
  const location = useLocation();

  const getParamsValue = (): string => {
    let code: string | null = "";
    const searchParams = new URLSearchParams(location.search);
    code = searchParams.get("code");
    return code ?? "";
  };

  React.useEffect(() => {
    context.loginWithGoogleResp(getParamsValue());
  }, []);
  return <></>;
};

export default GoogleCallBack;
