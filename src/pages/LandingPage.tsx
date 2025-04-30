import {
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Logo from "../assets/logo_v1.04.png";

import { Link as ReactRouterLink } from 'react-router-dom';
import FeatureStepper from '../components/FeatureStepper';

const LandingPage = () => {
  return (
    <Container maxWidth= "xl" sx={{ flexGrow: 1, background: "radial-gradient(circle, rgba(0, 150, 255, 0.6) 0%, rgba(0, 0, 0, 0) 70%)"}}>
      {/* Navigation Bar */}
        <Toolbar>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SmartPatents &#129504;
          </Typography> */}
          <Box sx={{flexGrow: 1 }}> 
          <img src={Logo} height="64" width="256"></img>
          </Box>
          <Link component={ReactRouterLink} to="/login"><Button variant='contained'>Login</Button></Link>
          <Link component={ReactRouterLink} to="/signup">
            <Button 
              color="inherit" 
              variant="outlined" 
              sx={{
                ml: 2,
                whiteSpace: 'nowrap',
                maxWidth: { xs: '80px', sm: 'auto' }, // optional: ensures enough space on small screens
              }}>
              Sign Up
            </Button>
          </Link>
        </Toolbar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 8,
          textAlign: 'center',

        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Innovation, productivity and research efficiency 10X faster
          </Typography>

          <Typography variant="h5" color="text.secondary" gutterBottom>
            SmartPatents advanced solutions offers high level intelligence to accelerate your scientific research and workflows by transforming the way you search, analyze and understand patents.
          </Typography>

        </Container>
      </Box>

      <Box sx={{ textAlign: "center", p: 4}} >
      <Typography variant="h4" gutterBottom>
        Product Features
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3, mt: 2 }}>
        
        <FeatureStepper/>

      </Box>
    </Box>

    <Box sx={{ width: "100%",  margin: "auto", padding: 2, borderRadius: '5px'}} >
      <Typography variant="h5" gutterBottom textAlign={"center"}>
        FAQ's
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: 'white'}}/>}>
          <Typography>How much does SmartPatents cost?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Right now, we are giving early adopters exclusive free early access so act fast and join the waiting list!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: 'white'}}/>}>
          <Typography>Does SmartPatents work for international patents?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, SmartPatents works for international patents.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: 'white'}}/>}>
          <Typography>What format do patent codes need to be in?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Our app is designed to handle various ways patent codes are expressed. Just copy and paste the full patent code (include the country code)
            and our app should handle it. Punctuation and spaces are not an issue. We recommend pasting the code as written right below the bar code in the patent document.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>

    </Container>
  );
};

export default LandingPage;