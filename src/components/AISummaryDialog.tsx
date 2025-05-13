import { useEffect, useState } from 'react';
import { Box, Button, Typography, Dialog, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import axios from 'axios';
import Results from './Results';

type AISummaryProps = {
  results: [{id:string, description:string}];
};

const AISummaryDialog:React.FC<AISummaryProps> = ({ results }) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const [summary, setSummary] = useState('');
  const [graphNodes, setGraphNodes] = useState<any>(null);
  const [graphEdges, setGraphEdges] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = async (id: any) => {
    setSelectedId(id);
    setOpen(true);

    setLoading(true);
    setSummary('');
    setGraphNodes(null);
    setGraphEdges(null);

    try
    {
      const summaryResponse = await axios.get(`/api/patents/getSummary/${id}`);
      const graphResponse = await axios.get(`/api/patents/getClaimGraph/${id}`);
      
      setSummary(summaryResponse.data.summary);
      setGraphNodes(graphResponse.data.claimList);
      setGraphEdges(graphResponse.data.edgeList);

      const saveResult = await axios.post("/api/patents/saveResult", 
        { response: summaryResponse.data.summary, patentid: id},
        { withCredentials: true });
      
      console.log(saveResult.data.message);
    }

    catch(error)
    {
      setSummary('Oops! Something went wrong. Please report this bug to the SmartPatents team and we\'ll get on it!');
    }

    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId('');
  };

  useEffect(() => {

  }, []);

  return (
    <>
      {results && results.map((result) => (
        <Box
          key={result.id}
          sx={{
            bgcolor: '#112240',
            p: 3,
            borderRadius: 2,
            width: '100%',
            maxWidth: 800,
            mt: 4,
            justifyContent: 'center',
          }}
        >
          <Button variant="text" sx={{ fontSize: 20 }} onClick={() => handleOpen(result.id)}>
            {result.id}
          </Button>
          <Typography>{result.description}</Typography>
        </Box>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>

        {loading ?
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <CircularProgress sx={{ color: 'white' }} />
            <Typography sx={{ color: 'white', mt: 2 }}>Summarizing &#10024;</Typography>
          </Box>

        :
          <Results patentid={selectedId} summary={summary} graphNodes={graphNodes} graphEdges={graphEdges}/>
        }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AISummaryDialog;
