import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import {
  AuthForm,
  SignupValidator,
  setLocalStorageData,
} from "../../utils/helper";
import axios from "axios";
import { AuthContext } from "../../Store";
import { Paper, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { LOCAL_STORAGE_KEY } from "../../constant";

const Register = () => {
  const context = React.useContext(AuthContext);
  const navigate = useNavigate();

  // const getCountryCode = () => {
  //   context.setLoading(true);
  //   axios
  //     .get("/api/v1/countrycode")
  //     .then((res) => {
  //       setcountryCodes(res.data.countries ?? []);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       context.setLoading(false);
  //     });
  // };

  const handleSubmit = (value: AuthForm) => {
    context.setLoading(true);
    axios
      .post("/api/v1/register", value)
      .then((res) => {
        toast.success(res.data.message);
        setLocalStorageData(LOCAL_STORAGE_KEY, res.data.id);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message ?? "Something went wrong");
        console.log(err);
      })
      .finally(() => {
        context.setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: SignupValidator.initials,
    validationSchema: SignupValidator.validation,
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
        id="RegisterUserForm"
        component="form"
        onSubmit={formik.handleSubmit}
        m={3}
        width={{ md: "35%", xs: "100%" }}
      >
        <Paper elevation={3} sx={{ padding: "0.8rem", borderRadius: "1rem" }}>
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
                error={
                  formik.touched.fullname && Boolean(formik.errors.fullname)
                }
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
                helperText={
                  formik.touched.email && (formik.errors.email as string)
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
                form="RegisterUserForm"
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Link to="/login">Already registered! Login</Link>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
