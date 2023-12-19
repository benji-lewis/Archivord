import { Typography, Link } from "@mui/material"
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUsername } from "../services/user.service";



export const Authorized = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setToken().then(() => getUserDetails())
  }, [])

  const setToken = async () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    sessionStorage.setItem('token', JSON.stringify(`${tokenType} ${accessToken}`))
  }

  const getUserDetails = () => {
    getUsername()
    .then(res => {
      console.log('getusername', res)
      navigate('/archive', { state: { 
        ...location.state,
        id: res.id,
        username: res.username,
        global_name: res.global_name,
        avatar: res.avatar,
        } })
    })
  }

  return <Typography variant="h4">Directing to archive<br />Click <Link onClick={() => navigate('archive')}>here</Link> if you are not directed automatically.</Typography>
}