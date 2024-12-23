import styles from "./searchBar.module.css";
export default function SearchBar({
  handleFormSubmit,
  searchQuery,
  setSearchQuery,
  placeholder,
  margin
}) {
  return (
    <div className={styles.searchBar} style={{margin:margin}}>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="searchQuery" placeholder={placeholder} value={searchQuery || ""} onChange={(e) => setSearchQuery(e.target.value)}/>
        <button type="submit">
          <svg fill="#4C0A02" viewBox="0 0 16 16" height="1em" width="1em">
            <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
