import  { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AppRoutes from './Approute'; // Import the PrivateRoute component

const IPServer = process.env.REACT_APP_BACKEND_URL || 'http://10.100.102.12:80'; 

function App() {

   const [openAddRecipe, setOpenAddRecipe] = useState(false);
   const [openUserProfile, setOpenUserProfile] = useState(false);
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
        openUserProfile={openUserProfile}
        setOpenUserProfile={setOpenUserProfile}
        setOpenAddRecipe={setOpenAddRecipe}
        snackbar={snackbar}
        SetSnackbarOpen={SetSnackbarOpen}
        handleCloseSnackbar={handleCloseSnackbar}
        handleOnClickAdd={handleOnClickAdd}
        recipes={recipes}
        IPServer={IPServer}
        fetchRecipes={fetchRecipes}
        user={user}
        setUser={setUser}
      />
    </Router>
   );
 }
   
   export default App;
