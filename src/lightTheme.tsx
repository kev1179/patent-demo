import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#4F83CC', // Lighter blue for primary
    },
    secondary: {
      main: '#86B9F5', // Softer blue for accents
    },
    background: {
      default: '#F5F7FA', // Light gray background
      paper: '#FFFFFF', // White paper elements
    },
    text: {
      primary: '#0A1929', // Dark text for readability
      secondary: '#4F83CC', // Subtle blue for secondary text
    },
  },
  typography: {
    h2: {
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #4F83CC 30%, #86B9F5 90%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            color: '#0A1929',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#86B9F5',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4F83CC',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#2D6CDF',
            },
            '& input::placeholder': {
              color: 'rgba(10, 25, 41, 0.7)',
              opacity: 1,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export default lightTheme;

