import styles from "./page.module.css";
import Footer from "@/components/footer";
import HomeContent from "@/components/homeContent";
import Navbar from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.content}>
        <HomeContent />
      </main>
      <Footer />
    </div>
  );
}
