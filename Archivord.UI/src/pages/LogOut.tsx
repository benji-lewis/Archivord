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
    // navigate('/', { state: {} })
  }

  // TODO: Clear state, revoke token, and send user to home page

  return <Typography variant="h4">Redirecting to authorization URL<br />Click <Link onClick={logoutHandler}>here</Link> if you are not directed automatically.</Typography>
}