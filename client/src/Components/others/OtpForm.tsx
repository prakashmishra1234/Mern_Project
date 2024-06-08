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

interface IOtpForm {
  onEditClick: () => void;
  navigateToPasswordForm: () => void;
}

const OtpForm: React.FC<IOtpForm> = ({
  navigateToPasswordForm,
  onEditClick,
}) => {
  const context = useContext(AuthContext);
  const loginWithGoogle = () => {
    context.loginWithGoogle();
  };
  const loginWithOtp = () => {
    alert("login with otp");
  };
  return (
    <Box m={2}>
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
        name="otp"
        label="otp"
        size="small"
        margin="dense"
        autoFocus
        fullWidth
        variant="standard"
        autoComplete="off"
        id="otp"
        sx={{ marginBottom: "1rem" }}
      />
      <Button
        sx={{ marginBottom: "1rem" }}
        fullWidth
        size="small"
        type="submit"
        variant="contained"
        onClick={loginWithOtp}
      >
        Continue
      </Button>

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
      >
        <Icon sx={{ display: "flex" }}>
          <img alt="" src={GoogleIcon} />
        </Icon>
        Continue With Google
      </Button>
    </Box>
  );
};

export default OtpForm;
