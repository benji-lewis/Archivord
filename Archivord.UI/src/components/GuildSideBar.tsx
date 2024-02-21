import { Box, CssBaseline, List, ListItem, styled } from '@mui/material'
import { ServerCard } from './ServerCard';
import { GuildData, Guild } from '../interfaces/Guild';
import { ReactElement } from 'react';

const drawerWidth = 240

const Drawer = styled('div', {})(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  width: drawerWidth,
  height: '100vh'

}));

interface GuildSideBar {
  userGuilds: Guild;
  selectedGuild: string | undefined;
  setSelectedGuild: Function;
  children: ReactElement;
}

export const GuildSideBar = ({ userGuilds, selectedGuild, setSelectedGuild, children }: GuildSideBar ) => {
  const selectGuild = (id: number) => {
    setSelectedGuild(id)
  }

  return (
      <Box
        sx={{ display: 'flex', backgroundColor: '#313338' }}
      >
        <CssBaseline />
        <Drawer
        >
          <List>
            {Object.entries(userGuilds).map(([key, value] : [string, GuildData]) => (
              <ListItem key={key} disablePadding>
                <ServerCard id={key} name={value.guildName} icon={value.icon} isSelected={key == selectedGuild} selectFunction={selectGuild} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        {children}
      </Box>
  )
}
