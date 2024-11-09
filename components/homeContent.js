import Link from "next/link";
import styles from "./homeContent.module.css";
import EventsList from "./eventsList";
import Categories from "./categories";
import LeftComponent from "./leftComponent";
export default function HomeContent({category}) {
  return (
    <div className={styles.homeContent}>
      <LeftComponent/>
      <section className={styles.rightContent}>
        <Categories />
        <EventsList category={category}/>
      </section>
    </div>
  );
}
