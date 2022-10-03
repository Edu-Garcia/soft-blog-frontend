import { IUser, ICategory } from '.';

export interface IPost {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  category: ICategory;
}
