import React, { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// Styled component for the search bar
const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

// Styled component for search results
const SearchResultItem = styled(ListItem)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
  },
}));

const MenuSidebar = () => {
  const navigate = useNavigate();
  // State for drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // State for sort menu
  const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  const sortMenuOpen = Boolean(sortMenuAnchor);
  
  // State for current sort option
  const [sortOption, setSortOption] = useState('Most Recent');
  
  const [results, setResults] = useState([]);
  const [timestamps, setTimeStamps] = useState([]);

  // Handler for opening the drawer
  const handleDrawerToggle = () => {
    getRecentSearches();
    setDrawerOpen(!drawerOpen);
  };
  
  // Handler for sort menu
  const handleSortMenuOpen = (event) => {
    setSortMenuAnchor(event.currentTarget);
  };
  
  const handleSortMenuClose = () => {
    setSortMenuAnchor(null);
  };
  
  const handleSortOptionSelect = (option) => {
    setSortOption(option);
    handleSortMenuClose();
  };
  
  // Handler for search result click
  const handleResultClick = (result, index) => {
    
    let patentid = result;
    let timestamp = timestamps[index];
    navigate(`/searchResults/${patentid}/${timestamp}`);
    // window.location.reload();
  };

  const getRecentSearches = async () => {
    try {
        const response = await axios.get('/api/patents/getRecentSearches', { withCredentials: true });
        
        let resultArray = [];
        let timestampArray = [];

        for(let i = 0; i < response.data.recentSearches.length; i++)
        {
          resultArray.push(response.data.recentSearches[i].patentid);
          timestampArray.push(response.data.recentSearches[i].timestamp)
        }

        setResults(resultArray);
        setTimeStamps(timestampArray);
    } catch (error) {
        console.error('Failed to get recent results:', error);
    }
};

  useEffect(() => {
    getRecentSearches();
}, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Only the menu icon in the top left */}
      <Box sx={{ zIndex: 1 }}>
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          {/* Search Bar */}
          <Box sx={{ p: 2 }}>
            <SearchBar>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </SearchBar>
          </Box>
          
          <Divider />
          
          {/* Sort Options */}
          <Box sx={{ p: 2 }}>
            <Box
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer' 
              }}
              onClick={handleSortMenuOpen}
            >
              <Typography variant="subtitle1">
                Sort By: {sortOption}
              </Typography>
              <ExpandMoreIcon />
            </Box>
            <Menu
              anchorEl={sortMenuAnchor}
              open={sortMenuOpen}
              onClose={handleSortMenuClose}
            >
              <MenuItem onClick={() => handleSortOptionSelect('Most Recent')}>Most Recent</MenuItem>
              <MenuItem onClick={() => handleSortOptionSelect('Oldest')}>Oldest</MenuItem>
              <MenuItem onClick={() => handleSortOptionSelect('Name')}>Name</MenuItem>
            </Menu>
          </Box>
          
          <Divider />
          
          {/* Search Results */}
          <List>
            {results.map((result, index) => (
              <SearchResultItem key={index} onClick={() => handleResultClick(result, index)}>
                <ListItemText primary={result} />
              </SearchResultItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MenuSidebar;