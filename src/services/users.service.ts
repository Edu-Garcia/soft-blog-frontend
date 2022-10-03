import HttpClient from './httpClient';
import { IUser } from '../interfaces';

class UsersService {
  static async users(): Promise<IUser[]> {
    const { data } = await HttpClient.api.get(`/api/v1/users`);
    return data;
  }

  static async user(userId: string): Promise<IUser> {
    const { data } = await HttpClient.api.get(`/api/v1/users/${userId}`);
    return data;
  }

  static async create(name: string, email: string, password: string): Promise<void> {
    const obj = { name, email, password };
    const { data } = await HttpClient.api.post('/api/v1/users', obj);
    return data;
  }

  static async update(name: string, id: string): Promise<void> {
    const obj = { name };
    const { data } = await HttpClient.api.put(`/api/v1/users/${id}`, obj);
    return data;
  }

  static async delete(id: string): Promise<number> {
    const { status } = await HttpClient.api.delete(`/api/v1/users/${id}`);

    return status;
  }
}

export default UsersService;
