import {useState} from 'react';
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
import axios from 'axios';
import SearchNavBar from '../components/SearchNavBar';
import Results from '../components/Results';

const SearchPage = () => {
  // For github actions purposes.
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<{summary: string}>();
  // const [definitions, setDefinitions] = useState('');
  const [graphNodes, setGraphNodes] = useState<any>(null);
  const [graphEdges, setGraphEdges] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [patentid, setPatentid] = useState('');

  const cleanPatentCode = (patentCode: string) => {

    const stripLeadingZeros = (patentCode: string) => {
      const regex = /^(\D{2})(0*)(\d+)(\w*)$/;
      const match = patentCode.match(regex);
    
      if (match) {
        const [, countryCode, , serialNumber, kindCode] = match;
        return `${countryCode}${serialNumber}${kindCode}`;
      }
    
      return patentCode;
    }

    let cleanedCode:string = patentCode.replace(/[^a-zA-Z0-9]/g, '');
    cleanedCode = stripLeadingZeros(cleanedCode);
    return cleanedCode;
  }

  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      let cleanedPatentCode = cleanPatentCode(searchTerm);
      setPatentid(cleanedPatentCode);

      // const definitionsResponse = await axios.get(`/api/patents/getDefinitions/${cleanedPatentCode}`);
      const summaryResponse = await axios.get(`/api/patents/getSummary/${cleanedPatentCode}`);
      const graphResponse = await axios.get(`/api/patents/getClaimGraph/${cleanedPatentCode}`);

      // setDefinitions(definitionsResponse.data.definitions);
      setResult(summaryResponse.data);
      setGraphNodes(graphResponse.data.claimList);
      setGraphEdges(graphResponse.data.edgeList);

      const saveResult = await axios.post("/api/patents/saveResult", 
        { response: summaryResponse.data.summary, patentid: cleanedPatentCode},
        { withCredentials: true });
      
        console.log(saveResult.data.message);
    } catch (error) {
      console.log(error);
      setResult({ summary: 'Failed to fetch patent data' });
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
            placeholder="Enter Patent Code... (EX: US20100202986A1)"
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
          <Results patentid={patentid} summary={result.summary} graphNodes={graphNodes} graphEdges={graphEdges}/>
        )}
      </Container>
    
    </Box>
  );
};

export default SearchPage;
