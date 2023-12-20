import { Box, CssBaseline, List, ListItem, styled } from '@mui/material'
import { useEffect, useState } from 'react';
import { Channel } from '../interfaces/Channel';
import { ChannelCard } from './ChannelCard';
import * as guildsService from '../services/guilds.service'
import { Message } from '../interfaces/Message';

const drawerWidth = 240

const Drawer = styled('div', {})(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  width: drawerWidth,
  height: '100vh'

}));

export const ChannelSideBar = ({ selectedGuild }: { selectedGuild: string | undefined }) => {
  const [channels, setChannels] = useState<Channel>([])
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [messages, setMessages] = useState<Array<Message>>([])

  useEffect(() => {
    if (selectedGuild)
      guildsService.getGuildChannels(selectedGuild).then(res => setChannels(res))
  }, [selectedGuild])

  useEffect(() => {
    if (selectedChannel && selectedGuild)
      guildsService.getChannelMessages(selectedGuild, selectedChannel).then(res => setMessages(res))
  }, [])
  

  const selectChannel = (id: string) => {
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
          {Object.entries(channels).map(([key, value]) => ( 
            <ListItem key={key} disablePadding>
                <ChannelCard id={key} name={value.name} category={value.topic} isSelected={selectedChannel ? key === selectedChannel : false} selectFunction={selectChannel} />
              </ListItem>
          ))}
          </List>
        </Drawer>
        {/* TODO: Insert chats here */}
      </Box>
    </>
  );
}