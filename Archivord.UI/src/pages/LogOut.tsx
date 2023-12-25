import { useEffect } from "react"
import { Link, Typography } from "@mui/material"
import { logout } from "../services/auth.service"
import { useNavigate } from "react-router"

export const LogOut = () => {
  const navigate = useNavigate()

  useEffect(() => {
    logoutHandler()
  }, [])

  const logoutHandler = () => {
    logout()
    sessionStorage.removeItem('token')
    navigate('/', { state: {  } })
  }

  return <Typography variant="h4">Redirecting to authorization URL<br />Click <Link onClick={logoutHandler}>here</Link> if you are not directed automatically.</Typography>
}