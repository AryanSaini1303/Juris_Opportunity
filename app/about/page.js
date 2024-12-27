"use client";
import styles from "./page.module.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [hover, setHover] = useState(0);
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
          <div
            onMouseEnter={() => {
              setHover(1);
            }}
            onMouseLeave={() => {
              setHover(0);
            }}
          >
            <Image
              src="/member1.jpg"
              alt=""
              className={styles.member1}
              width={220}
              height={350}
            />
            {hover==1 && (
              <section className={styles.memberInfo}>
                <h2>Sasha Grey</h2>
                <p>Head of Designs</p>
              </section>
            )}
            <section className={styles.shade}></section>
          </div>
          <div
            onMouseEnter={() => {
              setHover(2);
            }}
            onMouseLeave={() => {
              setHover(0);
            }}
          >
            <Image
              src="/member2.jpg"
              alt=""
              className={styles.member2}
              width={220}
              height={350}
            />
            {hover==2 && (
              <section className={styles.memberInfo}>
                <h2>Mathew Brians</h2>
                <p>Junior Developer</p>
              </section>
            )}
            <section className={styles.shade}></section>
          </div>
          <div
            onMouseEnter={() => {
              setHover(3);
            }}
            onMouseLeave={() => {
              setHover(0);
            }}
          >
            <Image
              src="/member3.jpg"
              alt=""
              className={styles.member3}
              width={220}
              height={350}
            />
            {hover==3 && (
              <section className={styles.memberInfo}>
                <h2>Xiaomi chang</h2>
                <p>Database Administrator</p>
              </section>
            )}
            <section className={styles.shade}></section>
          </div>
          <div
            onMouseEnter={() => {
              setHover(4);
            }}
            onMouseLeave={() => {
              setHover(0);
            }}
          >
            <Image
              src="/member4.jpg"
              alt=""
              className={styles.member4}
              width={220}
              height={350}
            />
            {hover==4 && (
              <section className={styles.memberInfo}>
                <h2>Scarlett Watson</h2>
                <p>Sales </p>
              </section>
            )}
            <section className={styles.shade}></section>
          </div>
          <div
            onMouseEnter={() => {
              setHover(5);
            }}
            onMouseLeave={() => {
              setHover(0);
            }}
          >
            <Image
              src="/member5.jpg"
              alt=""
              className={styles.member5}
              width={220}
              height={350}
            />
            {hover==5 && (
              <section className={styles.memberInfo}>
                <h2>Howard Potts</h2>
                <p>Lead Developer</p>
              </section>
            )}
            <section className={styles.shade}></section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
