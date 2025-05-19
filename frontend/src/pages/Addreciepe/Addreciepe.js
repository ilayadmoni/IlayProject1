import { useState } from 'react';
import { Button } from '@mui/material';
import './Addreciepe.css'
import TextField from '@mui/material/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  styletextheaderfield,
  styletextfield,
  stylebuttonfieldfile,
  VisuallyHiddenInput
} from './AddreciepeStyle';
import axios from 'axios';

function Addreciepe({setModalopen,setSnackbar}) {

const [reciepeName, setReciepeName] = useState('');
const [foodSupplies, setFoodSupplies] = useState('');
const [orderReciepe, setOrderReciepe] = useState('');
const [pictureOfReciepe, setPictureOfReciepe] = useState(null);

  const handleSubmitpicture = async (event) => {
    event.preventDefault();
    if (!pictureOfReciepe || !reciepeName || !foodSupplies || !orderReciepe ) {
      setSnackbar('אנא מלא את כל הפרטים', 'warning');
      return;
    }
    const formData = new FormData();
    formData.append('image', pictureOfReciepe);
    formData.append("ReciepeName", reciepeName);
    formData.append("FoodSupplies", foodSupplies);
    formData.append("OrderReciepe", orderReciepe);
     
    try {
      const response = await axios.post('http://localhost:3000/postreciepe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setModalopen(false);
      setSnackbar('המתכון נשלח בהצלחה', 'success');
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      setModalopen(false);
      setSnackbar('תקלה! קיימת בעיית חיבור לשרת', 'error');
      
    }
  };
    return (
     
      <div className="bodystyle">
        <div className='headerstyleAddreciepe'>הוספת מתכון</div>
      
          <TextField
          sx={styletextheaderfield}
          label="שם המתכון"
          value={reciepeName}
          onChange={(e) => setReciepeName(e.target.value)}
        />

        <div className='rowtextstyleAddreciepe' >מרכיבים למתכון</div>
        <div>
          <TextField
          sx={styletextfield}
          multiline
          minRows={6}
          value={foodSupplies}
          onChange={(e) => setFoodSupplies(e.target.value)}
         
        />
        </div>

       
        <div className='rowtextstyleAddreciepe' >אופן הכנה</div>
        <div>
          <TextField
            sx={styletextfield}
            multiline
            minRows={6}
            value={orderReciepe}
            onChange={(e) => setOrderReciepe(e.target.value)}

        />
        </div>
        <div className='rowtextstyleAddreciepe' >העלאת תמונה</div>
        <div className='rowbuttonstyleAddreciepe'>
        <Button
        sx={stylebuttonfieldfile}
        startIcon={<AttachFileIcon/>}
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
      
        >    {pictureOfReciepe ? pictureOfReciepe.name : "הוסף קובץ"}
           <VisuallyHiddenInput
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file) setPictureOfReciepe(file);
        }}
        
         />
        </Button>
        </div>
        <div className='rowbuttonstyleAddreciepe'>
        <Button
        sx={stylebuttonfieldfile}
        startIcon={<CheckCircleIcon/>}
        onClick={handleSubmitpicture}
        >שליחת מתכון</Button>
        </div>
        <div className='rowbuttonstyleAddreciepebottom'/>


        
       
      </div>
    )};

  
  export default Addreciepe;
     