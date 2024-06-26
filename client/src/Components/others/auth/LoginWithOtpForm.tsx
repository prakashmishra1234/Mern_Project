import { Box, Button, Link, TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  LoginWithOtp,
  LoginWithOtpType,
  LoginWithPasswordType,
} from "../../../type/AuthType";
import React from "react";
import { AuthContext } from "../../../Store";
import { MuiOtpInput } from "mui-one-time-password-input";
import SwipeableViews from "react-swipeable-views";
import { getDataFromApi } from "../../../api/CustomApiCall";
import { ApiMethods } from "../../../enum/ApiMethods";
import { getToastMessage } from "../../common/ToastMessage";
import { ToastMessageEnumType } from "../../../enum/ToastMessage";

const LoginWithOtpForm = () => {
  const context = React.useContext(AuthContext);

  const [otp, setOtp] = React.useState("");

  const navigateToEmailForm = () => {
    formik.setFieldValue("formIndex", 0);
  };

  const navigateToOtpForm = () => {
    formik.setFieldValue("formIndex", 1);
  };

  const handleComplete = (finalValue: string) => {
    formik.setFieldValue("otp", finalValue);
  };

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const sendOtp = async (values: LoginWithOtpType) => {
    context.setLoading(true);
    const data = await getDataFromApi(
      `/api/v1/sendOtp?email=${values.email}`,
      ApiMethods.GET
    );
    if (data.success) {
      getToastMessage({
        type: ToastMessageEnumType.success,
        messgae: data.message,
      });
      navigateToOtpForm();
    } else {
      getToastMessage({
        type: ToastMessageEnumType.error,
        messgae: data.message,
      });
    }
    context.setLoading(false);
  };

  const VerifyOtp = async (values: LoginWithOtpType) => {
    context.setLoading(true);
    const data = await getDataFromApi(
      `/api/v1/verifyOtp`,
      ApiMethods.POST,
      {},
      values
    );
    if (data.success) {
      getToastMessage({
        type: ToastMessageEnumType.success,
        messgae: data.message,
      });
      navigateToOtpForm();
    } else {
      getToastMessage({
        type: ToastMessageEnumType.error,
        messgae: data.message,
      });
    }
    context.setLoading(false);
  };

  const handleSubmit = async (values: LoginWithOtpType) => {
    values.formIndex === 0 ? await sendOtp(values) : await VerifyOtp(values);
  };

  const formik = useFormik({
    initialValues: LoginWithOtp.initials,
    validationSchema: LoginWithOtp.validation,
    onSubmit: handleSubmit,
  });

  return (
    <Box
      px={2}
      component={"form"}
      id="emailOtpForm"
      onSubmit={formik.handleSubmit}
    >
      <SwipeableViews
        index={formik.values.formIndex}
        containerStyle={{ alignItems: "center" }}
        enableMouseEvents={false}
      >
        <React.Fragment>
          <TextField
            name="email"
            label="Email"
            size="small"
            margin="dense"
            fullWidth
            variant="standard"
            autoComplete="off"
            id="email"
            sx={{ marginBottom: "1rem" }}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && (formik.errors.email as string)}
          />
        </React.Fragment>
        <React.Fragment>
          <Box px={2}>
            <MuiOtpInput
              length={4}
              autoFocus
              sx={{ marginBottom: "1rem" }}
              value={otp}
              onChange={handleChange}
              onComplete={handleComplete}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Link
                sx={{
                  cursor: "pointer",
                }}
                onClick={navigateToEmailForm}
              >
                Back
              </Link>
              <Link
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => sendOtp(formik.values)}
              >
                Resend otp
              </Link>
            </Box>
          </Box>
        </React.Fragment>
      </SwipeableViews>
      <Button
        fullWidth
        size="small"
        variant="contained"
        type={"submit"}
        form="emailOtpForm"
        sx={{ marginBottom: "1rem" }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default LoginWithOtpForm;
