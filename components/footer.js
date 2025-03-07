"use client";
import { supabase } from "@/lib/supabaseClient";
import styles from "./footer.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Footer() {
  const [user, setUser] = useState();
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const subscribeToNewsletter = async () => {
    setLoading(true);
    console.log("user: ", user);
    if (!user) {
      alert("You need to login first!");
      setLoading(false);
      return;
    }
    const { data, error: insertError } = await supabase
      .from("newsletter")
      .insert([
        { name: user.user_metadata.name, email: user.user_metadata.email },
      ]);
    if (insertError) {
      if (insertError.message.includes("duplicate key")) {
        alert("You are already subscribed to the newsletter!");
        setLoading(false);
      } else {
        console.log("Error inserting record:", insertError);
      }
      return;
    }
    setLoading(false);
    setSubscribed(true);
  };

  return (
    <>
      <section className={styles.footer}>
        <div className={styles.socialsSection}>
          <h1>Get in Touch</h1>
          <ul>
            <li>
              <Link href="mailto:jurisopportunities@gmail.com" target="_blank">
                <svg
                  height={!mobile ? "2rem" : "1.5rem"}
                  width={!mobile ? "2rem" : "1.5rem"}
                  fill="red"
                  viewBox="0 0 24 24"
                >
                  <path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/juris_opportunities/" target="_blank">
                <svg
                  viewBox="0 0 512 512"
                  fill="#FD0AAD"
                  height={!mobile ? "2rem" : "1.5rem"}
                  width={!mobile ? "2rem" : "1.5rem"}
                >
                  <path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z" />
                  <path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/juris-opportunities-5086b5321/?originalSubdomain=in" target="_blank">
                <svg
                  fill="#0A66C2"
                  viewBox="0 0 16 16"
                  height={!mobile ? "1.8rem" : "1.3rem"}
                  width={!mobile ? "1.8rem" : "1.3rem"}
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <hr />
        <div
          className={styles.newsletterSection}
          style={mobile ? { padding: "0" } : null}
        >
          {!mobile && (
            <div className={styles.banner_posts}>
              <p>
                For Banner, Posts, Ads Contact:{" "}
                <span>
                  <a href="mailto:jurisopportunities@gmail.com">
                    jurisopportunities@gmail.com
                  </a>
                </span>
                ,{" "}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText("+91-8385820107");
                  }}
                  className={styles.mobileNumber}
                >
                  +91-8385820107
                </span>
              </p>
            </div>
          )}
          <button onClick={subscribeToNewsletter}>
            {subscribed
              ? "Subscribed"
              : loading
              ? "Subscribing..."
              : !mobile
              ? "Subscribe to the newsletter"
              : "Subscribe"}
          </button>
        </div>
      </section>
      <p className={styles.rights}>
        &copy; 2024 Juris Opportunities. All rights reserved.
      </p>
    </>
  );
}
