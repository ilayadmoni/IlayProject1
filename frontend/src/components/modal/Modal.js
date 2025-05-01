import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';;

const styleBox = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: '#9D9167',
  border: '1px solid #FFF3E0',
  boxShadow: 24,
  p: 5,
  borderRadius: '12px',
  fontFamily: 'Arial'
};

const buttonclosestyle = {
    bgcolor: '#84592b',
    color: '#e8D1a7',
    transform: 'translate(-90%, -50%)',
    left: '3%',
    minwidth: '80px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #BFA6A0',
    borderRadius: '12px',
    boxShadow: 24

}

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