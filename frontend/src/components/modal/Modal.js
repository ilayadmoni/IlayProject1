import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';;

const styleBox = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: '#743014',
  border: '1px solid #FFF3E0',
  boxShadow: 24,
  borderRadius: '12px',
};

const buttonclosestyle = {
  position: 'absolute',  // Add this
  top: '10px',           // distance from top
  left: '10px',          // distance from left
  bgcolor: '#e8d1a7',
  color: '#442d1c',
  minWidth: '50px',      // fix typo: "minwidth" → "minWidth"
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #BFA6A0',
  borderRadius: '12px',
  boxShadow: 24,
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
            <BodyFunction/>
          </Box>
        
      </Modal>
    </div>
  );
}