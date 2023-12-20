import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
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
