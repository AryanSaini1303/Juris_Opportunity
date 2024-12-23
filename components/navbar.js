"use client";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState();
  const [hover, setHover] = useState(false);
  const url = usePathname();
  const [notesClick, setNotesClick] = useState(false);
  const [allChapters, setAllChapters] = useState();
  const [chaptersHover, setChaptersHover] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log(error);
      return;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };
  // console.log("mobile: ", mobile);
  // console.log("hamburger: ", hamburger);
  useEffect(() => {
    // Ensure the code only runs in the browser
    const handleResize = () => {
      if (window.innerWidth <= 426) {
        setMobile(true);
      } else {
        setMobile(false);
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
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
          const { user } = session;
          setUser(user);
        } else {
          setUser(null);
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("/api/getAllSubjects");
        const data = await response.json();
        setAllChapters(data);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };
    fetchSubjects();
  }, []);

  function handleMouseEnter() {
    setHover(true);
  }
  function handleMouseLeave() {
    setHover(false);
  }
  return (
    <section className={styles.navbar}>
      <Link href={"/"}>
        <div className={styles.logoSection}>
          <Image src={"/logo.png"} height={60} width={60} alt="logo" />
          <div className={styles.logoInfo}>
            <h3>JURIS OPPORTUNITIES</h3>
            <h6>Where Legal Aspirations Meet Opportunities</h6>
          </div>
        </div>
      </Link>
      {((hamburger && mobile) || (!hamburger && !mobile)) && (
        <div className={styles.linkSection}>
          <ul>
            <li>
              <Link
                href={"/posh_pocso"}
                style={
                  url.startsWith("/posh_pocso")
                    ? {
                        backgroundColor: "white",
                        color: "var(--secondary-color)",
                      }
                    : null
                }
              >
                POSH & POCSO
              </Link>
            </li>
            <li>
              <Link
                href={"/bare_acts?page=1"}
                style={
                  url.startsWith("/bare_acts")
                    ? {
                        backgroundColor: "white",
                        color: "var(--secondary-color)",
                      }
                    : null
                }
              >
                Bare Acts
              </Link>
            </li>
            <li>
              <Link
                href={"/judgements?page=1"}
                style={
                  url.startsWith("/judgements")
                    ? {
                        backgroundColor: "white",
                        color: "var(--secondary-color)",
                      }
                    : null
                }
              >
                Judgements
              </Link>
            </li>
            <li>
              <Link
                href={""}
                style={
                  url.startsWith("/chapters") ||
                  notesClick ||
                  url.startsWith("/chapter_detail")
                    ? {
                        backgroundColor: "white",
                        color: "var(--secondary-color)",
                      }
                    : null
                }
                tabIndex={0}
                onBlur={() => !chaptersHover && setNotesClick(false)}
                onClick={() => setNotesClick(!notesClick)}
              >
                Notes
              </Link>
              {notesClick && allChapters && (
                <ul className={styles.dropdown}>
                  {allChapters.map((element) => (
                    <li key={element.id}>
                      <Link
                        href={`/chapters/${element.id}`}
                        onMouseEnter={() => setChaptersHover(true)}
                        onMouseLeave={() => setChaptersHover(false)}
                        style={
                          url.endsWith(`/chapters/${element.id}`)
                            ? {
                                backgroundColor: "var(--secondary-color)",
                                color: "var(--primary-color)",
                              }
                            : null
                        }
                      >
                        {element.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {mobile && (
              <li>
                <Link
                  href={"/expiring_events"}
                  style={
                    url.startsWith("/expiring_events")
                      ? {
                          backgroundColor: "white",
                          color: "var(--secondary-color)",
                        }
                      : null
                  }
                >
                  Expiring Events
                </Link>
              </li>
            )}
            <li>
              <Link
                href={!mobile ? "/MapSearch" : "/about"}
                style={
                  url.startsWith(!mobile ? "/MapSearch" : "/about")
                    ? {
                        backgroundColor: "white",
                        color: "var(--secondary-color)",
                      }
                    : null
                }
              >
                {!mobile ? "Map Search" : "About Us"}
              </Link>
            </li>
            {mobile && (
              <li>
                <div onClick={!user ? signIn : signOut}>
                  {user && hover ? (
                    <h3
                      style={{ margin: " 1.2rem 2rem", fontWeight: "bolder" }}
                    >
                      Log Out
                    </h3>
                  ) : (
                    <>
                      {!user && !mobile ? (
                        <svg
                          viewBox="0 0 24 24"
                          fill="var(--secondary-color)"
                          height="2em"
                          width="2em"
                        >
                          <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
                        </svg>
                      ) : // <img
                      //   src={user.user_metadata.avatar_url}
                      //   style={{ height: "2rem", width: "2rem", borderRadius: "50%" }}
                      //   onError={(e) => {
                      //     e.target.onerror = null;
                      //     e.target.src = "https://picsum.photos/200";
                      //   }}
                      // />
                      null}
                      <h3>
                        {user ? `Hey, ${user.user_metadata.name}` : "Log In"}
                      </h3>
                    </>
                  )}
                </div>
              </li>
            )}
            {/* <Link href={"#"}>
            <li>Notes</li>
          </Link> */}
          </ul>
        </div>
      )}
      <div
        className={styles.loginSection}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!mobile && (
          <div onClick={!user ? signIn : signOut}>
            {user && hover ? (
              <h3 style={{ margin: " 1.2rem 2rem", fontWeight: "bolder" }}>
                Log Out
              </h3>
            ) : (
              <>
                {!user ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    height="2em"
                    width="2em"
                  >
                    <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
                  </svg>
                ) : // <img
                //   src={user.user_metadata.avatar_url}
                //   style={{ height: "2rem", width: "2rem", borderRadius: "50%" }}
                //   onError={(e) => {
                //     e.target.onerror = null;
                //     e.target.src = "https://picsum.photos/200";
                //   }}
                // />
                null}
                <h3>{user ? `Hey, ${user.user_metadata.name}` : "Log In"}</h3>
              </>
            )}
          </div>
        )}
      </div>
      {mobile && (
        <div
          className={styles.hamburger}
          onClick={() => {
            setHamburger(!hamburger);
          }}
          style={hamburger ? { boxShadow: "0.3rem 0.3rem 0.3rem black" } : null}
        >
          <div
            style={
              hamburger
                ? { transform: "rotate(-45deg)", transformOrigin: "80% 150%" }
                : null
            }
          ></div>
          <div
            style={
              hamburger
                ? { transform: "rotate(45deg)", transformOrigin: "70% 0%" }
                : null
            }
          ></div>
        </div>
      )}
    </section>
  );
}
