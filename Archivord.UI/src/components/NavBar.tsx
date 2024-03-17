import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  MenuItem,
} from "@mui/material"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUiColour } from "../helpers/colourHelper";
import { getAcronym } from "../helpers/stringHelper";

export const NavBar = () => {
  const pages = [
    {
      title: "Archive",
      route: "/archive"
    },
    {
      title: "Configuration",
      route: "/config",
    }
  ]

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const location = useLocation()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutPress = () => {
    navigate('/logout')
  }

  const handleLoginPress = () => {
    navigate('/authorize')
  }

  const homeButtonClickHandler = () => {
    navigate('/', { state: { ...location.state } })
  }

  const getAccountImage = () => {
    if (!location.state?.id)
      return <AccountCircleIcon />

    if (!location.state?.avatar)
      return <Avatar sx={{ bgcolor: getUiColour() }}>{getAcronym(location.state?.global_name || location.state?.username)}</Avatar>

    return location.state.avatar.startsWith('a_')
      ? <Avatar alt={location.state?.username} src={`https://cdn.discordapp.com/avatars/${location.state.id}/${location.state.avatar}.gif`} />
      : <Avatar alt={location.state?.username} src={`https://cdn.discordapp.com/avatars/${location.state.id}/${location.state.avatar}.png`} />
  }

  return (
    <AppBar position="static" sx={{ height: '60px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={homeButtonClickHandler}
            href="#app-bar-with-responsive-menu"
            sx={{
              fontWeight: 700,
              color: 'inherit',
            }}
          >
            Archivord
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => { navigate(page.route, { state: { ...location.state } }) }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {getAccountImage()}
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!location.state?.id
                ? <MenuItem key={'logout'} onClick={handleLoginPress}><Typography textAlign="center" >Login</Typography></MenuItem>
                : <MenuItem key={'logout'} onClick={handleLogoutPress}><Typography textAlign="center" >Logout</Typography></MenuItem>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
