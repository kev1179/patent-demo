import { 
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import SettingsIcon from '@mui/icons-material/Settings';
import MenuSidebar from './MenuSidebar';
import { UserButton } from '@clerk/clerk-react';

const SearchNavBar = () => {

    return(
      <>
      <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
      <MenuSidebar/>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <UserButton/>
      </Toolbar>
    </AppBar>
      </>
    );
}

export default SearchNavBar;