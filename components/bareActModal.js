import styles from "./bareActModal.module.css";
export default function BareActModal({ closeFunction, intro }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{intro[1]}, {intro[2]}</h2>
        <p>{intro[0]}</p>
        <button
          onClick={() => {
            closeFunction(false);
          }}
        >
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1.5rem"
            width="1.5rem"
          >
            <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
