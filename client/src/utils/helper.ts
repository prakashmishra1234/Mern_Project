import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const SignupValidator = {
  initials: {
    username: "",
    fullname: "",
    email: "",
    password: "",
  },
  validation: yup.object().shape({
    username: yup.string().required("Username is required"),
    fullname: yup.string().required("Full Name is required"),
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email id"
      )
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  }),
};

export interface AuthForm {
  username?: string;
  fullname?: string;
  email?: string;
  password: string;
}

export const LoginValidator = {
  initials: {
    username: "",
    password: "",
  },
  validation: yup.object().shape({
    username: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  }),
};

export const ForgotPasswordValidator = {
  initials: {
    email: "",
  },
  validation: yup.object().shape({
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email id"
      )
      .required("Email is required"),
  }),
};

export const PasswordValidator = {
  initials: {
    password: "",
    confirmPassword: "",
  },
  validation: yup.object().shape({
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Password and Confirm Password must match"),
  }),
};

export const setLocalStorageData = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
