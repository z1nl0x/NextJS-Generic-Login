import React, { FormEvent, useRef, useContext } from "react";
import styles from "./Login.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface Props {
  ipAddress: {
    status: string;
    city: string;
    region: string;
  };
}

function Login({ ipAddress }: Props) {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const notify = (error: any) =>
    toast.warn(`${error}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    const res: any = await signIn("credentials", {
      email: enteredEmail,
      password: enteredPassword,
      redirect: false,
    });

    if (res.error) {
      notify(res.error);
    } else {
      router.push("/secret-page");
    }
  };

  if (ipAddress.status === "fail") {
    ipAddress.city = "Ghost Town";
    ipAddress.region = "Nowhere";
  }

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
        <div className={styles.ipContainer}>
          <h4>
            Localização: {ipAddress.city} / {ipAddress.region}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
