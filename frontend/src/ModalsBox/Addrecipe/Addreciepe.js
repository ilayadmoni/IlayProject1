import { useState } from 'react';
import { Button } from '@mui/material';
import './Addrecipe.css'
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  styletextheaderfield,
  styletextfield,
  stylebuttonfieldfile,
  VisuallyHiddenInput
} from './AddrecipeStyle';
import axios from 'axios';

function Addrecipe({setModalopen,setSnackbar , ipServer,fetchRecipes}) {

const [recipeName, setRecipeName] = useState('');
const [foodSupplies, setFoodSupplies] = useState('');
const [orderRecipe, setOrderRecipe] = useState('');
const [pictureOfRecipe, setPictureOfRecipe] = useState(null);

  const handleSubmitpicture = async (event) => {
    event.preventDefault();
    if (!pictureOfRecipe || !recipeName || !foodSupplies || !orderRecipe ) {
      setSnackbar('אנא מלא את כל הפרטים', 'warning');
      return;
    }
    const formData = new FormData();
    formData.append('image', pictureOfRecipe);
    formData.append("RecipeName", recipeName);
    formData.append("FoodSupplies", foodSupplies);
    formData.append("OrderRecipe", orderRecipe);
    console.log('formData', formData);
     
    try {
      const response = await axios.post(`${ipServer}/postrecipe`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModalopen(false);
      setSnackbar('המתכון נשלח בהצלחה', 'success');
      fetchRecipes();
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      setModalopen(false);
      setSnackbar('תקלה! קיימת בעיית חיבור לשרת', 'error');
    }
  };
    return (
    <div className="bodystyle" >
      <div className='headerstyleAddreciepe'>הוספת מתכון</div>
      <TextField
        sx={styletextheaderfield}
        label={recipeName ? '' : "שם המתכון"}
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <div className='rowtextstyleAddrecipe'>מרכיבים למתכון</div>
      <TextField
        sx={styletextfield}
        multiline
        minRows={6}
        value={foodSupplies}
        onChange={(e) => setFoodSupplies(e.target.value)}
      />
      <div className='rowtextstyleAddrecipe'>אופן הכנה</div>
      <TextField
        sx={styletextfield}
        multiline
        minRows={6}
        value={orderRecipe}
        onChange={(e) => setOrderRecipe(e.target.value)}
      />
      <div className='rowtextstyleAddrecipe'>העלאת תמונה</div>
      <div>
        <Button
          sx={stylebuttonfieldfile}
          startIcon={<AttachFileIcon />}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
        >
          {pictureOfRecipe ? pictureOfRecipe.name : "הוסף קובץ"}
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={event => {
              const file = event.target.files[0];
              if (file) setPictureOfRecipe(file);
            }}
          />
        </Button></div>
        <div className='rowbuttonstyleAddrecipe' >
        <Button
          sx={stylebuttonfieldfile}
          startIcon={<CheckCircleIcon />}
          onClick={handleSubmitpicture}
        >שליחת מתכון</Button></div>
      
      <div className='rowbuttonstyleAddrecipebottom' />
    </div>
    )};

  
  export default Addrecipe;
