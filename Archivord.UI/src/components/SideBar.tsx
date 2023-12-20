import { Box, CssBaseline, Toolbar, List, ListItem, styled } from '@mui/material'
import { ServerCard } from './ServerCard';
import { Guild } from '../interfaces/Guild';
import { useEffect, useState } from 'react';
import { getUserGuilds } from '../services/user.service';
import { getArchivedGuilds } from '../services/guilds.service';
import { canUserManageBots } from '../helpers/permissionsHelper';

const Drawer = styled('div', {})(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
}));

export const GuildSideBar = ({ children }: { children: any }) => {
  const drawerWidth = 240
  const [userGuilds, setUserGuilds] = useState<Array<Guild>>([])
  const [selectedGuild, setSelectedGuild] = useState<number>()


  useEffect(() => {
    if (!userGuilds || userGuilds.length == 0)
      getUserGuilds()
        .then(res =>
          getArchivedGuilds(res.filter(item => canUserManageBots(item.permissions.toString())).map(x => x.id))
            .then(returnValue => 
              setUserGuilds(res.filter(x => returnValue.includes(x['id'])))
            )
        )
  }, [])

  useEffect(() => {
    if (userGuilds) setSelectedGuild(userGuilds[0]?.id)
  }, [userGuilds])

  const selectGuild = (id: number) => {
    setSelectedGuild(id)
  }
  

  return (
    <>
      <Box
        sx={{ display: 'flex' }}
      >
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <List>
            {userGuilds.map((guild: Guild) => (
              <ListItem key={guild.name} disablePadding>
                <ServerCard server={guild} isSelected={guild.id == selectedGuild} selectFunction={selectGuild} />
              </ListItem>
            ))}
          </List>
        </Drawer>

          {children}
      </Box>
    </>
  );
}