import { Button, Icon } from "@mui/material";
import MicrosoftIcon from "../../../assets/MicrosoftIcon.svg";
import React from "react";
import { getDataFromApi } from "../../../api/CustomApiCall";
import { ApiMethods } from "../../../enum/ApiMethods";

const LoginWithMicrosoftButton = () => {
  const [loading, setLoading] = React.useState(false);

  const loginWithMicrosoft = async () => {
    setLoading(true);
    const data = await getDataFromApi("/api/v1/auth/microsoft", ApiMethods.GET);
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
      Continue With Microsoft
    </Button>
  );
};

export default LoginWithMicrosoftButton;
