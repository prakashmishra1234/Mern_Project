import * as React from "react";
import { userType } from "./type/userType";
import axios from "axios";
import {
  AuthChangePassword,
  AuthForgetPassword,
  AuthLogin,
} from "./utils/helper";
import { getToastMessage } from "./Components/common/ToastMessage";
import { ToastMessageEnumType } from "./enum/ToastMessage";

interface IContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isUserVerifcationCompleted: boolean;
  user: userType | null;
  login: (value: AuthLogin) => void;
  logout: () => void;
  forgetPassword: (value: AuthForgetPassword) => void;
  resetPassword: (token: string | undefined, value: AuthChangePassword) => void;
}

const AuthContext = React.createContext<IContext>({
  loading: false,
  setLoading: () => {},
  isUserVerifcationCompleted: false,
  login: (value: AuthLogin): void => {},
  logout: (): void => {},
  forgetPassword: (value: AuthForgetPassword): void => {},
  resetPassword: (
    token: string | undefined,
    value: AuthChangePassword
  ): void => {},
  user: null,
});

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [isUserVerifcationCompleted, setIsUserVerifcationCompleted] =
    React.useState(false);
  const [user, setUser] = React.useState<userType | null>(null);

  const login = (value: AuthLogin): void => {
    setLoading(true);
    axios
      .post("/api/v1/login", value)
      .then((res) => {
        getUserData();
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

  const logout = () => {
    setLoading(true);
    axios
      .get("/api/v1/logout")
      .then((res) => {
        console.log(res);
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

  const getUserData = () => {
    setLoading(true);
    axios
      .get("/api/v1/me")
      .then((res) => {
        setUser(res.data.data as userType);
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
        console.log(res.data.message);
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
    axios
      .put(`/api/v1/resetPassword/${token}`, value)
      .then((res) => {
        console.log(res);
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
        setLoading,
        isUserVerifcationCompleted,
        user,
        login,
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
