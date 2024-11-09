"use client";
import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState();
  const [hover, setHover] = useState(false);
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

  function handleSearch(e) {
    e.preventDefault();
    // console.log(e.target.value);
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(e.target.searchQuery.value);
  }

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
          <Image src={"/logo.jpg"} height={60} width={60} alt="logo" />
          <div className={styles.logoInfo}>
            <h3>JURIS OPPORTUNITIES</h3>
            <h6>Where Legal Aspirations Meet Opportunities</h6>
          </div>
        </div>
      </Link>
      <div className={styles.linkSection}>
        <ul>
          <Link href={"#"}>
            <li>Bare Acts</li>
          </Link>
          <Link href={"#"}>
            <li>Judgements</li>
          </Link>
          <Link href={"#"}>
            <li>Opportunities</li>
          </Link>
          <Link href={"#"}>
            <li>Competitions</li>
          </Link>
          <Link href={"#"}>
            <li>Map Search</li>
          </Link>
          <Link href={"#"}>
            <li>Notes</li>
          </Link>
        </ul>
      </div>
      <div className={styles.searchSection}>
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
      </div>
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
              ) : (
                <img
                  src={user.user_metadata.picture}
                  style={{ height: "2rem", width: "2rem", borderRadius: "50%" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://picsum.photos/200";
                  }}
                />
              )}
              <h3>{user ? `${user.user_metadata.name}` : "Log In"}</h3>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
