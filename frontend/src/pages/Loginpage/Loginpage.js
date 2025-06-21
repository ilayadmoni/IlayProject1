import React, { useState } from 'react';
import './Loginpage.css';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';

// Use your existing firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyBXL1iWA9JrV8B54a-wqyuUQ1Pvvu0s-48",
  authDomain: "recipe-web-8251e.firebaseapp.com",
  projectId: "recipe-web-8251e",
  storageBucket: "recipe-web-8251e.firebasestorage.app",
  messagingSenderId: "547726038230",
  appId: "1:547726038230:web:01ff42ac380fee0a912577",
  measurementId: "G-ZB94T916VM"
};

const stylebuttonsignin = {
  color: '#e5e0d8',
  border: '3px solid #e5e0d8',
  boxShadow: 24,
  borderRadius: '12px',
  fontSize: ['1.3rem', '1.15rem', '1.2rem'],
  width: ['70vw', '70vw', '250px'],
  height: '50px',
  fontFamily: 'MyFont',
  bgcolor: '#725c3a'
};

const styleavatar = {
  width: 300,
  height: 300,
  boxShadow: 10,
  marginBottom: '20px',
  border: '3px solid #e5e0d8',
  bgcolor: '#725c3a'
};




// Initialize Firebase only once
if (!window._firebaseInitialized) {
  initializeApp(firebaseConfig);
  window._firebaseInitialized = true;
}

function Loginpage({ipServer}) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);

      const formData = new FormData();
      formData.append("UserUID", auth.currentUser.uid);
      formData.append("UserName", auth.currentUser.displayName);
      formData.append("Email", auth.currentUser.email);
      formData.append("PhotoUrl" , auth.currentUser.photoURL);

      const response = await axios.post(`${ipServer}/addnewuser`,formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

      navigate('/'); // Redirect to home after successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
       <Avatar
          alt="Logo"
          src="/favicon.ico"
          sx={styleavatar}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={stylebuttonsignin}
          onClick={handleGoogleLogin}
          disabled={loading}
          startIcon={<GoogleIcon />}
        >
          {loading ? 'נכנס עם גוגל' : ' כניסה עם גוגל'}
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      
    </Box>
  );
}

export default Loginpage;
