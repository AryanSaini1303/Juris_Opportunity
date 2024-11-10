import { supabase } from "@/lib/supabaseClient";
import styles from "./eventsList.module.css";
import Link from "next/link";

export default async function EventsList({ category }) {
    const { data, error } = await supabase
      .from(category&&category.toLowerCase())
      .select("heading, category, start_date, poster, id")
      .order("start_date", {ascending:true});
  //   if (error) {
  //     console.log(error);
  //   }
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
            ? "Call For Paper"
            : !category
            ? "Latest Events"
            : category}
        </h1>
      </header>
      <div className={styles.currEvents}>
        <ul>
          {data?data.map((event, index) => (
            <>
              <li key={event.id}>
                <Link href={`/event/${event.category}_${event.id}`}>
                  <img src={event.poster} alt="" />
                  <div className={styles.specifics}>
                    <h3>
                      {event.start_date} <span> &emsp; &emsp; {event.category}</span>
                    </h3>
                    <h3>{event.heading}</h3>
                  </div>
                </Link>
              </li>
              <hr />
            </>
          )):<h1 className={styles.noEventHeader}>SCHEDULED EVENTS WILL APPEAR HERE!</h1>}
        </ul>
      </div>
    </>
  );
}
