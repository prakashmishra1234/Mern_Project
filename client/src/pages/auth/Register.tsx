import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { AuthSignUp, SignupValidator } from "../../type/AuthType";
import { AuthContext } from "../../Store";
import { Divider, TextField, Typography } from "@mui/material";
import LoginWithGoogleButton from "../../Components/others/auth/LoginWithGoogleButton";
import LoginWithMicrosoftButton from "../../Components/others/auth/LoginWithMicrosoftButton";

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
      m={4}
    >
      <Typography
        variant="h4"
        fontSize={"small"}
        sx={{ textAlign: "center", marginBottom: "1rem" }}
      >
        Welcome
      </Typography>

      <TextField
        name="fullname"
        label="Full Name"
        size="small"
        margin="dense"
        fullWidth
        autoFocus
        variant="standard"
        autoComplete="off"
        id="fullname"
        value={formik.values.fullname}
        onChange={formik.handleChange}
        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
        helperText={
          formik.touched.fullname && (formik.errors.fullname as string)
        }
        sx={{ marginBottom: "1rem" }}
      />

      <TextField
        name="email"
        label="Email"
        size="small"
        margin="dense"
        fullWidth
        variant="standard"
        autoComplete="off"
        id="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && (formik.errors.email as string)}
        sx={{ marginBottom: "1rem" }}
      />

      <TextField
        name="password"
        label="Password"
        size="small"
        margin="dense"
        fullWidth
        variant="standard"
        autoComplete="off"
        id="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password && (formik.errors.password as string)
        }
        sx={{ marginBottom: "1rem" }}
      />

      <Button
        form="RegisterUserForm"
        type="submit"
        fullWidth
        variant="contained"
        sx={{ marginBottom: "1rem" }}
      >
        Sign Up
      </Button>

      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        sx={{ marginBottom: "1rem" }}
      >
        <Link to="/Auth">Already registered! Login</Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <Divider sx={{ width: "43%" }} />
        <Typography sx={{ width: "14%", textAlign: "center" }}>or</Typography>
        <Divider sx={{ width: "43%" }} />
      </Box>
      <LoginWithGoogleButton />
      <LoginWithMicrosoftButton />
    </Box>
  );
};

export default Register;
