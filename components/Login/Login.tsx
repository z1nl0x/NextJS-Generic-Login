import React, { FormEvent, useRef } from "react";
import styles from "./Login.module.css";

type registerProps = {
  onLoginUser: (userData: { email: string; password: string }) => {};
};

function Login({ onLoginUser }: registerProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    onLoginUser(loginData);
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
