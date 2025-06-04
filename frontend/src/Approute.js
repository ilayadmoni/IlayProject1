import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loginpage from './pages/Loginpage/Loginpage';
import Aboutpage from './pages/AboutMe/Aboutpage';
import Header from './header/Header';
import Homepage from './pages/Homepage/Homepage';
import Addrecipe from './ModalsBox/Addrecipe/Addreciepe';
import ModalBox from './components/modal/Modal';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PrivateRoute from './pages/Loginpage/Privateroute'; // Import the PrivateRoute component
import './App.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UserInfo from './ModalsBox/Userinfo/Userinfo.js';


function AppRoutes({
  openAddRecipe,
  setOpenAddRecipe,
  openUserProfile,
  setOpenUserProfile,
  snackbar,
  SetSnackbarOpen,
  handleCloseSnackbar,
  handleOnClickAdd,
  recipes,
  IPServer,
  fetchRecipes,
  user,
  setUser
}) {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({ uid: null, displayName: null, photoURL: null , email: null });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          email: firebaseUser.email
        });
      } else {
        setCurrentUser({ uid: null, displayName: null, photoURL: null , email: null });
      }
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);
  console.log('Current User:', currentUser.photoURL);

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
            <Header handleOnClickAddrecipe={handleOnClickAdd} setOpenUserProfile={setOpenUserProfile} currentUser={currentUser} />
            <ModalBox
              open={openAddRecipe}
              setOpen={setOpenAddRecipe}
              BodyFunction={<Addrecipe
                setModalopen={setOpenAddRecipe}
                setSnackbar={SetSnackbarOpen}
                ipServer={IPServer}
                fetchRecipes={fetchRecipes}
                currentUser={currentUser}
              />}
            />
            <ModalBox
              open={openUserProfile}
              setOpen={setOpenUserProfile}
              BodyFunction={<UserInfo currentUser={currentUser} />}
            />
            <Routes>
              <Route path="/aboutme" element={<Aboutpage currentUser={currentUser} />} />
              <Route path="/" element={
                <>
                  <div className='headertextstyle'>המתכונים שלי</div>
                  <Homepage 
                    recipes={recipes}
                    ipServer={IPServer}
                    fetchRecipes={fetchRecipes}
                    setSnackbar={SetSnackbarOpen}
                    currentUser={currentUser}
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

 export default AppRoutes;