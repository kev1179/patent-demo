import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Link, Box, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', credentials);
    
    try {
      const response = await axios.post("/api/auth/login", { "username": credentials.username, "password": credentials.password });
      setSuccess(true);
    } catch (err) {
      setHasError(true);
    }

  };

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const response = await axios.get('/api/auth/getAuthStatus', { withCredentials: true });
        if (response.data.authenticated) {
          setSuccess(true);
        } 
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    getAuthStatus();
  }, []);

  if(success)
    return (<Navigate to = "/search"></Navigate>);
  
  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', border: '1px solid #ccc', borderRadius: '8px', padding: '24px' }}>
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            autoFocus
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
          />

          { hasError &&
            <Box display="flex" alignItems="center">
              <ErrorOutlineIcon color="error" />
                <Typography color="error" sx={{ ml: 1, mt: 0.5}}>
                  Incorrect username or password
                </Typography>
            </Box>
          }

          <Link href="#" variant="body2" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
            Forgot password?
          </Link>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Sign In
          </Button>

        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
