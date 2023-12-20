import { Box, CssBaseline, List, ListItem, styled } from '@mui/material'
import { useEffect, useState } from 'react';
import { Channel } from '../interfaces/Channel';
import { ChannelCard } from './ChannelCard';
import { getGuildChannels } from '../services/guilds.service';

const drawerWidth = 240

const Drawer = styled('div', {})(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  width: drawerWidth,
  height: '100vh'

}));

export const ChannelSideBar = ({ selectedGuild }: { selectedGuild: number | undefined }) => {
  const [channels, setChannels] = useState<Array<Channel>>([])
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null)

  useEffect(() => {
    if (selectedGuild)
      getGuildChannels(selectedGuild).then(res => setChannels(res))
  }, [selectedGuild])
  

  const selectChannel = (id: number) => {
    setSelectedChannel(id)
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
            {channels.map((channel: Channel) => (
              <ListItem key={channel.id} disablePadding>
                <ChannelCard channel={channel} isSelected={selectedChannel ? channel.id === selectedChannel : false} selectFunction={selectChannel} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        {/* TODO: Insert chats here */}
      </Box>
    </>
  );
}