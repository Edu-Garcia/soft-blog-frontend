import HttpClient from './httpClient';
import { ICategory } from '../interfaces';

class CategoriesService {
  static async getCategories(): Promise<ICategory[]> {
    const { data } = await HttpClient.api.get(`/api/v1/categories`);
    return data;
  }

  static async getCategory(id: string): Promise<ICategory> {
    const { data } = await HttpClient.api.get(`/api/v1/categories/${id}`);
    return data;
  }

  static async create(title: string): Promise<void> {
    const obj = { title };
    const { data } = await HttpClient.api.post('/api/v1/categories', obj);
    return data;
  }

  static async update(title: string, id: string): Promise<void> {
    const obj = { title };
    const { data } = await HttpClient.api.put(`/api/v1/categories/${id}`, obj);
    return data;
  }

  static async delete(id: string): Promise<number> {
    const { status } = await HttpClient.api.delete(`/api/v1/categories/${id}`);

    return status;
  }
}

export default CategoriesService;
