"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import styles from "./page.module.css";
import Link from "next/link";
import SearchBar from "@/components/searchBar";

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
          <SearchBar handleFormSubmit={handleFormSubmit} />
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
