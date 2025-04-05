import React, { useState } from 'react';
import '../styles/SearchBar.css'; // Import your CSS styles for the search bar


const SearchBar = ({ data, setFilteredData }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    // Filter the data based on the search query
    const filteredResults = data.filter(item =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery)
    );
    setFilteredData(filteredResults);  // Update filtered results
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search experiments or simulations..."
      />
    </div>
  );
};

export default SearchBar;
