import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const searchByName = async (name) => {
  const url = `http://localhost:5000/api/products/searchByName?name=${name}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching search results:", error);
    return null;
  }
};

const SearchByName = ({ setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      return;
    }

    const results = await searchByName(searchTerm);
    setSearchResults(results || []);
  };

  return (
    <div className="d-flex ms-auto">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchByName;
