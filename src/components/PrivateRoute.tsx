import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

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

    if (isAuthenticated === null) return <div>Loading...</div>;

    console.log(isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
