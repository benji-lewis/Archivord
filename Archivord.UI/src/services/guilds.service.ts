import { httpClient } from "../helpers/api"
import { Channel } from "../interfaces/Channel"
import { GuildPreview } from "../interfaces/GuildPreview"

export const getArchivedGuilds = (): Promise<Array<number>> => {
  return new Promise(resolve => resolve(guildIds))
}

export const getGuildChannels = (guildId: number): Promise<Array<Channel>> => {
  return new Promise((resolve) => {
    resolve([
      {
        id: 624290305918631947,
        name: "general",
      },
      {
        id: 624202254236516393,
        name: "nerd-shit",
      }
    ])
  })
  return httpClient.get(`something:/guilds/${guildId}/channels`)
}

export const getGuildPreview = (guildId: string): Promise<GuildPreview> => {
  return httpClient.get(`https://discord.com/api/guilds/${guildId}/preview`)
}