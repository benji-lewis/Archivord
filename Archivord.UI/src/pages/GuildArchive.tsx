import { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import * as guildService from "../services/guilds.service"
import { Channel } from "../interfaces/Channel"
import { ChannelCard } from "../components/ChannelCard"

export const GuildArchive = ({ }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { guildId, guildName} = location.state
  const [guildPreview, setGuildPreview] = useState({})
  const [guildChannels, setGuildChannels] = useState(new Array<Channel>)

  useEffect(() => {
    // guildService.getGuildPreview(guildId).then(res => setGuildPreview(res))
  }, [])

  useEffect(() => {
    guildService.getGuildChannels(guildId).then(res => setGuildChannels(res))
  }, [])

  console.log(guildPreview)
  return <>
    <Typography variant="h1">{`${guildName} Archive`}</Typography>
    {/* {username && <Typography variant="h2">{`Welcome ${username}!`}</Typography>} */}
    {guildChannels.map(channel => <ChannelCard guildId={guildId} channelData={channel} />)}
  </>
}