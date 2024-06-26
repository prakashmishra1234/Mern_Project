import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext } from "react";
import {
  AuthForgetPassword,
  ForgotPasswordValidator,
} from "../../type/AuthType";
import { AuthContext } from "../../Store";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const context = useContext(AuthContext);

  const handleSubmit = (value: AuthForgetPassword) => {
    context.forgetPassword(value);
  };
  const formik = useFormik({
    initialValues: ForgotPasswordValidator.initials,
    validationSchema: ForgotPasswordValidator.validation,
    onSubmit: handleSubmit,
    validateOnChange: true,
  });

  return (
    <Box
      component="form"
      id="ForgotPasswordForm"
      onSubmit={formik.handleSubmit}
      m={4}
    >
      <Typography
        variant="h4"
        fontSize={"small"}
        textAlign={"center"}
        sx={{ marginBottom: "1rem" }}
      >
        Forget Password
      </Typography>
      <TextField
        name="email"
        label="Email"
        size="small"
        margin="dense"
        fullWidth
        autoFocus
        variant="standard"
        autoComplete="off"
        id="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && (formik.errors.email as string)}
        sx={{ marginBottom: "1rem" }}
      />
      <Button
        form="ForgotPasswordForm"
        type="submit"
        fullWidth
        size="small"
        variant="contained"
        sx={{ marginBottom: "1rem" }}
      >
        Send Reset Link
      </Button>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        sx={{ marginBottom: "1rem" }}
      >
        <Link style={{ textDecoration: "none", color: "#000" }} to="/Auth">
          Back to login?
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
