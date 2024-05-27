import Link from "next/link";
import styles from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link href="/" className={styles.navLink}>
            <h1>Home</h1>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
