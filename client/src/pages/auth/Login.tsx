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

  const handleLoginFormSubmit = (values: AuthLogin) => {
    alert(1);
  };

  const formik = useFormik({
    initialValues: LoginValidator.initials,
    validationSchema: LoginValidator.validation,
    onSubmit: handleLoginFormSubmit,
    validateOnChange: true,
  });

  // console.log(formik.values);

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
        <EmailForm formik={formik} setIndex={setIndex} />

        <PasswordForm setIndex={setIndex} formik={formik} />
        <OtpForm setIndex={setIndex} formik={formik} />
      </SwipeableViews>
    </Box>
  );
};

export default Login;
