import { IBase } from './base';
import { ICar } from './car';
import { IUser } from './user';

export interface IPost extends IBase {
  likes: string[];
  text: string;
  userId: IUser;
  themeId: ICar;
}
