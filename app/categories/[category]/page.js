import styles from "./page.module.css"
import Navbar from "@/components/navbar";
import HomeContent from "@/components/homeContent";
import Footer from "@/components/footer";

export default async function CategoryPage({ params }) {
  const { category } = await params;
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main className={styles.content}>
        <HomeContent category={category}/>
      </main>
      <Footer />
    </div>
  );
}
