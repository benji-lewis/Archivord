import { httpClient } from "../helpers/api"
import { Channel } from "../interfaces/Channel"
import { GuildPreview } from "../interfaces/GuildPreview"

export const getArchivedGuilds = (guildIds: Array<number>): Promise<Array<number>> => {
  return new Promise(resolve => resolve(guildIds))
}

export const getGuildChannels = (guildId: string): Promise<Array<Channel>> => {
  return new Promise((resolve) => {
    resolve([
      {
        Id: "624290305918631947",
        Name: "general",
      },
      {
        Id: "624202254236516393",
        Name: "nerd-shit",
      }
    ])
  })
  return httpClient.get(`something:/guilds/${guildId}/channels`)
}

export const getGuildPreview = (guildId: string): Promise<GuildPreview> => {
  return httpClient.get(`https://discord.com/api/guilds/${guildId}/preview`)
}