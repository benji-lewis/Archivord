import { Box, CssBaseline, List, ListItem, styled } from '@mui/material'
import { ServerCard } from './ServerCard';
import { useEffect, useState } from 'react';
import { getArchivedGuilds } from '../services/guilds.service';
import { GuildData, Guild } from '../interfaces/Guild';

const drawerWidth = 240

const Drawer = styled('div', {})(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  width: drawerWidth,
  height: '100vh'

}));

export const GuildSideBar = ({ selectedGuild, setSelectedGuild, children }: { selectedGuild: string | undefined, setSelectedGuild: Function, children: any }) => {
  const [userGuilds, setUserGuilds] = useState<Guild>([])

  useEffect(() => {
    getArchivedGuilds().then(res => {
      setUserGuilds(res)
    })
  }, [])

  useEffect(() => {
    if (userGuilds) setSelectedGuild(Object.keys(userGuilds)[0])
  }, [userGuilds])

  const selectGuild = (id: number) => {
    setSelectedGuild(id)
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', backgroundColor: '#313338' }}
      >
        <CssBaseline />
        <Drawer
        >
          <List>
            {Object.entries(userGuilds).map(([key, value] : [string, GuildData]) => (
              <ListItem key={key} disablePadding>
                <ServerCard id={key} name={value.name} icon={value.icon} isSelected={key == selectedGuild} selectFunction={selectGuild} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        {children}
      </Box>
    </>
  );
}
