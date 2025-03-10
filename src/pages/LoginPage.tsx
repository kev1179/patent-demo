import React, { useState } from 'react';
import { TextField, Button, Typography, Link, Box, Container } from '@mui/material';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', credentials);
    // Add authentication logic here
  };

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
