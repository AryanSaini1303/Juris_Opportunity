import styles from "./jobDetails.module.css";
export default function InternshipDetailsPage({ data }) {
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
          <p>{data[0].eligibility}</p>
        </div>
        <div className={styles.item}>
          <h3>How to Apply?</h3>
          <p>{data[0].apply}</p>
        </div>
        <div className={styles.item}>
          <h3>Roles and Responsibilities</h3>
          <ul>
            {data &&
              data[0].roles_responsibilities.map((element, index) => (
                <li key={element.id}>{element}</li>
              ))}
          </ul>
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
          <h3>Stipend</h3>
          <p>{data[0].stipend}</p>
        </div>
        <div className={styles.item}>
          <h3>Contact</h3>
          {data[0].contact.map((element, index) => (
            <p key={element.id}>
              {index == 0 ? "Phone: " : "Email: "} {element}
            </p>
          ))}
        </div>
      </section>
      <hr />
      {data[0].location.toLowerCase() != "online" && (
        <div className={styles.map}>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API}&q=${data[0].location}`}
          ></iframe>
        </div>
      )}
    </div>
  );
}
