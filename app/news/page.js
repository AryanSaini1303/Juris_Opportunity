"use client";
import Footer from "@/components/footer";
import styles from "./page.module.css";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageNumberSection from "@/components/pageNumberSection";
import SearchBar from "@/components/searchBar";
import LoaderComponent from "@/components/loader";

export default function NewsPage() {
  const [topNews, setTopNews] = useState();
  const [news, setNews] = useState();
  // const limit = 12;
  const [otherNews, setOtherNews] = useState();
  const [loading, setLoading] = useState();
  const searchparams = useSearchParams();
  // const [totalPageNumbers, setTotalPageNumbers] = useState();
  const page = searchparams.get("page") || 1;
  const [searchQuery, setSearchQuery] = useState();
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const limit = mobile && !mobile ? 12 : 5;
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
      const fetchAllNews = async () => {
        try {
          const response = await fetch("/api/getAllNews");
          const data = await response.json();
          setTopNews(data.data.slice(0, 7));
          setNews(data.data.slice(7));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching news:", error.message);
          setLoading(false);
        }
      };
      fetchAllNews();
    }
  }, [searchQuery]); // This useEffect runs when component mounts and when the searchQuery changes but i don't want to fetch all th news everytime searchQuery changes so used if(!searchQuery) to run only when the user completely backspaces the complete searchQuery and on component mount
  // console.log("News fetched: ", news);

  useEffect(() => {
    if (news) {
      setTotalPageNumbers(Math.ceil(news.length / limit)); // Math.ceil rounds up the number to the next largest number
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedNews = news.slice(startIndex, endIndex);
      // console.log("Paginated News: ", paginatedNews);
      setOtherNews(paginatedNews);
    }
  }, [news]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        setLoading(true);
        const fetchFilteredNews = async () => {
          const response = await fetch(
            `/api/getNewsBySearchQuery?query=${searchQuery}`
          );
          let data = await response.json();
          if (data.message === "No news found matching the query.") {
            data = [];
          }
          // console.log(data);
          setNews(data);
          setTotalPageNumbers(Math.ceil(data.length / limit));
          setLoading(false);
        };
        fetchFilteredNews();
      }
    }, 500); // Delay of 500ms
    // Cleanup function to clear the timeout
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  function handleSearch(e) {
    e.preventDefault();
    // console.log(e.target.searchQuery.value);
  }

  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        {topNews ? (
          <>
            <SearchBar
              handleFormSubmit={handleSearch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder={"e.g. Significance change in patent law"}
              margin={"2rem 0"}
            />
            {page == 1 && !searchQuery && (
              <section className={styles.topStories}>
                <h1>Today&apos;s Top Stories</h1>
                <div className={styles.cardsSection}>
                  <section
                    className={styles.card1}
                    onClick={() => {
                      router.push(`/news/${topNews[0].id}`);
                    }}
                  >
                    <img src={topNews[0].poster} alt="" />
                    <h3>{topNews[0].heading}</h3>
                    <p>{topNews[0].readTime} min read</p>
                    <p>{topNews[0].brief}</p>
                  </section>
                  {topNews.map((element, index) => {
                    if (index > 0) {
                      return (
                        <section
                          className={styles.card}
                          key={element.id}
                          onClick={() => {
                            router.push(`/news/${element.id}`);
                          }}
                        >
                          <img src={element.poster} alt="" />
                          <div className={styles.info}>
                            <h3>{element.heading}</h3>
                            <p>{element.readTime} min read</p>
                          </div>
                        </section>
                      );
                    }
                  })}
                </div>
              </section>
            )}

            {loading ? (
              <LoaderComponent />
            ) : (
              !mobile && (
                <section
                  className={styles.topStories}
                  style={{ marginTop: "2rem" }}
                >
                  <h1>News</h1>
                  {otherNews && otherNews.length != 0 ? (
                    <div
                      className={styles.cardsSection}
                      style={{
                        gridTemplateRows: "none",
                        gridTemplateColumns: "1fr 1fr 1fr",
                      }}
                    >
                      {otherNews.map((element, index) => {
                        {
                          return (
                            <section
                              className={styles.card}
                              key={element.id}
                              onClick={() => {
                                router.push(`/news/${element.id}`);
                              }}
                            >
                              <img src={element.poster} alt="" />
                              <div className={styles.info}>
                                <h3>{element.heading}</h3>
                                <p>{element.readTime} min read</p>
                                <p>{element.author}</p>
                              </div>
                            </section>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    <h2 style={{ margin: "0 1rem" }}>No News Found!</h2>
                  )}
                  {otherNews && otherNews.length != 0 && (
                    <PageNumberSection
                      totalPageNumbers={totalPageNumbers}
                      path={"news"}
                      currentPage={page}
                    />
                  )}
                </section>
              )
            )}
          </>
        ) : (
          <LoaderComponent />
        )}
      </main>
      <Footer />
    </div>
  );
}
