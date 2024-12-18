"use client";
import { useEffect, useState, use } from "react";
import styles from "./page.module.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import LoaderComponent from "@/components/loader";

export default function NewsDetailsPage({ params }) {
  const { newsId } = use(params);
//   console.log(newsId);
  const [news, setNews] = useState();
  const [loading, setLoading] = useState();
  const [newsDate, setNewsDate] = useState();
  const date = new Date(news?.created_at);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  useEffect(() => {
    setNewsDate(date.toLocaleString("en-GB", options));
  }, [date]);

  useEffect(() => {
    setLoading(true);
    const fetchCurrentNews = async () => {
      const response = await fetch(`/api/getCurrentNews?id=${newsId}`);
      const data = await response.json();
    //   console.log(data.data[0]);
      setNews(data.data[0]);
      setLoading(false);
    };
    fetchCurrentNews();
  }, []);
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        {loading ? (
          <LoaderComponent/>
        ) : (
          news && (
            <div className={styles.container}>
              <h3>News</h3>
              <div>
                <h1>{news.heading}</h1>
                <p>{news.brief}</p>
                <img src={news.poster} alt="" />
                <p>{news.author}</p>
                <p>
                  Published on: {newsDate} | {news.readTime} min read
                </p>
                <br />
                <p>{news.content}</p>
              </div>
            </div>
          )
        )}
      </main>
      <Footer />
    </div>
  );
}
