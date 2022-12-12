import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import myIcon from "../../public/cyberpunk-icon.png";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  let content = (
    <ul>
      <li>
        <Link href="/secret-page">SECRET</Link>
      </li>
      <li>
        <Link
          href="/secret-page"
          onClick={() => {
            signOut({ callbackUrl: "/", redirect: true });
          }}
        >
          LOGOUT
        </Link>
      </li>
    </ul>
  );

  let linkAddress = "/secret-page";

  if (status === "unauthenticated") {
    content = (
      <ul>
        <li>
          <Link href="/">LOGIN</Link>
        </li>
        <li>
          <Link href="/register">REGISTRAR-SE</Link>
        </li>
      </ul>
    );

    linkAddress = "/";
  }

  return (
    <nav className={styles.mainNav}>
      <div className={styles.imgLogo}>
        <Link href={`${linkAddress}`}>
          <Image src={myIcon} width={100} height={100} alt="logo" />
        </Link>
      </div>
      {content}
    </nav>
  );
};

export default Navbar;
