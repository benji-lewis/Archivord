import { Box, Typography } from "@mui/material"

export const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        padding: '5%',
        textAlign: 'center'
      }}
    >
      <Typography variant="h1">Archivord</Typography>
      <Typography variant="h4">An archival bot for Discord servers designed to retain as much data as possible to show future generations how we communicated</Typography>
    </Box>
  )
}