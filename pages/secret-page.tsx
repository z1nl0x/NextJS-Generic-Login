import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React, { useContext } from "react";
import AuthContext from "../components/context/auth-context";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { cookies } = req;

  const authToken = cookies.AuthUser;

  let logged: boolean = false;

  if (!authToken) {
    logged = false;
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    logged = true;
    return {
      props: {},
    };
  }
};

const SecretPage = ({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) => {
  return (
    <div>
      <h1>SECRET-PAGE</h1>
    </div>
  );
};

export default SecretPage;
