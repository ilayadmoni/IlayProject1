import './Homepage.css';
import CardComponent from '../components/card/Card.js';
import React from 'react';

function Homepage({ recipes, ipServer }) {
  // Handler to log the card's ID from the Homepage
  const handleCardClick = (id) => {
    console.log('Card was clicked! ID:', id);
  };

  return (
    <div className="homepagestyle">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe, idx) => (
          <CardComponent
            key={recipe._id || idx}
            recipe={recipe}
            IPServer={ipServer}
            onCardClick={handleCardClick}
          />
        ))
      ) : (
        <div>No recipes found.</div>
      )}
    </div>
  );
}

export default Homepage;
