export interface ICustomRequest extends Request {
  user?: {
    email: string;
    username: string;
    _id: string;
  };
  admin?: {
    email: string;
    username: string;
    admin: boolean;
    _id: string;
  };
}
