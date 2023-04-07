import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { AuthRequest } from '../interfaces';

export const multerMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  multer({
    limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: diskStorage({
      destination: (_: Request, __: Express.Multer.File, cb: any) => {
        const path = `${process.cwd()}/storage`;
        cb(null, path);
      },
      filename: (_: Request, file: Express.Multer.File, cb: any) => {
        const ext = file.originalname.split('.').pop();
        const fileName = `file-${Date.now()}.${ext}`;
        cb(null, fileName);
      },
    })
  }).single('myFile')(req,res,next);
} 