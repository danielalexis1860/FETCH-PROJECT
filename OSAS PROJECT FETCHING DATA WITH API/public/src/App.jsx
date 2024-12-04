import React, { useState, useEffect } from 'react';
import CatCard from './components/CatCard';
import './styles.css';

const App = () => {
  const [catBreeds, setCatBreeds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data from the API
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://catfact.ninja/breeds');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        setCatBreeds(data.data);
        setFilteredBreeds(data.data); // Initialize with all breeds
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBreeds();
  }, []);

  // Filter breeds based on search query
  useEffect(() => {
    const filtered = catBreeds.filter((breed) =>
      breed.breed.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBreeds(filtered);
  }, [searchQuery, catBreeds]);

  return (
    <div className="app">
      <header>
        <h1>Cat Breeds App</h1>
        <input
          type="text"
          placeholder="Search cat breeds..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </header>
      <div className="cat-cards-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : filteredBreeds.length ? (
          filteredBreeds.map((breed, index) => <CatCard key={index} breed={breed} />)
        ) : (
          <p>No breeds found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
