import React, { useState } from 'react';
import './Loginpage.css';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

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

// Initialize Firebase only once
if (!window._firebaseInitialized) {
  initializeApp(firebaseConfig);
  window._firebaseInitialized = true;
}

function Loginpage() {
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
      navigate('/'); // Redirect to home after successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <img src="/favicon.ico" alt="Logo" className="login-logo" />
      <Typography variant="h4" className="login-title">Login</Typography>
      <form className="login-form">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </form>
    </Box>
  );
}

export default Loginpage;
