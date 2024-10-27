"use client";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
export default function Navbar() {
  function handleSearch(e) {
    e.preventDefault();
    // console.log(e.target.value);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(e.target.searchQuery.value);
  }
  return (
    <section className={styles.navbar}>
      <div className={styles.logoSection}>
        <Image src={"/logo.jpg"} height={60} width={60} alt="logo" />
        <div className={styles.logoInfo}>
          <h3>JURIS OPPORTUNITIES</h3>
          <h6>Where Legal Aspirations Meet Opportunities</h6>
        </div>
      </div>
      <div className={styles.linkSection}>
        <ul>
          <Link href={"#"}>
            <li>Bare Acts</li>
          </Link>
          <Link href={"#"}>
            <li>Judgements</li>
          </Link>
          <Link href={"#"}>
            <li>Opportunities</li>
          </Link>
          <Link href={"#"}>
            <li>Competitions</li>
          </Link>
          <Link href={"#"}>
            <li>Map Search</li>
          </Link>
          <Link href={"#"}>
            <li>Notes</li>
          </Link>
          <Link href={"#"}>
            <li>More</li>
          </Link>
        </ul>
      </div>
      <div className={styles.searchSection}>
        <form onSubmit={handleFormSubmit}>
          <svg fill="#4C0A02" viewBox="0 0 16 16" height="1em" width="1em">
            <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
          </svg>
          <input
            type="text"
            onChange={handleSearch}
            name="searchQuery"
            placeholder="Search..."
          />
        </form>
      </div>
      <div className={styles.loginSection}>
        <Link href={"#"}>
          <svg viewBox="0 0 24 24" fill="white" height="2em" width="2em">
            <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
          </svg>
          <h3>Log In</h3>
        </Link>
      </div>
    </section>
  );
}
