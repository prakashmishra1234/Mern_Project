import * as React from "react";

interface IContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<IContext>({
  loading: false,
  setLoading: () => {},
});

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Store, AuthContext };
