import {
  Box,
  Button,
  Divider,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import { AuthContext } from "../../Store";
import { Link } from "react-router-dom";
import { AuthLogin } from "../../type/AuthType";
import MicrosoftIcon from "../../assets/MicrosoftIcon.svg";

interface IPasswordForm {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  formik: any;
}

const PasswordForm: React.FC<IPasswordForm> = ({ formik, setIndex }) => {
  const context = useContext(AuthContext);

  const loginWithGoogle = () => {
    context.loginWithGoogle();
  };

  const navigateToOtpForm = (value: AuthLogin) => {
    formik.setFieldValue("isPasswordLogin", false);
    setIndex(2);
  };

  const onEditClick = () => {
    setIndex(0);
  };

  const onPasswordLogin = (e: any, values: AuthLogin) => {
    e.preventDefault();
    if (values.password === "") {
      formik.setFieldTouched("password", true);
    } else {
      context.login(values);
    }
  };

  const loginWithMicrosoft = () => {
    context.loginWithMicrosoft();
  };

  return (
    <Box
      m={2}
      component={"form"}
      id="passwordForm"
      onSubmit={(e) => onPasswordLogin(e, formik.values)}
    >
      <TextField
        name="username"
        label="Username / email"
        size="small"
        margin="dense"
        autoFocus
        fullWidth
        variant="standard"
        autoComplete="off"
        id="username"
        value={
          formik.values.isEmailLogin
            ? formik.values.email
            : formik.values.username
        }
        InputProps={{
          readOnly: true,
          endAdornment: (
            <Typography sx={{ cursor: "pointer" }} onClick={onEditClick}>
              Edit
            </Typography>
          ),
        }}
        sx={{ marginBottom: "1rem" }}
      />
      <TextField
        name="password"
        label="Password"
        size="small"
        margin="dense"
        autoFocus
        fullWidth
        variant="standard"
        autoComplete="off"
        id="password"
        sx={{ marginBottom: "1rem" }}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password && (formik.errors.password as string)
        }
      />
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"flex-end"}
        sx={{ marginBottom: "1rem" }}
      >
        <Link
          style={{ textDecoration: "none", color: "#000" }}
          to="/forgot-password"
        >
          Forget Password?
        </Link>
      </Box>

      <Button
        sx={{ marginBottom: "1rem" }}
        fullWidth
        size="small"
        variant="contained"
        id="passwordForm"
        type="submit"
      >
        Continue
      </Button>
      <Box
        sx={{
          display: "flex",
          marginBottom: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Divider sx={{ width: "43%" }} />
        <Typography sx={{ width: "14%", textAlign: "center" }}>or</Typography>
        <Divider sx={{ width: "43%" }} />
      </Box>
      <Button
        fullWidth
        size="small"
        variant="contained"
        onClick={() => navigateToOtpForm(formik.values)}
        sx={{ marginBottom: "1rem" }}
      >
        Sign in With Otp
      </Button>
      <Button
        fullWidth
        size="small"
        onClick={loginWithGoogle}
        variant="contained"
        sx={{ marginBottom: "1rem" }}
      >
        <Icon sx={{ display: "flex" }}>
          <img alt="" src={GoogleIcon} />
        </Icon>
        Continue With Google
      </Button>
      <Button
        fullWidth
        size="small"
        onClick={loginWithMicrosoft}
        variant="contained"
      >
        <Icon sx={{ display: "flex" }}>
          <img alt="" src={MicrosoftIcon} />
        </Icon>
        Continue With Microsoft
      </Button>
    </Box>
  );
};

export default PasswordForm;
