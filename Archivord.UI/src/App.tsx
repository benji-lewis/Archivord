import { ReactElement } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getToken } from './helpers/getToken';
import * as Pages from './pages/index'

function App() {
  const ProtectedRoute = ({ element } : {element: ReactElement}) => {
    if (!getToken()) {
      return <Pages.Authorize />
    }
  
    return element;
  };
  
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Pages.Home />} />
      <Route path='authorize' element={<Pages.Authorize />} />
      <Route path='authorized' element={<Pages.Authorized />} />
      <Route path='archive' element={<ProtectedRoute element={<Pages.Archive />} />} />
      <Route path='archive/:guildId' element={<ProtectedRoute element={<Pages.GuildArchive />} />} />
      <Route path='archive/:guildId/:channelId' element={<ProtectedRoute element={<Pages.ChannelArchive />} />} />
    </Routes>
    </BrowserRouter>
  )
}


export default App
