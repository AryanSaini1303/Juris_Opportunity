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
  const [mobile, setMobile] = useState(false);

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
      <main
        className="content"
        style={!mobile ? { padding: "1rem 5rem" } : { padding: "1rem" }}
      >
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
                tabIndex={0}
                onMouseEnter={() => {
                  !mobile && setHover(index + 1);
                }}
                onMouseLeave={() => {
                  !mobile && setHover(0);
                }}
                onClick={() => {
                  mobile && setHover(index + 1);
                }}
                onBlur={() => {
                  mobile && setHover(0);
                }}
                key={element.id}
                className={styles.card}
                style={
                  mobile && hover==index+1
                    ? {
                        transform: "scale(1.03",
                        filter: "saturate(100%)",
                        boxShadow: "0.3rem 0.3rem 0.5rem black",
                      }
                    : null
                }
              >
                <img
                  src={element.image}
                  alt=""
                  className={`styles.member${index + 1}`}
                  width={!mobile?220:210}
                  height={!mobile?350:310}
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
                  <div
                    className={styles.cardContainer}
                    key={element.id}
                    style={
                      hover1 == index + 1
                        ? { transform: "translateY(-0.5rem)" }
                        : null
                    }
                  >
                    <div
                      tabIndex={0}
                      className={styles.infoCard}
                      onClick={() => {
                        hover1 == index + 1
                          ? setHover1(0)
                          : setHover1(index + 1);
                      }}
                      onBlur={() => {
                        setHover1(0);
                      }}
                      style={
                        hover1 == index + 1
                          ? {
                              transform: "rotateX(180deg)",
                              backgroundColor: "var(--secondary-color)",
                            }
                          : null
                      }
                    >
                      {hover1 != index + 1 ? (
                        <h3>{element.heading}</h3>
                      ) : (
                        <ul
                          style={
                            element.description.length == 1
                              ? { listStyleType: "none", padding: 0 }
                              : null
                          }
                        >
                          {element.description.map((element1, index) => (
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
