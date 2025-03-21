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
  ListItemIcon,
  Icon
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import GraphComponent from '../components/GraphComponent';
import MenuSidebar from '../components/MenuSidebar';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';

const SearchResults = () => {
  const navigate = useNavigate();
  const {patentid, timestamp} = useParams();
  const [result, setResult] = useState("");
  const [graphNodes, setGraphNodes] = useState(null);
  const [graphEdges, setGraphEdges] = useState(null);
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

  const getResult = async () => {
    try {
      const summaryResponse = await axios.get(`/api/patents/getSearch/${timestamp}`);
      const graphResponse = await axios.get(`/api/patents/getClaimGraph/${patentid}`);
      
      setResult(summaryResponse.data.searchResult.response);
      setGraphNodes(graphResponse.data.claimList);
      setGraphEdges(graphResponse.data.edgeList);

    } catch (error) {
      setResult({ error: 'Failed to fetch patent data' });
    }

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
    getResult();
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
          <Box sx={{ bgcolor: '#112240', p: 3, borderRadius: 2, width: '100%', maxWidth: 800, justifyContent: 'center'}}>
            <Link href="/search">
              <IconButton color='primary' aria-label='Backspace icon'>
                <KeyboardBackspaceIcon/>
              </IconButton>
            </Link>

            <Typography variant="h5" sx={{ mb: 2, color: '#4F83CC' }}>Search Result:</Typography>
            {/* <Typography variant="body1" sx={{ color: 'white' }}>{result.summary || result.error}</Typography> */}
            <ReactMarkdown>{result}</ReactMarkdown>

            <Typography variant="h5" sx={{ mb: 2, color: '#4F83CC' }}>Claims Visualized:</Typography>
            <GraphComponent nodes={graphNodes} edges={graphEdges}></GraphComponent>
          </Box>
      </Container>
    
    </Box>
  );
};

export default SearchResults;