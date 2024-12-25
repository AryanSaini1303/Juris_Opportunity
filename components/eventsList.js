import { supabase } from "@/lib/supabaseClient";
import styles from "./eventsList.module.css";
import Link from "next/link";

export default async function EventsList({ category }) {
  let data;
  let categoryData;
  let filteredCategoryData;
  if (!category) {
    // Fetch data from all tables concurrently using Promise.all
    const [
      jobsData,
      internshipsData,
      competitionsData,
      mootsData,
      conferencesData,
      callForPapersData,
    ] = await Promise.all([
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
      supabase
        .from("conferences")
        .select(
          "heading, category, start_date, poster, id, created_at, deadline"
        )
        .order("start_date", { ascending: true }),
      supabase
        .from("callforpapers")
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
      mootsData.error ||
      conferencesData.error ||
      callForPapersData.error
    ) {
      console.error(
        "Error fetching data:",
        jobsData.error ||
          internshipsData.error ||
          competitionsData.error ||
          mootsData.error ||
          conferencesData.error ||
          callForPapersData.error
      );
      return;
    }
    // Concatenate the data from all tables into a single object
    categoryData = {
      jobs: jobsData.data,
      internships: internshipsData.data,
      competitions: competitionsData.data,
      moots: mootsData.data,
      conferences: conferencesData.data,
      callForPapers: callForPapersData.data,
    };
    console.log(categoryData);
    // Filter events within each category where created_at is within the last week
    filteredCategoryData = Object.keys(categoryData).reduce((acc, category) => {
      const filteredEvents = categoryData[category].filter((event) => {
        const eventDeadline = new Date(event.deadline);
        const eventDate = new Date(event.created_at);
        const currentDate = new Date();
        const oneWeekAgo = new Date(currentDate);
        oneWeekAgo.setDate(currentDate.getDate() - 7); // Set date to one week ago
        // Only include events created within the last week and not expired
        return eventDate >= oneWeekAgo && eventDeadline > currentDate;
      });
      // Only include categories with valid events
      if (filteredEvents.length > 0) {
        acc[category] = filteredEvents;
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
  // console.log(filteredCategoryData);
  // console.log(data);

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
            ? "Call For Papers"
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
                      <span>&emsp; &emsp; {event.category=='callforpapers'?"Call For Papers":event.category}</span>
                    </h3>
                    <h3>{event.heading}</h3>
                  </div>
                </Link>
                <hr />
              </li>
            ))
          ) : filteredCategoryData &&
            Object.keys(filteredCategoryData).length != 0 ? (
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
                            <span>&emsp; &emsp; {event.category=='callforpapers'?"Call For Papers":event.category}</span>
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
