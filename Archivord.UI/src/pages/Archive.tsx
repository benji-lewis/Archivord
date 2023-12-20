import { useEffect, useState } from "react"
import { getUserGuilds } from "../services/user.service"
import { getArchivedGuilds } from "../services/guilds.service"
import { Guild } from "../interfaces/Guild"
import { GuildSideBar } from "../components/SideBar"
import { canUserManageBots } from "../helpers/permissionsHelper"


export const Archive = () => {

  return (
      <GuildSideBar>
        <p>Testing test 123</p>
      </GuildSideBar>
  )
}