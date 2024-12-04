"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import styles from "./page.module.css";
import Link from "next/link";
import SearchBar from "@/components/searchBar";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageNumberSection from "@/components/pageNumberSection";

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
  const limit = 24;
  const router = useRouter();
  const [totalPageNumbers, setTotalPageNumbers] = useState(
    Math.ceil(48 / limit)
  ); // As initially i'm fetching only 12 entries and one page can show 4 entries so the total page numbers can be calculated by totalEntries/limit
  const divRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
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
  }, []);

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

  function handleFormSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        <div className={styles.container}>
          <SearchBar
            handleFormSubmit={handleFormSubmit}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={"e.g. State of Rajasthan"}
          />
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
          <div className={styles.cardSection}>
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
            {loading ? (
              <h1 style={{ textAlign: "center" }}>Loading...</h1>
            ) : currentJudgements && currentJudgements.length != 0 ? (
              <div className={styles.cards} ref={divRef}>
                {currentJudgements.map((element, index) => (
                  <Link href={element.link} key={index} target="_blank">
                    <div className={styles.card}>
                      <h3>{element.title}</h3>
                      <h4>Judgement Date: {element.date}</h4>
                      <h5>Citation: {element.citation}</h5>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <h1 style={{ textAlign: "center" }}>No Judgements Found!</h1>
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
