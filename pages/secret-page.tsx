import { GetServerSideProps } from "next";
import React from "react";
// import Cookies from "js-cookie";

const SecretPage = () => {
  // console.log(Cookies.get("AuthUser"));
  return (
    <div>
      <h1>SECRET USER PAGE!</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { cookies } = req;

  return {
    props: {},
  };
};

// export async function getServerSideProps({ context }) {
//   const res = await fetch(`https://.../data`)
//   const data = await res.json()

//   if (!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }

export default SecretPage;
