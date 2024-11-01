import Link from "next/link";
import styles from "./homeContent.module.css";
export default function HomeContent() {
  return (
    <div className={styles.homeContent}>
      <section className={styles.leftContent}>
        <button>
          <Link href="#">
            <h3>About Juris Opportunities</h3>
          </Link>
        </button>
        <div className={styles.timer}>
          <svg
            fill="currentColor"
            viewBox="0 0 16 16"
            height="1.4rem"
            width="1.4rem"
          >
            <path d="M8.515 1.019A7 7 0 008 1V0a8 8 0 01.589.022l-.074.997zm2.004.45a7.003 7.003 0 00-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 00-.439-.27l.493-.87a8.025 8.025 0 01.979.654l-.615.789a6.996 6.996 0 00-.418-.302zm1.834 1.79a6.99 6.99 0 00-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 00-.214-.468l.893-.45a7.976 7.976 0 01.45 1.088l-.95.313a7.023 7.023 0 00-.179-.483zm.53 2.507a6.991 6.991 0 00-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 01-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 01-.401.432l-.707-.707z" />
            <path d="M8 1a7 7 0 104.95 11.95l.707.707A8.001 8.001 0 118 0v1z" />
            <path d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" />
          </svg>
          <h2>Expiring Soon</h2>
        </div>
        <div className={styles.expEvents}>
          <ul>
            <Link href={"#"}>
              <li>
                <h3>9th Justice Murtaza Husain Memorial</h3>
                <div className={styles.venueDetails}>
                  <h5>Sat, 28 Sept</h5>
                  <hr />
                  <h5>Lucknow, Uttarakhand</h5>
                </div>
              </li>
            </Link>
            <Link href={"#"}>
              <li>
                <h3>9th Justice Murtaza Husain Memorial</h3>
                <div className={styles.venueDetails}>
                  <h5>Sat, 28 Sept</h5>
                  <hr />
                  <h5>Lucknow, Uttarakhand</h5>
                </div>
              </li>
            </Link>
            <Link href={"#"}>
              <li>
                <h3>9th Justice Murtaza Husain Memorial</h3>
                <div className={styles.venueDetails}>
                  <h5>Sat, 28 Sept</h5>
                  <hr />
                  <h5>Lucknow, Uttarakhand</h5>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </section>
      <section className={styles.rightContent}>
        <header>
          <ul>
            <li>
              <Link href="#">
                <img src="/jobs.svg" alt="" />
                <h4>Jobs</h4>
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/internships.svg" alt="" />
                <h4>Internships</h4>
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/moots.svg" alt="" />
                <h4>Moots</h4>
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/paper.svg" alt="" />
                <h4>Call for Paper</h4>
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/conferences.svg" alt="" />
                <h4>Conference</h4>
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/bare.svg" alt="" />
                <h4>Bare Acts</h4>
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/blogs.svg" alt="" />
                <h4>Blogs</h4>
              </Link>
            </li>
            <li>
              <Link href="#">
                <img src="/competitions.svg" alt="" />
                <h4>Competitions</h4>
              </Link>
            </li>
          </ul>
        </header>
        <hr />
        <div className={styles.currEvents}>
          <ul>
            <li>
              <Link href="#">
                <h3>Call for Paper</h3>
                <h3>Sat, 28 Sept</h3>
                <h3>
                  9th Justice Murtaza Husain Memorial National Moot Court
                  Competition, just some random text to check ellipsis of this
                  text area
                </h3>
              </Link>
            </li>
            <hr />
            <li>
              <Link href="#">
                <h3>Bare Acts</h3>
                <h3>Sat, 28 Sept</h3>
                <h3>
                  9th Justice Murtaza Husain Memorial National Moot Court
                  Competition, just some random text to check ellipsis of this
                  text area
                </h3>
              </Link>
            </li>
            <hr />
            <li>
              <Link href="#">
                <h3>Internships</h3>
                <h3>Sat, 28 Sept</h3>
                <h3>
                  9th Justice Murtaza Husain Memorial National Moot Court
                  Competition, just some random text to check ellipsis of this
                  text area
                </h3>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
