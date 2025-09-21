import { IUser } from '../models/User';

declare global {
  namespace Express {
    export interface Request {
      user?: IUser | null; // Allow user to be IUser, undefined, or null
    }
  }
}