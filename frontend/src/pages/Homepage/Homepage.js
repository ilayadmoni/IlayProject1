import './Homepage.css';
import CardComponent from '../../components/card/Card.js';
import React, {useState, useEffect} from 'react';
import ModalBox from '../../components/modal/Modal.js';
import Recipepage from '../../ModalsBox/Reciepepage/Recipepage.js';
import Firstlogin from './Firstlogin.js';

function Homepage({ recipesPersonal, ipServer,fetchRecipes,setSnackbar,fetchRecipesPublic }) {
  const [openRecipe, setOpenRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Handler to open modal and set the selected recipe object
  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenRecipe(true);
  };

  const handleDeleteRecipe = async () => { 
    setOpenRecipe(false);
    setSnackbar('המתכון נמחק בהצלחה', 'success');
    await fetchRecipes();
    await fetchRecipesPublic();
  }

  const handleEditRecipe = async () => {
    setOpenRecipe(false);
    setSnackbar('המתכון עודכן בהצלחה', 'success');
    await fetchRecipes();
    await fetchRecipesPublic();
  }
 
  return (
    <div>
      {recipesPersonal && recipesPersonal.length > 0 ? (
        recipesPersonal.map((recipe, idx) => (
          <div className='homepagestylecards'>
          <CardComponent
            key={recipe._id || idx}
            recipe={recipe}
            publicRecipe={false}
            IPServer={ipServer}
            handleCardClick={() => handleCardClick(recipe)}
          />
          </div>
        )
        )
      ) : (
        <div className="homepagestylestart">
        <Firstlogin/>
        </div>
      )}
      <ModalBox
        open={openRecipe}
        setOpen={setOpenRecipe}
        BodyFunction={<Recipepage
                         recipe={selectedRecipe}
                         ipServer={ipServer}
                         handleDeleteRecipe={handleDeleteRecipe} 
                         handleEditRecipe={handleEditRecipe}
                        />}
      />
      </div>
   
  );
}

export default Homepage;
