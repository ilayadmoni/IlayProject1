import './Addreciepe.css'
import TextField from '@mui/material/TextField';


const styletextheaderfield = {
  bgcolor: '#e8d1a7',
  border: '2px solid #442d1c',
  boxShadow: 24,
  borderRadius: '12px',
  '& .MuiInputLabel-root': {
    color: '#442d1c',
    left: '20%',
    fontFamily: 'MyFont',
    fontSize: '23px',
  },
  '& .MuiOutlinedInput-root': {
    direction: 'rtl', 
    '& fieldset': {
      borderColor: 'transparent', 
      borderWidth: 'px',
      borderRadius: '12px',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    opacity: 0, // Hides the label smoothly when focused
    pointerEvents: 'none', // Prevent label interaction when hidden
  },

};

const styletextfield = {
  width: '600px',
  bgcolor: '#e8d1a7',
  border: '2px solid #442d1c',
  boxShadow: 24,
  borderRadius: '12px',
  '& .MuiInputBase-root': {
    overflowY: 'auto',
    maxHeight: '200px',
    '&::-webkit-scrollbar': {
      width: '12px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#e8d1a7',
      borderRadius: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#442d1c',
      borderRadius: '6px',
      border: '3px solid #e8d1a7',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#6b3c1f',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#442d1c',
    left: '20%',
    fontFamily: 'MyFont',
    fontSize: '23px',
  },
  '& .MuiOutlinedInput-root': {
    direction: 'rtl',
    '& fieldset': {
      borderColor: 'transparent',
      borderRadius: '12px',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    opacity: 0,
    pointerEvents: 'none',
  },
};




function Addreciepe() {

 
    return (
     
      <div className="bodystyle">
        <div className='headerstyleAddreciepe'>הוספת מתכון</div>
        <div className='rowstyleAddreciepeheader'>
        <div>
          <TextField
          sx={styletextheaderfield}
          label="שם המתכון"
        />
        </div>

        </div>

        <div className='rowstyleAddreciepe'>
        <div className='rowtextstyleAddreciepe' >מרכיבים למתכון</div>

        <div>
          <TextField
          sx={styletextfield}
          multiline
          minRows={6}
         
        />
        </div>

        </div>

        <div className='rowstyleAddreciepe'>
        <div className='rowtextstyleAddreciepe' >אופן הכנה</div>
        <div>
          <TextField
            sx={styletextfield}
            multiline
            minRows={6}
        />
        </div>
        
        </div>

     
        
      
 
        



       
      </div>
    )
  }
  export default Addreciepe;
     