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
  }
  interface ThemeOptions {
    contrast: { };
  }
}

const theme = createTheme({
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
      main: '#5865f2',
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
