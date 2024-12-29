import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import styles from "./page.module.css";

export default function AdvisoryPage() {
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        <header className={styles.header}>Our Advisory Board</header>
        <section className={styles.cardsSection}>
          <div className={styles.card}>
            <Image src={"/support.jpg"} width={100} height={100} alt="" />
            <div className={styles.info}>
              <h1>Abhishek Yadav</h1>
              <h4>UI/UX Designer</h4>
            </div>
          </div>
          <div className={styles.card}>
            <Image src={"/support.jpg"} width={100} height={100} alt="" />
            <div className={styles.info}>
              <h1>Abhishek Yadav</h1>
              <h4>UI/UX Designer</h4>
            </div>
          </div>
          <div className={styles.card}>
            <Image src={"/support.jpg"} width={100} height={100} alt="" />
            <div className={styles.info}>
              <h1>Abhishek Yadav</h1>
              <h4>UI/UX Designer</h4>
            </div>
          </div>
          <div className={styles.card}>
            <Image src={"/support.jpg"} width={100} height={100} alt="" />
            <div className={styles.info}>
              <h1>Abhishek Yadav</h1>
              <h4>UI/UX Designer</h4>
            </div>
          </div>
          <div className={styles.card}>
            <Image src={"/support.jpg"} width={100} height={100} alt="" />
            <div className={styles.info}>
              <h1>Abhishek Yadav</h1>
              <h4>UI/UX Designer</h4>
            </div>
          </div>
          <div className={styles.card}>
            <Image src={"/support.jpg"} width={100} height={100} alt="" />
            <div className={styles.info}>
              <h1>Abhishek Yadav</h1>
              <h4>UI/UX Designer</h4>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
