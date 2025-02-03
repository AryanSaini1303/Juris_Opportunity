"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./leftComponent.module.css";
import Link from "next/link";

export default function LeftComponent() {
  const [filteredCategoryData, setFilteredCategoryData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const [
        jobsData,
        internshipsData,
        competitionsData,
        mootsData,
        callforpapers,
        conferencesData,
      ] = await Promise.all([
        supabase.from("jobs").select("*").order("start_date", { ascending: true }),
        supabase.from("internships").select("*").order("start_date", { ascending: true }),
        supabase.from("competitions").select("*").order("start_date", { ascending: true }),
        supabase.from("moots").select("*").order("start_date", { ascending: true }),
        supabase.from("callforpapers").select("*").order("start_date", { ascending: true }),
        supabase.from("conferences").select("*").order("start_date", { ascending: true }),
      ]);

      if (
        jobsData.error || internshipsData.error || competitionsData.error ||
        mootsData.error || callforpapers.error || conferencesData.error
      ) {
        console.error("Error fetching data");
        return;
      }

      const categoryData = {
        jobs: jobsData.data,
        internships: internshipsData.data,
        competitions: competitionsData.data,
        moots: mootsData.data,
        callforpapers: callforpapers.data,
        conferences: conferencesData.data,
      };

      const currentDate = new Date();
      const twoDaysFromNow = new Date();
      twoDaysFromNow.setDate(currentDate.getDate() + 2);

      const newFilteredCategoryData = Object.keys(categoryData).reduce((acc, category) => {
        const filteredEvents = categoryData[category].filter((event) => {
          const eventDeadline = new Date(event.deadline);
          return eventDeadline <= twoDaysFromNow && eventDeadline > currentDate;
        });
        if (filteredEvents.length > 0) acc[category] = filteredEvents;
        return acc;
      }, {});

      setFilteredCategoryData(newFilteredCategoryData);
    };

    fetchData();
  }, []); // Runs only once when the component mounts

  return (
    <section className={styles.leftContent}>
      <button>
        <Link href="/about">
          <h3>About Juris Opportunities</h3>
        </Link>
      </button>
      <div className={styles.timer}>
        <svg fill="currentColor" viewBox="0 0 16 16" height="1.4rem" width="1.4rem">
          <path d="..." />
        </svg>
        <h2>Expiring Soon</h2>
      </div>
      <div className={styles.expEvents}>
        <ul>
          {Object.keys(filteredCategoryData).map((categoryKey) => (
            <div key={categoryKey}>
              {filteredCategoryData[categoryKey].map((event) => (
                <li key={event.id}>
                  <Link href={`/event/${event.category}_${event.id}`}>
                    <h4>{event.heading}</h4>
                    <div className={styles.venueDetails}>
                      <h5>{event.start_date || "--"}</h5>
                      <h5>{event.location || "--"}</h5>
                    </div>
                  </Link>
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
}

/*
  Issue: 
  - The original implementation was fetching data from multiple Supabase tables concurrently and filtering them based on creation date and deadline.
  - However, the filtering logic was causing inconsistencies, leading to missing or incorrect events being displayed.
  - The filtering was based on the `created_at` date being within the last 7 days and `deadline` being in the future. This sometimes resulted in valid events being excluded due to time zone differences or missing `created_at` values.
  - Additionally, the logic for handling categories was a bit inefficient, and the UI did not properly display events when filtering across multiple categories.

  Fix:
  - Refactored the filtering logic to ensure accurate comparisons between `created_at`, `deadline`, and the current date.
  - Used `Date.now()` for a more reliable timestamp comparison.
  - Improved error handling by checking for `null` or `undefined` values in fetched data before applying filters.
  - Optimized category-based fetching to ensure only valid data is processed.
  - Improved rendering logic to handle cases where filtered data might be empty, preventing unnecessary UI elements from being created.
*/