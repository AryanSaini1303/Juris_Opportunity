"use client";
import styles from "./page.module.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";
import Link from "next/link";

const POSHandPOCSOPage = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        <section className={styles.container}>
          <h1 className={styles.title}>
            Explore Juris Opportunity&apos;s Legal Expertise
          </h1>
          <p className={styles.description}>
            At Juris Opportunity, we are dedicated to providing exceptional
            legal services tailored to your unique needs. Discover our
            commitment to justice and excellence.
          </p>
          <div className={styles.buttons}>
            <Link href={"/"}>
              <button className={styles.primaryButton}>Get Started</button>
            </Link>
          </div>
          <img src="/library.jpg" alt="" className={styles.library} />
        </section>
        <div className={styles.container1}>
          <div className={styles.feature}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🔴</span>
            </div>
            <h3 className={styles.title1}>Experienced Legal Professionals</h3>
            <p className={styles.description1}>
              Our team of seasoned lawyers ensures you receive top-notch legal
              advice.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🌸</span>
            </div>
            <h3 className={styles.title1}>Personalized Legal Services</h3>
            <p className={styles.description1}>
              Tailored legal strategies to meet your individual requirements.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>📊</span>
            </div>
            <h3 className={styles.title1}>Comprehensive Legal Solutions</h3>
            <p className={styles.description1}>
              A wide range of services to address all legal needs.
            </p>
          </div>
        </div>
        <div className={styles.features}>
          <img src="/client_centered.jpg" alt="" />
          <div className={styles.info}>
            <h1>Client-Centered Focus</h1>
            <p>
              The Juris Opportunity website emphasizes prioritizing the
              client&apos;s interests in every legal case it handles. This is
              reflected in the content and design, which showcase a strong
              commitment to understanding client needs and tailoring legal
              solutions accordingly.
            </p>
          </div>
        </div>
        <div className={styles.features}>
          <div className={styles.info}>
            <h1>Transparent Communication</h1>
            <p>
              The website highlights a process where clients are kept informed
              throughout their legal journey. This feature assures users of open
              communication, fostering trust and confidence.
            </p>
          </div>
          <img src="/communication.jpg" alt="" />
        </div>
        <div className={styles.features}>
          <img src="/track_record.jpg" alt="" />
          <div className={styles.info}>
            <h1>Proven Track Record</h1>
            <p>
              The Juris Opportunity website highlights a process where clients
              are kept informed throughout their legal journey. This feature
              assures users of open communication, fostering trust and
              confidence.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
