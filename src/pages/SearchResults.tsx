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

            <Link href = {`https://patents.google.com/patent/${patentid}`} target="_blank" rel="noopener">
              <Typography variant='h4' textAlign={'center'} color='primary'>{patentid}</Typography>
            </Link>

            <Typography variant="h5" sx={{ mb: 2}} color='secondary'>Search Result:</Typography>
            <ReactMarkdown>{result}</ReactMarkdown>

            <Typography variant="h5" sx={{ mb: 2}} color='secondary'>Claims Visualized:</Typography>
            <GraphComponent nodes={graphNodes} edges={graphEdges} patentid={patentid as string}></GraphComponent>
          </Box>
      </Container>
    
    </Box>
  );
};

export default SearchResults;