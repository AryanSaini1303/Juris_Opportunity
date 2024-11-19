"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const AboutPage = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <main className="content">
        <div className="about-page">
          {/* Hero Section */}
          <section className="hero">
            <h1>About Us</h1>
            <p>
              Crafting intelligent, user-friendly solutions for a better
              tomorrow.
            </p>
          </section>

          {/* Vision Section */}
          <section className="section vision">
            <h2>Our Vision</h2>
            <p>
              To redefine how people interact with technology by building
              innovative, sustainable, and impactful solutions.
            </p>
          </section>

          {/* Mission Section */}
          <section className="section mission">
            <h2>Our Mission</h2>
            <p>
              Delivering web and app experiences powered by the latest
              technologies, ensuring excellence and simplicity.
            </p>
          </section>

          {/* Goals Section */}
          <section className="section goals">
            <h2>What Drives Us</h2>
            <div className="goals-container">
              <div className="goal-item">
                <h3>Innovation</h3>
                <p>
                  Bringing creativity and intelligence together to solve complex
                  challenges.
                </p>
              </div>
              <div className="goal-item">
                <h3>Impact</h3>
                <p>
                  Building tools and platforms that empower people to achieve
                  more.
                </p>
              </div>
              <div className="goal-item">
                <h3>Collaboration</h3>
                <p>
                  Partnering with people and businesses to deliver tailored
                  solutions.
                </p>
              </div>
            </div>
          </section>

          {/* Developer Section */}
          <section className="section developer">
            <h2>About the Developer</h2>
            <p>
              Passionate about combining creativity, technology, and innovation
              to build impactful solutions.
            </p>
          </section>

          {/* Call to Action */}
          <section className="section cta">
            <h2>Let’s Build Together</h2>
            <p>
              Have a project in mind? Let’s collaborate and turn your ideas into
              reality.
            </p>
            <button className="cta-button">Contact Us</button>
          </section>

          {/* Styles */}
          <style jsx>{`
            .about-page {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: var(--text-color);
              margin: 0;
              padding: 0;
            }

            .hero {
              text-align: center;
              padding: 20px 0;
              color: var(--secondar-color);
            }

            .hero h1 {
              font-size: 3rem;
              margin: 1rem;
            }

            .hero p {
              font-size: 1.5rem;
              max-width: 600px;
              margin: 0 auto;
            }

            .section {
              text-align: center;
              padding: 0.3rem;
              max-width: 800px;
              margin: 0 auto;
            }

            .section h2 {
              font-size: 2rem;
              margin-bottom: 20px;
              color: var(--secondary-color);
            }

            .section p {
              font-size: 1.2rem;
              margin-bottom: 20px;
              color: var(--text-color);
            }

            .goals-container {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 20px;
              margin: 20px 0;
            }

            .goal-item {
              background: var(--primary-color);
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
              text-align: left;
              border: 2px solid var(--accent-color);
            }

            .goal-item h3 {
              font-size: 1.5rem;
              color: var(--secondary-color);
              margin-bottom: 10px;
            }

            .goal-item p {
              font-size: 1rem;
              color: var(--text-color);
            }

            .cta {
              background: var(--accent-color);
              color: white;
              padding: 20px 10px;
            }

            .cta h2 {
              font-size: 2.5rem;
              margin-bottom: 20px;
            }

            .cta p {
              font-size: 1.2rem;
              margin-bottom: 20px;
              max-width: 600px;
              margin: 0 auto;
            }

            .cta-button {
              background: var(--primary-color);
              color: var(--secondary-color);
              padding: 10px 20px;
              margin: 0.5rem 0;
              border-radius: 8px;
              font-size: 1rem;
              border: none;
              cursor: pointer;
              transition: transform 0.2s ease-in-out;
            }

            .cta-button:hover {
              transform: scale(1.05);
            }

            @media (max-width: 768px) {
              .hero h1 {
                font-size: 2.5rem;
              }

              .hero p,
              .section p {
                font-size: 1rem;
              }

              .cta h2 {
                font-size: 2rem;
              }

              .cta p {
                font-size: 1rem;
              }
            }
          `}</style>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
