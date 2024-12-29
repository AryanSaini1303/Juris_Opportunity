"use client";
import LoaderComponent from "@/components/loader";
import styles from "./page.module.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [hover, setHover] = useState(0);
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`/api/getMembers`);
        const data = await response.json();
        console.log(data);
        setMembers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching advisory board:", error);
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="wrapper">
      <Navbar />
      <main className="content" style={{ padding: "1rem 5rem" }}>
        <section className={styles.info}>
          <h1>Safe Workspaces, Empowered lives</h1>
          <p>
            Empowering safe, respectful workplaces with expert POSH and POSCO
            guidance
          </p>
        </section>
        <section className={styles.members}>
          {loading ? (
            <LoaderComponent />
          ) : members ? (
            members.map((element, index) => (
              <div
                onMouseEnter={() => {
                  setHover(index + 1);
                }}
                onMouseLeave={() => {
                  setHover(0);
                }}
                key={element.id}
                className={styles.card}
              >
                <img
                  src={element.image}
                  alt=""
                  className={`styles.member${index + 1}`}
                  width={220}
                  height={350}
                />
                {hover == index + 1 && (
                  <section className={styles.memberInfo}>
                    <h2>{element.name}</h2>
                    <p>{element.role}</p>
                  </section>
                )}
                <section className={styles.shade}></section>
              </div>
            ))
          ) : (
            <p>No members found!</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
