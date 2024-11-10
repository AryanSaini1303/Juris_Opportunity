import styles from "./jobDetails.module.css";
export default function MootDetailsPage({ data }) {
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
            Start: {data[0].start_date} | End: {data[0].end_date} | Deadline:{" "}
            {data[0].deadline}
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
          <h3>Eligibility</h3>
          <ul>
            {data[0].eligibility.map((element, index) => {
              <li key={element.id}>{element}</li>;
            })}
          </ul>
        </div>
        <div className={styles.item}>
          <h3>Registration Details</h3>
          <ul>
            {data &&
              data[0].registration_details.map((element, index) => {
                <li key={element.id}>{element}</li>;
              })}
          </ul>
        </div>
        <div className={styles.item}>
          <h3>Team Size</h3>
          <p>{data[0].team_size}</p>
        </div>
        <div className={styles.item}>
          <h3>Eligibility</h3>
          <ul>
            {data &&
              data[0].eligibility.map((element, index) => (
                <li key={element.id}>{element}</li>
              ))}
          </ul>
        </div>
        <div className={styles.item}>
          <h3>Prize Pool</h3>
          <ul>
            {data &&
              data[0].prize_pool.map((element, index) => (
                <li key={element.id}>{element}</li>
              ))}
          </ul>
        </div>
        <div className={styles.item}>
          <h3>Schedule</h3>
          <ul>
            {data[0].schedule.map((element, index) => (
              <li key={element.id}>{element}</li>
            ))}
          </ul>
        </div>
        <div className={styles.item}>
          <h3>Payment</h3>
          <p>{data[0].payment}</p>
        </div>
        <div className={styles.item}>
          <h3>Contact</h3>
          <ul>
            {data[0].contact.map((element, index) => (
              <li key={element.id}>{element}</li>
            ))}
          </ul>
        </div>
        <div className={styles.item}>
          <h3>Registration Link</h3>
          <a href={data[0].registration_link} target="_blank">
            {data[0].registration_link}
          </a>
        </div>
        <div className={styles.item}>
          <h3>Click to access website</h3>
          <a href={data[0].website_url} target="_blank">
            {data[0].website_url}
          </a>
        </div>
        <div className={styles.item}>
          <h3>Click here for the moot problem</h3>
          <a href={data[0].moot_problem} target="_blank">
            {data[0].moot_problem}
          </a>
        </div>
      </section>
      <hr />
      {!(
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
      )}
    </div>
  );
}
