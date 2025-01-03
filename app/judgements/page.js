"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import styles from "./page.module.css";
import Link from "next/link";
import SearchBar from "@/components/searchBar";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageNumberSection from "@/components/pageNumberSection";
import { supabase } from "@/lib/supabaseClient";

export default function JudgementsPage() {
  const [loading, setLoading] = useState();
  const [allJudgements, setAllJudgements] = useState();
  const [currentJudgements, setCurrentJudgements] = useState();
  const [allJudgementYears, setAllJudgementYears] = useState();
  const [yearQuery, setYearQuery] = useState();
  const [monthQuery, setMonthQuery] = useState();
  const searchparams = useSearchParams();
  const page = searchparams.get("page") || 1;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const router = useRouter();
  const divRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState();
  const [judgementClick, setJudgementClick] = useState(false);
  const [user, setUser] = useState();
  const [mobile, setMobile] = useState(false);
  const limit = mobile&&!mobile?24:10;
  const [totalPageNumbers, setTotalPageNumbers] = useState(
    Math.ceil(48 / limit)
  ); // As initially i'm fetching only 12 entries and one page can show 4 entries so the total page numbers can be calculated by totalEntries/limit

  useEffect(() => {
    // Ensure the code only runs in the browser
    const handleResize = () => {
      if (screen.width <= 426) {
        setMobile(true);
      }
    };
    // Set the initial screen width
    handleResize();
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setLoading(true);
      if (!yearQuery) {
        const fetchLatestJudgements = async () => {
          const response = await fetch("/api/getAllJudgements");
          const data = await response.json();
          setAllJudgements(data);
          setLoading(false);
        };
        fetchLatestJudgements();
      }
      const fetchAllJudgementYears = async () => {
        const response = await fetch("/api/getAllJudgementYears");
        const data = await response.json();
        setAllJudgementYears(data);
        setLoading(false);
      };
      fetchAllJudgementYears();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (yearQuery && monthQuery) {
      setLoading(true);
      const fetchFilteredJudgements = async () => {
        const response = await fetch(
          `/api/getFilteredJudgementsByYearAndMonth?year=${yearQuery}&month=${monthQuery}`
        );
        const data = await response.json();
        setTotalPageNumbers(Math.ceil(data.length / limit));
        setAllJudgements(data);
        setLoading(false);
      };
      fetchFilteredJudgements();
      router.push("/judgements?page=1");
    } else if (yearQuery && !monthQuery) {
      setLoading(true);
      const fetchFilteredJudgements = async () => {
        const response = await fetch(
          `/api/getFilteredJudgementsByYear?year=${yearQuery}`
        );
        const data = await response.json();
        setTotalPageNumbers(Math.ceil(data.length / limit));
        setAllJudgements(data);
        setLoading(false);
      };
      fetchFilteredJudgements();
      router.push("/judgements?page=1");
    }
  }, [yearQuery, monthQuery]);

  useEffect(() => {
    // Determine the start and end indices for the current page
    const startIndex = (page - 1) * limit; // Start index
    const endIndex = startIndex + limit; // End index
    setCurrentJudgements(allJudgements?.slice(startIndex, endIndex));
    if (divRef.current) {
      divRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [allJudgements, page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        setYearQuery();
        setMonthQuery();
        setLoading(true);
        const fetchFilteredJudgements = async () => {
          const response = await fetch(
            `/api/getJudgementsBySearchQuery?query=${searchQuery}`
          );
          let data = await response.json();
          if (data.message === "No judgements found matching the query.") {
            data = [];
          }
          setAllJudgements(data);
          setTotalPageNumbers(Math.ceil(data.length / limit));
          setLoading(false);
        };
        fetchFilteredJudgements();
      }
    }, 500); // Delay of 500ms
    // Cleanup function to clear the timeout
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // console.log("event: ", event);
        if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
          const { user } = session;
          setUser(user);
        } else {
          setUser(null);
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [judgementClick]);

  function handleFormSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
          <SearchBar
            handleFormSubmit={handleFormSubmit}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={"e.g. State of Rajasthan"}
            margin={"2rem 0 0 0"}
          />
        <div className={styles.container}>
          <div className={styles.yearSection}>
            {allJudgementYears && allJudgementYears.length != 0 && (
              <ul>
                {allJudgementYears.map((element, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setYearQuery(element.year);
                      setSearchQuery("");
                    }}
                    style={
                      yearQuery == element.year
                        ? {
                            backgroundColor: "var(--accent-color)",
                            color: "black",
                          }
                        : null
                    }
                  >
                    {element.year}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {mobile && (
            <div className={styles.monthSection}>
              <ul>
                {monthNames.map((element, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      monthQuery == element
                        ? setMonthQuery()
                        : monthQuery != element && yearQuery
                        ? setMonthQuery(element)
                        : null;
                    }}
                    style={
                      monthQuery == element
                        ? {
                            backgroundColor: "var(--accent-color)",
                            color: "black",
                          }
                        : null
                    }
                  >
                    {element}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={styles.cardSection}>
            {!mobile && (
              <div className={styles.monthSection}>
                <ul>
                  {monthNames.map((element, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        monthQuery == element
                          ? setMonthQuery()
                          : monthQuery != element && yearQuery
                          ? setMonthQuery(element)
                          : null;
                      }}
                      style={
                        monthQuery == element
                          ? {
                              backgroundColor: "var(--accent-color)",
                              color: "black",
                            }
                          : null
                      }
                    >
                      {element}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {loading ? (
              <h1 style={{ textAlign: "center" }}>Loading...</h1>
            ) : currentJudgements && currentJudgements.length != 0 ? (
              <div className={styles.cards} ref={divRef}>
                {currentJudgements.map((element, index) => (
                  <Link
                    href={user ? element.link : ""}
                    key={index}
                    target={user && "_blank"}
                    onClick={() => {
                      setJudgementClick(true);
                      !user &&
                        alert("To access full information, Please login ☺️");
                    }}
                  >
                    <div className={styles.card}>
                      <h3>{element.title}</h3>
                      <h4>Judgement Date: {element.date}</h4>
                      <h5>Citation: {element.citation}</h5>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <h1 style={{ textAlign: "center" }} className={styles.noContentHeader}>No Judgements Found!</h1>
            )}
            {currentJudgements && currentJudgements.length != 0 && !loading && (
              <PageNumberSection
                totalPageNumbers={totalPageNumbers}
                path={"judgements"}
                currentPage={page}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
