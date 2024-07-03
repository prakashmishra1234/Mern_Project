import * as React from "react";
import { UserDetailsType, UserType } from "./type/userType";
import axios from "axios";
import {
  AuthChangePassword,
  AuthForgetPassword,
  AuthSignUp,
} from "./type/AuthType";
import { getToastMessage } from "./Components/common/ToastMessage";
import { ToastMessageEnumType } from "./enum/ToastMessage";

interface IContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isUserVerifcationCompleted: boolean;
  setIsUserVerifcationCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  userDetails: UserDetailsType | null;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetailsType | null>>;
  loginWithMicrosoftResp: (code: string, state: string) => void;
  signUp: (value: AuthSignUp) => void;
  logout: () => void;
  forgetPassword: (value: AuthForgetPassword) => void;
  resetPassword: (token: string | undefined, value: AuthChangePassword) => void;
}

const AuthContext = React.createContext<IContext>({
  loading: false,
  setLoading: () => {},
  isUserVerifcationCompleted: false,
  setIsUserVerifcationCompleted: () => {},
  loginWithMicrosoftResp: (code: string, state: string): void => {},
  signUp: (value: AuthSignUp): void => {},
  logout: (): void => {},
  forgetPassword: (value: AuthForgetPassword): void => {},
  resetPassword: (
    token: string | undefined,
    value: AuthChangePassword
  ): void => {},
  user: null,
  setUser: () => {},
  userDetails: null,
  setUserDetails: () => {},
});

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [isUserVerifcationCompleted, setIsUserVerifcationCompleted] =
    React.useState(false);
  const [user, setUser] = React.useState<UserType | null>(null);
  const [userDetails, setUserDetails] = React.useState<UserDetailsType | null>(
    null
  );

  const loginWithMicrosoftResp = (code: string, state: string): void => {
    setLoading(true);
    setIsUserVerifcationCompleted(false);
    axios
      .get(`/api/v1/auth/microsoft/callback?code=${code}&state=${state}`)
      .then(async (res) => {
        console.log(res);
        // await getUserData();
      })
      .catch((err) => {
        setIsUserVerifcationCompleted(true);
        setUser(null);
        getToastMessage({
          type: ToastMessageEnumType.error,
          messgae: err.response.data.message,
        });
        // window.location.replace("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signUp = (value: AuthSignUp): void => {
    setLoading(true);
    setIsUserVerifcationCompleted(false);
    axios
      .post("/api/v1/register", value)
      .then(async (res) => {
        await getUserData();
      })
      .catch((err) => {
        setIsUserVerifcationCompleted(true);
        getToastMessage({
          type: ToastMessageEnumType.error,
          messgae: err.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setLoading(true);
    axios
      .get("/api/v1/logout")
      .then((res) => {
        setUser(null);
      })
      .catch((err) => {
        getToastMessage({
          type: ToastMessageEnumType.error,
          messgae: err.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUserData = async () => {
    setLoading(true);
    axios
      .get("/api/v1/me")
      .then((res) => {
        setUser(res.data.data as UserType);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsUserVerifcationCompleted(true);
        setLoading(false);
      });
  };

  const forgetPassword = (value: AuthForgetPassword) => {
    setLoading(true);
    axios
      .post("/api/v1/forgetPassword", value)
      .then((res) => {
        getToastMessage({
          type: ToastMessageEnumType.success,
          messgae: res.data.message,
        });
      })
      .catch((err) => {
        getToastMessage({
          type: ToastMessageEnumType.error,
          messgae: err.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetPassword = (
    token: string | undefined,
    value: AuthChangePassword
  ) => {
    setLoading(true);
    setIsUserVerifcationCompleted(false);
    axios
      .put(`/api/v1/resetPassword/${token}`, value)
      .then(async (res) => {
        await getUserData();
      })
      .catch((err) => {
        setIsUserVerifcationCompleted(true);
        getToastMessage({
          type: ToastMessageEnumType.error,
          messgae: err.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    const value = document.cookie;
    const temp = value.split("=");
    if (temp[0] === "token") getUserData();
    else setIsUserVerifcationCompleted(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isUserVerifcationCompleted,
        user,
        setUser,
        userDetails,
        setUserDetails,
        setIsUserVerifcationCompleted,
        setLoading,
        loginWithMicrosoftResp,
        signUp,
        logout,
        forgetPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Store, AuthContext };
