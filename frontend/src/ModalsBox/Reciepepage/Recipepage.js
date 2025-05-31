import React from 'react';
import './Recipepage.css';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import axios from 'axios';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
  styletextheaderfield,
  styletextfield,
  stylebuttonfieldfile,
  VisuallyHiddenInput
} from '../Addrecipe/AddrecipeStyle.js';
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LoadingPage from '../../components/loading/Loadingpage.js';
import RedoTwoToneIcon from '@mui/icons-material/RedoTwoTone';


const buttonmodestyle = {
  position: 'sticky',
  top: 0,
  right: 0,
  height: ['60px', '70px', '50px'],        // smaller on mobile, bigger on desktop   // adjust width responsively
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
  padding: '0 8px',
  zIndex: 1100,
  border: '2px solid #442d1c',
  minwidth: ['70vw', '70vw', '250px'],
  '@media (hover: hover)': {
    '&:hover': {
      opacity: 0.9, // slightly faded
      transform: 'scale(1.08)', // increase size on hover
      transition: 'transform 0.2s, opacity 0.2s',
      bgcolor: '#9f9167', // darken background on hover
    },
  },
  transition: 'transform 0.2s, opacity 0.2s', // smooth transition for hover
  '& .MuiButton-startIcon + span': {
    paddingLeft: '16px', // space between icon and text
    paddingRight: '16px', // space after text
  },
  '& .MuiButton-endIcon + span': {
    paddingLeft: '16px', // space before text
    paddingRight: '16px', // space after text
  },
};



// Template for a recipe details page
// Expects a 'recipe' prop with fields: RecipeName, ImageId, FoodSupplies, OrderRecipe
// Expects an 'ipServer' prop for the image server URL
function Recipepage({ recipe, ipServer, handleDeleteRecipe , handleEditRecipe }) {

  const [recipeNameUpdate, setRecipeNameUpdate] = useState(recipe ? recipe.RecipeName : '');
  const [foodSuppliesUpdate, setFoodSuppliesUpdate] = useState( recipe ? recipe.FoodSupplies : '');
  const [orderRecipeUpdate, setOrderRecipeUpdate] = useState(recipe ? recipe.OrderRecipe : '');
  const [pictureOfRecipeUpdate, setPictureOfRecipeUpdate] = useState(`${ipServer}/api/image/${recipe.ImageId}`);
  const [loading, setLoading] = useState(false);
  
  if (!recipe) {
    return <div className="recipepage-container">No recipe selected.</div>;
  }

  const [deletemode, setDeletemode] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
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
    setLoading(false);
  }

  const handleEdit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('_id', recipe._id);
    if(typeof(pictureOfRecipeUpdate) !== 'string') 
    {
      formData.append('image', pictureOfRecipeUpdate);
    }
    formData.append("RecipeName", recipeNameUpdate);
    formData.append("FoodSupplies", foodSuppliesUpdate);
    formData.append("OrderRecipe", orderRecipeUpdate);
    console.log(pictureOfRecipeUpdate);

    try {
      const response = await axios.post(`${ipServer}/editrecipe`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      handleEditRecipe();
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }
return (
  loading ? (
   <LoadingPage />
  ) :
  (!editmode ? (
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
        ><RedoTwoToneIcon/> </Button>
          
          </>
        ) : ( 
          <>
            <Button 
              sx={buttonmodestyle}
              onClick={() => setEditmode(true)}
               > <EditIcon/></Button>
            <Button 
              sx={buttonmodestyle}
              onClick={() => setDeletemode(true)}
               > <DeleteIcon/> </Button>
          </>
        )}
      </div>
    
    </div>
  ) : (
    <div className="recipepage-container1">
     <div className='headerstyleAddreciepe1'>עריכת מתכון</div>
     <TextField
             sx={styletextheaderfield}
             value={recipeNameUpdate}
             onChange={(e) => setRecipeNameUpdate(e.target.value)}    
           />
      <div className='rowtextstyleAddrecipe1'>מרכיבים למתכון</div>
      <TextField
              sx={styletextfield}
              multiline
              minRows={6}
              value={foodSuppliesUpdate}
              onChange={(e) => setFoodSuppliesUpdate(e.target.value)}
            />
      <div className='rowtextstyleAddrecipe1'>אופן הכנה</div>
      <TextField
              sx={styletextfield}
              multiline
              minRows={6}
              value={orderRecipeUpdate}
              onChange={(e) => setOrderRecipeUpdate(e.target.value)}
            />
            {/* Show image preview if a file is selected or if the current value is a URL */}
            {pictureOfRecipeUpdate && (typeof pictureOfRecipeUpdate === 'string' ? (
              <img
                src={pictureOfRecipeUpdate}
                alt="Recipe Preview"
                className="recipepage-image"
                style={{ marginBottom: 13 }}
              />
            ) : (
              <img
                src={URL.createObjectURL(pictureOfRecipeUpdate)}
                alt="Recipe Preview"
                className="recipepage-image"
                style={{ marginBottom: 16 }}
              />
            ))}
            <Button
          sx={stylebuttonfieldfile}
          startIcon={<AttachFileIcon />}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          {pictureOfRecipeUpdate && pictureOfRecipeUpdate.name ? pictureOfRecipeUpdate.name : "שנה קובץ"}
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={event => {
              const file = event.target.files[0];
              if (file) {
                setPictureOfRecipeUpdate(file);
              } else {
                setPictureOfRecipeUpdate(pictureOfRecipeUpdate);
              }
            }}
          />
        </Button>
       <div className="sectionbuttons">
      <Button 
        sx={buttonmodestyle}
        onClick={handleEdit} 
        > <TaskAltIcon/> </Button>
        <Button 
        sx={buttonmodestyle}
        onClick={() => setEditmode(false)} 
        ><RedoTwoToneIcon/> </Button></div>
    </div>
  )
)); }

export default Recipepage;
