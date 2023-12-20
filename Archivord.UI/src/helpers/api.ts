import axios from 'axios';
import { getToken } from "./getToken"
import { clientId, clientSecret } from './secretHelper';

export class httpClient {
  static get(url: string, body?: object | null) {
    return axios.get(url, {
      params: body,
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
    formData.append('client_id', clientId)
    formData.append('client_secret', clientSecret)
    return axios.post('https://discord.com/api/oauth2/token/revoke', formData).then(res => res.data);
  }
}