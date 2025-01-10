import Link from "next/link";
import styles from "./jobDetails.module.css";
export default function ConferenceDetailsPage({ data }) {
  return (
    <div className={styles.details}>
      <header className={styles.header}>
        <img
          src={data[0].poster || "https://picsum.photos/300/300"}
          alt="Event Poster"
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1 className={styles.heading}>{data[0].heading || "-"}</h1>
          <p className={styles.dateTime}>
            {data[0].start_date && "Start:"} {data[0].start_date + " |"}{" "}
            {/* {data[0].end_date && "End:"} {data[0].end_date + " |"}{" "} */}
            {data[0].deadline && "Deadline:"} {data[0].deadline}
          </p>
          {data[0].location && (
            <p className={styles.location}>Location: {data[0].location}</p>
          )}
          {data[0].mode && (
            <p className={styles.location}>Mode: {data[0].mode}</p>
          )}
        </div>
      </header>
      <hr />
      {data[0].about && (
        <section className={styles.description}>
          <h2>About the Conference</h2>
          <p>{data[0].about}</p>
        </section>
      )}
      <hr />

      <section className={styles.detailsSection}>
        {data[0].contact && (
          <div className={styles.item}>
            <h3>Contact</h3>
            <ul>
              {data[0].contact.map((element, index) => (
                <li key={element.id}>{element}</li>
              ))}
            </ul>
          </div>
        )}
        {data[0].registration_fee && (
          <div className={styles.item}>
            <h3>Registration Fee</h3>
            <p>{data[0].registration_fee}</p>
          </div>
        )}
        {data[0].registration_link && (
          <button className={styles.item}>
            <Link
              href={data[0].registration_link}
              target="_blank"
              style={{ transition: "all 0.2s ease-in-out" }}
            >
              Click here to Register
            </Link>
          </button>
        )}
      </section>
      <hr />
      {/* {!(
        data[0].location.toLowerCase() == "online" || data[0].location == "-"
      ) && (
        <div className={styles.map}>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/pllace?key=${process.env.GOOGLE_MAPS_API}&q=${data[0].location}`}
          ></iframe>
        </div>
      )} */}
    </div>
  );
}
