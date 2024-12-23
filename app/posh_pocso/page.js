import styles from "./page.module.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function PoshPocsoPage() {
  return (
    <div className="wrapper">
      <Navbar />
      <main
        className="content"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={styles.headerContainer}>
          <div className={styles.info}>
            <h1>Safe Workspaces, Empowered Lives</h1>
            <h3>
              Empowering safe, respectful workplaces with expert POSH and POSCO
              guidance
            </h3>
          </div>
          <div className={styles.image}>
            <div className={styles.bgCircle}>
              <Image src={"/lawyer.png"} height={500} width={500} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.featuresContainer}>
          <h1>Your Partner in Legal Safety and Compliance</h1>
          <section className={styles.features}>
            <div className={styles.feature}>
              <Image src={"/track_record.jpg"} height={1000} width={1000} alt="" />
              <h4>Comprehensive Training Programs</h4>
              <p>
                Equip your workforce with essential knowledge and skills to
                prevent harassment and ensure a safe workplace.
              </p>
              <div className={styles.shade}></div>
            </div>
            <div className={styles.feature}>
              <Image src={"/library.jpg"} height={1000} width={1000} alt="" />
              <h4>Expert Legal Consultation</h4>
              <p>
                Offering expert guidance to protect
                your organization and its employees.
              </p>
              <div className={styles.shade}></div>
            </div>
            <div className={styles.feature}>
              <Image src={"/library.jpg"} height={1000} width={1000} alt="" />
              <h4>Confidential Reporting Mechanisms</h4>
              <p>
                Providing secure, confidential channels for employees to report
                harassment without fear of retaliation.
              </p>
              <div className={styles.shade}></div>
            </div>
            <div className={styles.feature}>
              <Image src={"/library.jpg"} height={1000} width={1000} alt="" />
              <h4>Tailored Compliance Audits</h4>
              <p>
                Regular assessments to ensure your organization remains
                compliant with POSH and POSCO.
              </p>
              <div className={styles.shade}></div>
            </div>
            <div className={styles.feature}>
              <Image src={"/library.jpg"} height={1000} width={1000} alt="" />
              <h4>Employee Awareness Campaigns</h4>
              <p>
                Raising awareness and promoting a culture of respect and safety
                through ongoing initiatives.
              </p>
              <div className={styles.shade}></div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
