import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { AuthLogin, LoginValidator } from "../../type/AuthType";
import { AuthContext } from "../../Store";
import { IconButton, TextField, Typography } from "@mui/material";
import GoogleIcon from "../../assets/GoogleIcon.png";

const Login: React.FC = () => {
  const context = React.useContext(AuthContext);

  const HandleSubmit = (value: AuthLogin) => {
    context.login(value);
  };

  const formik = useFormik({
    initialValues: LoginValidator.initials,
    validationSchema: LoginValidator.validation,
    onSubmit: HandleSubmit,
    validateOnChange: true,
  });

  return (
    <Box
      id="LoginUserForm"
      component="form"
      onSubmit={formik.handleSubmit}
      m={3}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" fontSize={"small"} textAlign={"center"}>
            Login
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={
              formik.touched.username && (formik.errors.username as string)
            }
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
          <Typography textAlign={"end"}>
            <Link
              style={{ textDecoration: "none", color: "#000" }}
              to="/forgot-password"
            >
              Forgot password?
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            form="LoginUserForm"
            type="submit"
            fullWidth
            size="small"
            variant="outlined"
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Box
              component={"img"}
              src={GoogleIcon}
              height={"1.7rem"}
              width={"1.7rem"}
            />
            <Typography width={"100%"} textAlign={"center"}>
              Login with google
            </Typography>
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
