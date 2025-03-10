import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D6CDF',
    },
    secondary: {
      main: '#4F83CC',
    },
    background: {
      default: '#0A1929',
      paper: '#112240',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#86B9F5',
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
            backgroundColor: '#112240',
            borderRadius: 8,
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
            '& input::placeholder': {
              color: 'rgba(255, 255, 255, 0.7)',
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

export default theme;