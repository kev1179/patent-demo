import { useEffect, useState } from 'react';
import { 
  Box,
  Container,
} from '@mui/material';
import axios from 'axios';
import SearchNavBar from '../components/SearchNavBar';
import { useParams } from 'react-router-dom';
import Results from '../components/Results';

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
}, [patentid]);

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
          <Results patentid={patentid as string} summary={result} graphNodes={graphNodes} graphEdges={graphEdges}/>
      </Container>
    
    </Box>
  );
};

export default SearchResults;