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

function Addreciepe() {

const [reciepeName, setReciepeName] = useState('');
const [foodSupplies, setFoodSupplies] = useState('');
const [orderReciepe, setOrderReciepe] = useState('');
const [pictureOfReciepe, setPictureOfReciepe] = useState(null);


 
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
      
        >הוסף קובץ 
           <VisuallyHiddenInput
        type="file"
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
        onClick={() => {
          const recipeObject = {
            ReciepeName: reciepeName,
            FoodSupplies: foodSupplies,
            OrderReciepe: orderReciepe,
            PictureOfReciepe: pictureOfReciepe,
          };
          console.log(recipeObject);
          // send this object to backend or handle it as needed
        }}
        
        >שליחת מתכון</Button>
        </div>
       
      </div>
    )
  }
  export default Addreciepe;
     