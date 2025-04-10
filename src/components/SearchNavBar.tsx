import { useEffect, useState } from 'react';
import { 
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuSidebar from './MenuSidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchNavBar = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
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

    return(
      <>
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

        {/* <MenuItem onClick={handleClose}>
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
        </MenuItem> */}

        <MenuItem onClick={handleLogout}>
            <ListItemIcon sx={{ color: 'red' }}>
                <LogoutIcon />
            </ListItemIcon>
            Logout
        </MenuItem>

      </Menu>
      </>
    );
}

export default SearchNavBar;