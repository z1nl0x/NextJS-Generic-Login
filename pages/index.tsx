import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Login from "../components/Login/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home({
  ipInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // console.log(ipInfo);

  if (session) {
    router.push("/secret-page");
  } else if (status === "loading") {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Login ipAddress={ipInfo} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res } = context;

  let ip;

  if (req.headers["x-forwarded-for"]) {
    ip = (req.headers["x-forwarded-for"] as string).split(",")[0];
  } else if (req.headers["x-real-ip"]) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.connection.remoteAddress;
  }

  // const requestIp = require("request-ip");

  // const userIp = requestIp.getClientIp(req);

  // const completeIpInfo = await fetch(`http://ip-api.com/json/${userIp}`);

  // const ipData = await completeIpInfo.json();

  return {
    props: {
      ipInfo: ip,
    },
  };
};
