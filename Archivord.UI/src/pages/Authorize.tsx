import { useEffect } from "react"
import { Link, Typography } from "@mui/material"

export const Authorize = () => {
  useEffect(() => {
    redirect()
  }, [])

  const redirect = () => window.location.href = window.config.AUTH_URL

  return <Typography variant="h4">Redirecting to authorization URL<br />Click <Link onClick={redirect}>here</Link> if you are not directed automatically.</Typography>
}