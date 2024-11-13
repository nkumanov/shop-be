import { IProduct } from './products';

export interface IUserData {
  email: string;
  username: string;
  _id: string;
}

export interface IAdminData {
  email: string;
  username: string;
  admin: boolean;
  _id: string;
}
