import React, { useContext } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { AuthChangePassword, PasswordValidator } from "../../type/AuthType";
import { AuthContext } from "../../Store";

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const context = useContext(AuthContext);

  const handleSubmit = (value: AuthChangePassword) => {
    context.resetPassword(token, value);
  };

  const formik = useFormik({
    initialValues: PasswordValidator.initials,
    validationSchema: PasswordValidator.validation,
    onSubmit: handleSubmit,
    validateOnChange: true,
  });

  return (
    <Box
      component="form"
      id="ResetPasswordForm"
      onSubmit={formik.handleSubmit}
      m={3}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" fontSize={"small"} textAlign={"center"}>
            Reset Password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            label="Password"
            size="small"
            margin="dense"
            fullWidth
            autoFocus
            type="password"
            variant="outlined"
            autoComplete="off"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              formik.touched.password && (formik.errors.password as string)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            size="small"
            margin="dense"
            fullWidth
            autoFocus
            variant="outlined"
            autoComplete="off"
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword &&
              (formik.errors.confirmPassword as string)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            form="ResetPasswordForm"
            type="submit"
            fullWidth
            size="small"
            variant="outlined"
          >
            Reset Password
          </Button>
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <Link to="/login">Back to login</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPassword;
