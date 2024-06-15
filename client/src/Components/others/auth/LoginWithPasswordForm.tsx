import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  LoginWithPassword,
  LoginWithPasswordType,
} from "../../../type/AuthType";
import { useContext } from "react";
import { AuthContext } from "../../../Store";
import { ApiMethods } from "../../../enum/ApiMethods";
import { getDataFromApi } from "../../../api/CustomApiCall";
import { getToastMessage } from "../../common/ToastMessage";
import { ToastMessageEnumType } from "../../../enum/ToastMessage";

const LoginWithPasswordForm = () => {
  const context = useContext(AuthContext);
  const handleSubmit = async (values: LoginWithPasswordType) => {
    context.setLoading(true);
    const data = await getDataFromApi(
      "/api/v1/login",
      ApiMethods.POST,
      {},
      values
    );
    if (data.success) {
    } else {
      getToastMessage({
        type: ToastMessageEnumType.error,
        messgae: data.message,
      });
    }
    context.setLoading(false);
  };

  const formik = useFormik({
    initialValues: LoginWithPassword.initials,
    onSubmit: handleSubmit,
    validationSchema: LoginWithPassword.validation,
    validateOnChange: true,
  });

  return (
    <Box component={"form"} id="emailForm" onSubmit={formik.handleSubmit}>
      <TextField
        name="email"
        label="Email"
        size="small"
        margin="dense"
        fullWidth
        variant="standard"
        autoComplete="off"
        id="email"
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
    </Box>
  );
};

export default LoginWithPasswordForm;
