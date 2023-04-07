import { Request, Response } from 'express';
import { userModel } from '../models';
import { comparePassword, generateJWT, hashPassword } from '../utils';

export const userAuth = async ({ body }: Request, res: Response) => {
  const { email, password } = body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });

    if(!comparePassword(password, user.password)) return res.status(403).json({ ok: false, msg: 'Contraseña incorrecta' });

    const { _id, name, lastname, username } = user;
    return res.status(200).json({
      ok: true,
      user: { _id, name, lastname, username, email } ,
      jwt: generateJWT( _id, email ),
    });
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error del sistema, contacte al administrador'});
  }
}

export const userRegister = async ({ body }: Request, res: Response)=> {
  const { email, password, name, lastname } = body;

  try {
    const emailExist = await userModel.findOne({ email });
    if (emailExist) return res.status(404).json({ ok: false, msg: 'Correo electrónico ya está en uso' });

    const user = new userModel(body);
    user.password = hashPassword(password);
    user.username = `${name.split(' ')[0]}_${lastname.split(' ')[0]}`;
    const { _id, username } = await user.save();

    return res.status(201).json({
      ok: true,
      user: { _id, username, email, name, lastname },
    })
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Error del sistema, contacte al administrador'});
  }
}