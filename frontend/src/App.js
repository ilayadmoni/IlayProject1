import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Header from './header/Header';
import ModalBox from './components/modal/Modal';
import Addrecipe from './ModalsBox/Addrecipe/Addreciepe';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Aboutpage from './pages/AboutMe/Aboutpage';

const IPServer = process.env.REACT_APP_BACKEND_URL || 'http://10.100.102.4:80'; 

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
      <Router>
        <div className='bodystyleheader'>
          <Header handleOnClick={handleOnClickAdd} />
          
          <ModalBox
            open={openAddRecipe}
            setOpen={setOpenAddRecipe}
            BodyFunction={<Addrecipe
              setModalopen={setOpenAddRecipe}
              setSnackbar={SetSnackbarOpen}
              ipServer={IPServer}
              fetchRecipes={fetchRecipes}
            />}
          />
          <Routes>
            <Route path="/aboutme" element={<Aboutpage/>} />
            <Route path="/" element={
              <>
                <div className='headertextstyle'>המתכונים שלי</div>
                <Homepage 
                  recipes={recipes}
                  ipServer={IPServer}
                  fetchRecipes={fetchRecipes}
                  setSnackbar={SetSnackbarOpen}
                />
              </>
            } />
          </Routes>
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
                fontFamily: 'Myfont' 
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
      </Router>
     );
   }
   
   export default App;
