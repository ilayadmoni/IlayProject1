import  { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AppRoutes from './Approute'; // Import the PrivateRoute component

const IPServer = process.env.REACT_APP_BACKEND_URL || 'http://10.100.102.6:80'; 

function App() {

    // State variables
   const [openAddRecipe, setOpenAddRecipe] = useState(false);
   const [openUserProfile, setOpenUserProfile] = useState(false);
   const [recipesPersonal, setRecipesPersonal] = useState([]);
   const [user, setUser] = useState(undefined);
   const [recipesPublic, setRecipesPublic] = useState([]);
   const [snackbar, setSnackbar] = useState({
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
 
   const handleOnClickAdd = () =>  setOpenAddRecipe(true);
   
 
   const fetchRecipesPersonal = async () => {
       const response = await axios.get(
         `${IPServer}/api/recipes/private/${user.uid}` // Fetch private recipes for the current user
       );
       setRecipesPersonal(response.data);
     };


    const fetchRecipesPublic = async () => {
       const response = await axios.get(
         `${IPServer}/api/recipes/public` 
       );
       setRecipesPublic(response.data);
     };
 
     // Only try to fetch recipes if user is defined and has a uid
     useEffect(() => {
       if (user && user.uid) {
         fetchRecipesPersonal();
          fetchRecipesPublic();
       } else {
         setRecipesPersonal([]);
          setRecipesPublic();
       }
     }, [user]);
 
     useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
      console.log(user);
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
        recipesPersonal={recipesPersonal}
        recipesPublic={recipesPublic}
        fetchRecipesPersonal={fetchRecipesPersonal}
        fetchRecipesPublic={fetchRecipesPublic}
         IPServer={IPServer}
        user={user}
        setUser={setUser}
      />
    </Router>
   );
 }
   
   export default App;
