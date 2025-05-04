import './Addreciepe.css'
import TextField from '@mui/material/TextField';


function Addreciepe() {

 
    return (
     
      <div className="bodystyle">
        <div className='headerstyleAddreciepe'>הוספת מתכון</div>
        <div className='rowstyleAddreciepe'>

        <div>שם המתכון</div>

        <div>
          <TextField
          id="outlined-multiline-flexible"
          label="שם המתכון"
        />
        </div>

        </div>

        <div className='rowstyleAddreciepe'>
        <div>מרכיבים למתכון</div>

        <div>
          <TextField
          id="outlined-multiline-flexible"
          label="מרכיבים למתכון"
        />
        </div>

        </div>

        <div className='rowstyleAddreciepe'>
        <div>אופן הכנה</div>
        <div>
          <TextField
          id="outlined-multiline-flexible"
          label="אופן הכנה"
        />
        </div>
        
        </div>



       
      </div>
    )
  }
  export default Addreciepe;
     