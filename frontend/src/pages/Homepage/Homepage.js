import './Homepage.css';
import CardComponent from '../../components/card/Card.js';
import React, {useState} from 'react';
import ModalBox from '../../components/modal/Modal.js';
import Recipepage from '../Reciepepage/Recipepage.js';

function Homepage({ recipes, ipServer,fetchRecipes }) {
  const [openRecipe, setOpenRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Handler to open modal and set the selected recipe object
  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenRecipe(true);
  };

  const handleDeleteRecipe = () => { 
    setOpenRecipe(false);
    fetchRecipes();

  }

  return (
    <div className="homepagestyle">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe, idx) => (
          <CardComponent
            key={recipe._id || idx}
            recipe={recipe}
            IPServer={ipServer}
            handleCardClick={() => handleCardClick(recipe)}
          />
        ))
      ) : (
        <div>No recipes found.</div>
      )}
      <ModalBox
        open={openRecipe}
        setOpen={setOpenRecipe}
        BodyFunction={<Recipepage
                         recipe={selectedRecipe}
                         ipServer={ipServer}
                         handleDeleteRecipe={handleDeleteRecipe} />}
      />
    </div>
  );
}

export default Homepage;
