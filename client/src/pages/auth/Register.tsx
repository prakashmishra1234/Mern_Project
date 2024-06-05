import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { AuthSignUp, SignupValidator } from "../../type/AuthType";
import { AuthContext } from "../../Store";
import { TextField, Typography } from "@mui/material";

const Register: React.FC = () => {
  const context = React.useContext(AuthContext);

  const handleSubmit = (value: AuthSignUp) => {
    context.signUp(value);
  };

  const formik = useFormik({
    initialValues: SignupValidator.initials,
    validationSchema: SignupValidator.validation,
    onSubmit: handleSubmit,
    validateOnChange: true,
  });

  return (
    <Box
      id="RegisterUserForm"
      component="form"
      onSubmit={formik.handleSubmit}
      m={3}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            fontSize={"small"}
            sx={{ textAlign: "center" }}
          >
            Welcome
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="fullname"
            label="Full Name"
            size="small"
            margin="dense"
            fullWidth
            autoFocus
            variant="outlined"
            autoComplete="off"
            id="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={
              formik.touched.fullname && (formik.errors.fullname as string)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="username"
            label="Username"
            size="small"
            margin="dense"
            fullWidth
            variant="outlined"
            autoComplete="off"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={
              formik.touched.username && (formik.errors.username as string)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            size="small"
            margin="dense"
            fullWidth
            variant="outlined"
            autoComplete="off"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && (formik.errors.email as string)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            label="Password"
            size="small"
            margin="dense"
            fullWidth
            variant="outlined"
            autoComplete="off"
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              formik.touched.password && (formik.errors.password as string)
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            form="RegisterUserForm"
            type="submit"
            fullWidth
            variant="outlined"
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Link to="/login">Already registered! Login</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
