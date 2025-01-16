"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import LoaderComponent from "@/components/loader";

export default function AdvisoryPage() {
  const [click, setClick] = useState(0);
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvisory = async () => {
      try {
        const response = await fetch(`/api/getAdvisory`);
        const data = await response.json();
        console.log(data);
        setMembers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching advisory board:", error);
        setLoading(false);
      }
    };
    fetchAdvisory();
  }, []);

  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        <header className={styles.header}>Journal</header>
        {!loading ? (
          <section className={styles.cardsSection}>
            {members &&
              members.map((element, index) => (
                <div
                  className={styles.card}
                  tabIndex={0}
                  key={element.id}
                  style={
                    click == `${index + 1}`
                      ? {
                          transform: "translateY(-5px)",
                          boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
                        }
                      : null
                  }
                  onClick={() => {
                    click == index + 1 ? setClick(0) : setClick(index + 1);
                  }}
                  onBlur={() => {
                    setClick(0);
                  }}
                >
                  <img
                    src={element.image}
                    alt=""
                    style={click == `${index + 1}` ? { display: "none" } : null}
                  />
                  {click != `${index + 1}` ? (
                    <div className={styles.info}>
                      <h1>{element.name}</h1>
                      <h4>{element.role}</h4>
                    </div>
                  ) : (
                    <p>{element.description}</p>
                  )}
                </div>
              ))}
          </section>
        ) : (
          <LoaderComponent/>
        )}
      </main>
      <Footer />
    </div>
  );
}
