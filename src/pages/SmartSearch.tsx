import {useState} from 'react';
import { 
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SearchNavBar from '../components/SearchNavBar';
import AISummaryDialog from '../components/AISummaryDialog';

const SmartSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<[{id:string, description:string}]>();
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {

      const response = await axios.post('/api/patents/patentSearchQuery', {"query": query, "n_results": 10});
      setResults(response.data.result);

    } catch (error) {
      console.log(error);
      setResults([{'id':  'Failure', 'description': 'Something went wrong.'}]);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        color: 'white',
      }}
    >

      <SearchNavBar/>

      <Container 
        component="main" 
        maxWidth="md" 
        sx={{ 
          flexGrow: 1,
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: results ? 'flex-start' : 'center',
          alignItems: 'center',
          py: 8
        }}
      >
        {!results && (
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              background: `linear-gradient(45deg, #4F83CC 30%, #86B9F5 90%)`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SmartPatents
          </Typography>
        )}

        <Box sx={{ width: '100%', maxWidth: 600, position: 'relative', mb: results ? 4 : 7 }}>
          <TextField
            aria-label='Search field'
            fullWidth
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              sx: { 
                bgcolor: "#112240",
                borderRadius: 2,
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#112240',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  opacity: 1,
                },
              }
            }}
            sx={{
              '& .MuiInputBase-input': {
                color: 'white',
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              position: 'absolute',
              right: 8,
              bottom: 8,
              bgcolor: '#2D6CDF',
              '&:hover': {
                bgcolor: '#3D7CEF',
              }
            }}
          >
            Search
          </Button>
        </Box>

        
        {!results &&
          <Alert severity="info">
            Our search engine currently consists of approximately 10,000 granted patents from 2024.
            We are in the process of training our model on more patent data going back to the 1970's. 
            This will be released shortly so stay tuned!
          </Alert>
        }

        {loading && 
        <>
          <CircularProgress sx={{ color: 'white', mt: 4 }} />
          <Typography>Searching...</Typography>
        </>
        }

        {results && (

            // results.map((result) => (
            //   <Box sx={{ bgcolor: '#112240', p: 3, borderRadius: 2, width: '100%', maxWidth: 800, mt: 4, justifyContent: 'center'}}>
            //     <Button variant='text' sx={{fontSize: 20}}>{result.id}</Button>
            //     <Typography>{result.description}</Typography>
            //   </Box>
            // ))

            <AISummaryDialog results={results}/>
        )}
      </Container>
    
    </Box>
  );
};

export default SmartSearch;