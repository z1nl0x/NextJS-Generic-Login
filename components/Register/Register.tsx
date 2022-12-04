import React, { FormEvent, useRef } from "react";
import styles from "./Register.module.css";

type registerProps = {
  onAddUser: (userData: {
    email: string;
    username: string;
    password: string;
  }) => void;
};

const Register = ({ onAddUser }: registerProps) => {
  const refEmail = useRef<HTMLInputElement>(null);
  const refUsername = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const enteredEmail = refEmail.current!.value;
    const enteredUsername = refUsername.current!.value;
    const enteredPassword = refPassword.current!.value;
    const today = Date.now();

    const registerData = {
      email: enteredEmail,
      username: enteredUsername,
      password: enteredPassword,
      _createdAt: new Date(today).toISOString(),
    };

    onAddUser(registerData);
  };

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.formContainer}>
        <div className={styles.titleLoginCard}>
          <p>Registrar-se</p>
        </div>

        <form className={styles.loginForm} onSubmit={submitHandler}>
          <div className={styles.inputLogin}>
            <label htmlFor="email">E-mail</label>
            <div>
              <input type="email" ref={refEmail} required />
            </div>
          </div>
          <div className={styles.inputUsername}>
            <label htmlFor="username">Username</label>
            <div>
              <input type="text" ref={refUsername} required />
            </div>
          </div>
          <div className={styles.inputSenha}>
            <label htmlFor="password">Senha</label>
            <div>
              <input type="password" ref={refPassword} required />
            </div>
          </div>
          <div className={styles.buttonRegister}>
            <button>ENVIAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
