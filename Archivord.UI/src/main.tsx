import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    contrast: { 
      blue: string;
      fuchia: string;
    };
    backgroundColours: { 
      light: string;
      main: string;
      dark: string;
      contrastText: string;
      lighter: string;
    }
  }
  interface ThemeOptions {
    contrast: { };
    backgroundColours: {};
  }
}

const theme = createTheme({
  backgroundColours: {
    light: '#313338',
    main: '#2B2D31',
    dark: '#1E1F22',
    contrastText: '#949BA4',
    lighter: '#404249'
  },
  contrast: {
    blue: '#5865F2',
    fuchia: '#EB459E'
  },
  palette: {
    primary: {
      main: '#2b2d31',
      dark: '#1e1f22',
      light: '#949BA4',
    },
    secondary: {
      main: '#5865F2',
      light: '#404249',
      dark: '#35373C',
    },
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
