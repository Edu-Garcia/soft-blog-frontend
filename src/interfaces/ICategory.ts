import { IUser } from '.';

export interface ICategory {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  user: IUser;
}
