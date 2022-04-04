import { IBase } from './base';

export interface IUser extends IBase {
  cars: string[];
  email: string;
  username: string;
  password: string;
}
