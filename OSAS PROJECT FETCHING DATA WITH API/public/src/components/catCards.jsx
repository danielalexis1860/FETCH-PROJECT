import React from 'react';
import './styles.css';

const CatCard = ({ breed }) => {
  const { breed: name, country, origin, coat, pattern } = breed;

  return (
    <div className="cat-card">
      <h2 className="card-title">Breed: {name}</h2>
      <p><strong>Country:</strong> {country || 'Unknown'}</p>
      <p><strong>Origin:</strong> {origin || 'Unknown'}</p>
      <p><strong>Coat:</strong> {coat || 'Unknown'}</p>
      <p><strong>Pattern:</strong> {pattern || 'Unknown'}</p>
    </div>
  );
};

export default CatCard;