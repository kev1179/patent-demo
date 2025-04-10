import { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css';
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

type GraphComponentProps = {
    nodes: [{id: number, label: string, info: string}];
    edges: [{from: number, to: number}]
    patentid: string
};

const GraphComponent: React.FC<GraphComponentProps> = ({ nodes, edges, patentid}) => {
    const containerRef: any = useRef(null);
    const [selectedNode, setSelectedNode] = useState<any>(null);

    useEffect(() => {
        // Nodes format: [{ id: number, label: string, info: string }, ...]
        // Edges format: [{ from: number, to: number }, ...]
        const data = { nodes, edges };
        const options = {
            nodes: { 
                shape: 'dot',
                size: 20,
                font: { color: '#ffffff' },
                shadow: true,
            },
            edges: {
                color: '#4A90E2',
                width: 2,
                smooth: true,
                arrows: {
                    to: { enabled: true, scaleFactor: 1 }
                }
            },
            physics: { enabled: true },
            interaction: { hover: true }
        };

        const network = new Network(containerRef.current, data, options);

        network.on("click", (params) => {
            if (params.nodes && params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                const nodeInfo = nodes.find(node => node.id === nodeId);
                setSelectedNode(nodeInfo || null);
            } else {
                setSelectedNode(null);
            }
        });
    }, [nodes, edges]);

    const saveAsImage = () => {
        const container = containerRef.current;
        if (!container) return;
      
        const originalCanvas = container.querySelector('canvas');
        if (!originalCanvas) return;
      
        const width = originalCanvas.width;
        const height = originalCanvas.height;
      
        const newCanvas = document.createElement('canvas');
        newCanvas.width = width;
        newCanvas.height = height;
      
        const ctx:any = newCanvas.getContext('2d');
      
        ctx.fillStyle = '#0A1C2E'; 
        ctx.fillRect(0, 0, width, height);
      
        ctx.drawImage(originalCanvas, 0, 0);
      
        const imageURI = newCanvas.toDataURL('image/png');
      
        const link = document.createElement('a');
        link.href = imageURI;
        link.download = `${patentid}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      

    return (
    <>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button
                variant="text"
                startIcon={<DownloadIcon />}
                onClick={saveAsImage}
                color='secondary'
            >
                Download
            </Button>
        </Box>
            <Box className="flex flex-col items-center gap-4 p-4" sx={{ backgroundColor: '#0A1C2E', color: 'white' }}>
                {selectedNode && (
                    <Card sx={{ backgroundColor: '#1B3A57', border: '1px solid #4A90E2', mb: 1}}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold">
                                {selectedNode.label}
                            </Typography>
                            <Typography>{selectedNode.info}</Typography>
                        </CardContent>
                    </Card>
                )}
                <Box ref={containerRef} sx={{ height: '600px', border: '1px solid #4A90E2', borderRadius: '12px' }} />
            </Box>
    </>
    );
};

export default GraphComponent;