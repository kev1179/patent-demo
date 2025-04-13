import { Box, Typography, Link } from '@mui/material';
import { Link as ReactRouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', padding: "16px", textAlign: "center"}}>
      <Typography variant="body2" color="#4F83CC">
        <Link component={ReactRouterLink} to="/privacy" color="inherit" underline="hover">Privacy Policy</Link> | 
        <Link component={ReactRouterLink} to="/terms" color="inherit" underline="hover"> Terms of Use</Link>
      </Typography>
      <Typography variant="body2" color="#FFFFFF">
        &copy; {new Date().getFullYear()} SmartPatents. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
