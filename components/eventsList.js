import styles from "./eventsList.module.css";
import Link from "next/link";
export default function EventsList({ category }) {
  return (
    <>
        <header className={styles.header}>
          <h1>
            <span>
              <svg
                viewBox="0 -8 30 30"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z" />
              </svg>
            </span>
            {category == "CallForPaper" ? "Call For Paper":!category?"Latest Events":category}
          </h1>
        </header>
      <div
        className={styles.currEvents}
      >
        <ul>
          <li>
            <Link href="#">
              <img src="/logo.jpg" alt="" />
              <div className={styles.specifics}>
                <h3>
                  Sat, 28 Sept <span> &emsp; &emsp; Call for Paper</span>
                </h3>
                <h3>
                  9th Justice Murtaza Husain Memorial National Moot Court
                  Competition, just some random text to check ellipsis of this
                  text area
                </h3>
              </div>
            </Link>
          </li>
          <hr />
          <li>
            <Link href="#">
              <img src="/logo.jpg" alt="" />
              <div className={styles.specifics}>
                <h3>
                  Sat, 28 Sept <span> &emsp; &emsp; Call for Paper</span>
                </h3>
                <h3>
                  9th Justice Murtaza Husain Memorial National Moot Court
                  Competition, just some random text to check ellipsis of this
                  text area
                </h3>
              </div>
            </Link>
          </li>
          <hr />
          <li>
            <Link href="#">
              <img src="/logo.jpg" alt="" />
              <div className={styles.specifics}>
                <h3>
                  Sat, 28 Sept <span> &emsp; &emsp; Call for Paper</span>
                </h3>
                <h3>
                  9th Justice Murtaza Husain Memorial National Moot Court
                  Competition, just some random text to check ellipsis of this
                  text area
                </h3>
              </div>
            </Link>
          </li>
          <hr />
        </ul>
      </div>
    </>
  );
}
