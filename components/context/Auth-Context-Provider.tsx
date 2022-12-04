import React, { useState } from "react";
import AuthContext, { authUserInterfaceContext } from "./auth-context";
import { useRouter } from "next/router";

type authProps = {
  children?: React.ReactNode;
};

type loginData = {
  email: string;
  password: string;
};

const AuthCtxProvider = ({ children }: authProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const loginHandler = async (enteredLoginData: loginData) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(enteredLoginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.payload !== null) {
      router.push("/secret-page");
    } else {
      router.push("/");
    }
  };

  const initialAuthValues: authUserInterfaceContext = {
    token: token,
    isLoggedIn: false,
    loggin: loginHandler,
    loggout: () => {},
  };

  return (
    <AuthContext.Provider value={initialAuthValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthCtxProvider;
