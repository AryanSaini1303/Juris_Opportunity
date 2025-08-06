'use client';
import BareActModal from './bareActModal';
import styles from './bareActsContainer.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageNumberSection from './pageNumberSection';
import SearchBar from './searchBar';
import { supabase } from '@/lib/supabaseClient';

export default function BareActsContainer({ page }) {
  const stateActs = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  const [bareActs, setBareActs] = useState();
  const [loading, setLoading] = useState();
  const [centralActQuery, setCentralActQuery] = useState();
  const [stateActQuery, setStateActQuery] = useState();
  // const [showModal, setShowModal] = useState(false);
  // const [bareActIntro, setBareActIntro] = useState();
  const [totalPageNumbers, setTotalPageNumbers] = useState();
  const router = useRouter();
  const [allBareActs, setAllBareActs] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [user, setUser] = useState();
  const [bareActClick, setBareActClick] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [centralCategories, setCentralCategories] = useState('');
  const limit = !mobile ? 40 : 10;

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
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      (centralActQuery?.length == 0 && stateActQuery?.length == 0) ||
      (!centralActQuery && !stateActQuery && !searchQuery)
    ) {
      const fetchBareActs = async () => {
        const response = await fetch('/api/bareActs');
        const data = await response.json();
        setTotalPageNumbers(Math.ceil(data.length / limit)); // Math.ceil rounds up the number to the next largest number
        setAllBareActs(data);
        setLoading(false);
      };
      fetchBareActs();
    }
  }, [centralActQuery, stateActQuery, searchQuery]);

  useEffect(() => {
    const fetchCentralActCategory = async () => {
      const response = await fetch('/api/getCentralActCategory');
      const data = await response.json();
      setTotalPageNumbers(Math.ceil(data.length / limit)); // Math.ceil rounds up the number to the next largest number
      setCentralCategories(data);
      setLoading(false);
    };
    fetchCentralActCategory();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (centralActQuery) {
      setStateActQuery('');
      setSearchQuery();
      const fetchCentralBareActs = async () => {
        const response = await fetch(
          `/api/getCentralBareActs?query=${centralActQuery}`,
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
    setLoading(true);
    if (stateActQuery) {
      setCentralActQuery('');
      setSearchQuery();
      const fetchStateBareActs = async () => {
        const response = await fetch(
          `/api/getStateBareActs?query=${stateActQuery}`,
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

  useEffect(() => {
    searchQuery && searchQuery.length != 0 && setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        setStateActQuery();
        setCentralActQuery();
        const fetchFilteredActs = async () => {
          const response = await fetch(
            `/api/getBareActsBySearchQuery?query=${searchQuery}`,
          );
          let data = await response.json();
          if (data.message === 'No judgements found matching the query.') {
            data = [];
          }
          setAllBareActs(data);
          setTotalPageNumbers(Math.ceil(data.length / limit));
          setLoading(false);
        };
        fetchFilteredActs();
      }
    }, 500); // Delay of 500ms
    // Cleanup function to clear the timeout
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  // console.log(allBareActs);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // console.log("event: ", event);
        if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
          const { user } = session;
          setUser(user);
        } else {
          setUser(null);
        }
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [bareActClick]);

  function handleStateActsClick(data) {
    setStateActQuery(data);
    router.push('/bare_acts?page=1');
  }
  function handleCentralActsClick(data) {
    setCentralActQuery(data);
    router.push('/bare_acts?page=1');
  }
  // function handleBareActClick(data) {
  //   setBareActIntro(data);
  //   setShowModal(true);
  // }
  function handleFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="searchBar" style={{ margin: '2rem 0 0.5rem 0' }}>
        <SearchBar
          handleFormSubmit={handleFormSubmit}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={'e.g. The National Cadet'}
        />
      </div>
      <div className={styles.acts_container}>
        {/* {showModal && (
          <BareActModal closeFunction={setShowModal} intro={bareActIntro} />
        )} */}
        {/* Central Acts */}
        <div className={styles.central_acts}>
          <h2>Central Acts</h2>
          <ul>
            {centralCategories.length !== 0 &&
              centralCategories.map((act, index) => (
                <li
                  key={index}
                  onClick={() => {
                    centralActQuery == act
                      ? handleCentralActsClick('')
                      : handleCentralActsClick(act);
                  }}
                  style={
                    centralActQuery === act
                      ? {
                          backgroundColor: 'var(--accent-color)',
                          color: 'white',
                        }
                      : null
                  }
                >
                  {act}
                </li>
              ))}
          </ul>
        </div>

        {/* Titles Section */}
        <div className={styles.mainContainer}>
          <div className={styles.titles_section}>
            <table className={styles.titles_table}>
              <thead>
                <tr>
                  <th>
                    {!stateActQuery && !centralActQuery && !loading
                      ? 'Category/State'
                      : stateActQuery
                      ? 'State'
                      : 'Category'}
                  </th>
                  <th>Title</th>
                  {!mobile && (
                    <>
                      <th>Year</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      style={{ textAlign: 'center', borderBottom: 'none' }}
                    >
                      <h2 style={{ margin: 0 }}>Loading...</h2>
                    </td>
                  </tr>
                ) : bareActs && bareActs.length != 0 && !loading ? (
                  bareActs.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        // handleBareActClick([item.intro, item.name, item.year]);
                        // router.push(`${item.link}`)
                        setBareActClick(true);
                        {
                          user
                            ? window.open(
                                item.link,
                                '_blank',
                                'noopener,noreferrer',
                              )
                            : alert(
                                'To access full information, Please login ☺️',
                              );
                        }
                      }}
                    >
                      <td>{item.state ? item.state : item.category}</td>
                      <td>{item.name}</td>
                      {!mobile && (
                        <>
                          <td>{item.year}</td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      style={{ textAlign: 'center', borderBottom: 'none' }}
                    >
                      <h2 style={{ margin: 0 }}>No Bare Acts Available!</h2>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {bareActs && bareActs.length != 0 && !loading && (
            <PageNumberSection
              totalPageNumbers={totalPageNumbers}
              path={'bare_acts'}
              currentPage={page}
            />
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
                  stateActQuery == act
                    ? handleStateActsClick('')
                    : handleStateActsClick(act);
                }}
                style={
                  stateActQuery === act
                    ? { backgroundColor: 'var(--accent-color)', color: 'white' }
                    : null
                }
              >
                {act} state law
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
