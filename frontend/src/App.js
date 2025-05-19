
import './App.css';
import Homepage from './pages/Homepage';
import Header from './header/Header';
import ModalBox from './components/modal/Modal';
import Addreciepe from './pages/Addreciepe/Addreciepe';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function App() {
   const [openAddreciepe, setOpenAddreciepe] = React.useState(false);
   const [snackbar, setSnackbar] = React.useState({
  open: false,
  message: '',
  severity: 'success'
});

const SetSnackbarOpen = (message, severity) => {
  setSnackbar({ open: true, message, severity });
};

const handleCloseSnackbar = () => {
  setSnackbar(prev => ({ ...prev, open: false }));
};

const handleOnClickAdd = () =>  setOpenAddreciepe(true);


     
   


  return (
    <div className='bodystyleheader'>
      <Header handleOnClick={handleOnClickAdd} />
      <div className='headertextstyle'>
        ספר מתכונים
      </div>
      <Homepage></Homepage>
      <ModalBox
        open={openAddreciepe} 
        setOpen={setOpenAddreciepe}
        BodyFunction={<Addreciepe
        setModalopen={setOpenAddreciepe}
         setSnackbar={SetSnackbarOpen}
           />} 
        />

       <Snackbar
  open={snackbar.open}
  autoHideDuration={6000}
  onClose={handleCloseSnackbar}
>
  <Alert
    onClose={handleCloseSnackbar}
    severity={snackbar.severity}
    variant="filled"
    sx={{
      width: '100%',
      fontFamily:  'Myfont' 
    }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>

      
    </div>
  );
}

export default App;
