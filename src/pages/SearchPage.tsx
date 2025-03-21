import React, { useEffect, useState } from 'react';
import { 
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GraphComponent from '../components/GraphComponent';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import SearchNavBar from '../components/SearchNavBar';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [graphNodes, setGraphNodes] = useState(null);
  const [graphEdges, setGraphEdges] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const summaryResponse = await axios.get(`/api/patents/getSummary/${searchTerm}`);
      const graphResponse = await axios.get(`/api/patents/getClaimGraph/${searchTerm}`);

      setResult(summaryResponse.data);
      setGraphNodes(graphResponse.data.claimList);
      setGraphEdges(graphResponse.data.edgeList);

      const saveResult = await axios.post("/api/patents/saveResult", 
        { response: summaryResponse.data.summary, patentid: searchTerm},
        { withCredentials: true });

    } catch (error) {
      console.log(error);
      setResult({ error: 'Failed to fetch patent data' });
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
          justifyContent: result ? 'flex-start' : 'center',
          alignItems: 'center',
          py: 8
        }}
      >
        {!result && (
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

        <Box sx={{ width: '100%', maxWidth: 600, position: 'relative', mb: result ? 4 : 7 }}>
          <TextField
            fullWidth
            placeholder="Enter Patent Code..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

        {loading && 
        <>
          <CircularProgress sx={{ color: 'white', mt: 4 }} />
          <Typography>Writing...</Typography>
        </>
        }

        {result && (
          <Box sx={{ bgcolor: '#112240', p: 3, borderRadius: 2, width: '100%', maxWidth: 800, mt: 4, justifyContent: 'center'}}>
            <Typography variant="h5" sx={{ mb: 2, color: '#4F83CC' }}>Search Result:</Typography>
            {/* <Typography variant="body1" sx={{ color: 'white' }}>{result.summary || result.error}</Typography> */}
            <ReactMarkdown>{result.summary || result.error}</ReactMarkdown>

            <Typography variant="h5" sx={{ mb: 2, color: '#4F83CC' }}>Claims Visualized:</Typography>
            <GraphComponent nodes={graphNodes} edges={graphEdges}></GraphComponent>
          </Box>
        )}
      </Container>
    
    </Box>
  );
};

export default SearchPage;
