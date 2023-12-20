import { useEffect } from "react"
import { Link, Typography } from "@mui/material"
import { logout } from "../services/auth.service"

export const LogOut = () => {

  useEffect(() => {
    logoutHandler()
  }, [])

  const logoutHandler = () => {
    logout()
  }

  // TODO: Clear state, revoke token, and send user to home page

  return <Typography variant="h4">Redirecting to authorization URL<br />Click <Link onClick={logoutHandler}>here</Link> if you are not directed automatically.</Typography>
}