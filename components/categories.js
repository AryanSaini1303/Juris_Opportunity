"use client";
import { usePathname } from "next/navigation";
import styles from "./categories.module.css";
import Link from "next/link";
export default function Categories() {
  const url = usePathname();
  return (
    <div className={styles.rightContent}>
      <header>
        <ul>
          <li>
            <Link
              href="/categories/Jobs"
              className={
                url && url.toLowerCase().endsWith("jobs")
                  ? `${styles.selected}`
                  : null
              }
            >
              <img src="/jobs.svg" alt="" />
              <h4>Jobs</h4>
            </Link>
          </li>
          <li>
            <Link
              href="/categories/Internships"
              className={
                url && url.toLowerCase().endsWith("internships")
                  ? `${styles.selected}`
                  : null
              }
            >
              <img src="/internships.svg" alt="" />
              <h4>Internships</h4>
            </Link>
          </li>
          <li>
            <Link
              href="/categories/Moots"
              className={
                url && url.toLowerCase().endsWith("moots")
                  ? `${styles.selected}`
                  : null
              }
            >
              <img src="/moots.svg" alt="" />
              <h4>Moot Courts</h4>
            </Link>
          </li>
          <li>
            <Link
              href="/categories/CallForPapers"
              className={
                url && url.toLowerCase().endsWith("callforpapers")
                  ? `${styles.selected}`
                  : null
              }
            >
              <img src="/paper.svg" alt="" />
              <h4>Call for Papers</h4>
            </Link>
          </li>
          <li>
            <Link
              href="/categories/Conferences"
              className={
                url && url.toLowerCase().endsWith("conferences")
                  ? `${styles.selected}`
                  : null
              }
            >
              <img src="/conferences.svg" alt="" />
              <h4>Conferences</h4>
            </Link>
          </li>
          <li>
            <Link href="/news">
              <img src="/bare.svg" alt="" />
              <h4>Legal News</h4>
            </Link>
          </li>
          {/* <li>
            <Link href="#">
              <img src="/blogs.svg" alt="" />
              <h4>Blogs</h4>
            </Link>
          </li> */}
          <li>
            <Link
              href="/categories/Competitions"
              className={
                url && url.toLowerCase().endsWith("competitions")
                  ? `${styles.selected}`
                  : null
              }
            >
              <img src="/competitions.svg" alt="" />
              <h4>Competitions</h4>
            </Link>
          </li>
        </ul>
      </header>
      <hr />
    </div>
  );
}
