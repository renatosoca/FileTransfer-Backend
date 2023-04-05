import { Request } from "express";
import { User } from './';

export interface Auth {
  username: string;
  email: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: User
}