// addRecipeStyles.js
import { styled } from '@mui/material/styles';

export const styletextheaderfield = {
  width: ['70vw', '70vw', '250px'],
  bgcolor: '#f0efee',
  border: '3px solid #725c3a',
  boxShadow: 24,
  borderRadius: '12px',
  mx: 'auto',
  '& .MuiInputLabel-root': {
    color: '#725c3a',
    fontFamily: 'MyFont',
    fontSize: '20px',
    width: '100%',
    textAlign: 'center',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '25%',
    pointerEvents: 'auto',
  },
  '& .MuiOutlinedInput-root': {
    direction: 'rtl',
    '& fieldset': { borderColor: 'transparent', borderRadius: '12px' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused fieldset': { borderColor: 'transparent' },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    opacity: 0,
    pointerEvents: 'none',
  },
};

export const styletextfield = {
  width: '300px',
  maxWidth: '550px',
  height: '200px',
  minHeight: '200px',
  bgcolor: '#f0efee',
  border: '3px solid #726352',
  boxShadow: 24,
  borderRadius: '12px',
  mx: 'auto',
  '@media (min-width:600px)': {
    width: '60vw',
  },
  '@media (min-width:900px)': {
    width: '60vw',
    height: '10vw'
  },
  '& .MuiInputBase-root': {
    overflowY: 'auto',
    maxHeight: '200px',
  },
  '& .MuiInputBase-input': {
    paddingTop: '30px', // Add padding to the actual input area for multiline
  },
  '& .MuiInputLabel-root': {
    color: '#442d1c',
    fontFamily: 'MyFont',
    fontSize: '20px',
  },
  '& .MuiOutlinedInput-root': {
    direction: 'rtl',
    '& fieldset': { borderColor: 'transparent', borderRadius: '12px' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused fieldset': { borderColor: 'transparent' },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    opacity: 0,
    pointerEvents: 'none',
  },
};

export const stylebuttonfieldfile = {
  bgcolor: '#f0efee',
  color: '#725c3a',
  border: '3px solid #725c3a',
  boxShadow: 24,
  borderRadius: '12px',
  fontSize: ['1.3rem', '1.15rem', '1.2rem'],
  width: ['70vw', '70vw', '250px'],
  height: '50px',
  fontFamily: 'MyFont',
};

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export const stylebuttongroupfield = {
  borderRadius: '12px',
  width: ['30vw', '70vw', '120px'],
  height: '50px',
};


export const styleToggleButton = {
    display: 'flex',    
    flex: 1,
    width: '100%',
    bgcolor: '#f0efee',
    color: '#4f5141',
    border: '3px solid #726352',
    borderRadius: '12px',
    cursor: 'pointer',
    '&:hover': {
      bgcolor: '#e8d1a7',
    },
    '&.Mui-selected': {
      bgcolor: '#e8d1a7',
    },
  }


 export const buttonmodestyle = {
  position: 'sticky',
  top: 0,
  right: 0,
  height: ['60px', '70px', '50px'],        // smaller on mobile, bigger on desktop   // adjust width responsively
  fontSize: ['1.3rem', '1.15rem', '1.2rem'],
 
  color: '#726352',
  
   fontFamily: 'Myfont',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  padding: '0 8px',
  zIndex: 1100,
  minwidth: ['70vw', '70vw', '250px'],
  '@media (hover: hover)': {
    '&:hover': {
      opacity: 0.9, // slightly faded
      transform: 'scale(1.08)', // increase size on hover
      transition: 'transform 0.2s, opacity 0.2s',
      bgcolor: '#f0efee', // darken background on hover
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