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
  VisuallyHiddenInput,
  stylebuttongroupfield,
  styleToggleButton
} from './AddrecipeStyle';
import axios from 'axios';
import LoadingPage from '../../components/loading/Loadingpage';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';

function Addrecipe({setModalopen,setSnackbar , ipServer,fetchRecipes,currentUser,fetchRecipesPublic}) {


const navigate = useNavigate();
const [recipeName, setRecipeName] = useState('');
const [recipeDescription , setRecipeDescription] = useState('');
const [foodSupplies, setFoodSupplies] = useState('');
const [orderRecipe, setOrderRecipe] = useState('');
const [pictureOfRecipe, setPictureOfRecipe] = useState(null);
const [recipeMode, setRecipeMode] = useState("Private");
const [loading, setLoading] = useState(false);


  const handleChangeRecipeMode = (event, mode) => {
    setRecipeMode(mode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!pictureOfRecipe || !recipeName || !foodSupplies || !orderRecipe || !recipeMode) {
      setSnackbar('אנא מלא את כל הפרטים', 'warning');
      return;
    }
    console.log('recipeMode', recipeMode);
    console.log(currentUser.uid);
    setLoading(true);
    const formData = new FormData();
    formData.append('image', pictureOfRecipe);
    formData.append("RecipeName", recipeName);
    formData.append("FoodSupplies", foodSupplies);
    formData.append("OrderRecipe", orderRecipe);
    formData.append("RecipeMode", recipeMode);
    formData.append("UserId", currentUser.uid);
    formData.append("RecipeDescription", recipeDescription);
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
      fetchRecipesPublic();
      
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      setModalopen(false);
      setSnackbar('תקלה! קיימת בעיית חיבור לשרת', 'error');
    } finally {
      setLoading(false);
      navigate('/');
    }
  };
  
    return (
    loading ? <LoadingPage /> : (
    <div className="bodystyle" >
      <div className='headerstyleAddreciepe'>הוספת מתכון</div>
      <TextField
        sx={styletextheaderfield}
        label={recipeName ? '' : "שם המתכון"}
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
        <ToggleButtonGroup
      sx={stylebuttongroupfield}
      value={recipeMode}
      exclusive
      onChange={handleChangeRecipeMode}
    >
      <ToggleButton 
  value="Public"
  sx={styleToggleButton}
>
  <PublicIcon/>
</ToggleButton>
      <ToggleButton
       value="Private"
       sx={styleToggleButton}
       >
        <PersonIcon/>
        </ToggleButton>
    </ToggleButtonGroup>
        <TextField
        sx={styletextheaderfield}
        label={recipeDescription ? '' : "תיאור המתכון"}
        value={recipeDescription}
        onChange={(e) => setRecipeDescription(e.target.value)}
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
          onClick={handleSubmit}
        >שליחת מתכון</Button></div>
      
      <div className='rowbuttonstyleAddrecipebottom' />
    </div>
    )
    )};

  export default Addrecipe;
