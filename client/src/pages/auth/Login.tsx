import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import PasswordForm from "../../Components/others/PasswordForm";
import OtpForm from "../../Components/others/OtpForm";
import EmailForm from "../../Components/others/EmailForm";
import { useFormik } from "formik";
import { AuthLogin, LoginValidator } from "../../type/AuthType";

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

  const handleLoginFormSubmit = (values: AuthLogin) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: LoginValidator.initials,
    validationSchema: LoginValidator.validation,
    onSubmit: handleLoginFormSubmit,
    validateOnChange: true,
  });

  return (
    <Box m={2} component={"form"} id="loginForm" onSubmit={formik.handleSubmit}>
      <Typography variant="h4" fontSize={"small"} textAlign={"center"}>
        Sign In
      </Typography>

      <SwipeableViews
        index={index}
        containerStyle={{ alignItems: "center" }}
        enableMouseEvents={false}
      >
        <EmailForm formik={formik} setIndex={setIndex} />

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
