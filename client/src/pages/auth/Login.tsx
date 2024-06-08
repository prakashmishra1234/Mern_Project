import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import PasswordForm from "../../Components/others/PasswordForm";
import OtpForm from "../../Components/others/OtpForm";
import EmailForm from "../../Components/others/EmailForm";

const Login: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  const navigateToEmailForm = () => {
    setIndex(0);
  };

  const navigateToPasswordForm = () => {
    setIndex(1);
  };

  const navigateToOtpForm = async () => {
    setIndex(2);
  };

  return (
    <Box m={2}>
      <Typography variant="h4" fontSize={"small"} textAlign={"center"}>
        Sign In
      </Typography>

      <SwipeableViews
        index={index}
        containerStyle={{ alignItems: "center" }}
        enableMouseEvents={false}
      >
        <EmailForm navigateToPasswordForm={navigateToPasswordForm} />
        <PasswordForm
          onEditClick={navigateToEmailForm}
          navigateToOtpForm={navigateToOtpForm}
        />
        <OtpForm
          onEditClick={navigateToEmailForm}
          navigateToPasswordForm={navigateToPasswordForm}
        />
      </SwipeableViews>
    </Box>
  );
};

export default Login;
