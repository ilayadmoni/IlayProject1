import React from 'react';
import './Recipepage.css';

// Template for a recipe details page
// Expects a 'recipe' prop with fields: RecipeName, ImageId, FoodSupplies, OrderRecipe
// Expects an 'ipServer' prop for the image server URL
function Recipepage({ recipe, ipServer }) {
  if (!recipe) {
    return <div className="recipepage-container">No recipe selected.</div>;
  }

  return (
    <div className="recipepage-container">
      <h1 className="recipepage-title">{recipe.RecipeName}</h1>
      <div className="recipepage-image-wrapper">
        <img
          className="recipepage-image"
          src={`${ipServer}/api/image/${recipe.ImageId}`}
          alt={recipe.RecipeName}
        />
      </div>
      <div className="recipepage-section">
        <h2>מצרכים</h2>
        <pre className="recipepage-supplies">{recipe.FoodSupplies}</pre>
      </div>
      <div className="recipepage-section">
        <h2>אופן הכנה</h2>
        <pre className="recipepage-order">{recipe.OrderRecipe}</pre>
      </div>
    </div>
  );
}

export default Recipepage;
