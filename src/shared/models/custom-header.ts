export interface ICustomRequest extends Request {
  user?: {
    email: string;
    username: string;
    _id: string;
  };
}
