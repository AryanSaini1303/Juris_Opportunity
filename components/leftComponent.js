import { supabase } from "@/lib/supabaseClient";
import styles from "./leftComponent.module.css";
import Link from "next/link";
export default async function LeftComponent() {
  // Fetch data from all tables concurrently using Promise.all
  let categoryData;
  let filteredCategoryData;
  const [
    jobsData,
    internshipsData,
    competitionsData,
    mootsData,
    callforpapers,
  ] = await Promise.all([
    supabase
      .from("jobs")
      .select(
        "heading, category, start_date, id, created_at, location, mode, deadline"
      )
      .order("start_date", { ascending: true }),
    supabase
      .from("internships")
      .select(
        "heading, category, start_date, id, created_at, location, mode, deadline"
      )
      .order("start_date", { ascending: true }),
    supabase
      .from("competitions")
      .select(
        "heading, category, start_date, id, created_at, location, mode, deadline"
      )
      .order("start_date", { ascending: true }),
    supabase
      .from("moots")
      .select(
        "heading, category, start_date, id, created_at, location, mode, deadline"
      )
      .order("start_date", { ascending: true }),
    supabase
      .from("callforpapers")
      .select(
        "heading, category, start_date, id, created_at, location, mode, deadline"
      )
      .order("start_date", { ascending: true }),
  ]);

  // Check for errors in any of the queries
  if (
    jobsData.error ||
    internshipsData.error ||
    competitionsData.error ||
    mootsData.error ||
    callforpapers.error
  ) {
    console.error(
      "Error fetching data:",
      jobsData.error ||
        internshipsData.error ||
        competitionsData.error ||
        mootsData.error ||
        callforpapers.error
    );
    return;
  }
  // Concatenate the data from all tables into a single object
  categoryData = {
    jobs: jobsData.data,
    internships: internshipsData.data,
    competitions: competitionsData.data,
    moots: mootsData.data,
    callforpapers: callforpapers.data,
  };
  // Step 1: Get the current date and the date two days from now
  // Step 2: Filter events within each category where the event's deadline is within 2 days from now
  filteredCategoryData = Object.keys(categoryData).reduce((acc, category) => {
    const filteredEvents = categoryData[category].filter((event) => {
      const currentDate = new Date();
      const twoDaysFromNow = new Date(currentDate);
      twoDaysFromNow.setDate(currentDate.getDate() + 2); // This does not modify currentDate
      const eventDeadline = new Date(event.deadline);
      return eventDeadline <= twoDaysFromNow && eventDeadline > currentDate; // Filter events where deadline is within 2 days
    });
    if (filteredEvents.length > 0) {
      acc[category] = filteredEvents; // Only include categories with valid events
    }
    return acc;
  }, {});

  return (
    <section className={styles.leftContent}>
      <button>
        <Link href="/about">
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
          {Object.keys(filteredCategoryData).map((categoryKey) => {
            const events = filteredCategoryData[categoryKey];
            return events && events.length > 0 ? (
              <div key={categoryKey}>
                {/* <h2>{categoryKey}</h2> */}
                {events.map((event) => (
                  <li key={event.id}>
                    <Link href={`/event/${event.category}_${event.id}`}>
                      <h3>{event.heading}</h3>
                      <div className={styles.venueDetails}>
                        <h5>{event.start_date ? event.start_date : "--"}</h5>
                        <hr />
                        <h5>{event.location ? event.location : "--"}</h5>
                      </div>
                      {/* <div className={styles.venueDetails}>
                        <h5>{event.mode}</h5>
                        <hr />
                        <h5>{event.category}</h5>
                      </div> */}
                    </Link>
                  </li>
                ))}
              </div>
            ) : null;
          })}
        </ul>
      </div>
    </section>
  );
}
