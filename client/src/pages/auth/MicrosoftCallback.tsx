import React from "react";
import { AuthContext } from "../../Store";
import { useLocation } from "react-router-dom";

const MicrosoftCallback = () => {
  const context = React.useContext(AuthContext);
  const location = useLocation();

  const getParamsValue = (
    search: string
  ): {
    code: string | null;
    state: string | null;
  } => {
    let params: {
      code: string | null;
      state: string | null;
    } = {
      code: "",
      state: "",
    };
    const searchParams = new URLSearchParams(search);
    params.code = searchParams.get("code");
    params.state = searchParams.get("state");
    return params;
  };

  React.useEffect(() => {
    const params = getParamsValue(location.search);
    context.loginWithMicrosoftResp(params.code ?? "", params.state ?? "");
  }, []);

  return <></>;
};

export default MicrosoftCallback;
