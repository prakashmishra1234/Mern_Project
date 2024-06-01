import * as React from "react";
import { userType } from "./type/userType";
import axios from "axios";
import {
  AuthChangePassword,
  AuthForgetPassword,
  AuthLogin,
} from "./utils/helper";

interface IContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isUserVerified: boolean;
  setIsUserVerified: React.Dispatch<React.SetStateAction<boolean>>;
  user: userType;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
  login: (value: AuthLogin) => void;
  logout: () => void;
  forgetPassword: (value: AuthForgetPassword) => void;
  resetPassword: (token: string | undefined, value: AuthChangePassword) => void;
}

const AuthContext = React.createContext<IContext>({
  loading: false,
  setLoading: () => {},
  isUserVerified: false,
  setIsUserVerified: () => {},
  login: (value: AuthLogin): void => {},
  logout: (): void => {},
  forgetPassword: (value: AuthForgetPassword): void => {},
  resetPassword: (
    token: string | undefined,
    value: AuthChangePassword
  ): void => {},
  user: {
    _id: "",
    username: "",
    fullname: "",
    email: "",
    isVerified: false,
    role: "",
    createdAt: "",
    __v: 0,
  },
  setUser: () => {},
});

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [isUserVerified, setIsUserVerified] = React.useState(false);
  const [user, setUser] = React.useState({
    _id: "",
    username: "",
    fullname: "",
    email: "",
    isVerified: false,
    role: "",
    createdAt: "",
    __v: 0,
  });

  const login = (value: AuthLogin): void => {
    setIsUserVerified(false);
    setLoading(true);
    axios
      .post("/api/v1/login", value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        getUserData();
      });
  };

  const logout = () => {
    setLoading(true);
    axios
      .get("/api/v1/logout")
      .then((res) => {
        setIsUserVerified(false);
      })
      .catch((err) => {
        console.log(err);
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
        setIsUserVerified(true);
      })
      .catch((err) => {
        console.log(err);
        setIsUserVerified(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const forgetPassword = (value: AuthForgetPassword) => {
    setLoading(true);
    axios
      .post("/api/v1/forgetPassword", value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    const value = document.cookie;
    const temp = value.split("=");
    if (temp[0] === "token") getUserData();
    else setIsUserVerified(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isUserVerified,
        setIsUserVerified,
        user,
        setUser,
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
