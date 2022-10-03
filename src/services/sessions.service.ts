import { ISessionResponse } from '../contexts/AuthContext/types';
import HttpClient from './httpClient';

class SessionsService {
  static async create(email: string, password: string): Promise<ISessionResponse> {
    const obj = { email, password };
    const { data } = await HttpClient.api.post('/api/v1/sessions', obj);
    return data;
  }
}

export default SessionsService;
