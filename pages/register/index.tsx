import React from "react";
import Register from "../../components/Register/Register";
import { useRouter } from "next/router";

type userRegisterData = {
  email: string;
  username: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();

  const addUserHandler = async (enteredUserData: userRegisterData) => {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(enteredUserData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  };

  return (
    <>
      <Register onAddUser={addUserHandler} />
    </>
  );
};

export default RegisterPage;
