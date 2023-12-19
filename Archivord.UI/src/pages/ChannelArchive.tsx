import { useLocation } from "react-router-dom"

export const ChannelArchive = ({ }) => {
  const location = useLocation()
  const { guildId, channelId, guildName } = location.state
  return <p>ChannelArchive</p>
}