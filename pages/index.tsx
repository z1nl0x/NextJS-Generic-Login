import Image from "next/image";
import Login from "../components/Login/Login";
import styles from "../styles/HomePage.module.css";
import { useRouter } from "next/router";

type loginData = {
  email: string;
  password: string;
};

export default function Home() {
  const router = useRouter();

  const loginHandler = async (enteredLoginData: loginData) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(enteredLoginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    if (data.payload === null) {
      router.push("/");
    } else {
      router.push("/secret-page");
    }
  };

  return (
    <>
      <Login onLoginUser={loginHandler} />
    </>
  );
}
