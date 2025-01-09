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
            Juris Opportunities&apos; Legal Expertise
          </h1>
          <p className={styles.description}>
            Empower yourself with the knowledge and skills to navigate and
            implement crucial legal frameworks through our POCSO (Protection of
            Children from Sexual Offences) and POSH (Prevention of Sexual
            Harassment) training sessions. Led by certified experts, these
            comprehensive sessions combine legal insights, practical
            applications, and actionable strategies to foster safer, inclusive
            environments across workplaces and institutions. Understanding the
            provisions of POSH (Prevention of Sexual Harassment at the
            Workplace) and POCSO (Protection of Children from Sexual Offences)
            is crucial for several reasons:
          </p>
          <ul className={styles.description}>
            <li>
              <strong>Legal Compliance:</strong> Both POSH and POCSO are legally
              binding acts in India. Non-compliance can result in severe
              penalties for organizations, including fines and reputational
              damage.
            </li>
            <li>
              <strong>Employee Safety:</strong> POSH ensures a safe and
              respectful workplace for women, while POCSO safeguards children
              from sexual abuse. Understanding these laws helps prevent
              harassment and abuse.
            </li>
            <li>
              <strong>Creating a Positive Work Environment:</strong> A workplace
              free from harassment and discrimination fosters a positive and
              productive environment for all employees.
            </li>
            <li>
              <strong>Empowering Employees:</strong> Knowledge of these laws
              empowers employees to recognize and report harassment or abuse,
              ensuring their rights are protected.
            </li>
            <li>
              <strong>Building Trust:</strong> Regular training sessions
              demonstrate that management is committed to creating a safe and
              respectful workplace, building trust and confidence among
              employees.
            </li>
          </ul>
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
              advice in case of any legal issues along with POSH and POCSO
              session mandated by Supreme Court of India.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>🌸</span>
            </div>
            <h3 className={styles.title1}>Personalized Legal Services</h3>
            <p className={styles.description1}>
              Tailored legal strategies to meet your individual requirements as
              per your Industry standards and norms.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>📊</span>
            </div>
            <h3 className={styles.title1}>Comprehensive Legal Solutions</h3>
            <p className={styles.description1}>
              A wide range of services to address all legal needs with special
              focus on POSH and related cases.
            </p>
          </div>
        </div>
        <div className={styles.container2}>
          <div className={styles.features}>
            <img src="/client_centered.jpg" alt="" />
            <div className={styles.info}>
              <h1>Client-Centered Focus</h1>
              <ul>
                <li>
                  <strong>Raise Awareness:</strong> Educate employees about the
                  legal definitions of harassment and abuse, and the
                  consequences of violating these laws.
                </li>
                <li>
                  <strong>Promote a Culture of Respect:</strong> Encourage a
                  culture of respect, empathy, and zero tolerance for harassment
                  and abuse.
                </li>
                <li>
                  <strong>Provide Clear Reporting Mechanisms:</strong> Outline
                  the procedures for reporting incidents, ensuring that
                  complaints are handled confidentially and effectively.
                </li>
                <li>
                  <strong>Minimize Legal Risks:</strong> Reduce the risk of
                  legal action and reputational damage by proactively addressing
                  harassment and abuse issues.
                </li>
                <li>
                  <strong>Improve Employee Morale:</strong> Create a more
                  positive and inclusive work environment, leading to increased
                  employee satisfaction and productivity.
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.features}>
            <div className={styles.info}>
              <h1>Why Choose Us?</h1>
              <ul>
                <li>
                  <strong>Expert-Led Sessions:</strong> Delivered by certified
                  trainers with rich academic and professional experience.
                </li>
                <li>
                  <strong>Practical Implementation Focus:</strong> Learn
                  actionable strategies to ensure compliance and cultivate safe
                  environments.
                </li>
                <li>
                  <strong>Tailored for Impact:</strong> Designed for diverse
                  roles, ensuring relevance for all participants, from students
                  to senior professionals.
                </li>
              </ul>
              <p>
                Our sessions go beyond theory—integrating real-world case
                studies, interactive discussions, and hands-on guidance to
                ensure participants not only grasp the intricacies of the law
                but can apply them effectively. Whether you&apos;re a corporate
                leader, educator, or law professional, our training equips you
                with tools to make a lasting impact in safeguarding children and
                preventing harassment.
              </p>
            </div>
            <img src="/communication.jpg" alt="" />
          </div>
          <div className={styles.features}>
            <img src="/track_record.jpg" alt="" />
            <div className={styles.info}>
              <h1>Meet Our Trainers</h1>
              <h4 style={{ margin: "0.5rem 0" }}>Ms. Heena Parveen</h4>
              <p>
                An accomplished Assistant Professor, Ms. Heena Parveen combines
                an exceptional academic pedigree with over 5 years of training
                expertise. As a certified POSH and POCSO trainer, her sessions
                are lauded for their depth, practicality, and engagement,
                empowering participants to lead confidently in creating safer
                spaces.
              </p>
              <h4 style={{ margin: "0.5rem 0" }}>Mr. Aayush Bhardwaj</h4>
              <p>
                Mr. Aayush Bhardwaj is a distinguished POSH and POCSO trainer
                with a strong focus on legal compliance and safeguarding
                practices. His expertise lies in bridging the gap between legal
                provisions and their application in real-world scenarios,
                enabling professionals and organizations to foster inclusive,
                harassment-free environments.
              </p>
            </div>
          </div>
          <div className={styles.extraPara}>
            <h3>What You&apos;ll Gain</h3>
            <ul>
              <li>Comprehensive understanding of POCSO and POSH laws.</li>
              <li>
                Tools to ensure legal compliance and policy implementation.
              </li>
              <li>
                Confidence to create inclusive, harassment-free environments.
              </li>
              <li>
                Hands-on experience through case studies and interactive
                modules.
              </li>
            </ul>
            <h3>Join Us to Be a Catalyst for Change</h3>
            <p>
              This isn&apos;t just training—it&apos;s a transformative step
              toward building safer workplaces and communities. Reserve your
              spot today and become a part of the movement toward a more
              inclusive, protected future for all. Drop us a mail on
              jurisopportunities@gmail.com to know the details and book a spot.{" "}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default POSHandPOCSOPage;
