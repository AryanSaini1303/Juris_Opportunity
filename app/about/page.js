"use client";
import LoaderComponent from "@/components/loader";
import styles from "./page.module.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AboutPage() {
  // const [hover, setHover] = useState(0);
  // const [members, setMembers] = useState();
  // const [loading, setLoading] = useState(true);
  // const [hover1, setHover1] = useState(0);

  // const [info, setInfo] = useState();
  // const [infoLoading, infoLetLoading] = useState(true);
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

  // useEffect(() => {
  //   const fetchAboutUs = async () => {
  //     try {
  //       const response = await fetch(`/api/getAboutUs`);
  //       const data = await response.json();
  //       console.log(data);
  //       setInfo(data);
  //       infoLetLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching advisory board:", error);
  //       infoLetLoading(false);
  //     }
  //   };
  //   fetchAboutUs();
  // }, []);

  // useEffect(() => {
  //   const fetchMembers = async () => {
  //     try {
  //       const response = await fetch(`/api/getMembers`);
  //       const data = await response.json();
  //       // console.log(data);
  //       setMembers(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching advisory board:", error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchMembers();
  // }, []);

  return (
    <div className="wrapper">
      <Navbar />
      <main
        className="content"
        // style={!mobile ? { padding: "1rem 5rem" } : { padding: "1rem" }}
      >
        {/* <section className={styles.info}>
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
        )} */}
        <div className={styles.container}>
          {!mobile && (
            <div className={styles.image_container}>
              <p>
                Juris Opportunities connects legal aspirations with real-world
                opportunities, offering resources like judgments and bare acts
                to support your legal journey.
              </p>
              <h1>
                Our Story, Vision, <br /> and Values
              </h1>
              <div className={styles.box}></div>
              <Image
                src={"/about_us_header.jpg"}
                height={700}
                width={1500}
                alt="law_image"
                className={styles.header_image}
                layout="responsive"
              />
            </div>
          )}
          <div className={styles.info1}>
            <svg
              width="1.5em"
              height="1.5em"
              fill="rgb(131, 131, 131)"
              viewBox="0 0 16 16"
            >
              <path d="M3.516 7a3.5 3.5 0 1 1-3.5 3.5L0 10a7 7 0 0 1 7-7v2a4.97 4.97 0 0 0-3.536 1.464 5.01 5.01 0 0 0-.497.578c.179-.028.362-.043.548-.043zm9 0a3.5 3.5 0 1 1-3.5 3.5L9 10a7 7 0 0 1 7-7v2a4.97 4.97 0 0 0-3.536 1.464 5.01 5.01 0 0 0-.497.578c.179-.028.362-.043.549-.043z" />
            </svg>
            <h3>
              Juris Opportunities is not just a platform—it&apos;s the most
              comprehensive legal resource available today. Imagine having
              access to everything you need in one place: an expansive
              collection of central and state laws, Supreme Court judgments, and
              the latest legal developments. Whether you are researching,
              preparing for a competition, drafting a paper, or simply refining
              your skills, our legal directory provides everything in a single,
              streamlined experience.
            </h3>
            <Image
              src="/court_image.jpg"
              alt=""
              height={!mobile ? 180 : 140}
              width={!mobile ? 640 : 295}
            />
            <section>
              <h2>
                About{" "}
                <span>
                  <svg
                    width="0.8em"
                    height="0.8em"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32v140.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.6 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7l-122-70.4V480c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7c8.8-15.4 28.4-20.6 43.7-11.8l122 70.4V32z" />
                  </svg>
                </span>
              </h2>
              <p>
                Welcome to Juris Opportunities—the world&apos;s premier platform
                designed to empower law students and legal professionals at
                every stage of their journey. From your first steps in law
                school to securing your dream job, we are your one-stop solution
                to thriving in the legal world. Whether you&apos;re looking for
                updates on Moot Court competitions, prestigious seminars,
                groundbreaking academic publications, or networking
                opportunities, we bring the entire legal landscape to your
                fingertips. With curated internships, exclusive job openings,
                and personalized one-on-one mentorship.
              </p>
            </section>
          </div>
          <div className={styles.stats}>
            <section>
              <h1>200+</h1>
              <h4>Projects Completed</h4>
            </section>
            <hr />
            <section>
              <h1>150+</h1>
              <h4>Satisfied Clients</h4>
            </section>
            <hr />
            <section>
              <h1>50+</h1>
              <h4>Industry Awards</h4>
            </section>
          </div>
          <div className={styles.info2}>
            <div>
              <svg
                width="3rem"
                height="3rem"
                fill="#00c893"
                viewBox="0 0 512 512"
              >
                <path d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32v140.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.6 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7l-122-70.4V480c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7c8.8-15.4 28.4-20.6 43.7-11.8l122 70.4V32z" />
              </svg>
              <section>
                <h1>Vision</h1>
                <p>
                  Juris Opportunities was created by top-tier legal
                  professionals who have worked tirelessly to eliminate the
                  barriers law students face. Built on their deep insights and
                  experience, we&apos;ve designed this platform to simplify and
                  amplify your legal journey. Every feature—from exclusive
                  resources to one-on-one mentorship programs—has been carefully
                  crafted to ensure your success in the competitive legal world.
                </p>
              </section>
            </div>
            <div>
              <svg
                width="3rem"
                height="3rem"
                fill="#00c893"
                viewBox="0 0 512 512"
              >
                <path d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32v140.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.6 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7l-122-70.4V480c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7c8.8-15.4 28.4-20.6 43.7-11.8l122 70.4V32z" />
              </svg>
              <section>
                <h1>Mission</h1>
                <p>
                  We understand that the key to unlocking your future lies in
                  guidance. That&apos;s why we offer personalized one-to-one
                  mentorship with seasoned professionals who have walked the
                  path before you. Whether it&apos;s securing internships,
                  building a professional network, or navigating the
                  complexities of legal practice, our mentors are here to give
                  you actionable advice and help you grow with purpose.
                </p>
              </section>
            </div>
            <Image
              src={"/square_court.jpg"}
              alt=""
              height={!mobile ? 400 : 290}
              width={!mobile ? 400 : 290}
            />
          </div>
        </div>
        <header className={styles.header}>Our Advisory Board</header>
        {!loading && (
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
        )}
      </main>
      <Footer />
    </div>
  );
}
