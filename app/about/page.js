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
          {!mobile&&<div className={styles.image_container}>
            <p>
              Juris Opportunities connects legal aspirations with real-world
              opportunities, offering resources like judgments and bare acts to
              support your legal journey.
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
          </div>}
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, cum, neque reiciendis perspiciatis alias enim magni
              suscipit explicabo quae repellendus, beatae fuga cupiditate ut
              illo adipisci sint at impedit quibusdam eveniet consequuntur
              illum. Asperiores exercitationem vitae, sit ut deleniti aperiam
              suscipit, aut dolorum blanditiis omnis impedit eligendi iste dolor
              doloremque. Voluptatibus molestias repellat ipsam voluptas,
              corrupti aspernatur unde distinctio eius alias aperiam obcaecati
              adipisci velit nisi porro provident non, quaerat nemo ratione
              voluptatum iusto maiores, harum corporis. Cumque, corporis.
              Accusantium!
            </h3>
            <Image
              src="/court_image.jpg"
              alt=""
              height={!mobile?180:140}
              width={!mobile?640:295}
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus commodi soluta voluptatibus voluptate dolores tempora?
                Dolore temporibus unde, repellendus repellat architecto, ad quis
                reprehenderit aliquid suscipit, eveniet iure molestias dicta
                hic? Delectus eum fuga minima consequatur ea? Dolore aliquid
                cumque facilis reprehenderit? Iusto eveniet deserunt incidunt.
                Hic culpa ipsum accusantium minus quo delectus ipsa dolore
                quibusdam facere? Eveniet consequatur placeat non quisquam
                omnis, culpa, reprehenderit, incidunt quod hic nisi dolorum
                cupiditate? Accusamus at nisi nemo illo, perferendis officiis.
                Sapiente quod, id doloremque cupiditate optio maxime molestias
                dolorem neque consequuntur doloribus fugit mollitia eaque
                consequatur! Vero eos illum minima praesentium facilis?
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
                <svg width="3rem" height="3rem" fill="#00c893" viewBox="0 0 512 512">
                  <path d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32v140.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.6 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7l-122-70.4V480c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7c8.8-15.4 28.4-20.6 43.7-11.8l122 70.4V32z" />
                </svg>
              <section>
                <h1>Vision</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ipsam totam quidem doloribus aliquam voluptate. Officia cum
                  molestiae repellendus voluptate veniam quibusdam ullam
                  reiciendis sint error natus enim officiis ratione facilis,
                  vitae mollitia numquam doloremque laudantium adipisci unde in.
                  Qui, numquam?
                </p>
              </section>
            </div>
            <div>
                <svg width="3rem" height="3rem" fill="#00c893" viewBox="0 0 512 512">
                  <path d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32v140.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.6 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7l-122-70.4V480c0 17.7-14.3 32-32 32h-32c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7c8.8-15.4 28.4-20.6 43.7-11.8l122 70.4V32z" />
                </svg>
              <section>
                <h1>Mission</h1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                  maxime possimus ducimus provident distinctio eaque
                  perspiciatis, nihil earum porro assumenda nam architecto.
                  Maxime, porro nesciunt, quisquam obcaecati illo quidem odio ab
                  tempora voluptates quod amet nulla incidunt veniam fugit
                  atque!
                </p>
              </section>
            </div>
            <Image
              src={"/square_court.jpg"}
              alt=""
              height={!mobile?400:290}
              width={!mobile?400:290}
            />
          </div>
        </div>
        <header className={styles.header}>Our Advisory Board</header>
        {!loading&&(
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
