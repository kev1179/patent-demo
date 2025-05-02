import {
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Logo from "../assets/logo_v1.04.png";

import { Link as ReactRouterLink } from 'react-router-dom';

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


      <Box sx={{ textAlign: "center", p: 4 }} >
 

      <Typography variant="h4" gutterBottom>
 

        Product Features
 

      </Typography>
 


 

      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", gap: 3, mt: 2, alignItems: 'center'}}>
        {/* Feature 1 */}
        <Card sx={{ maxWidth: 800, boxShadow: 3, "&:hover": 
          {
            transform: "scale(1.05)",
            boxShadow: 6,
            cursor: 'pointer'
          },}}>
          <CardContent>

            <Typography variant="h6" gutterBottom>
              Patent Summaries
            </Typography>
 
            <Typography variant="body2" color="text.secondary">
            SmartPatents offers unique AI-driven patent summaries that go beyond generic AI solutions and are custom-designed to help your scientists understand 
            the scientific content of any patent immediately, without spending hours. This saves them significant research time and energy, enhancing patent-driven ideation 
            and research efficiency in your company. 
            All you have to do is copy and paste the patent number, and SmartPatents takes care of the rest.
            </Typography>
          </CardContent>
        </Card>

        {/* Feature 2 */}
        <Card sx={{ maxWidth: 800, boxShadow: 3 , "&:hover": 
          {
            transform: "scale(1.05)",
            boxShadow: 6,
            cursor: 'pointer'
          }}}>

          <CardContent>
            <Typography variant="h6" gutterBottom>
              Claim Visualization
            </Typography>

            <Typography variant="body2" color="text.secondary">
            SmartPatents' novel feature for claims visualization is an intelligent tool that categorizes claims in a patent, 
            helping your scientists focus their attention on the most important claims first. This feature is especially useful when your scientists need to screen 
            a large number of patents in a short amount of time, accelerating your patent application processes.
            </Typography>

            <Box
              component="img"
              src="graph.png"
              alt="Graph"
              sx={{
                mt: 2,
                width: { xs: 240, sm: 'auto' },
                height: { xs: 240, sm: 'auto' },
                maxWidth: '100%', // prevent overflow on small screens
                objectFit: 'contain', // keeps aspect ratio nicely
              }}
            />
          
          </CardContent>

          {/* <CardMedia
            component="img"
            height="140"
            image="dependency_graph.png"
            alt="Feature 2 Image"
          /> */}

        </Card>

        {/* Feature 3 */}
        <Card sx={{ maxWidth: 800, boxShadow: 3 , "&:hover": 
          {
            transform: "scale(1.05)",
            boxShadow: 6,
            cursor: 'pointer'
          }}}>

          <CardContent>
            <Typography variant="h6" gutterBottom>
              Examples Comparison
            </Typography>

            <Typography variant="body2" color="text.secondary">
            SmartPatents introduces the Patent Science Decoder, a novel and interactive tool that brings intelligence to the way your 
            scientists interact with coded information in patents. The Science Decoder intelligently delivers 
            the information your scientists need while reading and writing patents—eliminating the need to switch between multiple search tools 
            and scattered information sources.
            </Typography>
          </CardContent>
        </Card>
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