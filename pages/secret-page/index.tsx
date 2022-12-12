import styles from "./secret-page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SecretPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  let content = (
    <div>
      <h1 className={styles.titleH1}>
        SEJA BEM-VINDO(A) USUÁRIO(A) - {session?.user?.email}
      </h1>
    </div>
  );

  if (status === "unauthenticated") {
    router.push("/");
  }

  return <>{content}</>;
};

export default SecretPage;
