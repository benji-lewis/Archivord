import { httpClient } from "../helpers/api"
import { Guild } from "../interfaces/Guild"

export const getUsername = () => {
  return httpClient.get('https://discord.com/api/users/@me')
}

export const getUserGuilds = (): Promise<Array<Guild>> => {
  return httpClient.get('https://discord.com/api/users/@me/guilds')
}