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
      <div className={styles.linkSection}>
        <ul>
          <li>
            <Link href={"#"}>POSH & POCSO</Link>
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
          <li>
            <Link
              href="/MapSearch"
              style={
                url.startsWith("/MapSearch")
                  ? {
                      backgroundColor: "white",
                      color: "var(--secondary-color)",
                    }
                  : null
              }
            >
              Map Search
            </Link>
          </li>
          {/* <Link href={"#"}>
            <li>Notes</li>
          </Link> */}
        </ul>
      </div>
      {/* <div className={styles.searchSection}>
        <form onSubmit={handleFormSubmit}>
          <svg fill="#4C0A02" viewBox="0 0 16 16" height="1em" width="1em">
            <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
          </svg>
          <input
            type="text"
            onChange={handleSearch}
            name="searchQuery"
            placeholder="Search..."
          />
        </form>
      </div> */}
      <div
        className={styles.loginSection}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div onClick={!user ? signIn : signOut}>
          {user && hover ? (
            <h3 style={{ margin: " 1.2rem 2rem", fontWeight: "bolder" }}>
              Log Out
            </h3>
          ) : (
            <>
              {!user ? (
                <svg viewBox="0 0 24 24" fill="white" height="2em" width="2em">
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
      </div>
    </section>
  );
}
