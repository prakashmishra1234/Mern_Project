import { Button, Icon } from "@mui/material";
import GoogleIcon from "../../../assets/GoogleIcon.svg";
import React from "react";
import { getDataFromApi } from "../../../api/CustomApiCall";
import { ApiMethods } from "../../../enum/ApiMethods";

const LoginWithGoogleButton = () => {
  const [loading, setLoading] = React.useState(false);

  const loginWithGoogle = async () => {
    setLoading(true);
    const data = await getDataFromApi("/api/v1/auth/google", ApiMethods.GET);
    setLoading(false);
  };

  return (
    <Button
      fullWidth
      size="small"
      onClick={loginWithGoogle}
      variant="contained"
      sx={{ marginBottom: "1rem" }}
    >
      <Icon sx={{ display: "flex" }}>
        <img alt="" src={GoogleIcon} />
      </Icon>
      {!loading ? "Continue With Google" : "Loading..."}
    </Button>
  );
};

export default LoginWithGoogleButton;
