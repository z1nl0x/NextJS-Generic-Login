import React, { FormEvent, useRef, useContext } from "react";
import styles from "./Login.module.css";
import AuthContext from "../context/auth-context";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    authCtx.loggin(loginData);
  };

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.titleLoginCard}>
          <p>Login System 2077</p>
        </div>

        <form className={styles.loginForm} onSubmit={submitHandler}>
          <div className={styles.inputLogin}>
            <label htmlFor="username">E-mail</label>
            <div>
              <input type="email" ref={emailRef} required />
            </div>
          </div>
          <div className={styles.inputSenha}>
            <label htmlFor="password">Senha</label>
            <div>
              <input type="password" ref={passwordRef} required />
            </div>
          </div>
          <div className={styles.buttonLogin}>
            <button>LOGAR</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
