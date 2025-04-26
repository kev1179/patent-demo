import { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Alert, Container } from '@mui/material';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const signUp = async (data: any) => {
    try
    {
      const signup = await axios.post('/api/auth/signup', {username: data.username, password: data.password});
      // const response = await axios.post('/api/auth/login', {"username": data.username, "password": data.password});
      // console.log(response.data.success);
      console.log(signup.data);
    }

    catch(err)
    {
      console.log(err);
    }

    setSuccess(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('submitted');
    setError('');

    if (!validateEmail(formData.username)) {
      setError('Invalid email format.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await signUp(formData);
    } catch (err) {
      setError('Username already exists');
    } finally {
      setLoading(false);
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        gap: 2,
      }}
    >
      <Typography variant="h4" align="center">
        Sign Up
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Email/username"
        name="username"
        type="email"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      {/* <TextField
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        required
      /> */}

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        size="large"
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </Button>
    </Box>
    </Container>
  );
};

export default SignupPage;
