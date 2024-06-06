import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { AuthLogin, LoginValidator } from "../../type/AuthType";
import { AuthContext } from "../../Store";
import { Icon, TextField, Typography } from "@mui/material";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import SwipeableViews from "react-swipeable-views";
import PasswordForm from "../../Components/others/PasswordForm";
import OtpForm from "../../Components/others/OtpForm";

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

  const loginWithGoogle = () => {
    context.loginWithGoogle();
  };

  const formik = useFormik({
    initialValues: LoginValidator.initials,
    validationSchema: LoginValidator.validation,
    onSubmit: HandleSubmit,
    validateOnChange: true,
  });

  return (
    <Box m={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" fontSize={"small"} textAlign={"center"}>
            Sign In
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SwipeableViews
            index={index}
            containerStyle={{ alignItems: "center" }}
          >
            <Box
              id="LoginUserForm"
              component="form"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                name="username"
                label="Username / email"
                size="small"
                margin="dense"
                autoFocus
                fullWidth
                variant="outlined"
                autoComplete="off"
                id="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={
                  formik.touched.username && (formik.errors.username as string)
                }
              />
            </Box>
            <PasswordForm formik={formik} />
            <OtpForm formik={formik} />
          </SwipeableViews>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            size="small"
            type="submit"
            variant="contained"
            onClick={navigateToPasswordForm}
          >
            Sign in With Password
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            size="small"
            variant="contained"
            type="submit"
            onClick={navigateToOtpForm}
          >
            Sign in With Otp
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            size="small"
            onClick={loginWithGoogle}
            variant="contained"
          >
            <Icon sx={{ display: "flex" }}>
              <img alt="" src={GoogleIcon} />
            </Icon>
            Sign in With Google
          </Button>
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to="/register"
          >
            Don't have account? signup!
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
