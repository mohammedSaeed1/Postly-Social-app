import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#6b7280'
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff'    
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280' 
    }
  },
});