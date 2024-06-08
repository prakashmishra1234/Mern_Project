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

interface IPasswordForm {
  onEditClick: () => void;
  navigateToOtpForm: () => void;
}

const PasswordForm: React.FC<IPasswordForm> = ({
  onEditClick,
  navigateToOtpForm,
}) => {
  const context = useContext(AuthContext);

  const loginWithGoogle = () => {
    context.loginWithGoogle();
  };

  const loginWithPassword = () => {
    alert("login with password");
  };

  return (
    <Box m={2}>
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
        fullWidth
        size="small"
        type="submit"
        variant="contained"
        onClick={loginWithPassword}
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
        type="submit"
        onClick={navigateToOtpForm}
        sx={{ marginBottom: "1rem" }}
      >
        Sign in With Otp
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

export default PasswordForm;
