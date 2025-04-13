import { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  // InputBase,
  List,
  ListItemText,
  // Menu,
  // MenuItem,
  // Typography,
  // Divider,
  Link
} from '@mui/material';
import {
  Menu as MenuIcon,
  // Search as SearchIcon,
  // ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { Link as ReactRouterLink } from 'react-router-dom';

// Styled component for the search bar
// const SearchBar = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: theme.palette.action.hover,
//   '&:hover': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//   },
// }));

const MenuSidebar = () => {
  // State for drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // State for sort menu
  // const [sortMenuAnchor, setSortMenuAnchor] = useState(null);
  // const sortMenuOpen = Boolean(sortMenuAnchor);
  
  // State for current sort option
  // const [sortOption, setSortOption] = useState('Most Recent');
  
  const [results, setResults] = useState([]);
  const [timestamps, setTimeStamps] = useState([]);

  // Handler for opening the drawer
  const handleDrawerToggle = () => {
    getRecentSearches();
    setDrawerOpen(!drawerOpen);
  };
  
  // Handler for sort menu
  // const handleSortMenuOpen = (event: any) => {
  //   setSortMenuAnchor(event.currentTarget);
  // };
  
  // const handleSortMenuClose = () => {
  //   setSortMenuAnchor(null);
  // };
  
  // const handleSortOptionSelect = (option: any) => {
  //   setSortOption(option);
  //   handleSortMenuClose();
  // };

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

        setResults(resultArray as any);
        setTimeStamps(timestampArray as any);
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
          <Box sx={{display: 'flex' ,justifyContent: 'center', mt: 2, fontWeight: 'bold'}} color='secondary.main'>
            Recent search results
          </Box>
          {/* Search Bar
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
          
          <Divider /> */}
          
          {/* Sort Options */}
          {/* <Box sx={{ p: 2 }}>
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
          </Box> */}
          
          {/* <Divider /> */}
          
          {/* Search Results */}
          <List>
            {results.map((result, index) => (

              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Link component={ReactRouterLink} to={`/searchResults/${result}/${timestamps[index]}`} underline='hover' gutterBottom>
                  <ListItemText primary={result} sx={{color: 'white'}}/>
                </Link>
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MenuSidebar;