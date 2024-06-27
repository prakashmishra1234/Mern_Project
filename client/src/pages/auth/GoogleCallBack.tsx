import React from "react";
import { AuthContext } from "../../Store";
import { useLocation } from "react-router-dom";
import { getDataFromApi } from "../../api/CustomApiCall";
import { ApiMethods } from "../../enum/ApiMethods";

const GoogleCallBack = () => {
  const context = React.useContext(AuthContext);
  const location = useLocation();

  const getParamsValue = (): string => {
    let code: string | null = "";
    const searchParams = new URLSearchParams(location.search);
    code = searchParams.get("code");
    return code ?? "";
  };

  const loginWithGoogleResponse = async (code: string) => {
    const data = await getDataFromApi(
      `/api/v1/auth/google/callback?code=${code}`,
      ApiMethods.GET
    );
  };

  React.useEffect(() => {
    loginWithGoogleResponse(getParamsValue());
  }, []);
  return <></>;
};

export default GoogleCallBack;
