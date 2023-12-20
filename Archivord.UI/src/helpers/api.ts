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
    return axios.post('https://discord.com/api/oauth2/token/revoke', {
      token: token,
      token_type_hint: 'access_token'
    }, {
      auth: {
        username: clientId,
        password: clientSecret,
      }
    }).then(res => res.data);
  }
}