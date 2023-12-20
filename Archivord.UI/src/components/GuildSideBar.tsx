import { Box, CssBaseline, List, ListItem, styled } from '@mui/material'
import { ServerCard } from './ServerCard';
import { Guild } from '../interfaces/Guild';
import { useEffect, useState } from 'react';
import { getUserGuilds } from '../services/user.service';
import { getArchivedGuilds } from '../services/guilds.service';
import { canUserManageBots } from '../helpers/permissionsHelper';

const drawerWidth = 240

const Drawer = styled('div', {})(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  width: drawerWidth,
  height: '100vh'

}));

export const GuildSideBar = ({ selectedGuild, setSelectedGuild, children }: { selectedGuild: number | undefined, setSelectedGuild: Function, children: any }) => {
  const [userGuilds, setUserGuilds] = useState<Array<Guild>>([])

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
        sx={{ display: 'flex', backgroundColor: '#313338' }}
      >
        <CssBaseline />
        <Drawer
        >
          <List>
            {userGuilds.map((guild: Guild) => (
              <ListItem key={guild.id} disablePadding>
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