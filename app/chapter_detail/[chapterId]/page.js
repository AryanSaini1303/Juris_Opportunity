"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoaderComponent from "@/components/loader";

export default function ChapterDetailsPage({ params }) {
  const [chapterDetails, setChapterDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapterDetails = async () => {
      const { chapterId } = await params;
      try {
        const response = await fetch(
          `/api/getChapterDetails?chapterId=${chapterId}`
        );
        const data = await response.json();
        console.log(data);
        setChapterDetails(data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chapter details:", error);
        setLoading(false);
      }
    };
    fetchChapterDetails();
  }, []);
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        {loading ? (
          <LoaderComponent />
        ) : chapterDetails ? (
          <div className={styles.container}>
            <h1>{chapterDetails.subject_name}</h1>
            <div>
              <h2>{chapterDetails.name}</h2>
              <p>{chapterDetails.description}</p>
              <ul>
                {chapterDetails.content?.map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <h1>No Notes Found</h1>
        )}
      </main>
      <Footer />
    </div>
  );
}
