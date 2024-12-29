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
  const [hover1, setHover1] = useState(0);

  const [info, setInfo] = useState();
  const [infoLoading, infoLetLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await fetch(`/api/getAboutUs`);
        const data = await response.json();
        console.log(data);
        setInfo(data);
        infoLetLoading(false);
      } catch (error) {
        console.error("Error fetching advisory board:", error);
        infoLetLoading(false);
      }
    };
    fetchAboutUs();
  }, []);

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
          <h1>Driving Excellence in Legal Solutions, Empowering Growth</h1>
          <p>{info ? info[0].description : null}</p>
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
        {members && (
          <section className={styles.cardsSection}>
            {!infoLoading &&
              info &&
              info.map((element, index) => {
                if (index == 0) return;
                return (
                  <div className={styles.cardContainer} key={element.id}>
                    <div
                      className={styles.infoCard}
                      onMouseEnter={() => {
                        setHover1(index + 1);
                      }}
                      onMouseLeave={() => {
                        setHover1(0);
                      }}
                      style={
                        hover1 == index + 1
                          ? { transform: "rotateX(180deg)" }
                          : null
                      }
                    >
                      {hover1 != index + 1 ? (
                        <h3>{element.heading}</h3>
                      ) : (
                        <ul style={element.description.length==1?{listStyleType:"none", padding:0}:null}>
                          {element.description.map((element1, index)=>(
                          <li key={index}>{element1}</li>
                        ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
