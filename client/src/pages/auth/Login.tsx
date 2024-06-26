import React from "react";
import Box from "@mui/material/Box";
import { Button, Divider, Typography } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import LoginWithGoogleButton from "../../Components/others/auth/LoginWithGoogleButton";
import LoginWithMicrosoftButton from "../../Components/others/auth/LoginWithMicrosoftButton";
import { Link } from "react-router-dom";
import LoginWithPasswordForm from "../../Components/others/auth/LoginWithPasswordForm";
import LoginWithOtpForm from "../../Components/others/auth/LoginWithOtpForm";

const Login: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  const navigateToPasswordForm = () => {
    setIndex(0);
  };

  const navigateToOtpForm = () => {
    setIndex(1);
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
        <LoginWithPasswordForm />
        <LoginWithOtpForm />
      </SwipeableViews>
      <Box px={2}>
        <Box
          sx={{ marginBottom: "1rem" }}
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to="/register"
          >
            Don't have account? Signup!
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <Divider sx={{ width: "43%" }} />
          <Typography sx={{ width: "14%", textAlign: "center" }}>or</Typography>
          <Divider sx={{ width: "43%" }} />
        </Box>

        {index === 0 && (
          <Button
            fullWidth
            size="small"
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            onClick={navigateToOtpForm}
          >
            Login using otp
          </Button>
        )}

        {index === 1 && (
          <Button
            fullWidth
            size="small"
            variant="contained"
            sx={{ marginBottom: "1rem" }}
            onClick={navigateToPasswordForm}
          >
            Login using password
          </Button>
        )}

        <LoginWithGoogleButton />
        <LoginWithMicrosoftButton />
      </Box>
    </Box>
  );
};

export default Login;
