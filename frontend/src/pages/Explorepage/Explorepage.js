import './Explorepage.css';
import CardComponent from '../../components/card/Card.js';
import  {useState} from 'react';
import ModalBox from '../../components/modal/Modal.js';
import Publicrecipe from '../../ModalsBox/Publicrecipe/Publicrecipe.js';

function Explorepage({ recipesPublic, ipServer }) {
  const [openRecipe, setOpenRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Handler to open modal and set the selected recipe object
  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenRecipe(true);
  };


 
  return (
    <div className="explorepageestyle">
      {recipesPublic && recipesPublic.length > 0 ? (
        recipesPublic.map((recipe, idx) => (
          <CardComponent
            key={recipe._id || idx}
            recipe={recipe}
            publicRecipe={true}
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
        BodyFunction={<Publicrecipe 
            ipServer={ipServer}
            recipe={selectedRecipe}
        />}
      />
    </div>
  );
}

export default Explorepage;
