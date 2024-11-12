import { supabase } from "@/lib/supabaseClient";
import styles from "./eventsList.module.css";
import Link from "next/link";

export default async function EventsList({ category }) {
  let data;
  let categoryData;
  let filteredCategoryData;

  if (!category) {
    // Fetch data from all tables concurrently using Promise.all
    const [jobsData, internshipsData, competitionsData, mootsData] =
      await Promise.all([
        supabase
          .from("jobs")
          .select(
            "heading, category, start_date, poster, id, created_at, deadline"
          )
          .order("start_date", { ascending: true }),
        supabase
          .from("internships")
          .select(
            "heading, category, start_date, poster, id, created_at, deadline"
          )
          .order("start_date", { ascending: true }),
        supabase
          .from("competitions")
          .select(
            "heading, category, start_date, poster, id, created_at, deadline"
          )
          .order("start_date", { ascending: true }),
        supabase
          .from("moots")
          .select(
            "heading, category, start_date, poster, id, created_at, deadline"
          )
          .order("start_date", { ascending: true }),
      ]);
    // Check for errors in any of the queries
    if (
      jobsData.error ||
      internshipsData.error ||
      competitionsData.error ||
      mootsData.error
    ) {
      console.error(
        "Error fetching data:",
        jobsData.error ||
          internshipsData.error ||
          competitionsData.error ||
          mootsData.error
      );
      return;
    }
    // Concatenate the data from all tables into a single object
    categoryData = {
      jobs: jobsData.data,
      internships: internshipsData.data,
      competitions: competitionsData.data,
      moots: mootsData.data,
    };
    // Step 1: Get the current date
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));
    // Step 2: Filter events within each category where created_at is within the last week
    filteredCategoryData = Object.keys(categoryData).reduce((acc, category) => {
      const filteredEvents = categoryData[category].filter((event) => {
        const eventDeadline = new Date(event.deadline);
        const eventDate = new Date(event.created_at);
        return eventDate >= oneWeekAgo && eventDeadline > currentDate; // Filter events created less than a week ago
      });
      if (filteredEvents.length > 0) {
        acc[category] = filteredEvents; // Only include categories with valid events
      }
      return acc;
    }, {});
  } else {
    let { data: fetchedData, error } = await supabase
      .from(category && category.toLowerCase())
      .select("heading, category, start_date, poster, id, deadline")
      .order("start_date", { ascending: true });
    const currentDate = new Date();
    // console.log(currentDate);
    data =
      fetchedData &&
      fetchedData.filter((event) => {
        const eventDeadline = new Date(event.deadline);
        // console.log("eventDeadline: ", eventDeadline);
        return eventDeadline > currentDate;
      });
  }

  return (
    <>
      <header className={styles.header}>
        <h1>
          <span>
            <svg
              viewBox="0 -8 30 30"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z" />
            </svg>
          </span>
          {category == "CallForPaper"
            ? "Call For Paper"
            : !category
            ? "Latest Events"
            : category}
        </h1>
      </header>
      <div className={styles.currEvents}>
        <ul>
          {/* If data is available, render events */}
          {data && data.length != 0 ? (
            data.map((event) => (
              <li key={event.id}>
                <Link href={`/event/${event.category}_${event.id}`}>
                  <img src={event.poster} alt="" />
                  <div className={styles.specifics}>
                    <h3>
                      {event.start_date}{" "}
                      <span>&emsp; &emsp; {event.category}</span>
                    </h3>
                    <h3>{event.heading}</h3>
                  </div>
                </Link>
                <hr />
              </li>
            ))
          ) : categoryData ? (
            // Loop through categoryData and render each category's events
            Object.keys(filteredCategoryData).map((categoryKey) => {
              const events = filteredCategoryData[categoryKey];
              return events && events.length > 0 ? (
                <div key={categoryKey}>
                  {events.map((event) => (
                    <li key={event.id}>
                      <Link href={`/event/${event.category}_${event.id}`}>
                        <img src={event.poster} alt="" />
                        <div className={styles.specifics}>
                          <h3>
                            {event.start_date}{" "}
                            <span>&emsp; &emsp; {event.category}</span>
                          </h3>
                          <h3>{event.heading}</h3>
                        </div>
                      </Link>
                      <hr />
                    </li>
                  ))}
                </div>
              ) : null;
            })
          ) : (
            <h1 className={styles.noEventHeader}>
              SCHEDULED EVENTS WILL APPEAR HERE!
            </h1>
          )}
        </ul>
      </div>
    </>
  );
}
