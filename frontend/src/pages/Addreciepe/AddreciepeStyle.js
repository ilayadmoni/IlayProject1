// addRecipeStyles.js
import { styled } from '@mui/material/styles';

export const styletextheaderfield = {
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
    opacity: 0,
    pointerEvents: 'none',
  },
};

export const styletextfield = {
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

export const stylebuttonfieldfile = {
  bgcolor: '#e8d1a7',
  color: '#442d1c',
  border: '2px solid #442d1c',
  boxShadow: 24,
  borderRadius: '12px',
  fontSize: '20px',
  padding: '12px 24px',
  width: '19%',
  height: '50px',
  fontFamily: 'Myfont',
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
