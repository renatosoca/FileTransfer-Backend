import { Request, Response } from "express";
import { userModel } from "../models";
import { hashPassword } from "../utils";

export const userRegister = async ({ body }: Request, res: Response)=> {
  const { email, password, name, lastname } = body;

  try {
    const emailExist = await userModel.findOne({ email });
    if (emailExist) return res.status(404).json({ ok: false, msg: 'Correo electrónico ya está en uso' });

    const user = new userModel(body);
    user.password = hashPassword(password);
    user.username = name.split(' ')[0] + lastname.split(' ')[0];
    const { _id, username } = await user.save();

    return res.status(201).json({
      ok: true,
      user: { _id, username, email, name, lastname },
    })
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error del sistema, contacte al administrador'});
  }
}