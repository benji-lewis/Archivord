import axios from 'axios';
import { getToken } from "./getToken"

export class httpClient {
  static get(url: string, body?: object | null) {
    return axios.get(url, {
      params: body,
      headers: {
        ...this.getAuthorizationHeader(),
      },
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
}