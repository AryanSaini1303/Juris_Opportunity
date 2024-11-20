"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import styles from "./page.module.css";
import Link from "next/link";

export default function JudgementsPage() {
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(e.target.searchQuery.value);
  }
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        <div className={styles.container}>
          <div className={styles.searchBar}>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                // onChange={handleSearch}
                name="searchQuery"
                placeholder="Search..."
              />
              <button type="submit">
                <svg
                  fill="#4C0A02"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
                </svg>
              </button>
            </form>
          </div>
          <div className={styles.yearSection}>
            <ul>
              <li>2024</li>
              <li>2023</li>
              <li>2022</li>
              <li>2021</li>
            </ul>
          </div>
          <div className={styles.cardSection}>
            <div className={styles.monthSection}>
              <ul>
                <li>January</li>
                <li>February</li>
                <li>March</li>
                <li>December</li>
              </ul>
            </div>
            <div className={styles.cards}>
              <Link href={"#"}>
                <div className={styles.card}>
                  <h3>
                    Gurmeet Singh and Ors. Etc. Vs. State of Punjab & Ors.
                  </h3>
                  <h4>Judgement Date: 18 Nov 2024</h4>
                  <h5>Citation: 2024 Latest Caselaw 711 SC</h5>
                </div>
              </Link>
              <Link href={"#"}>
                <div className={styles.card}>
                  <h3>
                    Gurmeet Singh and Ors. Etc. Vs. State of Punjab & Ors.
                  </h3>
                  <h4>Judgement Date: 18 Nov 2024</h4>
                  <h5>Citation: 2024 Latest Caselaw 711 SC</h5>
                </div>
              </Link>
              <Link href={"#"}>
                <div className={styles.card}>
                  <h3>
                    Gurmeet Singh and Ors. Etc. Vs. State of Punjab & Ors.
                  </h3>
                  <h4>Judgement Date: 18 Nov 2024</h4>
                  <h5>Citation: 2024 Latest Caselaw 711 SC</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
