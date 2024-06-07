import React, { useContext } from "react";
import {
  Box,
  Button,
  Divider,
  Icon,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import { AuthContext } from "../../Store";
import { Link } from "react-router-dom";

interface IEmail {
  formik: any;
  navigateToPasswordForm: () => void;
}

const EmailForm: React.FC<IEmail> = ({ formik, navigateToPasswordForm }) => {
  const context = useContext(AuthContext);
  const loginWithGoogle = () => {
    context.loginWithGoogle();
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
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={
          formik.touched.username && (formik.errors.username as string)
        }
        sx={{ marginBottom: "1rem" }}
      />
      <Button
        fullWidth
        size="small"
        type="submit"
        variant="contained"
        onClick={navigateToPasswordForm}
        sx={{ marginBottom: "1rem" }}
      >
        Continue
      </Button>
      <Box
        sx={{ marginBottom: "1rem" }}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Link style={{ textDecoration: "none", color: "#000" }} to="/register">
          Don't have account? signup!
        </Link>
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

export default EmailForm;
