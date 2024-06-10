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
import { matchEmailSchema } from "../../utils/helper";

interface IEmail {
  formik: any;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const EmailForm: React.FC<IEmail> = ({ formik, setIndex }) => {
  const context = useContext(AuthContext);
  const loginWithGoogle = () => {
    context.loginWithGoogle();
  };

  const onContinueClick = React.useCallback(
    (e: any) => {
      e.preventDefault();
      if (formik.values.username === "") {
        formik.setFieldError("username", "Please provide email or username");
      } else {
        const isEmail = matchEmailSchema(formik.values.username);
        if (isEmail) {
          formik.setFieldValue("email", formik.values.username);
          formik.setFieldValue("isEmailLogin", true);
          formik.setFieldValue("username", "");
        }
        setIndex(1);
      }
    },
    [setIndex, formik]
  );

  return (
    <Box m={2} component={"form"} id="emailForm" onSubmit={onContinueClick}>
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
        sx={{ marginBottom: "1rem" }}
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.errors.username && Boolean(formik.errors.username)}
        helperText={
          formik.errors.username && (formik.errors.username as string)
        }
      />
      <Button
        fullWidth
        size="small"
        variant="contained"
        type={"submit"}
        id="emailForm"
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
