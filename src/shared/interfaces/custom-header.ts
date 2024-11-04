export interface ICustomHeaders extends Request {
  user?: {
    email: string;
    username: string;
  };
}
