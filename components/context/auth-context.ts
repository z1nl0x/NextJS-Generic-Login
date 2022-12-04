import React, { createContext } from "react";

type loginData = {
  email: string;
  password: string;
};

export interface authUserInterfaceContext {
  token: string | null;
  isLoggedIn: boolean;
  loggin: (data: loginData) => void;
  loggout: () => void;
}

const authUserDefaultValues: authUserInterfaceContext = {
  token: "",
  isLoggedIn: false,
  loggin: () => {},
  loggout: () => {},
};

const AuthContext = createContext<authUserInterfaceContext>(
  authUserDefaultValues
);

export default AuthContext;
