import Link from "next/link";
import styles from "./pageNumberSection.module.css"
export default function PageNumberSection({totalPageNumbers, path, currentPage}) {
  // console.log(totalPageNumbers);
  return (
    <ul className={styles.list}>
      <li>Page no.</li>
      {Array.from({ length: totalPageNumbers }, (_, index) => (
        <li key={index}>
          <Link
            href={`/${path}?page=${index + 1}`}
            style={
              index + 1 == currentPage
                ? {
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--primary-color)",
                  }
                : null
            }
          >
            {index + 1}
          </Link>
        </li>
      ))}
    </ul>
  );
}
