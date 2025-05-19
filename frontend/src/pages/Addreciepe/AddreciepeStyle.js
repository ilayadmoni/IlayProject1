// addRecipeStyles.js
import { styled } from '@mui/material/styles';

export const styletextheaderfield = {
   width: ['70vw', '70vw', '300px'],
  maxWidth: '300px',
  bgcolor: '#e8d1a7',
  border: '2px solid #442d1c',
  boxShadow: 24,
  borderRadius: '12px',
  mx: 'auto',
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

export const styletextfield = {
  width: '70vw',
  maxWidth: '800px',
  bgcolor: '#e8d1a7',
  border: '2px solid #442d1c',
  boxShadow: 24,
  borderRadius: '12px',
  mx: 'auto',
  '@media (min-width:600px)': {
    width: '50vw',
  },
  '@media (min-width:900px)': {
    width: '50vw',
  },
  '& .MuiInputBase-root': {
    overflowY: 'auto',
    maxHeight: '200px',
    // Keep scroll styling
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
  bgcolor: '#e8d1a7',
  color: '#442d1c',
  border: '2px solid #442d1c',
  boxShadow: 24,
  borderRadius: '12px',
  fontSize: '18px',
  padding: '10px 20px',
  width: '90%',
  maxWidth: '300px',
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