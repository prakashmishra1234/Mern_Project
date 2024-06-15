import React from "react";
import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { useFormik } from "formik";
import { AuthLogin, LoginValidator } from "../../type/AuthType";
import LoginWithGoogleButton from "../../Components/others/auth/LoginWithGoogleButton";
import LoginWithMicrosoftButton from "../../Components/others/auth/LoginWithMicrosoftButton";
import { Link } from "react-router-dom";
import LoginWithPasswordForm from "../../Components/others/auth/LoginWithPasswordForm";

const Login: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  const handleLoginFormSubmit = (values: AuthLogin) => {
    alert(1);
  };

  const formik = useFormik({
    initialValues: LoginValidator.initials,
    validationSchema: LoginValidator.validation,
    onSubmit: handleLoginFormSubmit,
    validateOnChange: true,
  });

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
        <React.Fragment>
          <LoginWithPasswordForm />
        </React.Fragment>
      </SwipeableViews>
      <Box
        sx={{ marginBottom: "1rem" }}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Link style={{ textDecoration: "none", color: "#000" }} to="/register">
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

      <LoginWithGoogleButton />
      <LoginWithMicrosoftButton />
    </Box>
  );
};

export default Login;
