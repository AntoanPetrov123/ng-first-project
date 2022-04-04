import { IBase } from './base';
import { IUser } from './user';

export interface ICar extends IBase {
  subscribers: string[];
  posts: string[];
  carName: string;
  userId: IUser;
}
