import styles from "./page.module.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { supabase } from "@/lib/supabaseClient";

export default async function EventPage({ params }) {
  const { eventData } = await params;
  const [category, id] = eventData.split("_");
  const { data, error } = await supabase
    .from(category.toLowerCase())
    .select("*")
    .eq("id", id)
    .order("start_date", { ascending: true });
  if (error) {
    console.log(error);
  }
  console.log(data);

  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
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
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCW1m8oOM_xs3PR3gimOXRqrWSkUUgW3Q4&q=${data[0].location}`}
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
