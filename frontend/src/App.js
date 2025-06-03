import React, { useEffect, useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Header from './header/Header';
import ModalBox from './components/modal/Modal';
import Addrecipe from './ModalsBox/Addrecipe/Addreciepe';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Aboutpage from './pages/AboutMe/Aboutpage';
import Loginpage from './pages/Loginpage/Loginpage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './pages/Loginpage/Privateroute'; // Import the PrivateRoute component

const IPServer = process.env.REACT_APP_BACKEND_URL || 'http://10.100.102.12:80'; 

function AppRoutes({
  openAddRecipe,
  setOpenAddRecipe,
  snackbar,
  SetSnackbarOpen,
  handleCloseSnackbar,
  handleOnClickAdd,
  recipes,
  IPServer,
  fetchRecipes,
  user
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // Block all routes except /loginpage if not authenticated
  if (user === undefined) return null; // or a loading spinner
  if (!user && location.pathname !== '/loginpage') {
    window.location.replace('/loginpage');
    return null;
  }

  return (
    <Routes>
      <Route path="/loginpage" element={<Loginpage />} />
      <Route path="*" element={
        <PrivateRoute>
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
              <Route path="/aboutme" element={<Aboutpage />} />
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
        </PrivateRoute>
      } />
    </Routes>
  );
}

function App() {

   const [openAddRecipe, setOpenAddRecipe] = useState(false);
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success'
   });
   const [recipes, setRecipes] = useState([]);
   const [user, setUser] = useState(undefined);

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
 
     useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
      });
      return () => unsubscribe();
    }, []);

  return (
    <Router>
      <AppRoutes
        openAddRecipe={openAddRecipe}
        setOpenAddRecipe={setOpenAddRecipe}
        snackbar={snackbar}
        SetSnackbarOpen={SetSnackbarOpen}
        handleCloseSnackbar={handleCloseSnackbar}
        handleOnClickAdd={handleOnClickAdd}
        recipes={recipes}
        IPServer={IPServer}
        fetchRecipes={fetchRecipes}
        user={user}
      />
    </Router>
   );
 }
   
   export default App;
