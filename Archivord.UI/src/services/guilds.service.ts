import { httpClient } from "../helpers/api"
import { apiUrl } from "../helpers/secretHelper"
import { Channel } from "../interfaces/Channel"
import { GuildPreview } from "../interfaces/GuildPreview"
import { Message } from "../interfaces/Message"
import { Guild } from "../interfaces/Guild"

export const getArchivedGuilds = (): Promise<Guild> => {
  return httpClient.get(`${apiUrl}/guilds`)
}

export const getGuildChannels = (guildId: string): Promise<Channel> => {
  return httpClient.get(`${apiUrl}/guilds/${guildId}/channels`)
}

export const getGuildPreview = (guildId: string): Promise<GuildPreview> => {
  return httpClient.get(`https://discord.com/api/guilds/${guildId}/preview`)
}

export const getChannelMessages = (guildId: string, channelId: string): Promise<Message> => {
  return httpClient.get(`${apiUrl}/guilds/${guildId}/channels/${channelId}/messages`)
}