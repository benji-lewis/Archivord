import { httpClient } from "../helpers/api"
import { Guild } from "../interfaces/Guild"
import { User } from "../interfaces/User"

export const getUsername = (): Promise<User> => {
  return httpClient.get('https://discord.com/api/users/@me')
}

export const getUserGuilds = (): Promise<Array<Guild>> => {
  return httpClient.get('https://discord.com/api/users/@me/guilds')
}