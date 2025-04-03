import {
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LandingPage = () => {
  return (
    <Container maxWidth= "xl" sx={{ flexGrow: 1, background: "radial-gradient(circle, rgba(0, 150, 255, 0.6) 0%, rgba(0, 0, 0, 0) 70%)"}}>
      {/* Navigation Bar */}
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SmartPatents &#129504;
          </Typography>
          <Link href="/login"><Button variant='contained'>Login</Button></Link>
          <Link href="/login"><Button color="inherit" variant="outlined" sx={{ ml: 2 }}>Sign Up</Button></Link>
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
            Research Patents 10x Faster
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            SmartPatents uses cutting-edge AI to revolutionize how you search, analyze, and understand patent information.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              Book a Demo
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ textAlign: "center", p: 4 , mt: 12}} >
      <Typography variant="h4" gutterBottom>
        Product Features
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3, mt: 2 }}>
        
        {/* Feature 1 */}
        <Card sx={{ width: 300, boxShadow: 3, "&:hover": 
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
              SmartPatents features an AI tool that will provide a summary tailored to your needs. SmartPatents is specifically designed for research scientists
              in STEM fields. Our summaries go into far more detail than generic AI summaries. All you have to do is copy and paste the code and SmartPatents takes
              care of the rest.
            </Typography>
          </CardContent>

        </Card>

        {/* Feature 2 */}
        <Card sx={{ width: 300, boxShadow: 3 , "&:hover": 
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
              We provide a graph that helps you keep track of which claims depend on one another.
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="140"
            image="dependency_graph.png"
            alt="Feature 2 Image"
          />
        </Card>

        {/* Feature 3 */}
        <Card sx={{ width: 300, boxShadow: 3 , "&:hover": 
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
              SmartPatents uses AI to analyze and compare examples within a patent.
              We provide you with a table that neatly organizes all of the example sections
              within the patents, saving you time and energy.
            </Typography>
          </CardContent>
        </Card>

      </Box>
    </Box>

    <Box sx={{ width: "100%",  margin: "auto", padding: 2, mt: 12, borderRadius: '5px'}} >
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