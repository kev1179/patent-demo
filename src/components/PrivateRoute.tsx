import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Container } from '@mui/material';

const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Null for loading state

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('/api/auth/getAuthStatus', { withCredentials: true });
                // console.log(response.data);
                setIsAuthenticated(response.data.authenticated);
            } catch (error) {
                console.error('Error checking auth status:', error);
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    if (isAuthenticated === null) return (
    <Container sx={{height: "100vh"}}>
      <CircularProgress sx={{ color: 'white', mt: 4}} />
    </Container>
);

    console.log(isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
