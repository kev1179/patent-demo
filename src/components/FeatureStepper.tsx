import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import graph from "../assets/dependency_graph.png";

const steps = [
  {
    label: 'Patent Summaries',
    description: `SmartPatents features an AI tool that will provide a summary tailored to your needs. 
    SmartPatents is specifically designed for research scientists in STEM fields. 
    Our summaries go into far more detail than generic AI summaries. 
    All you have to do is copy and paste the code and SmartPatents takes care of the rest.`,
  },
  {
    label: 'Claim Visualization',
    description: 'We provide a chart that helps you keep track of which claims depend on one another.',
    // image: graph
  },
  {
    label: 'Examples Comparison',
    description: `SmartPatents uses AI to analyze and compare examples within a patent. 
    We provide you with a table that neatly organizes all of the example sections within the patents, saving you time and energy.`,
  },
];

export default function FeatureStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1}} bgcolor="primary.main">
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background',
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
        {steps[activeStep].description}
        {/* {
            steps[activeStep].image &&

            <img src = {steps[activeStep].image} width="150" height="150" alt='Claim Graph' style={{borderRadius: '50%'}}></img>
        } */}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}