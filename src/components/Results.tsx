import { Box, IconButton, Link, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import GraphComponent from "./GraphComponent";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

type ResultsProps = {
    patentid: string;
    summary: string;
    graphNodes: [{id: number, label: string, info: string}];
    graphEdges: [{from: number, to: number}]
};

const Results: React.FC<ResultsProps> = ({patentid, summary, graphNodes, graphEdges}) =>
{
    const location = useLocation();

    return(
      
        <Box sx={{ bgcolor: '#112240', p: 3, borderRadius: 2, width: '100%', maxWidth: 800, mt: 4, justifyContent: 'center'}}>

          { location.pathname !== "/search" &&
                      <Link component={ReactRouterLink} to="/search">
              <IconButton color='primary' aria-label='Backspace icon'>
                <KeyboardBackspaceIcon/>
              </IconButton>
            </Link>
          }

        <Link href = {`https://patents.google.com/patent/${patentid}`} target="_blank" rel="noopener">
          <Typography variant='h4' textAlign={'center'} color='primary'>{patentid}</Typography>
        </Link>

        {/* <Typography variant="h5" sx={{ mb: 2, color: '#4F83CC' }}>Definitions:</Typography>

        <ReactMarkdown>{definitions}</ReactMarkdown> */}

        <Typography variant="h5" sx={{ mb: 2}} color="secondary">Patent Summary:</Typography>
        
        <ReactMarkdown>{summary}</ReactMarkdown>

        <Typography variant="h5" sx={{ mb: 2}} color="secondary">Claims Visualized:</Typography>
        <GraphComponent nodes={graphNodes} edges={graphEdges} patentid={patentid}></GraphComponent>
      </Box>
    );
}

export default Results;