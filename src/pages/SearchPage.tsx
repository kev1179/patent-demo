import React, { useEffect, useState } from 'react';
import { 
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Toolbar,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import GraphComponent from '../components/GraphComponent';
import MenuSidebar from '../components/MenuSidebar';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [graphNodes, setGraphNodes] = useState(null);
  const [graphEdges, setGraphEdges] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const darkBlue = '#0A1929';
  const lightBlue = '#1E3A8A';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const summaryResponse = await axios.get(`/api/patents/getSummary/${searchTerm}`);
      const graphResponse = await axios.get(`/api/patents/getClaimGraph/${searchTerm}`);

      setResult(summaryResponse.data);
      setGraphNodes(graphResponse.data.claimList);
      setGraphEdges(graphResponse.data.edgeList);

      const saveResult = await axios.post("/api/patents/saveResult", 
        { response: result.summary, patentid: searchTerm},
        { withCredentials: true });

    } catch (error) {
      setResult({ error: 'Failed to fetch patent data' });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
        await axios.post('/api/auth/logout', {}, { withCredentials: true });
        navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
        console.error('Logout failed:', error);
    } finally {
        handleClose();
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
        try {
            const response = await axios.get('/api/auth/getUsername', { withCredentials: true });
            setUsername(response.data.username); // Assuming the API returns { username: "JohnDoe" }
        } catch (error) {
            console.error('Failed to fetch username:', error);
        }
    };

    fetchUsername();
}, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: darkBlue,
        color: 'white',
      }}
    >

      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
        <MenuSidebar/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <IconButton sx={{ p: 0 }} onClick={handleClick}>
            <Avatar alt="User Profile" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{textAlign: 'center'}}
        >
          <Typography>{username}</Typography>

          <MenuItem onClick={handleClose}>
              <ListItemIcon sx={{ color: '#FFFFFF' }}>
                  <PersonIcon />
              </ListItemIcon>
              Account
          </MenuItem>

          <MenuItem onClick={handleClose}>
              <ListItemIcon sx={{ color: '#FFFFFF' }}>
                  <SettingsIcon />
              </ListItemIcon>
              Settings
          </MenuItem>

          <MenuItem onClick={handleLogout}>
              <ListItemIcon sx={{ color: 'red' }}>
                  <LogoutIcon />
              </ListItemIcon>
              Logout
          </MenuItem>

        </Menu>

      <Container 
        component="main" 
        maxWidth="md" 
        sx={{ 
          flexGrow: 1,
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: result ? 'flex-start' : 'center',
          alignItems: 'center',
          py: 8
        }}
      >
        {!result && (
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              background: `linear-gradient(45deg, #4F83CC 30%, #86B9F5 90%)`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            PatentPartner
          </Typography>
        )}

        <Box sx={{ width: '100%', maxWidth: 600, position: 'relative', mb: result ? 4 : 7 }}>
          <TextField
            fullWidth
            placeholder="Enter keywords or patent code..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              sx: { 
                bgcolor: "#112240",
                borderRadius: 2,
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#112240',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1,
                },
              }
            }}
            sx={{
              '& .MuiInputBase-input': {
                color: 'white',
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              bgcolor: '#2D6CDF',
              '&:hover': {
                bgcolor: '#3D7CEF',
              }
            }}
          >
            Search
          </Button>
        </Box>

        {loading && 
        <>
          <CircularProgress sx={{ color: 'white', mt: 4 }} />
          <Typography>Writing...</Typography>
        </>
        }

        {result && (
          <Box sx={{ bgcolor: '#112240', p: 3, borderRadius: 2, width: '100%', maxWidth: 800, mt: 4, justifyContent: 'center'}}>
            <Typography variant="h5" sx={{ mb: 2, color: '#4F83CC' }}>Search Result:</Typography>
            {/* <Typography variant="body1" sx={{ color: 'white' }}>{result.summary || result.error}</Typography> */}
            <ReactMarkdown>{result.summary || result.error}</ReactMarkdown>

            <Typography variant="h5" sx={{ mb: 2, color: '#4F83CC' }}>Claims Visualized:</Typography>
            <GraphComponent nodes={graphNodes} edges={graphEdges}></GraphComponent>
          </Box>
        )}
      </Container>
    
    </Box>
  );
};

export default SearchPage;

// import React from "react";
// import { Container, TextField, InputAdornment, IconButton, Typography, Box, AppBar, Toolbar, Avatar, Link } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const SearchPage = () => {
//   return (
//     <Box sx={{ backgroundColor: "#0A192F", minHeight: "100vh", color: "#FFFFFF", display: "flex", flexDirection: "column"}}>
//       {/* Header */}
//       <AppBar position="static" sx={{ backgroundColor: "#112240" }}>
//         <Toolbar sx={{ justifyContent: "flex-end" }}>
//           <Avatar alt="User Avatar" sx={{ bgcolor: "#64ffda" }} />
//         </Toolbar>
//       </AppBar>
      
//       {/* Main Content */}
//       <Container sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//         <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", color: "#64ffda" }}>
//           PatentPal
//         </Typography>
//         <TextField
//           variant="outlined"
//           placeholder="Enter keywords or patent code..."
//           sx={{
//             width: "50%",
//             backgroundColor: "#112240",
//             borderRadius: "5px",
//             input: { color: "#FFFFFF" },
//           }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton sx={{ color: "#64ffda" }}>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Container>

//       {/* Footer */}
//       <Box component="footer" sx={{ backgroundColor: "#112240", padding: "16px", textAlign: "center" }}>
//         <Typography variant="body2" color="#64ffda">
//           <Link href="/privacy" color="inherit" underline="hover">Privacy Policy</Link> | 
//           <Link href="/terms" color="inherit" underline="hover"> Terms of Use</Link>
//         </Typography>
//         <Typography variant="body2" color="#FFFFFF">
//           &copy; {new Date().getFullYear()} PatentPal. All rights reserved.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default SearchPage;
