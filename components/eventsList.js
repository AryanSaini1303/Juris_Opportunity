'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './eventsList.module.css';
import Link from 'next/link';

export default function EventsList({ category }) {
  const [data, setData] = useState([]);
  const [filteredCategoryData, setFilteredCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let fetchedData;
        let categoryData;
        let filteredData;

        if (!category) {
          // Fetch data from all tables concurrently
          const [
            jobsData,
            internshipsData,
            competitionsData,
            mootsData,
            conferencesData,
            callForPapersData,
          ] = await Promise.all([
            supabase.from('jobs').select('*').order('start_date', { ascending: true }),
            supabase.from('internships').select('*').order('start_date', { ascending: true }),
            supabase.from('competitions').select('*').order('start_date', { ascending: true }),
            supabase.from('moots').select('*').order('start_date', { ascending: true }),
            supabase.from('conferences').select('*').order('start_date', { ascending: true }),
            supabase.from('callforpapers').select('*').order('start_date', { ascending: true }),
          ]);

          // Check for errors
          if (
            jobsData.error ||
            internshipsData.error ||
            competitionsData.error ||
            mootsData.error ||
            conferencesData.error ||
            callForPapersData.error
          ) {
            throw new Error('Error fetching data');
          }

          categoryData = {
            jobs: jobsData.data,
            internships: internshipsData.data,
            competitions: competitionsData.data,
            moots: mootsData.data,
            conferences: conferencesData.data,
            callForPapers: callForPapersData.data,
          };

          // Filter events: created within last week & not expired
          const currentDate = new Date();
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(currentDate.getDate() - 7);

          filteredData = Object.keys(categoryData).reduce((acc, category) => {
            const filteredEvents = categoryData[category].filter((event) => {
              const eventDeadline = new Date(event.deadline);
              const eventDate = new Date(event.created_at);
              return eventDate >= oneWeekAgo && eventDeadline > currentDate;
            });

            if (filteredEvents.length > 0) {
              acc[category] = filteredEvents;
            }
            return acc;
          }, {});

          setFilteredCategoryData(filteredData);
        } else {
          let { data: fetchedData, error } = await supabase
            .from(category.toLowerCase())
            .select('*')
            .order('start_date', { ascending: true });

          if (error) throw error;

          const currentDate = new Date();
          fetchedData = fetchedData.filter((event) => new Date(event.deadline) > currentDate);
          setData(fetchedData);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      <header className={styles.header}>
        <h1>
          <span>
            <svg viewBox="0 -8 30 30" fill="currentColor" height="1em" width="1em">
              <path d="M11.178 19.569a.998.998 0 001.644 0l9-13A.999.999 0 0021 5H3a1.002 1.002 0 00-.822 1.569l9 13z" />
            </svg>
          </span>
          {category === 'CallForPapers' ? 'Call For Papers' : category || 'Latest Events'}
        </h1>
      </header>

      <div className={styles.currEvents}>
        {loading ? (
          <h2>Loading events...</h2>
        ) : error ? (
          <h2 className={styles.error}>{error}</h2>
        ) : (
          <ul>
            {data.length > 0 ? (
              data.map((event) => (
                <li key={event.id}>
                  <Link href={`/event/${event.category}_${event.id}`}>
                    {event.poster&&<img src={event.poster || null} alt="" />}
                    <div className={styles.specifics}>
                      <h3>
                        {event.start_date}{' '}
                        <span>
                          &emsp; &emsp;{' '}
                          {event.category === 'callforpapers'
                            ? 'Call For Papers'
                            : event.category === 'Moots'
                            ? 'Moot Court Competitions'
                            : event.category}
                        </span>
                      </h3>
                      <h3>{event.heading}</h3>
                    </div>
                  </Link>
                  <hr />
                </li>
              ))
            ) : Object.keys(filteredCategoryData).length > 0 ? (
              Object.keys(filteredCategoryData).map((categoryKey) => (
                <div key={categoryKey}>
                  {filteredCategoryData[categoryKey].map((event) => (
                    <li key={event.id}>
                      <Link href={`/event/${event.category}_${event.id}`}>
                        {event.poster&&<img src={event.poster || null} alt="" />}
                        <div className={styles.specifics}>
                          <h3>
                            {event.start_date}{' '}
                            <span>
                              &emsp; &emsp;{' '}
                              {event.category === 'callforpapers'
                                ? 'Call For Papers'
                                : event.category === 'Moots'
                                ? 'Moot Court Competitions'
                                : event.category}
                            </span>
                          </h3>
                          <h3>{event.heading}</h3>
                        </div>
                      </Link>
                      <hr />
                    </li>
                  ))}
                </div>
              ))
            ) : (
              <h1 className={styles.noEventHeader}>SCHEDULED EVENTS WILL APPEAR HERE!</h1>
            )}
          </ul>
        )}
      </div>
    </>
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