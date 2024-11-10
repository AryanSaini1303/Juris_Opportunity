import styles from "./jobDetails.module.css"
export default function JobDetailsPage({data}) {
  return (
    <div className={styles.details}>
      <header className={styles.header}>
        <img
          src={data[0].poster}
          alt="Event Poster"
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1 className={styles.heading}>{data[0].heading}</h1>
          <p className={styles.dateTime}>
            Start: {data[0].start_date} | End: {data[0].end_date}
          </p>
          <p className={styles.location}>Location: {data[0].location}</p>
          <p className={styles.location}>Mode: {data[0].mode}</p>
        </div>
      </header>
      <hr />
      <section className={styles.description}>
        <h2>About the Job</h2>
        <p>{data[0].about}</p>
      </section>
      <hr />

      <section className={styles.detailsSection}>
        <div className={styles.item}>
          <h3>Position</h3>
          <p>{data[0].position}</p>
        </div>
        <div className={styles.item}>
          <h3>Responsibilities</h3>
          <ul>
            {data &&
              data[0].responsibilities.map((element, index) => (
                <li key={element.id}>{element}</li>
              ))}
          </ul>
        </div>
        <div className={styles.item}>
          <h3>Requirements</h3>
          <ul>
            {data &&
              data[0].requirements.map((element, index) => (
                <li key={element.id}>{element}</li>
              ))}
          </ul>
        </div>
        <div className={styles.item}>
          <h3>Renumeration</h3>
          <p>{data[0].salary}</p>
        </div>
      </section>
      <hr />
      <div className={styles.map}>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API}&q=${data[0].location}`}
        ></iframe>
      </div>
    </div>
  );
}
