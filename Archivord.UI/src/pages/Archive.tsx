import { useState } from "react"
import { GuildSideBar } from "../components/GuildSideBar"
import { ChannelSideBar } from "../components/ChannelSideBar"

export const Archive = () => {
  const [selectedGuild, setSelectedGuild] = useState<string>()

  return (
      <GuildSideBar selectedGuild={selectedGuild} setSelectedGuild={setSelectedGuild}>
        <ChannelSideBar selectedGuild={selectedGuild} />
      </GuildSideBar>
  )
}