import { Box, TextField } from "@mui/material";
import React from "react";

interface IPasswordForm {
  formik: any;
}

const PasswordForm: React.FC<IPasswordForm> = ({ formik }) => {
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
        name="password"
        label="Password"
        size="small"
        margin="dense"
        autoFocus
        fullWidth
        variant="outlined"
        autoComplete="off"
        id="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={
          formik.touched.password && (formik.errors.password as string)
        }
      />
    </Box>
  );
};

export default PasswordForm;
