import { User } from "./user.interface";

export interface File {
  name: string;
  originalName: string;
  download: number;
  url: string;
  password: string | null;
  user: User | null;
}