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

  if (status === "loading") {
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>
      </div>
    );
  } else if (status === "authenticated") {
    router.push("/secret-page");
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

  const userIp = req.socket.remoteAddress;

  const completeIpInfo = await fetch(`http://ip-api.com/json/${userIp}`);

  const ipData = await completeIpInfo.json();

  return {
    props: {
      ipInfo: ipData,
    },
  };
};
