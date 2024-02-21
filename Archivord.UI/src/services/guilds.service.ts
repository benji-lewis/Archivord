import { httpClient } from "../helpers/api"
import { Channel } from "../interfaces/Channel"
import { GuildPreview } from "../interfaces/GuildPreview"
import { Message } from "../interfaces/Message"
import { Guild } from "../interfaces/Guild"

export const getArchivedGuilds = (): Promise<Guild> => {
  return httpClient.get(`${window.config.API}/guilds`)
}

export const getGuildChannels = (guildId: string): Promise<Channel> => {
  return httpClient.get(`${window.config.API}/guilds/${guildId}/channels`)
}

export const getGuildPreview = (guildId: string): Promise<GuildPreview> => {
  return httpClient.get(`https://discord.com/api/guilds/${guildId}/preview`)
}

export const getChannelMessages = (guildId: string, channelId: string): Promise<Message> => {
  return httpClient.get(`${window.config.API}/guilds/${guildId}/channels/${channelId}/messages`)
}