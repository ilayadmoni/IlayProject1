import React from 'react';
import './Recipepage.css';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import axios from 'axios';


const buttonmodestyle = {
  position: 'sticky',
  top: 0,
  right: 0,
  height: ['60px', '70px', '50px'],        // smaller on mobile, bigger on desktop
  minWidth: ['280px', '300px', '200px'],   // adjust width responsively
  fontSize: ['1.3rem', '1.15rem', '1.2rem'],
  bgcolor: '#e8d1a7',
  color: '#442d1c',
  border: '3px solid #442d1c',
   fontFamily: 'Myfont',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  boxShadow: 24,
  padding: 0,
  zIndex: 1100,
  '@media (max-width:480px)': {

  },
};



// Template for a recipe details page
// Expects a 'recipe' prop with fields: RecipeName, ImageId, FoodSupplies, OrderRecipe
// Expects an 'ipServer' prop for the image server URL
function Recipepage({ recipe, ipServer, handleDeleteRecipe }) {
  
  if (!recipe) {
    return <div className="recipepage-container">No recipe selected.</div>;
  }
  const [deletemode, setDeletemode] = useState(false);
  const handleDelete = async () => {
    const recipe_id_json = JSON.stringify({ recipe_id: recipe._id });
    console.log(`Deleting recipe: ${recipe_id_json}`);
    try {
      await axios.post(`${ipServer}/deleterecipe`, recipe_id_json, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      handleDeleteRecipe();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      // Optionally, show an error snackbar here
    }
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
      <div className="sectionbuttons">
        {deletemode ? (
          <>
            <Button 
              sx={buttonmodestyle}
              startIcon={<DeleteIcon/>}
              onClick={handleDelete}
               > אשר מחיקה</Button>
            <Button 
              sx={buttonmodestyle}
              onClick={() => setDeletemode(false)} 
              >חזרה </Button>
          
          </>
        ) : ( 
          <>
            <Button 
              sx={buttonmodestyle}
              startIcon={<EditIcon/>}
              onClick={() => setDeletemode(true)}
               > עריכת המתכון </Button>
            <Button 
              sx={buttonmodestyle}
              startIcon={<DeleteIcon/>}
              onClick={() => setDeletemode(true)}
               > מחיקת המתכון</Button>
          </>
        )}
      </div>
    
    </div>
  );
}

export default Recipepage;
