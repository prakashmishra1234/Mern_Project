import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { AuthLogin, LoginValidator } from "../../type/AuthType";

interface IOtpForm {
  formik: any;
}

const OtpForm: React.FC<IOtpForm> = ({ formik }) => {
  return (
    <Box id="LoginUserForm" component="form">
      <TextField
        disabled
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
      <TextField
        name="otp"
        label="Otp"
        size="small"
        margin="dense"
        autoFocus
        fullWidth
        variant="outlined"
        autoComplete="off"
        id="otp"
        value={formik.values.otp}
        onChange={formik.handleChange}
        error={formik.touched.otp && Boolean(formik.errors.otp)}
        helperText={formik.touched.otp && (formik.errors.otp as string)}
      />
    </Box>
  );
};

export default OtpForm;
