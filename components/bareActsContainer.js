"use client";
import styles from "./bareActsContainer.module.css"
import { useEffect, useState } from "react";

export default function BareActsContainer() {
  const centralActs = [
    "Central Acts",
    "Alternative Dispute Resolution Laws",
    "Armed Forces Laws",
    "Banking Laws",
    "Bills in Parliament",
    "Children Laws",
    "Civil Laws",
    "Consumer Protection Laws",
    "Corporate Laws",
    "Criminal Laws",
    "Direct Tax Laws",
    "Education Laws",
    "Environmental Laws",
    "Family Laws",
    "Food & Agriculture Laws",
    "Foreign Exchange Laws ",
    "Human Rights Laws",
    "Indirect Tax Laws",
    "Information Technology Laws",
    "Insurance Laws ",
    "Intellectual Property Laws ",
    "International Laws and Conventions ",
    "Legal and Professional Laws ",
    "Media and Entertainment Laws ",
    "Medical and Health Laws",
    "Miscellaneous Laws",
    "Petroleum & Natural Gas Laws",
    "Political and Election Laws",
    "Power Sector Laws",
    "Property Laws",
    "Public Related Laws",
    "Railway Laws",
    "Repealed Laws",
    "Service and Labour Laws",
    "Tourism Laws",
    "Transport Laws",
    "BNS with IPC",
    "BNSS with CrPC",
    "BSA with IEA",
  ];

  const stateActs = [
    "Andhra Pradesh state law",
    "Arunachal Pradesh state law",
    "Assam state law",
    "Bihar state law",
    "Chandigarh state law",
    "Chhattisgarh state law",
    "Delhi state law",
    "Goa state law",
    "Gujarat state law",
    "Haryana state law",
    "Himachal Pradesh state law",
    "Jammu and Kashmir state law",
    "Jharkhand state law",
    "Karnataka state law",
    "Kerala state law",
    "Madhya Pradesh state law",
    "Maharashtra state law",
    "Manipur state law",
    "Mizoram state law",
    "Nagaland state law",
    "Odisha state law",
    "Puducherry state law",
    "Punjab state law",
    "Rajasthan state law",
    "Sikkim state law",
    "Tamil Nadu state law",
    "Telangana state law",
    "Tripura state law",
    "Uttar Pradesh state law",
    "Uttarakhand state law",
    "West Bengal state law",
  ];

  const [bareActs, setBareActs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBareActs = async () => {
      const response = await fetch("/api/bareActs");
      const data = await response.json();
      setBareActs(data);
      setLoading(false);
    };

    fetchBareActs();
  }, []);
  console.log(bareActs);

  return (
    <div className={styles.acts_container}>
      {/* Central Acts */}
      <div className={styles.central_acts}>
        <h2>Central Acts</h2>
        <ul>
          {centralActs.map((act, index) => (
            <li key={index}>{act}</li>
          ))}
        </ul>
      </div>

      {/* Titles Section */}
      <div className={styles.titles_section}>
        <table className={styles.titles_table}>
          <thead>
            <tr>
              <th>Source/Category</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {bareActs.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* State Bare Acts */}
      <div className={styles.state_acts}>
        <h2>State Bare Acts</h2>
        <ul>
          {stateActs.map((act, index) => (
            <li key={index}>{act}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
