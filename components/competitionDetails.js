import styles from "./jobDetails.module.css";
export default function CompetitionDetailsPage({ data }) {
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
        <h2>About the Competition</h2>
        <p>{data[0].about}</p>
      </section>
      <hr />

      <section className={styles.detailsSection}>
        <div className={styles.item}>
          <h3>Eligibility</h3>
          <ul>
            {data[0].eligibility.map((element, index) => {
              return Array.isArray(element) ? (
                <li key={index} style={{listStyleType:"none"}}>
                  <ul>
                    {element.map((element1, index1) => (
                      <li key={index1}>{element1}</li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={index}>{element}</li>
              );
            })}
          </ul>
        </div>
        <div className={styles.item}>
          <h3>How to Apply?</h3>
          <p>{data[0].apply}</p>
        </div>
        <div className={styles.item}>
          <h3>Application Submission</h3>
          <p>{data[0].application_submission}</p>
        </div>
        <div className={styles.item}>
          <h3>Prize</h3>
          <p>{data[0].stipend}</p>
        </div>
        <div className={styles.item}>
          <h3>Deadline</h3>
          <p>{data[0].deadline}</p>
        </div>
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
