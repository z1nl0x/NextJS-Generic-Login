import styles from "./secret-page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SecretPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  } else if (status === "loading") {
    return <div className={styles.titleH1}>Loading...</div>;
  } else {
    return (
      <>
        <div>
          <h1 className={styles.titleH1}>
            SEJA BEM-VINDO(A) USUÁRIO(A) - {session?.user?.email}
          </h1>
        </div>
      </>
    );
  }
};

export default SecretPage;
