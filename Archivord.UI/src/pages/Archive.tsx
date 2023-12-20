import { useEffect, useState } from "react"
import { getUserGuilds } from "../services/user.service"
import { getArchivedGuilds } from "../services/guilds.service"
import { Guild } from "../interfaces/Guild"
import { GuildSideBar } from "../components/GuildSideBar"
import { canUserManageBots } from "../helpers/permissionsHelper"
import { ChannelSideBar } from "../components/ChannelSideBar"


export const Archive = () => {
  const [selectedGuild, setSelectedGuild] = useState<number>()

  return (
      <GuildSideBar selectedGuild={selectedGuild} setSelectedGuild={setSelectedGuild}>
        <ChannelSideBar selectedGuild={selectedGuild} />
      </GuildSideBar>
  )
}