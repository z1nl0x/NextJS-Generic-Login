import styles from "./secret-page.module.css";
import { useSession } from "next-auth/react";

const SecretPage = () => {
  const { data: session, status } = useSession();

  let content = (
    <div>
      <h1 className={styles.titleH1}>
        SEJA BEM-VINDO(A) USUÁRIO(A) - {session?.user?.email}
      </h1>
    </div>
  );

  if (status === "unauthenticated") {
    content = (
      <div>
        <h1 className={styles.titleNotAuth}>ACESSO NÃO AUTORIZADO!</h1>
      </div>
    );
  }

  return <>{content}</>;
};

export default SecretPage;
