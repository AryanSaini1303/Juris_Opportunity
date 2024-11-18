"use client";
import { useState } from "react";
import styles from "./filterBar.module.css";

const FilterBar = () => {
  const [filters, setFilters] = useState({
    sort: "Newest",
    category: "All Bare Acts",
    state: "All Categories/States",
    year: "All Years",
    search: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    console.log("Filters:", filters);
    // Implement search functionality here
  };

  return (
    <div className={styles.filter_bar}>
      <div className={styles.filters}>
        <select name="sort" value={filters.sort} onChange={handleChange}>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="All Bare Acts">All Bare Acts</option>
          <option value="Central Acts">Central Acts</option>
          <option value="State Acts">State Acts</option>
        </select>
        <select name="state" value={filters.state} onChange={handleChange}>
          <option value="All Categories/States">All Categories/States</option>
          <option value="Delhi">Delhi</option>
          <option value="Maharashtra">Maharashtra</option>
          {/* Add more states */}
        </select>
        <select name="year" value={filters.year} onChange={handleChange}>
          <option value="All Years">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          {/* Add more years */}
        </select>
        <div className={styles.search_box}>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Bare Act Name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
