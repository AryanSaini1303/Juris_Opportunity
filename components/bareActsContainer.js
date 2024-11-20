"use client";
import BareActModal from "./bareActModal";
import styles from "./bareActsContainer.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BareActsContainer({ page }) {
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
  const [showModal, setShowModal] = useState(false);
  const [bareActIntro, setBareActIntro] = useState();
  const limit = 25;
  const [totalPageNumbers, setTotalPageNumbers] = useState();
  const router = useRouter();
  const [allBareActs, setAllBareActs] = useState();

  useEffect(() => {
    const fetchBareActs = async () => {
      const response = await fetch("/api/bareActs");
      const data = await response.json();
      setTotalPageNumbers(Math.ceil(data.length / limit)); // Math.ceil rounds up the number to the next largest number
      setAllBareActs(data);
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
        setTotalPageNumbers(Math.ceil(data.length / limit)); // Math.ceil rounds up the number to the next largest number
        setAllBareActs(data);
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
        setTotalPageNumbers(Math.ceil(data.length / limit)); // Math.ceil rounds up the number to the next largest number
        setAllBareActs(data);
        setLoading(false);
      };
      fetchStateBareActs();
    }
  }, [stateActQuery]);

  useEffect(() => {
    // Determine the start and end indices for the current page
    const startIndex = (page - 1) * limit; // Start index
    const endIndex = startIndex + limit; // End index
    setBareActs(allBareActs?.slice(startIndex, endIndex));
  }, [allBareActs, page]);

  function handleStateActsClick(data) {
    setStateActQuery(data);
    router.push("/bare_acts?page=1");
  }
  function handleCentralActsClick(data) {
    setCentralActQuery(data);
    router.push("/bare_acts?page=1");
  }
  function handleBareActClick(data) {
    setBareActIntro(data);
    setShowModal(true);
  }

  return (
    <div className={styles.acts_container}>
      {showModal && (
        <BareActModal closeFunction={setShowModal} intro={bareActIntro} />
      )}
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
                <tr
                  key={index}
                  onClick={() => {
                    handleBareActClick([item.intro, item.name, item.year]);
                  }}
                >
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
        {bareActs && bareActs.length != 0 && !loading && (
          <ul>
            <li>Page no.</li>
            {Array.from({ length: totalPageNumbers }, (_, index) => (
              <li key={index}>
                <Link
                  href={`/bare_acts?page=${index + 1}`}
                  style={index + 1 == page ? { backgroundColor:"var(--secondary-color)", color:"var(--primary-color)" } : null}
                >
                  {index + 1}
                </Link>
              </li>
            ))}
          </ul>
        )}
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
