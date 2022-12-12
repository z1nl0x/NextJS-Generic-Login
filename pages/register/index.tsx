import React from "react";
import Register from "../../components/Register/Register";
import { useRouter } from "next/router";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

type userRegisterData = {
  email: string;
  username: string;
  password: string;
  key: string;
};

const RegisterPage = ({
  ipInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/secret-page");
  } else if (status === "loading") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

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

  const addUserHandler = async (enteredUserData: userRegisterData) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(enteredUserData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { msg, error } = await response.json();

    if (error) {
      notify(error);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Register onAddUser={addUserHandler} ipAddress={ipInfo} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context;

  const userIp = req.socket.remoteAddress;

  const completeIpInfo = await fetch(`http://ip-api.com/json/${userIp}`);

  const ipData = await completeIpInfo.json();

  return {
    props: {
      ipInfo: ipData,
    },
  };
};

export default RegisterPage;
