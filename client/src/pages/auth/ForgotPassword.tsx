import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
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
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          " linear-gradient(0deg, rgba(34,193,195,1) 27%, rgba(45,129,253,1) 71%)",
      }}
    >
      <Box
        component="form"
        id="ForgotPasswordForm"
        onSubmit={formik.handleSubmit}
        m={3}
        width={{ sm: "45%", md: "35%", xs: "100%" }}
      >
        <Paper elevation={3} sx={{ padding: "0.8rem", borderRadius: "1rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" fontSize={"small"} textAlign={"center"}>
                Forget Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                size="small"
                margin="dense"
                fullWidth
                autoFocus
                variant="outlined"
                autoComplete="off"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={
                  formik.touched.email && (formik.errors.email as string)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                form="ForgotPasswordForm"
                type="submit"
                fullWidth
                size="small"
                variant="contained"
              >
                Send Reset Link
              </Button>
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
              <Link to="/login">Back to login</Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
