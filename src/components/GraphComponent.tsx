import React, { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css';
import { Card, CardContent, Typography, Box } from "@mui/material";

const GraphComponent = ({ nodes, edges }) => {
    const containerRef = useRef(null);
    const [selectedNode, setSelectedNode] = useState(null);

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

    return (
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
    );
};

export default GraphComponent;