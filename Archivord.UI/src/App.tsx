import { ReactElement } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getToken } from './helpers/getToken';
import * as Pages from './pages/index'
import { NavBar } from './components/NavBar';
import { Divider } from '@mui/material';

function App() {
  const ProtectedRoute = ({ element } : {element: ReactElement}) => {
    if (!getToken()) {
      return <Pages.Authorize />
    }
  
    return element;
  };
  
  return (
    <>
      <BrowserRouter>
      <NavBar />
      <Divider sx={{ background: '#26282C' }} />
      <Routes>
        <Route index element={<Pages.Home />} />
        <Route path='authorize' element={<Pages.Authorize />} />
        <Route path='authorized' element={<Pages.Authorized />} />
        <Route path='archive' element={<ProtectedRoute element={<Pages.Archive />} />} />
        <Route path='logout' element={<ProtectedRoute element={<Pages.LogOut />} />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
