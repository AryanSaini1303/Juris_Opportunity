"use client";
import styles from "./bareActsContainer.module.css";
import { useEffect, useState } from "react";

export default function BareActsContainer() {
  const centralActs = [
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
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const [bareActs, setBareActs] = useState();
  const [loading, setLoading] = useState();
  const [centralActQuery, setCentralActQuery] = useState();
  const [stateActQuery, setStateActQuery] = useState();

  useEffect(() => {
    const fetchBareActs = async () => {
      const response = await fetch("/api/bareActs");
      const data = await response.json();
      setBareActs(data);
      setLoading(false);
    };
    fetchBareActs();
  }, []);

  useEffect(() => {
    setLoading(true);
    setStateActQuery("");
    if (centralActQuery) {
      const fetchCentralBareActs = async () => {
        const response = await fetch(
          `/api/getCentralBareActs?query=${centralActQuery}`
        );
        const data = await response.json();
        setBareActs(data);
        setLoading(false);
      };
      fetchCentralBareActs();
    }
  }, [centralActQuery]);

  useEffect(() => {
    setCentralActQuery("");
    setLoading(true);
    if (stateActQuery) {
      const fetchStateBareActs = async () => {
        const response = await fetch(
          `/api/getStateBareActs?query=${stateActQuery}`
        );
        const data = await response.json();
        setBareActs(data);
        setLoading(false);
      };
      fetchStateBareActs();
    }
  }, [stateActQuery]);

  function handleStateActsClick(data) {
    setStateActQuery(data);
    console.log(data);
  }
  function handleCentralActsClick(data) {
    setCentralActQuery(data);
  }
  console.log("Bare Acts: ", bareActs);

  return (
    <div className={styles.acts_container}>
      {/* Central Acts */}
      <div className={styles.central_acts}>
        <h2>Central Acts</h2>
        <ul>
          {centralActs.map((act, index) => (
            <li
              key={index}
              onClick={() => {
                handleCentralActsClick(act);
              }}
            >
              {act}
            </li>
          ))}
        </ul>
      </div>

      {/* Titles Section */}
      <div className={styles.titles_section}>
        <table className={styles.titles_table}>
          <thead>
            <tr>
              <th>{stateActQuery ? "State" : "Category"}</th>
              <th>Title</th>
              <td>Year</td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", borderBottom: "none" }}
                >
                  <h2 style={{ margin: 0 }}>Loading...</h2>
                </td>
              </tr>
            ) : bareActs && bareActs.length != 0 && !loading ? (
              bareActs.map((item, index) => (
                <tr key={index}>
                  <td>{item.category ? item.category : item.state}</td>
                  <td>{item.name}</td>
                  <td>{item.year}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "center", borderBottom: "none" }}
                >
                  <h2 style={{ margin: 0 }}>No Bare Acts Available!</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* State Bare Acts */}
      <div className={styles.state_acts}>
        <h2>State Bare Acts</h2>
        <ul>
          {stateActs.map((act, index) => (
            <li
              key={index}
              onClick={() => {
                handleStateActsClick(act);
              }}
            >
              {act} state law
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
