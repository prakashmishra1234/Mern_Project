import { Button, Icon } from "@mui/material";
import MicrosoftIcon from "../../../assets/MicrosoftIcon.svg";
import React from "react";
import { getDataFromApi } from "../../../api/CustomApiCall";
import { ApiMethods } from "../../../enum/ApiMethods";
import { getToastMessage } from "../../common/ToastMessage";
import { ToastMessageEnumType } from "../../../enum/ToastMessage";

const LoginWithMicrosoftButton = () => {
  const [loading, setLoading] = React.useState(false);

  const loginWithMicrosoft = async () => {
    setLoading(true);
    const data = await getDataFromApi("/api/v1/auth/microsoft", ApiMethods.GET);
    if (data.success && data.data) {
      window.location.href = data.data;
    } else {
      getToastMessage({
        type: ToastMessageEnumType.error,
        messgae: data.data.message,
      });
    }
    setLoading(false);
  };

  return (
    <Button
      fullWidth
      size="small"
      onClick={loginWithMicrosoft}
      variant="contained"
    >
      <Icon sx={{ display: "flex" }}>
        <img alt="" src={MicrosoftIcon} />
      </Icon>
      {!loading ? "Continue With Microsoft" : "Loading..."}
    </Button>
  );
};

export default LoginWithMicrosoftButton;
