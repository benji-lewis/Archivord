import { Box, Link, Typography } from "@mui/material"

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
      <Typography variant="h4">An archival bot for Discord servers designed to retain as much data as possible to show future generations how we communicated</Typography>
      <Typography variant="h5">This is a work in progress. Please be patient.</Typography>
      <Typography paragraph>Please report any issues on <Link color={"#fffff"} href="https://github.com/benjisoft/Archivord">our GitHub repo</Link>.</Typography>
    </Box>
  )
}