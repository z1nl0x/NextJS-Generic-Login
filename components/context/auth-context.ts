import React, { createContext } from "react";

export interface authUserInterfaceContext {
  token: string;
  isLoggedIn: boolean;
  loggin: () => void;
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
