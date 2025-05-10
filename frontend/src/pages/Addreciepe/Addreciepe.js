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

function Addreciepe() {

const [reciepeName, setReciepeName] = useState('');
const [foodSupplies, setFoodSupplies] = useState('');
const [orderReciepe, setOrderReciepe] = useState('');
const [pictureOfReciepe, setPictureOfReciepe] = useState(null);

const uploadRecipe = async () => {
  if (!reciepeName || !foodSupplies || !orderReciepe || !pictureOfReciepe) {
    alert("נא למלא את כל השדות ולהעלות תמונה");
    return;
  }

  const formData = new FormData();
  formData.append("ReciepeName", reciepeName);
  formData.append("FoodSupplies", foodSupplies);
  formData.append("OrderReciepe", orderReciepe);
  formData.append("PictureOfReciepe", pictureOfReciepe);

  try {
    const response = await axios.post("http://localhost:3000/api/reciepes", formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // This is handled automatically by axios but it's good to explicitly mention it
      },
    });

    console.log("Success:", response.data);
    alert("המתכון הועלה בהצלחה!");
    // Optional: reset form
    setReciepeName('');
    setFoodSupplies('');
    setOrderReciepe('');
    setPictureOfReciepe(null);
  } catch (error) {
    console.error("Error:", error);
    alert("שגיאה בשליחת המתכון לשרת.");
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
      
        >    {pictureOfReciepe ? "שנה קובץ" : "הוסף קובץ"}
           <VisuallyHiddenInput
        type="file"
        accept="image/png"
        onChange={(event) => {
          const file = event.target.files[0];
          console.log(file);
          if (file) setPictureOfReciepe(file);
        }}
        
         />
        </Button>
        </div>
        <div className='rowbuttonstyleAddreciepe'>
        <Button
        sx={stylebuttonfieldfile}
        startIcon={<CheckCircleIcon/>}
        onClick={uploadRecipe}
        >שליחת מתכון</Button>
        </div>
       
      </div>
    )
  }
  export default Addreciepe;
     