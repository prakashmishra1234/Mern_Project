import {
  Box,
  Button,
  Divider,
  Icon,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import { AuthContext } from "../../Store";
import { MuiOtpInput } from "mui-one-time-password-input";
import { AuthLogin } from "../../type/AuthType";
import MicrosoftIcon from "../../assets/MicrosoftIcon.svg";

interface IOtpForm {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  formik: any;
}

const OtpForm: React.FC<IOtpForm> = ({ formik, setIndex }) => {
  const context = useContext(AuthContext);
  const [otp, setOtp] = React.useState("");
  const [otpSent, setOtpSent] = React.useState<boolean>(false);

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleComplete = (finalValue: string) => {
    formik.setFieldValue("otp", finalValue);
  };

  const onEditClick = () => {
    setIndex(0);
  };

  const loginWithGoogle = () => {
    context.loginWithGoogle();
  };

  const loginWithMicrosoft = () => {
    context.loginWithMicrosoft();
  };

  const navigateToPasswordForm = () => {
    formik.setFieldValue("isPasswordLogin", true);
    setIndex(1);
  };

  const sendOtp = (values: AuthLogin) => {
    const response = context.sendOtp(values);
    console.log(response);
  };

  const onOtpLogin = (values: AuthLogin) => {
    context.loginWithOtp(values);
  };

  return (
    <Box m={2} component={"form"}>
      <TextField
        name="username"
        label="username / email"
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
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"flex-end"}
        sx={{ marginBottom: "1rem" }}
      >
        <Link
          onClick={() => sendOtp(formik.values)}
          sx={{ textDecoration: "none", color: "blue", cursor: "pointer" }}
        >
          {otpSent ? "Resend Otp" : "Send Otp"}
        </Link>
      </Box>
      {otpSent && (
        <>
          <MuiOtpInput
            length={4}
            autoFocus
            sx={{ marginBottom: "1rem" }}
            value={otp}
            onChange={handleChange}
            onComplete={handleComplete}
          />
          <Button
            sx={{ marginBottom: "1rem" }}
            fullWidth
            size="small"
            variant="contained"
            onClick={() => onOtpLogin(formik.values)}
          >
            Continue
          </Button>
        </>
      )}

      <Box
        sx={{
          marginBottom: "1rem",
          display: "flex",
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
        type="submit"
        variant="contained"
        onClick={navigateToPasswordForm}
        sx={{ marginBottom: "1rem" }}
      >
        Sign in With Password
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

export default OtpForm;
