import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { AuthLogin, LoginValidator } from "../../type/AuthType";
import { AuthContext } from "../../Store";
import { Typography } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import PasswordForm from "../../Components/others/PasswordForm";
import OtpForm from "../../Components/others/OtpForm";
import EmailForm from "../../Components/others/EmailForm";

const Login: React.FC = () => {
  const context = React.useContext(AuthContext);
  const [index, setIndex] = React.useState(0);

  const navigateToEmailForm = () => {
    setIndex(0);
  };

  const navigateToPasswordForm = () => {
    setIndex(1);
  };

  const navigateToOtpForm = () => {
    setIndex(2);
  };

  const HandleSubmit = (value: AuthLogin) => {
    console.log(value);
  };

  const formik = useFormik({
    initialValues: LoginValidator.initials,
    validationSchema: LoginValidator.validation,
    onSubmit: HandleSubmit,
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
        <EmailForm
          formik={formik}
          navigateToPasswordForm={navigateToPasswordForm}
        />
        <PasswordForm
          formik={formik}
          onEditClick={navigateToEmailForm}
          navigateToOtpForm={navigateToOtpForm}
        />
        <OtpForm
          formik={formik}
          onEditClick={navigateToEmailForm}
          navigateToPasswordForm={navigateToPasswordForm}
        />
      </SwipeableViews>
    </Box>
  );
};

export default Login;
