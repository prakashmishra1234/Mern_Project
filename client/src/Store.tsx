import * as React from "react";

interface IContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  jwttoken: string;
  setJwttoken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = React.createContext<IContext>({
  loading: false,
  setLoading: () => {},
  jwttoken: "",
  setJwttoken: () => {},
});

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [jwttoken, setJwttoken] = React.useState("");

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        jwttoken,
        setJwttoken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Store, AuthContext };
