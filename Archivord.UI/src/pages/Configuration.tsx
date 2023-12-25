import React, { useEffect, useState } from "react"
import { GuildSideBar } from "../components/GuildSideBar"
import { Box, Switch, Typography, styled } from "@mui/material"
import * as guildsService from '../services/guilds.service'
import { Channel } from "../interfaces/admin/Channel"
import { ChannelTable } from "../components/config/ChannelTable"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Guild } from "../interfaces/Guild"
import { EditChannelModal } from "../components/config/EditChannelModal"

const StyledBox = styled(Box)(({ theme }) => ({
  alignItems: 'center ',
  textAlign: 'center',
  width: '100%',
  color: theme.palette.primary.light,
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  paddingTop: theme.spacing(5)
}))

const channelData = [
  {
    id: '12309820318lkj',
    name: 'General',
    category: 'General',
    archived: true,
    public: true,
  },
  {
    id: '123908098yhojskdf',
    name: 'Nerd Shit',
    category: 'General',
    archived: true,
    public: false,
  },
  {
    id: '98402938402938520935',
    name: 'Games',
    category: 'General',
    archived: false,
    public: false,
  }
]

export const Configuration = ({ }) => {
  const [selectedGuild, setSelectedGuild] = useState<string>()
  const [channels, setChannels] = useState<Array<Channel>>(channelData)
  const [userGuilds, setUserGuilds] = useState<Guild>([])
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)

  useEffect(() => {
    // if (selectedGuild)
    //   guildsService.getGuildChannels(selectedGuild).then(res => setChannels(res))
  }, [selectedGuild])


  useEffect(() => {
    guildsService.getArchivedGuilds().then(res => {
      setUserGuilds(res)
    })
  }, [])

  useEffect(() => {
    if (userGuilds) setSelectedGuild(Object.keys(userGuilds)[0])
  }, [userGuilds])

  return (
    <>
      <GuildSideBar userGuilds={userGuilds} selectedGuild={selectedGuild} setSelectedGuild={setSelectedGuild}>
        <StyledBox
        >
          <Grid2 container spacing={2}>
            <Grid2 xs={8}>
              <Typography>Currently Archived</Typography>
            </Grid2>
            <Grid2 xs={4}>
              <Switch color="secondary" />
            </Grid2>
            <Grid2 xs={12}>
              <ChannelTable channels={channels} setSelectedChannel={setSelectedChannel} />
            </Grid2>
          </Grid2>
        </StyledBox>
      </GuildSideBar>
      {selectedChannel !== null &&
        <EditChannelModal channel={selectedChannel} saveFunction={() => setSelectedChannel(null)} cancelFunction={() => setSelectedChannel(null)} />
      }
    </>
  )
}