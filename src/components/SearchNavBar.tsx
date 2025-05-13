import { 
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
} from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import SettingsIcon from '@mui/icons-material/Settings';
import MenuSidebar from './MenuSidebar';
import { UserButton } from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router-dom';

const SearchNavBar = () => {

  const location = useLocation();
  
    return(
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        <Box display='flex'>
          <MenuSidebar />
          <Tabs
            value={location.pathname}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ ml: 2 }}
          >
            <Tab label="Search Engine" value="/search" component={Link} to="/search" />
            <Tab label="AI Summaries" value="/summary" component={Link} to="/summary" />
          </Tabs>
        </Box>

        <Box flexGrow={1}>
          <Box display='flex' justifyContent='flex-end' gap={2}>
            <UserButton />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
    );
}

export default SearchNavBar;