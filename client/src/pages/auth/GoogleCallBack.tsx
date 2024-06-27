import React from "react";
import { AuthContext } from "../../Store";
import { useLocation, useNavigate } from "react-router-dom";
import { getDataFromApi } from "../../api/CustomApiCall";
import { ApiMethods } from "../../enum/ApiMethods";
import { getToastMessage } from "../../Components/common/ToastMessage";
import { ToastMessageEnumType } from "../../enum/ToastMessage";

const GoogleCallBack = () => {
  const context = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getParamsValue = (): string => {
    let code: string | null = "";
    const searchParams = new URLSearchParams(location.search);
    code = searchParams.get("code");
    return code ?? "";
  };

  const loginWithGoogleResponse = async (code: string) => {
    context.setLoading(true);
    const data = await getDataFromApi(
      `/api/v1/auth/google/callback?code=${code}`,
      ApiMethods.GET
    );

    if (data.success) {
      const user = await getDataFromApi("/api/v1/me", ApiMethods.GET);
      if (user.success) {
        context.setUser(user.data);
        navigate("/home");
      } else {
        context.logout();
      }
    } else {
      getToastMessage({
        type: ToastMessageEnumType.error,
        messgae: data.message,
      });
      navigate("/login");
    }
    context.setLoading(false);
  };

  React.useEffect(() => {
    loginWithGoogleResponse(getParamsValue());
  }, []);
  return <></>;
};

export default GoogleCallBack;
