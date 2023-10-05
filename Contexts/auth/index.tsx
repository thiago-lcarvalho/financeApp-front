import { ReactNode, createContext, useState } from "react";

interface Auth {
  id: number,
  email: string,
  name: string
}

type ContextProps = {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
};

type MainContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as ContextProps);

export const AuthContextProvider = ({ children }: MainContextProviderProps) => {
  const [auth, setAuth] = useState<Auth>({} as Auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
