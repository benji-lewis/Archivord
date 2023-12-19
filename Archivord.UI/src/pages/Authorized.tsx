import { Typography, Link } from "@mui/material"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export const Authorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setToken().then(() => navigate('/archive'))
  }, [])

  const setToken = async () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    sessionStorage.setItem('token', JSON.stringify(`${tokenType} ${accessToken}`))
  }


  return <Typography variant="h4">Directing to archive<br />Click <Link onClick={() => navigate('archive')}>here</Link> if you are not directed automatically.</Typography>
}