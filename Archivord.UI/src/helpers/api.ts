import axios from 'axios';
import { getToken } from "./getToken"

export class httpClient {
  static get(url: string, params?: object) {
    return axios.get(url, {
      params,
      headers: { ...this.getAuthorizationHeader(), }
    }).then(res => res.data);
  }

  static post(url: string, data: object) {
    return axios.post(url, data, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    }).then(res => res.data);
  }

  static getAuthorizationHeader() {
    const token = getToken()
    if (token) {
      return { Authorization: token }
    }
    return {};
  }

  static async revoke_token() {
    const token = getToken()
    const formData = new FormData()
    formData.append('token', token)
    formData.append('token_type_hint', 'access_token')
    formData.append('client_id', window.config.CLIENT_ID)
    formData.append('client_secret', window.config.CLIENT_SECRET)
    return axios.post('https://discord.com/api/oauth2/token/revoke', formData).then(res => res.data);
  }
}