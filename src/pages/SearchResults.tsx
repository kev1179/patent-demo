import { useEffect, useState } from 'react';
import { 
  Box,
  Container,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import GraphComponent from '../components/GraphComponent';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import SearchNavBar from '../components/SearchNavBar';
import { useParams } from 'react-router-dom';

const SearchResults = () => {
  const {patentid, timestamp} = useParams();
  const [result, setResult] = useState<string>('');
  const [graphNodes, setGraphNodes] = useState<any>(null);
  const [graphEdges, setGraphEdges] = useState<any>(null);

  const getResult = async () => {
    try {
      const summaryResponse = await axios.get(`/api/patents/getSearch/${timestamp}`);
      const graphResponse = await axios.get(`/api/patents/getClaimGraph/${patentid}`);
      
      setResult(summaryResponse.data.searchResult.response);
      setGraphNodes(graphResponse.data.claimList);
      setGraphEdges(graphResponse.data.edgeList);

    } catch (error) {
      setResult('Failed to fetch patent data');
    }

  };

  useEffect(() => {
    getResult();
}, []);

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
          <Box sx={{ bgcolor: '#112240', p: 3, borderRadius: 2, width: '100%', maxWidth: 800, justifyContent: 'center'}}>
            <Link href="/search">
              <IconButton color='primary' aria-label='Backspace icon'>
                <KeyboardBackspaceIcon/>
              </IconButton>
            </Link>

            <Typography variant="h5" sx={{ mb: 2, color: '#4F83CC' }}>Search Result:</Typography>
            {/* <Typography variant="body1" sx={{ color: 'white' }}>{result.summary || result.error}</Typography> */}
            <ReactMarkdown>{result}</ReactMarkdown>

            <Typography variant="h5" sx={{ mb: 2, color: '#4F83CC' }}>Claims Visualized:</Typography>
            <GraphComponent nodes={graphNodes} edges={graphEdges}></GraphComponent>
          </Box>
      </Container>
    
    </Box>
  );
};

export default SearchResults;