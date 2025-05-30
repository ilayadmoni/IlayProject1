// addRecipeStyles.js
import { styled } from '@mui/material/styles';

export const styletextheaderfield = {
  width: ['70vw', '70vw', '250px'],
  bgcolor: '#e8d1a7',
  border: '2px solid #442d1c',
  boxShadow: 24,
  borderRadius: '12px',
  mx: 'auto',
  '& .MuiInputLabel-root': {
    color: '#442d1c',
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
  bgcolor: '#e8d1a7',
  border: '2px solid #442d1c',
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
  bgcolor: '#e8d1a7',
  color: '#442d1c',
  border: '2px solid #442d1c',
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