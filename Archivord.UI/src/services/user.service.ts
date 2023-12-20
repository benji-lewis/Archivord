import { httpClient } from "../helpers/api"
import { User } from "../interfaces/User"

export const getUsername = (): Promise<User> => {
  return httpClient.get('https://discord.com/api/users/@me')
}