import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontWeightBold: 700, // Ensure this property exists
  },
  palette: {
    primary: {
      main: '#406FFE',
    },
    secondary: {
        main: '#ff9900'
    },
    info: {
        main: '#b6d7a8'
    }
    
  },
});

export default theme;