import { httpClient } from "../helpers/api"

export const logout = () => {
  return httpClient.revoke_token()
}