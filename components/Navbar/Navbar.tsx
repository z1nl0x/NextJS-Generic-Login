import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.css";
import myIcon from "../../public/cyberpunk-icon.png";

const Navbar = () => {
  return (
    <nav className={styles.mainNav}>
      <div className={styles.imgLogo}>
        <Image src={myIcon} width={100} height={100} alt="logo" />
      </div>
      <ul>
        <li>
          <Link href="/">LOGIN</Link>
        </li>
        <li>
          <Link href="/register">REGISTRAR-SE</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
