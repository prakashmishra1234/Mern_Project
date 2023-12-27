import * as React from "react";
import { userType } from "./type/userType";

interface IContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  jwttoken: string;
  setJwttoken: React.Dispatch<React.SetStateAction<string>>;
  user: userType;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
}

const AuthContext = React.createContext<IContext>({
  loading: false,
  setLoading: () => {},
  jwttoken: "",
  setJwttoken: () => {},
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
  const [jwttoken, setJwttoken] = React.useState("");
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

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        jwttoken,
        setJwttoken,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Store, AuthContext };
