import { Auth } from './';

export interface User extends Auth {
  _id: string;
  name: string;
  lastname: string;
}