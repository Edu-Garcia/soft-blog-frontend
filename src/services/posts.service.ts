import HttpClient from './httpClient';
import { IPost } from '../interfaces';

class PostsService {
  static async getPosts(): Promise<IPost[]> {
    const { data } = await HttpClient.api.get(`/api/v1/posts`);
    return data;
  }

  static async getMyPosts(): Promise<IPost[]> {
    const { data } = await HttpClient.api.get(`/api/v1/posts/me`);
    return data;
  }

  static async getPost(id: string): Promise<IPost> {
    const { data } = await HttpClient.api.get(`/api/v1/posts/${id}`);
    return data;
  }

  static async create(title: string, content: string, categoryId: string): Promise<void> {
    const obj = { title, content, categoryId };
    const { data } = await HttpClient.api.post('/api/v1/posts', obj);
    return data;
  }

  static async update(title: string, content: string, id: string): Promise<void> {
    const obj = { title, content };
    const { data } = await HttpClient.api.put(`/api/v1/posts/${id}`, obj);
    return data;
  }

  static async delete(id: string): Promise<number> {
    const { status } = await HttpClient.api.delete(`/api/v1/posts/${id}`);

    return status;
  }
}

export default PostsService;
