import { Box, CssBaseline, List, ListItem, styled } from '@mui/material'
import { useEffect, useState } from 'react';
import { Channel, ChannelData } from '../interfaces/Channel';
import { ChannelCard } from './ChannelCard';
import * as guildsService from '../services/guilds.service'
import { Message } from '../interfaces/Message';
import { Messages } from './Messages';

const drawerWidth = 240

const Drawer = styled('div', {})(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  width: drawerWidth,
  height: 'calc(100vh - 60px)',
  overflow: 'auto',
}));

export const ChannelSideBar = ({ selectedGuild }: { selectedGuild: string | undefined }) => {
  const [channels, setChannels] = useState<Channel>([])
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message>([])

  useEffect(() => {
    if (selectedGuild)
      guildsService.getGuildChannels(selectedGuild).then(res => setChannels(res))
    setSelectedChannel(null)
    setMessages([])
  }, [selectedGuild])

  useEffect(() => {
    if (selectedChannel && selectedGuild)
      guildsService.getChannelMessages(selectedGuild, selectedChannel).then(res => setMessages(res))
  }, [selectedChannel])


  const selectChannel = (id: string) => {
    setSelectedChannel(id)
  }

  return (
      <Box
        sx={{ 
          display: 'flex',
          width: "100% !important",
          backgroundColor: '#313338' }}
      >
        <CssBaseline />
        <Drawer
        >
          <List>
          {Object.entries(channels).map(([key, value]: [string, ChannelData]) => ( 
            <ListItem key={key} disablePadding>
                <ChannelCard id={key} name={value.name} category={value.topic} isSelected={selectedChannel ? key === selectedChannel : false} selectFunction={selectChannel} />
              </ListItem>
          ))}
          </List>
        </Drawer>
        <Messages messages={messages} />
      </Box>
  )
}
