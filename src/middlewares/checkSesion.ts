import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces";
import { userModel } from "../models";
import { verifyJWT } from "../utils";

export const checkSesion = async (req: AuthRequest, _: Response, next: NextFunction): Promise<void> => {

  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const jwt = req.headers.authorization.split(' ')[1];

      const { _id } = verifyJWT( jwt );

      req.user = await userModel.findById( _id).select('-password') ?? undefined;
      
      next();
    } catch (error) {
      console.log(error)
    }
  }
  
  next();
}