"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import LoaderComponent from "@/components/loader";
import Link from "next/link";
export default function ChaptersPage({ params }) {
  const [chapters, setAllChapters] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      const { subjectId } = await params;
      try {
        const response = await fetch(
          `/api/getAllChapters?subjectId=${subjectId}`
        );
        const data = await response.json();
        console.log(data);
        setAllChapters(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        <div className={styles.chaptersContainer}>
          <h1>{chapters && chapters.length!=0 && chapters[0].subject_name}</h1>
          <div className={styles.cardsContainer}>
            {loading ? (
              <LoaderComponent />
            ) : chapters && chapters.length != 0 ? (
              chapters.map((chapter) => (
                <Link key={chapter.id} className={styles.card} href={'/chapter_detail/'+chapter.id}>
                  <h2>{chapter.name}</h2>
                  <p>{chapter.description}</p>
                </Link>
              ))
            ) : (
              <h1 style={{textAlign:'center'}}>No Chapters Found!</h1>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
