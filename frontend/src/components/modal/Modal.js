import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';;

const styleBox = {
  position: 'absolute',
  top: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '80vw',
  bgcolor: '#84592b',
  border: '3px solid #442d1c',
  boxShadow: 24,
  borderRadius: '10px',
  minHeight: '300px',
  maxHeight: 'calc(100vh - 100px)',
  overflowY: 'auto',
  padding: '10px',

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

  // ✅ Mobile-specific padding
  '@media (max-width:600px)': {
    paddingBottom: '12px', // Adjust as needed
  },
};


const buttonclosestyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  bgcolor: '#e8d1a7',
  color: '#442d1c',
  border: '3px solid #442d1c',
  minWidth: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  boxShadow: 24,
  padding: 0,
  '@media (max-width:480px)': {
    minWidth: '36px',
    height: '36px',
  },
};

export default function ModalBox({open,setOpen,BodyFunction}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
          <Box sx={styleBox}>
           <Button
           sx = {buttonclosestyle}
           onClick={handleClose}
           >
            <CloseIcon/>
            </Button>
            {BodyFunction}
          </Box>
        
      </Modal>
    </div>
  );
}