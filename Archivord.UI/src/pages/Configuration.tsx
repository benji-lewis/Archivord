import { useEffect, useState } from "react"
import { GuildSideBar } from "../components/GuildSideBar"
import { Box, CssBaseline, Drawer, List, ListItem, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Tooltip, styled } from "@mui/material"
import * as guildsService from '../services/guilds.service'
import { Channel } from "../interfaces/Channel"
import InfoIcon from '@mui/icons-material/Info';
import { ChannelTable } from "../components/config/ChannelTable"

const StyledBox = styled(Box)(({ theme }) => ({
  alignItems: 'center ',
  textAlign: 'center',
  width: '100%',
  color: theme.palette.primary.light,
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  paddingTop: theme.spacing(5)
}))
const StyledPaper = styled(Paper)(({ theme }) => ({
  color: theme.palette.primary.light + '!important',
  backgroundColor: theme.palette.primary.main
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.light
}))

const channelsData = [
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
  const [channels, setChannels] = useState<Channel>()

  useEffect(() => {
    if (selectedGuild)
      guildsService.getGuildChannels(selectedGuild).then(res => setChannels(res))
  }, [selectedGuild])

  return (
    <GuildSideBar selectedGuild={selectedGuild} setSelectedGuild={setSelectedGuild}>
      <StyledBox
      >
        <ChannelTable channels={channelsData} />
      </StyledBox>
    </GuildSideBar>
  )
}