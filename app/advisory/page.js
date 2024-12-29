"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function AdvisoryPage() {
  const [click, setClick] = useState(0);
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        <header className={styles.header}>Our Advisory Board</header>
        <section className={styles.cardsSection}>
          <div
            className={styles.card}
            tabIndex={0}
            style={
              click == 1
                ? { transform: "rotateX(180deg)" }
                : { transform: "rotateX(0)" }
            }
            onClick={() => {
              setClick(1);
            }}
            onBlur={() => {
              setClick(0);
            }}
          >
            <Image
              src={"/support.jpg"}
              width={100}
              height={100}
              alt=""
              style={click == 1 ? { display:"none" } : null}
            />
            {click != 1 ? (
              <div className={styles.info}>
                <h1>Abhishek Yadav</h1>
                <h4>UI/UX Designer</h4>
              </div>
            ) : (
              <p style={{ transform: "rotateX(180deg)" }}>
                Passionate UI/UX designer creating intuitive, user-friendly
                interfaces, blending creativity and functionality to enhance
                user experiences across digital platforms.
              </p>
            )}
          </div>
          <div
            className={styles.card}
            style={
              click == 2
                ? { transform: "rotateX(180deg)" }
                : { transform: "rotateX(0)" }
            }
            tabIndex={0}
            onClick={() => {
              setClick(2);
            }}
            onBlur={() => {
              setClick(0);
            }}
          >
            <Image
              src={"/support.jpg"}
              width={100}
              height={100}
              alt=""
              style={click == 2 ? { display:"none" } : null}
            />
            {click != 2 ? (
              <div className={styles.info}>
                <h1>Abhishek Yadav</h1>
                <h4>UI/UX Designer</h4>
              </div>
            ) : (
              <p style={{ transform: "rotateX(180deg)" }}>
                Passionate UI/UX designer creating intuitive, user-friendly
                interfaces, blending creativity and functionality to enhance
                user experiences across digital platforms.
              </p>
            )}
          </div>
          <div
            className={styles.card}
            style={
              click == 3
                ? { transform: "rotateX(180deg)" }
                : { transform: "rotateX(0)" }
            }
            tabIndex={0}
            onClick={() => {
              setClick(3);
            }}
            onBlur={() => {
              setClick(0);
            }}
          >
            <Image
              src={"/support.jpg"}
              width={100}
              height={100}
              alt=""
              style={click == 3 ? { display:"none" } : null}
            />
            {click != 3 ? (
              <div className={styles.info}>
                <h1>Abhishek Yadav</h1>
                <h4>UI/UX Designer</h4>
              </div>
            ) : (
              <p style={{ transform: "rotateX(180deg)" }}>
                Passionate UI/UX designer creating intuitive, user-friendly
                interfaces, blending creativity and functionality to enhance
                user experiences across digital platforms.
              </p>
            )}
          </div>
          <div
            className={styles.card}
            style={
              click == 4
                ? { transform: "rotateX(180deg)" }
                : { transform: "rotateX(0)" }
            }
            tabIndex={0}
            onClick={() => {
              setClick(4);
            }}
            onBlur={() => {
              setClick(0);
            }}
          >
            <Image
              src={"/support.jpg"}
              width={100}
              height={100}
              alt=""
              style={click == 4 ? { display:"none" } : null}
            />
            {click != 4 ? (
              <div className={styles.info}>
                <h1>Abhishek Yadav</h1>
                <h4>UI/UX Designer</h4>
              </div>
            ) : (
              <p style={{ transform: "rotateX(180deg)" }}>
                Passionate UI/UX designer creating intuitive, user-friendly
                interfaces, blending creativity and functionality to enhance
                user experiences across digital platforms.
              </p>
            )}
          </div>
          <div
            className={styles.card}
            style={
              click == 5
                ? { transform: "rotateX(180deg)" }
                : { transform: "rotateX(0)" }
            }
            tabIndex={0}
            onClick={() => {
              setClick(5);
            }}
            onBlur={() => {
              setClick(0);
            }}
          >
            <Image
              src={"/support.jpg"}
              width={100}
              height={100}
              alt=""
              style={click == 5 ? { display:"none" } : null}
            />
            {click != 5 ? (
              <div className={styles.info}>
                <h1>Abhishek Yadav</h1>
                <h4>UI/UX Designer</h4>
              </div>
            ) : (
              <p style={{ transform: "rotateX(180deg)" }}>
                Passionate UI/UX designer creating intuitive, user-friendly
                interfaces, blending creativity and functionality to enhance
                user experiences across digital platforms.
              </p>
            )}
          </div>
          <div
            className={styles.card}
            style={
              click == 6
                ? { transform: "rotateX(180deg)" }
                : { transform: "rotateX(0)" }
            }
            tabIndex={0}
            onClick={() => {
              setClick(6);
            }}
            onBlur={() => {
              setClick(0);
            }}
          >
            <Image
              src={"/support.jpg"}
              width={100}
              height={100}
              alt=""
              style={click == 6 ? { display:"none" } : null}
            />
            {click != 6 ? (
              <div className={styles.info}>
                <h1>Abhishek Yadav</h1>
                <h4>UI/UX Designer</h4>
              </div>
            ) : (
              <p style={{ transform: "rotateX(180deg)" }}>
                Passionate UI/UX designer creating intuitive, user-friendly
                interfaces, blending creativity and functionality to enhance
                user experiences across digital platforms.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
