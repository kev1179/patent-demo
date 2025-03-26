import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Link
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const LandingPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{bgcolor: '#0A1929'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PatentPartner
          </Typography>
          <Link href="/login"><Button variant='contained'>Login</Button></Link>
          <Link href="/login"><Button color="inherit" variant="outlined" sx={{ ml: 2 }}>Sign Up</Button></Link>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box 
        sx={{ 
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Research Patents 10x Faster
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            PatentPartner uses cutting-edge AI to revolutionize how you search, analyze, and understand patent information.
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

      {/* Video Demo Section */}
      <Box sx={{ py: 6, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom textAlign="center">
            See PatentPartner in Action
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Card elevation={3}>
              <CardMedia
                component="video"
                autoPlay
                loop
                muted
                src="https://www.w3schools.com/tags/movie.mp4"
                sx={{ height: 400 }}
              />
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ mb: 6 }}>
            How We Make Patent Research Better
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <SearchIcon sx={{ fontSize: 60, mb: 2 }} />
                  <Typography gutterBottom variant="h5" component="h3">
                    Smart Search
                  </Typography>
                  <Typography>
                    AI-powered search understands context and meaning, not just keywords, helping you find relevant patents faster.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <SpeedIcon sx={{ fontSize: 60, mb: 2 }} />
                  <Typography gutterBottom variant="h5" component="h3">
                    10x Faster
                  </Typography>
                  <Typography>
                    What used to take hours now takes minutes. Our AI analyzes and summarizes complex patent documents instantly.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <AutoGraphIcon sx={{ fontSize: 60, mb: 2 }} />
                  <Typography gutterBottom variant="h5" component="h3">
                    Insightful Analysis
                  </Typography>
                  <Typography>
                    Gain competitive intelligence with automated analysis of patent landscapes and technology trends.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};

export default LandingPage;