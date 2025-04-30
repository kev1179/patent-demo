// import { useEffect, useState } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import axios from 'axios';
// import { CircularProgress, Container } from '@mui/material';

// const PrivateRoute = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(null); // Null for loading state

//     useEffect(() => {
//         const checkAuthStatus = async () => {
//             try {
//                 const response = await axios.get('/api/auth/getAuthStatus', { withCredentials: true });
//                 // console.log(response.data);
//                 setIsAuthenticated(response.data.authenticated);
//             } catch (error) {
//                 console.error('Error checking auth status:', error);
//                 setIsAuthenticated(false as any);
//             }
//         };

//         checkAuthStatus();
//     }, []);

//     if (isAuthenticated === null) return (
//     <Container sx={{height: "100vh"}}>
//       <CircularProgress sx={{ color: 'white', mt: 4}} />
//     </Container>
// );

//     console.log(isAuthenticated);
//     return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;

import { useAuth } from "@clerk/clerk-react";
import { Box, CircularProgress, Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
    <Container maxWidth="sm">
    <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
    >
        <CircularProgress sx={{ color: 'white', mt: 4 }} />
    </Box>
    </Container>

    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />
};

export default ProtectedRoute;
