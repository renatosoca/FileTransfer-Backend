import { User } from './user.interface';

export interface Storage {
  originalName: string;
  name: string;
  download: number;
  url: string;
  password: string | null;
  user: User | null;
}