import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { AuthLogin, LoginValidator } from "../../type/AuthType";
import { AuthContext } from "../../Store";
import { Paper, TextField, Typography } from "@mui/material";
import backgorundImageForAuthComp from "../../assets/backgorundImageForAuthComp.jpeg";

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
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgorundImageForAuthComp})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        id="LoginUserForm"
        component="form"
        onSubmit={formik.handleSubmit}
        m={3}
        width={{ sm: "45%", md: "35%", xs: "100%" }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "0.8rem",
            borderRadius: "1rem",
            boxShadow: "0 0 40px rgba(8,7,16,0.6)",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255,255,255,0.13)",
          }}
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
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={
                  formik.touched.password && (formik.errors.password as string)
                }
              />
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
            <Grid item xs={12} textAlign={"center"}>
              <Link to="/forgot-password">Forgot password?</Link>
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
              <Link to="/register">Don't have account? signup!</Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
