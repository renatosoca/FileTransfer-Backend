import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces";
import { userModel } from "../models";
import { verifyJWT } from "../utils";

export const checkSesion = async (req: AuthRequest, _: Response, next: NextFunction) => {

  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const jwt = req.headers.authorization.split(' ')[1];

      const { _id } = verifyJWT( jwt );

      req.user = await userModel.findById( _id).select('-password').select('-createdAt -updatedAt') ?? undefined;
      
      return next();
    } catch (error) {
      console.log(error)
      return next();
    }
  } 
  
  return next()
}