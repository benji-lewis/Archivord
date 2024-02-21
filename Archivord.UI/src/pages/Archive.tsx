import { useEffect, useState } from "react"
import { GuildSideBar } from "../components/GuildSideBar"
import { ChannelSideBar } from "../components/ChannelSideBar"
import * as guildsService from '../services/guilds.service'
import { Guild } from "../interfaces/Guild"

export const Archive = () => {
  const [selectedGuild, setSelectedGuild] = useState<string>()
  const [userGuilds, setUserGuilds] = useState<Guild>([])

  useEffect(() => {
    guildsService.getArchivedGuilds().then(res => {
      setUserGuilds(res)
    })
  }, [])

  useEffect(() => {
    if (userGuilds) setSelectedGuild(Object.keys(userGuilds)[0])
  }, [userGuilds])

  return (
      <GuildSideBar userGuilds={userGuilds} selectedGuild={selectedGuild} setSelectedGuild={setSelectedGuild}>
        <ChannelSideBar selectedGuild={selectedGuild} />
      </GuildSideBar>
  )
}