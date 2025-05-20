import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Header from './header/Header';
import ModalBox from './components/modal/Modal';
import Addrecipe from './pages/Addrecipe/Addreciepe';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';


let IPServer = 'http://10.100.102.8:3000';

function App() {
   const [openAddRecipe, setOpenAddRecipe] = useState(false);
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success'
   });
   const [recipes, setRecipes] = useState([]);

   const SetSnackbarOpen = (message, severity) => {
     setSnackbar({ open: true, message, severity });
   };
 
   const handleCloseSnackbar = () => {
     setSnackbar(prev => ({ ...prev, open: false }));
   };
 
   const handleOnClickAdd = () =>  setOpenAddRecipe(true);
 
 
   const fetchRecipes = async () => {
       const response = await axios.get(
         `${IPServer}/api/recipes`
       );
       setRecipes(response.data);
     };
 
     useEffect(() => {
       fetchRecipes()
     }, []);
 
     return (
       <div className='bodystyleheader'>
         <Header handleOnClick={handleOnClickAdd} />
         <div className='headertextstyle'>
           ספר מתכונים
         </div>
         <Homepage 
          recipes={recipes}
          ipServer={IPServer}
          />
         <ModalBox
           open={openAddRecipe} 
           setOpen={setOpenAddRecipe}
           BodyFunction={<Addrecipe

            setModalopen={setOpenAddRecipe}
            setSnackbar={SetSnackbarOpen}
            ipServer={IPServer}
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
